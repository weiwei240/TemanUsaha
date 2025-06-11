import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useAppwrite } from "@/hooks/useAppwrite";
import { getCurrentUser, getBusiness, resolveBusinessIdForUser } from "@/lib/appwrite";
import { Business } from "@/types/types";

interface User {
  $id: string;
  name: string;
  email: string;
  avatar: string;
}

interface GlobalContextType {
  isLoggedIn: boolean;
  user: User | null;
  loading: boolean;
  refetchUser: () => Promise<void>;
  refetchBusiness: () => Promise<void>;
  businessId: string | null;
  business: Business | null;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}

const GlobalProvider = ({ children }: Props) => {
  const {
    data: user,
    loading: userLoading,
    refetch: refetchUser,
  } = useAppwrite({ fn: getCurrentUser });

  const [resolvedBusinessId, setResolvedBusinessId] = useState<string | null>(null);

  const {
    data: business,
    loading: businessLoading,
    refetch: refetchBusiness,
  } = useAppwrite({
    fn: getBusiness,
    params: resolvedBusinessId ? { businessId: resolvedBusinessId } : undefined,
    skip: !resolvedBusinessId,
  });

  useEffect(() => {
    const init = async () => {
      if (!user || userLoading) return;

      const id = await resolveBusinessIdForUser();
      setResolvedBusinessId(id);
    };

    init();
  }, [user, userLoading]);

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn: !!user,
        user: user ?? null,
        loading: userLoading || businessLoading,
        refetchUser,
        refetchBusiness,
        businessId: resolvedBusinessId,
        business,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};

export default GlobalProvider;
