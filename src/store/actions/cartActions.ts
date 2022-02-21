import Product from "../../models/product";

export const CartActions = {
  ADD_TO_CART: "add_to_cart",
  REMOVE_FROM_CART: "remove_from_cart",
};

export const addToCart = (product: Product) => {
  return { type: CartActions.ADD_TO_CART, payload: { product } };
};

export const removeFromCart = (productId: string) => {
  return { type: CartActions.REMOVE_FROM_CART, payload: { productId } };
};
