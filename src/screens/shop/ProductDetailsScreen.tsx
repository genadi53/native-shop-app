import React from "react";
import { StyleSheet, Text, View, FlatList, Button } from "react-native";
import { useSelector } from "react-redux";
import Product from "../../models/product";
import { ProductStackNavProps } from "../../navigation/ProductsParamList";
import { ProductState } from "../../store/reducers/productReducer";

interface ProductDetailsProps {}

const ProductDetailsScreen = ({
  navigation,
  route,
}: ProductStackNavProps<"ProductDetails">) => {
  const products: Product[] = useSelector(
    (state: { products: ProductState }) => {
      return state.products.availableProducts;
    }
  );

  const id = route.params.id;
  const selectedProduct = products.find(
    (product: Product) => product.id === id
  );

  return (
    <View>
      <Text>Product details</Text>
      <Text>{selectedProduct?.title}</Text>
      <Text>{route.params.id}</Text>
      <Button
        title="Go Back"
        onPress={() => {
          navigation.goBack();
        }}
      />
    </View>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
