import { Platform } from "react-native";
import { CustomColors } from "../constants/customColors";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { ProductStack } from "./ProductsNavigator";
import { OrdersStack } from "./OrdersNavigator";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { UsersStack } from "./UserNavigator";

const ShopNavigator = createDrawerNavigator();

export type ShopDrawerParamList = {
  Products: undefined;
  Order: undefined;
  Users: undefined;
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
          title: "Orders",
          drawerIcon: ({ color }) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-list" : "ios-list"}
              size={23}
              color={color}
            />
          ),
        }}
      />
      <ShopNavigator.Screen
        name="Users"
        component={UsersStack}
        options={{
          drawerIcon: ({ color }) => (
            <FontAwesome5 name="user-tag" size={20} color={color} />
          ),
        }}
      />
    </ShopNavigator.Navigator>
  );
};
