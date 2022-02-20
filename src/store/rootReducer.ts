import { combineReducers, createStore } from "redux";
import { ProductReducer } from "./reducers/productReducer";

export const rootReducer = combineReducers({
  products: ProductReducer,
});

export const store = createStore(rootReducer);
