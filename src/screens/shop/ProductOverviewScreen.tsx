import { StyleSheet, Text, View, FlatList, Button } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "../../models/product";
import { ProductState } from "../../store/reducers/productReducer";
import { ProductStackNavProps } from "../../navigation/ProductsParamList";
import { ProductItem } from "../../components/shop/ProductItem";
import { addToCart } from "../../store/actions/cartActions";
import { CustomColors } from "../../constants/customColors";

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
          onSelect={() => {
            navigation.navigate("ProductDetails", {
              id: itemData.item.id,
            });
          }}
        >
          <Button
            color={CustomColors.primary}
            title="View Details"
            onPress={() => {
              navigation.navigate("ProductDetails", {
                id: itemData.item.id,
              });
            }}
          />

          <Button
            color={CustomColors.primary}
            title="To Cart"
            onPress={() => {
              dispatch(addToCart(itemData.item));
            }}
          />
        </ProductItem>
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
