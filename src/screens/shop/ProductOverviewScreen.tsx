import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import Product from "../../models/product";
import { ProductState } from "../../store/reducers/productReducer";
import { ProductStackNavProps } from "../../navigation/ProductsParamList";

const ProductOverviewScreen = ({
  navigation,
}: ProductStackNavProps<"ProductOverview">) => {
  const products: Product[] = useSelector(
    (state: { products: ProductState }) => {
      return state.products.availableProducts;
    }
  );

  return (
    <FlatList
      data={products}
      keyExtractor={(item, _idx) => item.id}
      renderItem={(itemData) => <Text>{itemData.item.title}</Text>}
    />
  );
};

export default ProductOverviewScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
