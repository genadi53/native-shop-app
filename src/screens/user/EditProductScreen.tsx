import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  Platform,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Product from "../../models/product";
import { UserstackNavProps } from "../../navigation/UsersParamList";
import {
  createProduct,
  updateProduct,
} from "../../store/actions/productActions";
import { ProductState } from "../../store/reducers/productReducer";

const EditProductScreen = ({
  navigation,
  route,
}: UserstackNavProps<"EditProduct">) => {
  const productId: string = route.params.id;
  const editedProduct: Product | undefined = useSelector(
    (state: { products: ProductState }) => {
      // console.log(state.products.userProducts);
      return state.products.userProducts.find(
        (product: Product) => product.id === productId
      );
    }
  );

  const dispatch = useDispatch();
  const [title, setTitle] = useState(editedProduct ? editedProduct.title : "");
  const [imageUrl, setImageUrl] = useState(
    editedProduct ? editedProduct.imageUrl : ""
  );
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState(
    editedProduct ? editedProduct.description : ""
  );

  const onSubmit = useCallback(() => {
    if (editedProduct) {
      dispatch(updateProduct(productId, title, description, imageUrl));
    }
    navigation.goBack();
  }, [dispatch, productId, title, description, imageUrl, price]);

  // const onSubmit = useRef(() => {});
  // onSubmit.current = () => {
  //   if (editedProduct && productId) {
  //     dispatch(updateProduct(productId, title, description, imageUrl));
  //   } else {
  //     if (title && description && price && imageUrl) {
  //       dispatch(
  //         createProduct(title, description, imageUrl, parseFloat(price))
  //       );
  //     }
  //   }
  //   navigation.goBack();
  // };

  useEffect(() => {
    navigation.setParams({ submit: onSubmit });
  }, [onSubmit]);

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={(text) => setImageUrl(text)}
          />
        </View>
        {editedProduct ? null : (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={(text) => setPrice(text)}
            />
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  formControl: {
    width: "100%",
  },
  label: {
    fontFamily: "open-sans-bold",
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
});

export default EditProductScreen;
