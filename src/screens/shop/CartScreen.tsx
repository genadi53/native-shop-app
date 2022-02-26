import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/Card";
import { CartItem as CartItemComponent } from "../../components/shop/CartItem";
import { CustomColors } from "../../constants/customColors";
import CartItem from "../../models/cartItem";
import { ProductStackNavProps } from "../../navigation/ProductsParamList";
import { removeFromCart } from "../../store/actions/cartActions";
import { OrderActions, addOrder } from "../../store/actions/orderActions";
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

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const createOrderHandler = async () => {
    setIsLoading(true);
    try {
      await dispatch(addOrder(cartItems, totalAmount));
    } catch (err: any) {
      setError(err.message);
    }
    setIsLoading(true);
    navigation.navigate("ProductOverview");
  };

  useEffect(() => {
    if (error) {
      Alert.alert("An error occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  return (
    <View style={{ margin: 20 }}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total: <Text style={styles.amount}>${totalAmount.toFixed(2)}</Text>
        </Text>

        {isLoading ? (
          <ActivityIndicator size="large" color={CustomColors.primary} />
        ) : (
          <Button
            color={CustomColors.secondary}
            title="Order Now"
            disabled={cartItems.length === 0}
            onPress={createOrderHandler}
          />
        )}
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
