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
  KeyboardAvoidingView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Input from "../../components/Input";
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

  const textChangeHandler = useCallback(
    (inputIdentifier: string, text: string, inputValidity: boolean) => {
      dispatchFormState({
        type: FORM_UPDATE,
        payload: {
          input: inputIdentifier,
          isValid: inputValidity,
          value: text,
        },
      });
    },
    [dispatchFormState]
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={100}
    >
      <ScrollView>
        <View style={styles.form}>
          <Input
            id="title"
            label="Title"
            errorText="Please enter a valid title!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            onInputChange={textChangeHandler}
            initialValue={editedProduct ? editedProduct.title : ""}
            initiallyValid={!!editedProduct}
            required
          />
          <Input
            id="imageUrl"
            label="Image Url"
            errorText="Please enter a valid image url!"
            keyboardType="default"
            returnKeyType="next"
            onInputChange={textChangeHandler}
            initialValue={editedProduct ? editedProduct.imageUrl : ""}
            initiallyValid={!!editedProduct}
            required
          />
          {editedProduct ? null : (
            <Input
              id="price"
              label="Price"
              errorText="Please enter a valid price!"
              keyboardType="decimal-pad"
              returnKeyType="next"
              onInputChange={textChangeHandler}
              required
              min={0.1}
            />
          )}
          <Input
            id="description"
            label="Description"
            errorText="Please enter a valid description!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            multiline
            numberOfLines={3}
            onInputChange={textChangeHandler}
            initialValue={editedProduct ? editedProduct.description : ""}
            initiallyValid={!!editedProduct}
            required
            minLength={5}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
