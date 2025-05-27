import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { PieChart } from "react-native-svg-charts";
import { formatCurrency } from "@/utils/format";

interface PieSlice {
  key: string | number;
  value: number;
  svg: {
    fill: string;
  };
}

interface Props {
  data: PieSlice[];
  height?: number;
  innerRadius?: number;
  showTotal?: boolean;
  textColor?: string;
}

const PieChartWithTotal = ({
  data,
  height = 100,
  innerRadius = 40,
  showTotal = true,
  textColor = "#000",
}: Props) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <View
      style={[
        styles.container,
        { width: height, height, borderRadius: height / 2 },
      ]}
    >
      <PieChart
        style={{ height, width: height }}
        data={data}
        innerRadius={innerRadius}
        padAngle={0}
      />
      {showTotal && (
        <View style={styles.centeredOverlay}>
          <Text style={[styles.label, { color: textColor }]}>Total :</Text>
          <Text style={[styles.total, { color: textColor }]}>
            {formatCurrency(total)}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 4,
  },
  centeredOverlay: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 8,
    fontWeight: "500",
  },
  total: {
    fontSize: 10,
    fontWeight: "bold",
  },
});

export default PieChartWithTotal;