import CartItem from "../../models/cartItem";
import Order from "../../models/order";
import Product from "../../models/product";
import { OrderActions } from "../actions/orderActions";
import moment from "moment";

// export interface StoredCartItems {
//   [key: string]: CartItem;
// }

export interface OrdersState {
  orders: Order[];
}

const initialState: OrdersState = {
  orders: [],
};

export const OrdersReducer = (
  state: OrdersState = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case OrderActions.ADD_ORDER: {
      const newOrder = new Order(
        action.payload.id,
        action.payload.cartItems,
        action.payload.date,
        // new Date().toLocaleDateString("en-En", {
        //   year: "numeric",
        //   month: "long",
        //   day: "numeric",
        //   hour: "2-digit",
        //   minute: "2-digit",
        // }),
        action.payload.totalAmount
      );

      return { ...state, orders: state.orders.concat(newOrder) };
    }

    case OrderActions.SET_ORDERS: {
      return { ...state, orders: action.payload.orders };
    }

    default:
      return state;
  }
};
