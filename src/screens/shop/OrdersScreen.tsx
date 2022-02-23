import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { CustomColors } from "../../constants/customColors";
import Order from "../../models/order";
import { OrderStackNavProps } from "../../navigation/OrdersParamList";
import { OrdersState } from "../../store/reducers/orderReducer";
import { OrderItem } from "../../components/shop/OrderItem";

const OrdersScreen = ({ navigation, route }: OrderStackNavProps<"Orders">) => {
  const orders = useSelector((state: { orders: OrdersState }) => {
    return state.orders.orders;
  });

  return (
    <View>
      <FlatList
        data={orders}
        keyExtractor={(item, _idx) => item.id}
        renderItem={(itemData: { item: Order }) => {
          return <OrderItem order={itemData.item} />;
        }}
      />
    </View>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({});
