import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import LoadingScreen from "./screens/LoadingScreen";
import HomeScreen from "./screens/HomeScreen";
import ShirtsScreen from "./screens/ShirtsScreen";
import PantsScreen from "./screens/PantsScreen";
import ShoesScreen from "./screens/ShoesScreen";
import SuccessScreen from "./screens/SuccessScreen";
import store from "./redux/store";

store.dispatch({ type: "app/start" });
const Stack = createNativeStackNavigator();

const screens = [
  {
    name: "loading",
    component: LoadingScreen,
    options: { headerShown: false },
  },
  {
    name: "home",
    component: HomeScreen,
    options: { headerShown: false },
  },
  {
    name: "shirts",
    component: ShirtsScreen,
    options: { headerShown: false },
  },
  {
    name: "pants",
    component: PantsScreen,
    options: { headerShown: false },
  },
  {
    name: "shoes",
    component: ShoesScreen,
    options: { headerShown: false },
  },
  {
    name: "success",
    component: SuccessScreen,
    options: { headerShown: false },
  },
];

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar translucent style="dark" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="loading">
          {screens.map((screen) => (
            <Stack.Screen
              key={screen.name}
              name={screen.name}
              component={screen.component}
              options={screen.options}
            />
          ))}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
