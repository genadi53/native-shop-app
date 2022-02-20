import { createStackNavigator } from "@react-navigation/stack";
import { Platform } from "react-native";
import { CustomColors } from "../constants/customColors";
import ProductOverviewScreen from "../screens/shop/ProductOverviewScreen";
import { ProductsNavigatorParamList } from "./ProductsParamList";

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
    </ProductsNavigator.Navigator>
  );
};
