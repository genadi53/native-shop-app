import { createStackNavigator } from "@react-navigation/stack";
import { Platform } from "react-native";
import { HeaderButton } from "../components/HederButton";
import { CustomColors } from "../constants/customColors";
import CartScreen from "../screens/shop/CartScreen";
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
      screenOptions={({ navigation }) => ({
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
            onPress={() => {
              navigation.navigate("CartScreen");
            }}
          />
        ),
        headerLeft: () => (
          <HeaderButton
            name={Platform.OS === "android" ? "md-menu" : "ios-menu"}
            onPress={() => {
              navigation.toggleDrawer();
            }}
          />
        ),
      })}
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
          headerTitle: `${route.params.title}`,
        })}
        component={ProductDetailsScreen}
      />
      <ProductsNavigator.Screen
        name="CartScreen"
        options={({ route }: ProductStackNavProps<"CartScreen">) => ({
          headerTitle: "Cart",
          // headerBackTitle: "All Products",
        })}
        component={CartScreen}
      />
    </ProductsNavigator.Navigator>
  );
};
