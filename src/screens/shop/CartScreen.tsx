import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  ScrollView,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { CustomColors } from "../../constants/customColors";
import Product from "../../models/product";
import { ProductStackNavProps } from "../../navigation/ProductsParamList";
import { CartState } from "../../store/reducers/cartReducer";

interface CartScreenProps {}

const CartScreen = ({
  navigation,
  route,
}: ProductStackNavProps<"CartScreen">) => {
  const totalAmount: number = useSelector(
    (state: { cart: CartState }) => state.cart.totalAmount
  );

  const cartItems = useSelector(
    (state: { cart: CartState }) => state.cart.items
  );

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total: <Text style={styles.amount}>${totalAmount.toFixed(2)}</Text>
        </Text>
        <Button
          color={CustomColors.secondary}
          title="Order Now"
          //   disabled={cartItems.length === 0}
          onPress={() => {
            // dispatch(ordersActions.addOrder(cartItems, cartTotalAmount));
          }}
        />
      </View>
      {/* <FlatList
        data={cartItems}
        keyExtractor={(item) => item.productId}
        renderItem={(itemData) => (
          <CartItem
            quantity={itemData.item.quantity}
            title={itemData.item.productTitle}
            amount={itemData.item.sum}
            onRemove={() => {
              dispatch(cartActions.removeFromCart(itemData.item.productId));
            }}
          />
        )}
      /> */}
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
  },
  summaryText: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
  amount: {
    color: CustomColors.primary,
  },
});
