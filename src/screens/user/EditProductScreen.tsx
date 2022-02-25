import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useReducer,
} from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Product from "../../models/product";
import { UserstackNavProps } from "../../navigation/UsersParamList";
import { updateProduct } from "../../store/actions/productActions";
import { ProductState } from "../../store/reducers/productReducer";
import { formReducer, FormState, FORM_UPDATE } from "./formReducer";

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
  const initialState: FormState = {
    inputValues: {
      title: editedProduct ? editedProduct.title : "",
      imageUrl: editedProduct ? editedProduct.imageUrl : "",
      description: editedProduct ? editedProduct.description : "",
      price: "",
    },
    inputValuesValidity: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: editedProduct ? true : false,
    },
    isFormValid: editedProduct ? true : false,
  };
  const [formState, dispatchFormState] = useReducer(formReducer, initialState);

  const onSubmit = useCallback(() => {
    if (!formState.isFormValid) {
      // alert("Wrong")
      Alert.alert("Wrong Input", "Check the errors in the form.", [
        { text: "Ok", style: "default" },
      ]);
      return;
    }
    if (editedProduct) {
      dispatch(
        updateProduct(
          productId,
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.imageUrl
        )
      );
    }
    navigation.goBack();
  }, [dispatch, productId, formState]);

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

  const textChangeHandler = (text: string, inputIdentifier: any) => {
    let isValid = false;
    if (text.trim().length > 0) {
      isValid = true;
    }
    dispatchFormState({
      type: FORM_UPDATE,
      payload: { value: text, isValid, input: inputIdentifier },
    });
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.title}
            onChangeText={(text) => {
              textChangeHandler(text, "title");
            }}
            keyboardType="default"
            autoCorrect={false}
            returnKeyType="next"
          />
          {!formState.inputValuesValidity.title && (
            <Text>Enter a valid title!</Text>
          )}
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.imageUrl}
            onChangeText={(text) => {
              textChangeHandler(text, "imageUrl");
            }}
            returnKeyType="next"
          />
        </View>
        {editedProduct ? null : (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={formState.inputValues.price}
              onChangeText={(text) => {
                textChangeHandler(text, "price");
              }}
              keyboardType="decimal-pad"
              returnKeyType="next"
            />
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.description}
            onChangeText={(text) => {
              textChangeHandler(text, "description");
            }}
            returnKeyType="done"
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
