import React, { useCallback, useEffect, useReducer, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import Input from "../../components/Input";
import { CustomColors } from "../../constants/customColors";
import { UserstackNavProps } from "../../navigation/UsersParamList";
import { createProduct } from "../../store/actions/productActions";
import { formReducer, FormState, FORM_UPDATE } from "./formReducer";

const CreateProductScreen = ({
  navigation,
  route,
}: UserstackNavProps<"CreateProduct">) => {
  const dispatch = useDispatch();
  const initialState: FormState = {
    inputValues: {
      title: "",
      imageUrl: "",
      description: "",
      price: "",
    },
    inputValuesValidity: {
      title: false,
      imageUrl: false,
      description: false,
      price: false,
    },
    isFormValid: false,
  };
  const [formState, dispatchFormState] = useReducer(formReducer, initialState);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const onSubmit = useCallback(() => {
    if (!formState.isFormValid) {
      // alert("Wrong")
      Alert.alert("Wrong Input", "Check the errors in the form.", [
        { text: "Ok", style: "default" },
      ]);
      return;
    }
    setIsLoading(true);
    try {
      dispatch(
        createProduct(
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.imageUrl,
          parseFloat(formState.inputValues.price)
        )
      );
    } catch (err: any) {
      setError(err.message);
    }

    setIsLoading(false);
    navigation.goBack();
  }, [dispatch, formState]);

  useEffect(() => {
    if (error) {
      Alert.alert("An error occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

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

  if (isLoading) {
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={CustomColors.primary} />
    </View>;
  }

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
            initialValue={""}
            initiallyValid={false}
            required
          />
          <Input
            id="imageUrl"
            label="Image Url"
            errorText="Please enter a valid image url!"
            keyboardType="default"
            returnKeyType="next"
            onInputChange={textChangeHandler}
            initialValue={""}
            initiallyValid={false}
            required
          />

          <Input
            id="price"
            label="Price"
            errorText="Please enter a valid price!"
            keyboardType="decimal-pad"
            returnKeyType="next"
            onInputChange={textChangeHandler}
            required
            initialValue={"0"}
            initiallyValid={false}
            min={0.1}
          />

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
            initialValue={""}
            initiallyValid={false}
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
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CreateProductScreen;
