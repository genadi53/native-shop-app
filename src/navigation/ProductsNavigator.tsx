import { createStackNavigator } from "@react-navigation/stack";
import { Platform } from "react-native";
import { Button } from "react-native-paper";
import { HeaderButton } from "../components/shop/HederButton";
import { CustomColors } from "../constants/customColors";
import ProductDetailsScreen from "../screens/shop/ProductDetailsScreen";
import ProductOverviewScreen from "../screens/shop/ProductOverviewScreen";
import {
  ProductsNavigatorParamList,
  ProductStackNavProps,
} from "./ProductsParamList";

const ProductsNavigator = createStackNavigator<ProductsNavigatorParamList>();

interface ProductStackProps {}

export const ProductStack: React.FC<ProductStackProps> = ({}) => {
  return (
    <ProductsNavigator.Navigator
      initialRouteName="ProductOverview"
      screenOptions={{
        headerStyle: {
          backgroundColor:
            Platform.OS === "android" ? CustomColors.primary : "",
        },
        headerTintColor:
          Platform.OS === "android" ? "white" : CustomColors.primary,
        headerTitleStyle: {
          fontFamily: "open-sans-bold",
        },
        headerBackTitleStyle: {
          fontFamily: "open-sans",
        },
        headerRight: () => (
          <HeaderButton
            name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
            onPress={() => {}}
          />
        ),
      }}
    >
      <ProductsNavigator.Screen
        name="ProductOverview"
        options={{
          // header: () => null
          headerTitle: "All Products",
        }}
        component={ProductOverviewScreen}
      />
      <ProductsNavigator.Screen
        name="ProductDetails"
        options={({ route }: ProductStackNavProps<"ProductDetails">) => ({
          headerTitle: `Product: ${route.params.id}`,
        })}
        component={ProductDetailsScreen}
      />
    </ProductsNavigator.Navigator>
  );
};
