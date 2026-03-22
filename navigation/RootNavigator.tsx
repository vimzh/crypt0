import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { OnboardingNavigator } from "./OnboardingNavigator";
import { MainTabNavigator } from "./MainTabNavigator";
import { WalletSwitcher } from "../screens/settings/WalletSwitcher";
import { GasSettings } from "../screens/send/GasSettings";
import { SendConfirm } from "../screens/send/SendConfirm";
import { SendNFTConfirm } from "../screens/send/SendNFTConfirm";
import { SwapConfirm } from "../screens/swap/SwapConfirm";
import { BridgeConfirm } from "../screens/swap/BridgeConfirm";
import { TokenApproval } from "../screens/send/TokenApproval";
import { WalletConnect } from "../screens/settings/WalletConnect";
import { SignMessage } from "../screens/send/SignMessage";

import type { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={OnboardingNavigator} />
      <Stack.Screen name="Main" component={MainTabNavigator} />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="WalletSwitcher" component={WalletSwitcher} />
        <Stack.Screen name="GasSettings" component={GasSettings} />
        <Stack.Screen name="SendConfirm" component={SendConfirm} />
        <Stack.Screen name="SendNFTConfirm" component={SendNFTConfirm} />
        <Stack.Screen name="SwapConfirm" component={SwapConfirm} />
        <Stack.Screen name="BridgeConfirm" component={BridgeConfirm} />
        <Stack.Screen name="TokenApproval" component={TokenApproval} />
        <Stack.Screen name="WalletConnect" component={WalletConnect} />
        <Stack.Screen name="SignMessage" component={SignMessage} />
      </Stack.Group>
    </Stack.Navigator>
  );
};
