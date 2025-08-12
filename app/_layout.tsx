import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { RootState, store } from "../store/index";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { loadTheme } from "@/store/slices/themeSlice";
import "react-native-reanimated";
import NetInfo from "@react-native-community/netinfo";
import { Provider, useSelector } from "react-redux";
import { View, Text, StyleSheet } from "react-native";
import NoInternetScreen from "../components/errorsScreens/NoInternetScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    loadTheme();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <RootLayoutNav />
    </>
  );
}

function RootLayoutNav() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <AppNavigation />
      </SafeAreaProvider>
    </Provider>
  );
}

import { useDispatch } from "react-redux";
import { setOfflineMode } from "../store/slices/charactersSlice";

function AppNavigation() {
  const dispatch = useDispatch();
  const { isOfflineMode } = useSelector((state: RootState) => state.characters);
  const [isOnline, setIsOnline] = useState<boolean | null>(null);

  const checkConnection = async () => {
    try {
      const state = await NetInfo.fetch();
      setIsOnline(state.isConnected);
      if (state.isConnected) {
        dispatch(setOfflineMode(false));
      }
    } catch (error) {
      setIsOnline(false);
    }
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOnline(state.isConnected);
      if (state.isConnected) {
        dispatch(setOfflineMode(false));
      }
    });
    checkConnection();
    return () => unsubscribe();
  }, [dispatch]);
  if (isOnline === null) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Checking connection...</Text>
      </View>
    );
  }
  if (!isOnline && !isOfflineMode) {
    return <NoInternetScreen onRetry={checkConnection} />;
  }

  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="characterInfo" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
