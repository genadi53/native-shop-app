import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { ProductStack } from "./navigation/ProductsNavigator";
import { store } from "./store/rootReducer";

interface ProvidersProps {}

export const Providers: React.FC<ProvidersProps> = ({}) => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <ProductStack />
      </Provider>
    </NavigationContainer>
  );
};
