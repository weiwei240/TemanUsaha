import { Account, Avatars, Client, Databases, OAuthProvider, Query } from "react-native-appwrite";
import * as Linking from "expo-linking"
import { openAuthSessionAsync } from "expo-web-browser"
import { Category, Product } from "@/types/types";

export const config = {
  platform: 'com.temanusaha.pos',
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,

  billsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_BILLS_COLLECTION_ID,
  businessesCollectionId: process.env.EXPO_PUBLIC_APPWRITE_BUSINESSES_COLLECTION_ID,
  categoriesCollectionId: process.env.EXPO_PUBLIC_APPWRITE_CATEGORIES_COLLECTION_ID,
  customersCollectionId: process.env.EXPO_PUBLIC_APPWRITE_CUSTOMERS_COLLECTION_ID,
  employeesCollectionId: process.env.EXPO_PUBLIC_APPWRITE_EMPLOYEES_COLLECTION_ID,
  offersCollectionId: process.env.EXPO_PUBLIC_APPWRITE_OFFERS_COLLECTION_ID,
  productsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_PRODUCTS_COLLECTION_ID,
  transactionsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_TRANSACTIONS_COLLECTION_ID,
  variantsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_VARIANTS_COLLECTION_ID,
}

export const client = new Client();

client
  .setEndpoint(config.endpoint!)
  .setProject(config.projectId!)
  .setPlatform(config.platform!)

export const avatar = new Avatars(client);
export const account = new Account(client);
export const databases = new Databases(client);

export async function login(){
  try{
    const redirectUri = Linking.createURL('/');

    const response = await account.createOAuth2Token(
      OAuthProvider.Google, 
      redirectUri
    );

    if(!response) throw new Error('No response');

    const browserResult = await openAuthSessionAsync(
      response.toString(),
      redirectUri
    )
    if(browserResult.type !== 'success') throw new Error('Browser result failed');

    const url = new URL(browserResult.url);

    const secret = url.searchParams.get('secret')?.toString();
    const userId = url.searchParams.get('userId')?.toString();

    if(!secret || !userId) throw new Error('Failed to get secret or user ID');

    const session = await account.createSession(userId, secret);

    if(!session) throw new Error('Failed to create session');

    // const test = await account.get()
    // console.log(test.$id)

    return true;

  }catch(error){
    console.error(error);
    return false;
  }
}

export async function logout(){
  try{
    await account.deleteSession('current');
    return true;
  }catch(error){
    console.error(error)
    return false;
  }
}

export async function getCurrentUser(){
  try{
    const response = await account.get();
    if(response.$id){
      const userAvatar = avatar.getInitials(response.name)
      return {
        ...response,
        avatar: userAvatar.toString(),
      };
    }
  }catch(error){
    console.error(error);
    return null;
  }
}

export const resolveBusinessIdForUser = async (): Promise<string | null> => {
  const user = await getCurrentUser();
  if (!user) {
    console.log("No user found");
    return null;
  }

  const employeeRes = await databases.listDocuments(
    config.databaseId!,
    config.employeesCollectionId!,
    [Query.equal("userId", user.$id)]
  );

  // console.log(employeeRes.documents[0])

  const employee = employeeRes.documents[0];
  if (!employee || !employee.business) {
    console.log("No employee or businesses", employee.business);
    return null;
  }

  // console.log("Business ID:", employee.business.$id)

  return employee.business.$id; // assuming one business
};

export const getBusinessProducts = async ({
  businessId,
}: {
  businessId: string;
}): Promise<Product[]> => {
  try {
    const result = await databases.listDocuments(
      config.databaseId!,
      config.productsCollectionId!,
      [
        Query.equal("business", businessId),
        Query.orderAsc("name"),
      ]
    );

    return result.documents.map((doc) => ({
      id: doc.$id,
      name: doc.name,
      price: doc.price,
      unit: doc.unit,
      sold: doc.sold,
      stock: doc.stock,
      description: doc.description,
      sku: doc.sku,
      image: doc.image,
      active: doc.active,
      categories: doc.categories,
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getProductById = async (productId: string): Promise<Product | null> => {
  try {
    const doc = await databases.getDocument(
      config.databaseId!,
      config.productsCollectionId!,
      productId
    );

    return {
      id: doc.$id,
      name: doc.name,
      price: doc.price,
      unit: doc.unit,
      stock: doc.stock,
      sold: doc.sold,
      sku: doc.sku,
      categories: doc.category,
      description: doc.description,
      active: doc.active,
      image: doc.image,
    };
  } catch (error) {
    console.error("Failed to fetch product", error);
    return null;
  }
};

export const getBusinessCategories = async ({
  businessId,
}: {
  businessId: string;
}): Promise<Category[]> => {
  try{
    const result = await databases.listDocuments(
      config.databaseId!,
      config.categoriesCollectionId!,
      [Query.orderAsc('name'), Query.equal('business', businessId)]
    )
    return result.documents.map((doc) => ({
      id: doc.$id,
      name: doc.name,
      image: doc.image,
      products: doc.products,
    }))
  }catch(error){
    console.error(error)
    return []
  }
}

export const getUserEmployees = async () => {
  try{
    const currentUser = await getCurrentUser()
    const result = await databases.listDocuments(
      config.databaseId!,
      config.employeesCollectionId!,
      [Query.orderAsc('name'), Query.equal("userId", currentUser!.$id)]
    )
    return result.documents.map((doc) => ({
      id: doc.$id,
      name: doc.name,
      phone: doc.phone,
      role: doc.role,
      business: doc.business,
    }))
  }catch(error){
    console.error(error)
    return []
  }
}