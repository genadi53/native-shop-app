import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "../../models/product";
import { ProductState } from "../../store/reducers/productReducer";
import { ProductStackNavProps } from "../../navigation/ProductsParamList";
import { ProductItem } from "../../components/shop/ProductItem";
import { addToCart } from "../../store/actions/cartActions";

const ProductOverviewScreen = ({
  navigation,
}: ProductStackNavProps<"ProductOverview">) => {
  const dispatch = useDispatch();
  const products: Product[] = useSelector(
    (state: { products: ProductState }) => {
      return state.products.availableProducts;
    }
  );

  return (
    <FlatList
      data={products}
      keyExtractor={(item, _idx) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          product={itemData.item}
          onAddToCart={() => {
            // console.log(itemData.item);
            dispatch(addToCart(itemData.item));
          }}
          onViewDetail={() => {
            navigation.navigate("ProductDetails", {
              id: itemData.item.id,
            });
          }}
        />
      )}
    />
  );
};

export default ProductOverviewScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
