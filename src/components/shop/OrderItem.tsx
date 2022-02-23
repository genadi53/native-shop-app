import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { CartItem as CartItemComponent } from "./CartItem";
import CartItem from "../../models/cartItem";
import { CustomColors } from "../../constants/customColors";
import Order from "../../models/order";

interface OrderItemProps {
  order: Order;
}

export const OrderItem: React.FC<OrderItemProps> = (props) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <View style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>
          ${props.order.totalAmount.toFixed(2)}
        </Text>
        <Text style={styles.date}>{props.order.date}</Text>
      </View>
      <Button
        color={CustomColors.primary}
        title={showDetails ? "Hide Details" : "Show Details"}
        onPress={() => {
          setShowDetails((prevState) => !prevState);
        }}
      />

      {showDetails && (
        <View style={styles.detailItems}>
          {props.order.items.map((cartItem: CartItem, _idx) => (
            <CartItemComponent
              key={`${cartItem.productId}`}
              quantity={cartItem.quantity}
              amount={cartItem.totalSum}
              title={cartItem.productTitle}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    margin: 20,
    padding: 10,
    alignItems: "center",
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
  totalAmount: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
  },
  date: {
    fontSize: 16,
    fontFamily: "open-sans",
    color: "#888",
  },
  detailItems: {
    width: "100%",
  },
});
