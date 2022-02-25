export type FormState = {
  inputValues: {
    title: string;
    imageUrl: string;
    description: string;
    price: string;
  };
  inputValuesValidity: {
    title: boolean;
    imageUrl: boolean;
    description: boolean;
    price: boolean;
  };
  isFormValid: boolean;
};

export const FORM_UPDATE = "reducer-update";

export const formReducer = (
  state: FormState,
  action: { type: string; payload: any }
) => {
  if (action.type === FORM_UPDATE) {
    // console.log(action.payload);
    const updatedValues = {
      ...state.inputValues,
      [action.payload.input]: action.payload.value,
    };
    // console.log(updatedValues);
    const updatedInputValuesValidity = {
      ...state.inputValuesValidity,
      [action.payload.input]: action.payload.isValid,
    };
    console.log(updatedInputValuesValidity);

    let formIsValid: boolean = true;
    for (const key in updatedInputValuesValidity) {
      // console.log("key" + key);
      // console.log(updatedInputValuesValidity[key]);
      formIsValid = formIsValid && updatedInputValuesValidity[key];
      // console.log("form" + formIsValid);
    }

    return {
      ...state,
      inputValues: updatedValues,
      inputValuesValidity: updatedInputValuesValidity,
      isFormValid: formIsValid,
    };
  } else {
    return { ...state };
  }
};
