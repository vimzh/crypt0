import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { BrowserHome } from "../screens/browser/BrowserHome";
import { BrowserWebView } from "../screens/browser/BrowserWebView";
import { BrowserTabs } from "../screens/browser/BrowserTabs";

import type { BrowserStackParamList } from "./types";

const Stack = createNativeStackNavigator<BrowserStackParamList>();

export const BrowserStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BrowserHome" component={BrowserHome} />
      <Stack.Screen name="BrowserWebView" component={BrowserWebView} />
      <Stack.Screen name="BrowserTabs" component={BrowserTabs} />
    </Stack.Navigator>
  );
};
