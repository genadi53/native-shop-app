import React from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { CartItem } from "../../components/shop/CartItem";
import { CustomColors } from "../../constants/customColors";
import { ProductStackNavProps } from "../../navigation/ProductsParamList";
import { removeFromCart } from "../../store/actions/cartActions";
import { CartState } from "../../store/reducers/cartReducer";

const CartScreen = ({
  navigation,
  route,
}: ProductStackNavProps<"CartScreen">) => {
  const dispatch = useDispatch();
  const totalAmount: number = useSelector(
    (state: { cart: CartState }) => state.cart.totalAmount
  );

  const cartItems = useSelector((state: { cart: CartState }) => {
    const cartItemsArray = [];
    for (const key in state.cart.items) {
      cartItemsArray.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        totalSum: state.cart.items[key].totalSum,
      });
    }
    return cartItemsArray.sort((a, b) => (a.productId > b.productId ? 1 : -1));
  });

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total: <Text style={styles.amount}>${totalAmount.toFixed(2)}</Text>
        </Text>
        <Button
          color={CustomColors.secondary}
          title="Order Now"
          disabled={cartItems.length === 0}
          onPress={() => {}}
        />
      </View>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.productId}
        renderItem={(itemData) => (
          <CartItem
            quantity={itemData.item.quantity}
            title={itemData.item.productTitle}
            amount={itemData.item.totalSum}
            onRemove={() => {
              dispatch(removeFromCart(itemData.item.productId));
            }}
          />
        )}
      />
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