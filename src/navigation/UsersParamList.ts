import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

export type ProductParamList = {
  EditProduct: {
    id: string;
    title: string;
    submit: Function; //React.MutableRefObject<() => void>;
  };
  CreateProduct: {
    submit: Function; //React.MutableRefObject<() => void>;
  };
};

export type UsersNavigatorParamList = {
  UserProducts: undefined;
} & ProductParamList;

export type UserstackNavProps<T extends keyof UsersNavigatorParamList> = {
  navigation: StackNavigationProp<UsersNavigatorParamList, T>;
  route: RouteProp<UsersNavigatorParamList, T>;
};
