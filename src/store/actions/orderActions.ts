import CartItem from "../../models/cartItem";
import Product from "../../models/product";

export const OrderActions = {
  ADD_ORDER: "add_order",
};

export const addToCart = (cartItems: CartItem[], totalAmount: number) => {
  return { type: OrderActions.ADD_ORDER, payload: { cartItems, totalAmount } };
};
