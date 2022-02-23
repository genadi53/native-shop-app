import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

export type EditProductParamList = {
  EditProduct: {
    id: string;
  };
};

export type UsersNavigatorParamList = {
  UserProducts: undefined;
} & EditProductParamList;

export type UserstackNavProps<T extends keyof UsersNavigatorParamList> = {
  navigation: StackNavigationProp<UsersNavigatorParamList, T>;
  route: RouteProp<UsersNavigatorParamList, T>;
};
