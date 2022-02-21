import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { ProductDetailsParamList } from "./ProductParamList";

export type ProductsNavigatorParamList = {
  ProductOverview: undefined;
  // ProductDetails: undefined;
  CartScreen: undefined;
} & ProductDetailsParamList;

export type ProductStackNavProps<T extends keyof ProductsNavigatorParamList> = {
  navigation: StackNavigationProp<ProductsNavigatorParamList, T>;
  route: RouteProp<ProductsNavigatorParamList, T>;
};
