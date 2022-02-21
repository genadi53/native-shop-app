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
        const { quantity, productPrice, productTitle, totalSum }: CartItem =
          state.items[addedProduct.id];

        cartItem = new CartItem(
          quantity + 1,
          productPrice,
          productTitle,
          totalSum + productPrice
          //   quantity * productPrice
        );
      } else {
        cartItem = new CartItem(
          1,
          addedProduct.price,
          addedProduct.title,
          addedProduct.price
        );
      }
      const items = { ...state.items, [addedProduct.id]: cartItem };
      const t = state.totalAmount + addedProduct.price;
      // console.log(t);
      // console.log(items);
      console.log(state);

      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: cartItem },
        totalAmount: state.totalAmount + addedProduct.price,
      };
    }
    default:
      return state;
  }
};
