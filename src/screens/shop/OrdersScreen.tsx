import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { CustomColors } from "../../constants/customColors";
import Order from "../../models/order";
import { OrderStackNavProps } from "../../navigation/OrdersParamList";
import { OrdersState } from "../../store/reducers/orderReducer";

const OrdersScreen = ({ navigation, route }: OrderStackNavProps<"Orders">) => {
  const orders = useSelector((state: { orders: OrdersState }) => {
    return state.orders.orders;
  });

  return (
    <View>
      <Text>Orders!!!</Text>
      <FlatList
        data={orders}
        keyExtractor={(item, _idx) => item.id}
        renderItem={(itemData: { item: Order }) => {
          console.log(itemData.item);
          return <Text>{itemData.item.totalAmount}</Text>;
        }}
      />
    </View>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({});
