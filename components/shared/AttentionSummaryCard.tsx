// components/BillSummaryCard.tsx

import { View, Text } from "react-native";
import React from "react";
import { formatCurrency } from "@/utils/format"; // Adjust path as needed
import PieChartWithTotal from "./PieChartWithTotal";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  ionicons: string[],
  titles: string[],
  values: number[],
  colors: string[],
}

const AttentionSummaryCard = ({ ionicons, titles, values, colors }: Props) => {
  const pieData = [
    { key: 1, value: values[0], svg: { fill: colors[0] } },
    { key: 2, value: values[1], svg: { fill: colors[1] } },
    { key: 3, value: values[2], svg: { fill: colors[2] } },
  ];

  return (
    <View className="bg-green-700 rounded-2xl p-4">
      <View className="flex-row justify-between items-center">
        <View className="gap-3">
          <StatusBox icon={ionicons[0]} label={titles[0]} color={colors[0]} amount={values[0]} />
          <StatusBox icon={ionicons[1]} label={titles[1]} color={colors[1]} amount={values[1]} />
          <StatusBox icon={ionicons[2]} label={titles[2]} color={colors[2]} amount={values[2]} />
        </View>

        <View className="items-center">
          <View className="w-[110px] h-[100px]">
            <PieChartWithTotal data={pieData} height={100} />
          </View>
        </View>
      </View>
    </View>
  );
};

const StatusBox = ({
  icon,
  label,
  color,
  amount,
}: {
  icon: string;
  label: string;
  color: string;
  amount: number;
}) => {
  return (
    <View
      className="p-2 rounded-xl w-36 bg-white"
    >
      <View className="flex-row gap-2">
        <Ionicons name={icon as keyof typeof Ionicons.glyphMap} size={16} color={color}/>
        <Text style={{ color: color }} className="font-bold text-xs mb-1">{label}</Text>
      </View>
      <Text className="text-black text-xs">{formatCurrency(amount)}</Text>
    </View>
  );
};

export default AttentionSummaryCard;
