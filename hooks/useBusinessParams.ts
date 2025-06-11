import { useMemo } from "react";
import { useGlobalContext } from "@/context/GlobalContext";

export const useBusinessParams = () => {
  const { businessId } = useGlobalContext();

  const params = useMemo(
    () => (businessId ? { businessId } : undefined),
    [businessId]
  );

  return params;
};
