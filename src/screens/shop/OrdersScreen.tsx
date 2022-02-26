import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { CustomColors } from "../../constants/customColors";
import Order from "../../models/order";
import { OrderStackNavProps } from "../../navigation/OrdersParamList";
import { OrdersState } from "../../store/reducers/orderReducer";
import { OrderItem } from "../../components/shop/OrderItem";
import { fetchOrders } from "../../store/actions/orderActions";

const OrdersScreen = ({ navigation, route }: OrderStackNavProps<"Orders">) => {
  const orders = useSelector((state: { orders: OrdersState }) => {
    return state.orders.orders;
  });
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchOrders())
      .then(() => {
        setIsLoading(false);
      })
      .catch((err: any) => {
        console.log(err);
        setError(err);
        setIsLoading(false);
      });
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      Alert.alert("An error occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  if (isLoading) {
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={CustomColors.primary} />
    </View>;
  }

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

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
