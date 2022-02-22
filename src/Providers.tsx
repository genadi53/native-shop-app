import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { ProductStack } from "./navigation/ProductsNavigator";
import { ShopDrawer } from "./navigation/ShopNavigator";
import { store } from "./store/rootReducer";

interface ProvidersProps {}

export const Providers: React.FC<ProvidersProps> = ({}) => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <ShopDrawer />
      </Provider>
    </NavigationContainer>
  );
};
