import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LineChart, XAxis, Grid } from "react-native-svg-charts";
import * as shape from "d3-shape";
import { Line } from "react-native-svg";

type LineData = {
  id: string,
  label: string,
  color: string,
  data: string[],
}

interface Props{
  title: string,
  subtitle?: string,
  lines: LineData[],
  labels: string[],
}

export const TimedLineChart = ({title, subtitle, lines, labels}: Props) => (
  <View className="bg-white p-4 rounded-2xl shadow">
    {/* Header */}
    <View className="mb-2">
      <View className="flex-row items-center mb-1">
        <View className="w-1.5 h-4 bg-green-700 rounded mr-2"/>
        <Text className="font-rubik-bold text-black">{title}</Text>
      </View>
      {subtitle && <Text className="text-green-600 text-sm mt-1 font-rubik-light">{subtitle}</Text>}
    </View>

    {/* Line Chart */}
    <View style={{ height: 180, paddingBottom:10 }}>
      {/* Background Grid */}
      <LineChart
        style={{ flex: 1 }}
        data={lines[0].data} // just for layout/grid, dummy line
        svg={{ stroke: "transparent" }}
        contentInset={{ top: 20, bottom: 20 }} 
      >
        <Grid />
      </LineChart>
      {/* Actual Lines */}
      {lines.map((line) => (
        <LineChart
          key={line.id}
          style={StyleSheet.absoluteFill}
          data={line.data}
          svg={{ stroke: line.color, strokeWidth: 2 }}
          contentInset={{ top: 20, bottom: 20 }}
          curve={shape.curveLinear}
        />
      ))}
      {/* X Axis */}
      <XAxis
        style={{ marginTop: 10 }}
        data={labels}
        formatLabel={(_, index) => labels[index]}
        contentInset={{ left: 20, right: 20 }}
        svg={{ fontSize: 10, fill: "black" }}
      />
    </View>

    {/* Legend */}
    <View className="justify-center flex-row gap=4 mt-2">
      {lines.map((line) => (
        <View key={line.id} className="flex-row items-center gap-1">
          <View style={{ width: 12, height: 12, backgroundColor: line.color, borderRadius: 6 }}/>
          <Text className="text-xs text-black font-rubik-light">{line.label}</Text>
        </View>
      ))}
    </View>
  </View>
)