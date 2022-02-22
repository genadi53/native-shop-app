import { combineReducers, createStore } from "redux";
import { CartReducer } from "./reducers/cartReducer";
import { ProductReducer } from "./reducers/productReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { OrdersReducer } from "./reducers/orderReducer";

export const rootReducer = combineReducers({
  products: ProductReducer,
  cart: CartReducer,
  orders: OrdersReducer,
});

export const store = createStore(rootReducer, composeWithDevTools());
