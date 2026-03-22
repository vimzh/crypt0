import { useCallback } from "react";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import {
  IBMPlexMono_400Regular,
  IBMPlexMono_500Medium,
  IBMPlexMono_600SemiBold,
} from "@expo-google-fonts/ibm-plex-mono";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";

import { RootNavigator } from "./navigation/RootNavigator";

import "./global.css";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    IBMPlexMono_400Regular,
    IBMPlexMono_500Medium,
    IBMPlexMono_600SemiBold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <View className="flex-1" onLayout={onLayoutRootView}>
        <NavigationContainer
          theme={{
            dark: true,
            colors: {
              primary: "#804FB0",
              background: "#000000",
              card: "#000000",
              text: "#FFFFFF",
              border: "#000000",
              notification: "#804FB0",
            },
            fonts: {
              regular: { fontFamily: "IBMPlexMono_400Regular", fontWeight: "400" },
              medium: { fontFamily: "IBMPlexMono_500Medium", fontWeight: "500" },
              bold: { fontFamily: "IBMPlexMono_600SemiBold", fontWeight: "600" },
              heavy: { fontFamily: "IBMPlexMono_600SemiBold", fontWeight: "700" },
            },
          }}
        >
          <RootNavigator />
        </NavigationContainer>
      </View>
    </SafeAreaProvider>
  );
}
