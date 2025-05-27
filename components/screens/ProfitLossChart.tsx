import React from "react";
import { View, Text } from "react-native";
import { LineChart, XAxis, Grid } from "react-native-svg-charts";
import * as shape from "d3-shape";
import { Circle, G, Line, Text as SVGText } from "react-native-svg";

interface DataEntry {
  period: string;
  expenses: number;
  income: number;
}

const sampleData: DataEntry[] = [
  { period: "1-6 Sep", expenses: 200, income: 400 },
  { period: "7-12 Sep", expenses: 300, income: 450 },
  { period: "13-18 Sep", expenses: 250, income: 500 },
  { period: "19-24 Sep", expenses: 280, income: 380 },
  { period: "25-30 Sep", expenses: 350, income: 600 },
];

const ProfitLossChart = () => {
  const expenses = sampleData.map((d) => d.expenses);
  const income = sampleData.map((d) => d.income);
  const labels = sampleData.map((d) => d.period);

  return (
    <View className="bg-white p-4 rounded-2xl shadow">
      {/* Header */}
      <View className="mb-2">
        <View className="flex-row items-center mb-1">
          <View className="w-1.5 h-4 bg-green-700 rounded mr-2" />
          <Text className="font-bold text-black">Profit & Loss Statement</Text>
        </View>
        <Text className="text-black font-bold text-xl">Rp 0</Text>
        <Text className="text-green-600 text-sm mt-1">
          ↑ +30% from last 30 days
        </Text>
      </View>

      {/* Line Chart */}
      <View style={{ height: 180, paddingBottom: 10 }}>
        <LineChart
          style={{ flex: 1 }}
          data={expenses}
          svg={{ stroke: "red", strokeWidth: 2 }}
          contentInset={{ top: 20, bottom: 20 }}
          curve={shape.curveLinear}
        >
          <Grid />
        </LineChart>

        <LineChart
          style={StyleSheet.absoluteFill}
          data={income}
          svg={{ stroke: "green", strokeWidth: 2 }}
          contentInset={{ top: 20, bottom: 20 }}
          curve={shape.curveLinear}
        />

        <XAxis
          style={{ marginTop: 10 }}
          data={labels}
          formatLabel={(_, index) => labels[index]}
          contentInset={{ left: 20, right: 20 }}
          svg={{ fontSize: 10, fill: "black" }}
        />
      </View>

      {/* Legend */}
      <View className="flex-row justify-center gap-4">
        <View className="flex-row items-center gap-1">
          <View className="w-3 h-3 bg-red-500 rounded-full" />
          <Text className="text-xs text-black">Expenses</Text>
        </View>
        <View className="flex-row items-center gap-1">
          <View className="w-3 h-3 bg-green-500 rounded-full" />
          <Text className="text-xs text-black">Income</Text>
        </View>
      </View>

      <Text className="text-green-700 text-xs text-right mt-2">
        See Details...
      </Text>
    </View>
  );
};

import { StyleSheet } from "react-native";
export default ProfitLossChart;
