import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Activities } from "../screens/home/Activities";
import { TransactionDetails } from "../screens/home/TransactionDetails";

import type { ActivitiesStackParamList } from "./types";

const Stack = createNativeStackNavigator<ActivitiesStackParamList>();

export const ActivitiesStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Activities" component={Activities} />
      <Stack.Screen name="TransactionDetails" component={TransactionDetails} />
    </Stack.Navigator>
  );
};
