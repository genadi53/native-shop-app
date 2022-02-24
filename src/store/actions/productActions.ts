export const ProductActions = {
  DELETE_PRODUCT: "delete_product",
  CREATE_PRODUCT: "create_product",
  UPDATE_PRODUCT: "update_product",
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
  return {
    type: ProductActions.CREATE_PRODUCT,
    payload: {
      productData: {
        title,
        description,
        imageUrl,
        price,
      },
    },
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
