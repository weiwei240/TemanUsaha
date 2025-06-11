import { TimedLineChart } from "@/components/shared/TimedLineChart";
import { useAppwrite } from "@/hooks/useAppwrite";
import { getOrderSummary } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalContext";
import { useMemo } from "react";
import { parseISO, format } from "date-fns";
import { View, Text } from "react-native";

const TopProductsChart = () => {
  const { businessId } = useGlobalContext()

  return (
    <View>
      <Text>TopProductsChart</Text>
    </View>
  )
}

export default TopProductsChart