import Product from "../../models/product";
import PRODUCTS from "../../data/data";

export interface ProductState {
  availableProducts: Product[];
  userProducts: Product[];
}

const initialState: ProductState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((p: Product) => p.ownerId === "u1"),
};

export const ProductReducer = (
  state: ProductState = initialState,
  action: { type: string; payload: any }
) => {
  return state;
};
