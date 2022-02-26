import Product from "../../models/product";
import PRODUCTS from "../../data/data";
import { ProductActions } from "../actions/productActions";

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
  switch (action.type) {
    case ProductActions.SET_PRODUCTS: {
      return {
        availableProducts: action.payload.products,
        userProducts: state.userProducts.filter(
          (product: Product) => product.ownerId === "u1"
        ),
      };
    }

    case ProductActions.DELETE_PRODUCT: {
      return {
        ...state,
        userProducts: state.userProducts.filter(
          (product: Product) => product.id !== action.payload.productId
        ),
        availableProducts: state.availableProducts.filter(
          (product: Product) => product.id !== action.payload.productId
        ),
      };
    }

    case ProductActions.CREATE_PRODUCT: {
      const newProduct = new Product(
        action.payload.productData.id
          ? action.payload.productData.id
          : new Date().toString(),
        "u1",
        action.payload.productData.title,
        action.payload.productData.imageUrl,
        action.payload.productData.description,
        action.payload.productData.price
      );

      return {
        ...state,
        userProducts: state.userProducts.concat(newProduct),
        availableProducts: state.availableProducts.concat(newProduct),
      };
    }

    case ProductActions.UPDATE_PRODUCT: {
      const productIndex = state.userProducts.findIndex(
        (product: Product) => product.id === action.payload.productId
      );
      const updatedProduct = new Product(
        action.payload.productId,
        state.userProducts[productIndex].ownerId,
        action.payload.productData.title,
        action.payload.productData.imageUrl,
        action.payload.productData.description,
        state.userProducts[productIndex].price
      );

      // console.log(updatedProduct);

      const updatedUserProducts = [...state.userProducts];
      updatedUserProducts[productIndex] = updatedProduct;

      const availableProductIndex = state.availableProducts.findIndex(
        (product: Product) => product.id === action.payload.productId
      );
      const updatedAvailableProducts = [...state.availableProducts];
      updatedAvailableProducts[availableProductIndex] = updatedProduct;

      return {
        ...state,
        userProducts: updatedUserProducts,
        availableProducts: updatedAvailableProducts,
      };
    }

    default:
      return state;
  }
};
