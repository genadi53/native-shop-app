import { combineReducers, createStore, applyMiddleware } from "redux";
import { CartReducer } from "./reducers/cartReducer";
import { ProductReducer } from "./reducers/productReducer";
// import { composeWithDevTools } from "redux-devtools-extension";
import { OrdersReducer } from "./reducers/orderReducer";
import ReduxThunk from "redux-thunk";

export const rootReducer = combineReducers({
  products: ProductReducer,
  cart: CartReducer,
  orders: OrdersReducer,
});

export const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
