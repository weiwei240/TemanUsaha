import React from "react";
import { View, Text, Image, ViewStyle } from "react-native";
import icons from "@/constants/icons";
import { ChartData } from "@/types/types";
import { formatCurrency } from "@/utils/format";
import PieChartWithTotal from "./PieChartWithTotal";

interface Props{
  title: string;
  data: ChartData[];
}

const FinancialReportCard = ({title, data}: Props) => {
  const totalAmount = data.reduce((sum, item) => sum + item.amount, 0);
  const pieData = data.map((item) => ({
    value: item.amount,
    svg: { fill: item.color },
    key: item.key,
  }));

  const barValues = data.map(
    (item) => (item.amount / totalAmount) * 100
  );

  return (
    <View className="bg-gray-50 p-4 rounded-xl">
      <View className="flex-row justify-between mb-4 -left-4 items-center">
        <View className="border-l-4 border-green-700">
          <Text className="font-bold ml-2">{title}</Text>
        </View>
        <View className="flex-row items-center left-2">
          <Text className="text-xs text-right text-gray-400">
            01 Aug 2024 - 31 Aug 2024
          </Text>
          <Image
            source={icons.calendar}
            className="size-4 ml-1"
            tintColor={"#9ca3af"}
          ></Image>
        </View>
      </View>
      <View className="flex-row items-start gap-4 mb-4">
        {/* Pie Chart */}
        <View className="w-[110px] h-[100px]">
          <PieChartWithTotal data={pieData} height={100} />
        </View>

        {/* Payment Info List */}
        <View className="flex-1">
          {data.map((item) => (
            <View key={item.key} className="flex-row justify-between mt-1 items-center">
              <View className="flex-row items-center gap-2 flex-shrink">
                <View
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <Text
                  className="text-xs text-gray-700 w-[80%]"
                  numberOfLines={2}
                  style={{ flexShrink: 1, flexWrap: 'wrap' }}
                >
                  {item.label}
                </Text>
              </View>

              <Text
                className="text-xs font-semibold text-gray-800 text-right w-[70%]"
                numberOfLines={2}
                style={{ flexShrink: 1, flexWrap: 'wrap', textAlign: 'right' }}
              >
                {formatCurrency(item.amount)}
              </Text>
            </View>
          ))}
        </View>

      </View>
      {/* Horizontal Bar Chart for Percentage */}
      <View>
        {data.map((item, index) => {
          const percent = ((item.amount / totalAmount) * 100).toFixed(1);
          return (
            <View key={item.key} className="mb-2">
              <View className="flex-row justify-between">
                <Text className="text-xs text-gray-700 mb-1">
                  {item.label}
                </Text>
                <Text className="text-xs text-gray-500">{percent}%</Text>
              </View>
              <View className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <View
                  className="h-full rounded-full"
                  style={[
                    {
                      width: `${percent}%`,
                      backgroundColor: item.color,
                    } as ViewStyle,
                  ]}
                />
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default FinancialReportCard;
