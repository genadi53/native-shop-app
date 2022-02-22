import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

export type OrdersNavigatorParamList = {
  Orders: undefined;
};

export type OrderStackNavProps<T extends keyof OrdersNavigatorParamList> = {
  navigation: StackNavigationProp<OrdersNavigatorParamList, T>;
  route: RouteProp<OrdersNavigatorParamList, T>;
};
