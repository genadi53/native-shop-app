export type ProductDetailsParamList = {
  ProductDetails: {
    id: string;
  };
  EditProduct: {
    name: string;
    submit?: React.MutableRefObject<() => void>;
  };
};
