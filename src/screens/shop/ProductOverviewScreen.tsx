import {
  StyleSheet,
  FlatList,
  Button,
  View,
  ActivityIndicator,
  Text,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "../../models/product";
import { ProductState } from "../../store/reducers/productReducer";
import { ProductStackNavProps } from "../../navigation/ProductsParamList";
import { ProductItem } from "../../components/shop/ProductItem";
import { addToCart } from "../../store/actions/cartActions";
import { CustomColors } from "../../constants/customColors";
import { fetchProducts } from "../../store/actions/productActions";

const ProductOverviewScreen = ({
  navigation,
}: ProductStackNavProps<"ProductOverview">) => {
  const dispatch = useDispatch();
  const products: Product[] = useSelector(
    (state: { products: ProductState }) => {
      return state.products.availableProducts;
    }
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const loadProducts = useCallback(async () => {
    setError(undefined);
    setIsLoading(true);
    try {
      await dispatch(fetchProducts());
    } catch (err: any) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    setIsLoading(true);
    loadProducts().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadProducts]);

  useEffect(() => {
    const focusSub: any = navigation.addListener("focus", loadProducts);

    return () => {
      focusSub.remove();
    };
  }, [loadProducts]);

  if (error) {
    <View style={styles.screen}>
      <Text>Error!</Text>
      <Button
        title="Try again"
        onPress={fetchProducts}
        color={CustomColors.primary}
      />
    </View>;
  }

  if (isLoading) {
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={CustomColors.primary} />
    </View>;
  }

  if (!isLoading && products.length === 0) {
    <View style={styles.screen}>
      <Text>No products found!</Text>
    </View>;
  }

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
              title: itemData.item.title,
            });
          }}
        >
          <Button
            color={CustomColors.primary}
            title="View Details"
            onPress={() => {
              navigation.navigate("ProductDetails", {
                id: itemData.item.id,
                title: itemData.item.title,
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
    justifyContent: "center",
    alignItems: "center",
  },
});
