import React from "react";
import { FlatList, Button, Platform, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { ProductItem } from "../../components/shop/ProductItem";
import { CustomColors } from "../../constants/customColors";
import Product from "../../models/product";
import { UserstackNavProps } from "../../navigation/UsersParamList";
import { deleteProduct } from "../../store/actions/productActions";
import { ProductState } from "../../store/reducers/productReducer";

const UserProductsScreen = ({
  navigation,
  route,
}: UserstackNavProps<"UserProducts">) => {
  const userProducts = useSelector(
    (state: { products: ProductState }) => state.products.userProducts
  );
  const dispatch = useDispatch();

  const editProductHandler = (id: string, title: string) => {
    navigation.navigate("EditProduct", { id, title });
  };

  const deleteHandler = (id: string) => {
    console.log("yo");
    Alert.alert("Are you sure?", "Do you really want to delete this item?", [
      { text: "No", style: "default" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          dispatch(deleteProduct(id));
        },
      },
    ]);
  };

  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={(itemData: { item: Product }) => (
        <ProductItem
          product={itemData.item}
          onSelect={() => {
            editProductHandler(itemData.item.id, itemData.item.title);
          }}
        >
          <Button
            color={CustomColors.primary}
            title="Edit"
            onPress={() => {
              editProductHandler(itemData.item.id, itemData.item.title);
            }}
          />
          <Button
            color={CustomColors.primary}
            title="Delete"
            onPress={() => {
              // dispatch(deleteProduct(itemData.item.id));
              deleteHandler(itemData.item.id);
            }}
          />
        </ProductItem>
      )}
    />
  );
};

export default UserProductsScreen;
