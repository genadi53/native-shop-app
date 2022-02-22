import { Platform } from "react-native";
import { HeaderButton } from "../components/HederButton";
import { CustomColors } from "../constants/customColors";
import { OrdersNavigatorParamList } from "./OrdersParamList";
import OrdersScreen from "../screens/shop/OrdersScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { ProductStack } from "./ProductsNavigator";
import { OrdersStack } from "./OrdersNavigator";

const ShopNavigator = createDrawerNavigator();

export type ShopDrawerParamList = {
  Products: undefined;
  Order: undefined;
  Admin: undefined;
};

export const ShopDrawer: React.FC = ({}) => {
  return (
    <ShopNavigator.Navigator screenOptions={{ header: () => null }}>
      <ShopNavigator.Screen name="Products" component={ProductStack} />
      <ShopNavigator.Screen name="Order" component={OrdersStack} />
    </ShopNavigator.Navigator>
  );
};
