import CartItem from "../../models/cartItem";
import Product from "../../models/product";
import { CartActions } from "../actions/cartActions";

// export interface StoredCartItems {
//   [key: string]: CartItem;
// }

export interface CartState {
  items: {
    [key: string]: CartItem;
  };
  totalAmount: number;
}

const initialState: CartState = {
  items: {},
  totalAmount: 0,
};

export const CartReducer = (
  state: CartState = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case CartActions.ADD_TO_CART: {
      const addedProduct: Product = action.payload.product;

      let cartItem: CartItem | null = null;

      if (state.items[addedProduct.id]) {
        const {
          productId,
          quantity,
          productPrice,
          productTitle,
          totalSum,
        }: CartItem = state.items[addedProduct.id];

        cartItem = new CartItem(
          productId,
          productTitle,
          productPrice,
          quantity + 1,
          totalSum + productPrice
          //   quantity * productPrice
        );
      } else {
        cartItem = new CartItem(
          addedProduct.id,
          addedProduct.title,
          addedProduct.price,
          1,
          addedProduct.price
        );
      }

      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: cartItem },
        totalAmount: state.totalAmount + addedProduct.price,
      };
    }

    case CartActions.REMOVE_FROM_CART: {
      const productId: string = action.payload.productId;
      const selectedCartItem: CartItem = state.items[productId];
      const currentQuantity: number = selectedCartItem.quantity;

      let updatedCartItems: {
        [x: string]: CartItem;
      } = {};
      if (currentQuantity > 1) {
        const updatedItem = new CartItem(
          selectedCartItem.productId,
          selectedCartItem.productTitle,
          selectedCartItem.productPrice,
          selectedCartItem.quantity - 1,
          selectedCartItem.totalSum - selectedCartItem.productPrice
        );

        updatedCartItems = { ...state.items, [productId]: updatedItem };
      } else {
        updatedCartItems = { ...state.items };
        delete updatedCartItems[productId];
      }

      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedCartItem.productPrice,
      };
    }

    default:
      return state;
  }
};
