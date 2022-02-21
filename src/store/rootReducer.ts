import { combineReducers, createStore } from "redux";
import { CartReducer } from "./reducers/cartReducer";
import { ProductReducer } from "./reducers/productReducer";
import { composeWithDevTools } from "redux-devtools-extension";

export const rootReducer = combineReducers({
  products: ProductReducer,
  cart: CartReducer,
});

export const store = createStore(rootReducer, composeWithDevTools());
