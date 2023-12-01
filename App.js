import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import AccountScreen from "./src/screens/AccountScreen";
import SigninScreen from "./src/screens/SigninScreen";
import SignupScreen from "./src/screens/SignupScreen";
import ScanScreen from "./src/screens/ScanScreen";
import GymDetailScreen from "./src/screens/GymDetailScreen";
import HomeScreen from "./src/screens/HomeScreen";
import ResolveAuthScreen from "./src/screens/ResolveAuthScreen";
import { Provider as AuthProvider } from "./src/context/AuthContext";
import { Provider as SessionProvider } from "./src/context/SessionContext";
import { Provider as GymProvider } from "./src/context/GymContext";
import { Provider as WalletProvider } from "./src/context/WalletContext";
import { setNavigator } from "./src/navigationRef";
import AdminPanel from "./src/screens/AdminPanel";
import BookSlotScreen from "./src/screens/BookSlotScreen";
import WalletScreen from "./src/screens/WalletScreen";

const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,
  loginFlow: createStackNavigator({
    Signup: SignupScreen,
    Signin: SigninScreen
  }),
  mainFlow: createMaterialBottomTabNavigator({
    GymFlow: createStackNavigator({
      HomeScreen: HomeScreen,
      GymDetail: GymDetailScreen,
      AdminPanel: AdminPanel,
      BookSlot: BookSlotScreen,
      Wallet: WalletScreen 
    }),
    ScanScreen: ScanScreen,
    Account: AccountScreen
  })
});

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <GymProvider>
      <SessionProvider>
        <AuthProvider>
          <WalletProvider>
            <App ref={(navigator) => setNavigator(navigator)}/>
          </WalletProvider>
        </AuthProvider>
      </SessionProvider>
    </GymProvider>
  )
}
