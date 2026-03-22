import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { ActivitiesStackNavigator } from "./ActivitiesStackNavigator";
import { WalletStackNavigator } from "./WalletStackNavigator";
import { BrowserStackNavigator } from "./BrowserStackNavigator";
import { ClockIcon, WalletIcon, GlobeIcon } from "../components/TabBarIcons";

import type { MainTabParamList } from "./types";

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="WalletTab"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "black",
          borderTopWidth: 0,
          paddingTop: 8,
          height: 80,
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "rgba(255,255,255,0.3)",
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="ActivitiesTab"
        component={ActivitiesStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <ClockIcon size={28} opacity={focused ? 1 : 0.3} />
          ),
        }}
      />
      <Tab.Screen
        name="WalletTab"
        component={WalletStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <WalletIcon size={28} opacity={focused ? 1 : 0.3} />
          ),
        }}
      />
      <Tab.Screen
        name="BrowserTab"
        component={BrowserStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <GlobeIcon size={28} opacity={focused ? 1 : 0.3} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
