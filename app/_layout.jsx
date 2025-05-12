import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { store } from "../store/index"
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { loadTheme } from '@/store/slices/themeSlice';
import 'react-native-reanimated';
import NetInfo from '@react-native-community/netinfo';
import { Provider } from 'react-redux';
import { View, Text, StyleSheet, } from 'react-native';
import NoInternetScreen from "../components/errorsScreens/NoInternetScreen"
export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
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

  return <RootLayoutNav />;
}



function RootLayoutNav() {
  const [isOnline, setIsOnline] = useState(null);

  const checkConnection = async () => {
    try {
      const state = await NetInfo.fetch();
      setIsOnline(state.isConnected);
    } catch (error) {
      setIsOnline(false);
    }
  };
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOnline(state.isConnected);
    });
    checkConnection();
    return () => unsubscribe();
  }, []);

  if (isOnline === null) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Checking the connection...</Text>
      </View>
    );
  }

  if (isOnline) {

    return (
      <Provider store={store}>
        <NoInternetScreen onRetry={checkConnection} />
      </Provider>

    )
  }


  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="characterInfo" options={{ headerShown: false }} />
      </Stack>
    </Provider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});