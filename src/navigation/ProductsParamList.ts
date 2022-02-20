import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

export type ProductsNavigatorParamList = {
  ProductOverview: undefined;
};

export type ProductStackNavProps<T extends keyof ProductsNavigatorParamList> = {
  navigation: StackNavigationProp<ProductsNavigatorParamList, T>;
  route: RouteProp<ProductsNavigatorParamList, T>;
};
