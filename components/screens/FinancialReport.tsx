import React from "react";
import { View, Text, Image } from "react-native";
import { PieChart } from "react-native-svg-charts";
import icons from "@/constants/icons";

const paymentData = [
  { key: 1, label: "QRIS", amount: 1300000, color: "#5E5CE6" },
  { key: 2, label: "Bank Transfer", amount: 840000, color: "#49B6FF" },
  { key: 3, label: "Cash", amount: 1920000, color: "#FF8A00" },
  { key: 4, label: "Debit Card", amount: 600000, color: "#00C48C" },
];

const totalAmount = paymentData.reduce((sum, item) => sum + item.amount, 0);

const FinancialReportCard = () => {
  const pieData = paymentData.map((item) => ({
    value: item.amount,
    svg: { fill: item.color },
    key: item.key,
  }));

  const barValues = paymentData.map(
    (item) => (item.amount / totalAmount) * 100
  );

  return (
    <View className="bg-white mx-4 rounded-2xl p-4 shadow-2xl">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-2">
        <View>
          <Text className="text-lg font-semibold">Financial Report</Text>
          <Text className="text-xs text-gray-500 mt-[-2px]">
            Better financial reports unlock new opportunities.
          </Text>
        </View>
        <Text className="text-sm text-blue-500 font-medium">View Detail</Text>
      </View>

      {/* Card Content */}
      <View className="bg-gray-50 p-4 rounded-xl">
        <View className="flex-row justify-between mb-4 -left-4 items-center">
          <View className="border-l-4 border-green-700">
            <Text className="font-bold ml-2">Payment Methods</Text>
          </View>
          <View className="flex-row items-center left-6">
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
            <PieChart
              style={{ height: 100 }}
              data={pieData}
              innerRadius={40}
              padAngle={0}
            />
            {/* Overlay Center Text */}
            <View className="absolute inset-0 items-center justify-center">
              <Text className="text-[10px] text-gray-500 font-medium">
                Total
              </Text>
              <Text className="text-xs font-semibold text-black">
                Rp {totalAmount.toLocaleString("id-ID")}
              </Text>
            </View>
          </View>

          {/* Payment Info List */}
          <View className="flex-1 ">
            {paymentData.map((item) => (
              <View key={item.key} className="flex-row justify-between mt-1">
                <View className="flex-row items-center gap-2">
                  <View
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <Text className="text-xs text-gray-700">{item.label}</Text>
                </View>
                <Text className="text-xs font-semibold text-gray-800">
                  Rp {item.amount.toLocaleString("id-ID")}
                </Text>
              </View>
            ))}
          </View>
        </View>
        {/* Horizontal Bar Chart for Percentage */}
        <View>
          {paymentData.map((item, index) => {
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
                    style={{
                      width: `${percent}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default FinancialReportCard;
