import icons from "@/constants/icons";
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const UserBalanceCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {/* Balance Section */}
        <View style={styles.balanceSection}>
          <Image source={icons.wallet2} style={styles.iconWallet} />
          <View>
            <Text style={styles.balanceLabel}>Your Balance</Text>
            <View style={styles.amountRow}>
              <Text style={styles.balanceAmount}>Rp 2.500.000</Text>
              <Image
                source={icons.eye}
                style={styles.iconEye}
                tintColor="#000"
              />
            </View>
          </View>
        </View>

        {/* Vertical Divider */}
        <View style={styles.divider} />

        {/* Actions Section */}
        <View style={styles.actionsSection}>
          <View style={styles.actionItem}>
            <View style={styles.actionIconWrapper}>
              <Image source={icons.coinInHand} style={styles.actionIcon} />
            </View>
            <Text style={styles.actionText}>Cash Out</Text>
          </View>
          <View style={styles.actionItem}>
            <View style={styles.actionIconWrapper}>
              <Image source={icons.bankBuilding} style={styles.actionIcon} />
            </View>
            <Text style={styles.actionText}>Transfer</Text>
          </View>
          <View style={styles.actionItem}>
            <View style={styles.actionIconWrapper}>
              <Image source={icons.orderHistory} style={styles.actionIcon} />
            </View>
            <Text style={styles.actionText}>History</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default UserBalanceCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 15,
    elevation: 4,
    position: "absolute",
    top: 110,
    left: 0,
    right: 0,
    marginTop: -30,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  balanceSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 4,
  },
  iconWallet: {
    width: 40,
    height: 40,
  },
  balanceLabel: {
    fontSize: 12,
    color: "#1B9C1B",
    fontWeight: "600",
  },
  amountRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  balanceAmount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  iconEye: {
    width: 18,
    height: 18,
    marginLeft: 3,
  },
  divider: {
    width: 1,
    height: "100%",
    backgroundColor: "#ccc",
    marginHorizontal: 10,
  },
  actionsSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  actionItem: {
    alignItems: "center",
  },
  actionIconWrapper: {
    backgroundColor: "#1B9C1B",
    padding: 6,
    borderRadius: 10,
  },
  actionIcon: {
    width: 24,
    height: 24,
    borderRadius: 6,
  },
  actionText: {
    fontSize: 9,
    fontWeight: "600",
    color: "#000",
  },
});
