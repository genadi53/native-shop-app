import { FirebaseLink } from "../../constants/appConstants";
import CartItem from "../../models/cartItem";
import Order from "../../models/order";
import Product from "../../models/product";

export const OrderActions = {
  ADD_ORDER: "add_order",
  SET_ORDERS: "set_orders",
};

export const fetchOrders = () => {
  return async (dispatch: any) => {
    const fetchedOrders: Order[] = [];
    try {
      const response = await fetch(`${FirebaseLink}orders/u1.json`);

      if (!response.ok) {
        throw new Error("Ooops! Something went wrong!");
      }

      const data = await response.json();
      // console.log(data);

      for (const key in data) {
        fetchedOrders.push(
          new Order(
            key,
            data[key].cartItems,
            data[key].date,
            data[key].totalAmount
          )
        );
      }
      // console.log(fetchedOrders);
    } catch (error: any) {
      console.error(error);
      throw error;
    }

    dispatch({
      type: OrderActions.SET_ORDERS,
      payload: { orders: fetchedOrders },
    });
  };
};

export const addOrder = (cartItems: CartItem[], totalAmount: number) => {
  return async (dispatch: any) => {
    const date = new Date().toISOString();
    let id: { name: string } | undefined = undefined;
    try {
      const response = await fetch(`${FirebaseLink}orders/u1.json`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItems,
          totalAmount,
          date,
        }),
      });

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      id = await response.json();
      // console.log(data);
    } catch (error: any) {
      console.error(error);
    }

    dispatch({
      type: OrderActions.ADD_ORDER,
      payload: { cartItems, totalAmount, date, id: id ? id.name : date },
    });
  };
};
