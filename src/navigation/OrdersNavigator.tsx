import { createStackNavigator } from "@react-navigation/stack";
import { Platform } from "react-native";
import { HeaderButton } from "../components/HederButton";
import { CustomColors } from "../constants/customColors";
import { OrdersNavigatorParamList } from "./OrdersParamList";
import OrdersScreen from "../screens/shop/OrdersScreen";

const OrdersNavigator = createStackNavigator<OrdersNavigatorParamList>();

export const OrdersStack: React.FC = ({}) => {
  return (
    <OrdersNavigator.Navigator
      initialRouteName="Orders"
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
              navigation.openDrawer();
            }}
          />
        ),
      })}
    >
      <OrdersNavigator.Screen name="Orders" component={OrdersScreen} />
    </OrdersNavigator.Navigator>
  );
};
