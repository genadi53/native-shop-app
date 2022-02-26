import { FirebaseLink } from "../../constants/appConstants";
import Product from "../../models/product";

export const ProductActions = {
  SET_PRODUCTS: "set_products",
  DELETE_PRODUCT: "delete_product",
  CREATE_PRODUCT: "create_product",
  UPDATE_PRODUCT: "update_product",
};

export const fetchProducts = () => {
  return async (dispatch: any) => {
    const fetchedProducts: Product[] = [];
    try {
      const res = await fetch(`${FirebaseLink}products.json`);

      if (!res.ok) {
        throw new Error("Ooops! Something went wrong!");
      }

      const data = await res.json();
      // console.log(data);

      for (const key in data) {
        fetchedProducts.push(
          new Product(
            key,
            "u1",
            data[key].title,
            data[key].imageUrl,
            data[key].description,
            data[key].price
          )
        );
      }
    } catch (error: any) {
      console.error(error);
      throw error;
    }

    dispatch({
      type: ProductActions.SET_PRODUCTS,
      payload: { products: fetchedProducts },
    });
  };
};

export const deleteProduct = (productId: string) => {
  return {
    type: ProductActions.DELETE_PRODUCT,
    payload: { productId },
  };
};

export const createProduct = (
  title: string,
  description: string,
  imageUrl: string,
  price: number
) => {
  return async (dispatch: any) => {
    let id: { name: string } | undefined = undefined;
    try {
      const res = await fetch(`${FirebaseLink}products.json`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          price,
        }),
      });

      id = await res.json();
      // console.log(data);
    } catch (error: any) {
      console.error(error);
    }

    dispatch({
      type: ProductActions.CREATE_PRODUCT,
      payload: {
        productData: {
          id: id ? id.name : "",
          title,
          description,
          imageUrl,
          price,
        },
      },
    });
  };
};

export const updateProduct = (
  productId: string,
  title: string,
  description: string,
  imageUrl: string
) => {
  return {
    type: ProductActions.UPDATE_PRODUCT,
    payload: {
      productId,
      productData: {
        title,
        description,
        imageUrl,
      },
    },
  };
};
