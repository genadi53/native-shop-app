import React from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/Card";
import { CartItem as CartItemComponent } from "../../components/shop/CartItem";
import { CustomColors } from "../../constants/customColors";
import CartItem from "../../models/cartItem";
import { ProductStackNavProps } from "../../navigation/ProductsParamList";
import { removeFromCart } from "../../store/actions/cartActions";
import { OrderActions, addToCart } from "../../store/actions/orderActions";
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
    const cartItemsArray: CartItem[] = [];
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
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total: <Text style={styles.amount}>${totalAmount.toFixed(2)}</Text>
        </Text>
        <Button
          color={CustomColors.secondary}
          title="Order Now"
          disabled={cartItems.length === 0}
          onPress={() => {
            dispatch(addToCart(cartItems, totalAmount));
            navigation.navigate("ProductOverview");
          }}
        />
      </Card>
      <FlatList
        data={cartItems}
        keyExtractor={(item, _idx) => item.productId}
        renderItem={(itemData) => (
          <CartItemComponent
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
  },
  summaryText: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
  amount: {
    color: CustomColors.primary,
  },
});
