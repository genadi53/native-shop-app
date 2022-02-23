import React from "react";
import { FlatList, Button, Platform, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { ProductItem } from "../../components/shop/ProductItem";
import { CustomColors } from "../../constants/customColors";
import Product from "../../models/product";
import { UserstackNavProps } from "../../navigation/UsersParamList";
import { ProductState } from "../../store/reducers/productReducer";

const UserProductsScreen = ({
  navigation,
  route,
}: UserstackNavProps<"UserProducts">) => {
  const userProducts = useSelector(
    (state: { products: ProductState }) => state.products.userProducts
  );
  const dispatch = useDispatch();

  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={(itemData: { item: Product }) => (
        <ProductItem product={itemData.item} onSelect={() => {}}>
          <Button
            color={CustomColors.primary}
            title="Edit"
            onPress={() => {}}
          />
          <Button
            color={CustomColors.primary}
            title="Delete"
            onPress={() => {}}
          />
        </ProductItem>
      )}
    />
  );
};

export default UserProductsScreen;
