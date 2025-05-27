import { useAppwrite } from "@/hooks/useAppwrite";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { getCurrentUser, resolveBusinessIdForUser } from "@/lib/appwrite"

interface User{
  $id: string;
  name: string;
  email: string;
  avatar: string;
}

interface GlobalContextType{
  isLoggedIn: boolean;
  user: User | null;
  loading: boolean;
  refetch: (newParams?: Record<string, string | number>) => Promise<void>;
  businessId: string | null;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined)

interface Props {
  children: ReactNode;
}

const GlobalProvider = ({children}: Props) => {

  const [businessId, setBusinessId] = useState<string | null>(null);

  const {
    data: user,
    loading,
    refetch,
  } = useAppwrite({
    fn: getCurrentUser, 
  });
  // console.log(JSON.stringify(user, null, 2));

  // On initial load:
  useEffect(() => {
    const init = async () => {
      if (!user || loading) return; // ⛔ Don't proceed unless user is ready
      const id = await resolveBusinessIdForUser();
      setBusinessId(id);
    };
    init();
  }, [user, loading]); // ✅ re-run only after user is loaded

  return(
    <GlobalContext.Provider value={{
      isLoggedIn : !!user,
      user : user ?? null,
      loading,
      refetch,
      businessId,
    }}>
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if(!context){
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }

  return context
}

export default GlobalProvider;