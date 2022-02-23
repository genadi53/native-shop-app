import { Platform } from "react-native";
import { HeaderButton } from "../components/HederButton";
import { CustomColors } from "../constants/customColors";
import { OrdersNavigatorParamList } from "./OrdersParamList";
import OrdersScreen from "../screens/shop/OrdersScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { ProductStack } from "./ProductsNavigator";
import { OrdersStack } from "./OrdersNavigator";
import { Ionicons } from "@expo/vector-icons";

const ShopNavigator = createDrawerNavigator();

export type ShopDrawerParamList = {
  Products: undefined;
  Order: undefined;
  Admin: undefined;
};

export const ShopDrawer: React.FC = ({}) => {
  return (
    <ShopNavigator.Navigator
      screenOptions={{
        header: () => null,
        drawerActiveTintColor: CustomColors.primary,
      }}
    >
      <ShopNavigator.Screen
        name="Products"
        component={ProductStack}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
              size={23}
              color={color}
            />
          ),
        }}
      />
      <ShopNavigator.Screen
        name="Order"
        component={OrdersStack}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-list" : "ios-list"}
              size={23}
              color={color}
            />
          ),
        }}
      />
    </ShopNavigator.Navigator>
  );
};
