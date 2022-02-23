import { createStackNavigator } from "@react-navigation/stack";
import { Platform } from "react-native";
import { HeaderButton } from "../components/HederButton";
import { CustomColors } from "../constants/customColors";
import EditProductScreen from "../screens/user/EditProductScreen";
import UserProductsScreen from "../screens/user/UserProductsScreen";
import { UsersNavigatorParamList, UserstackNavProps } from "./UsersParamList";

const UsersNavigator = createStackNavigator<UsersNavigatorParamList>();

export const UsersStack: React.FC = ({}) => {
  return (
    <UsersNavigator.Navigator
      initialRouteName="UserProducts"
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
            name={Platform.OS === "android" ? "md-create" : "ios-create"}
            onPress={() => {
              navigation.navigate("EditProduct");
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
      <UsersNavigator.Screen
        name="UserProducts"
        options={{
          title: "Your Products",
        }}
        component={UserProductsScreen}
      />

      <UsersNavigator.Screen
        name="EditProduct"
        // options={({ route }: UserstackNavProps<"EditProduct">) => ({
        //   headerTitle: `Edit Product: ${route.params.id}`,
        // })}
        component={EditProductScreen as any}
      />
    </UsersNavigator.Navigator>
  );
};
