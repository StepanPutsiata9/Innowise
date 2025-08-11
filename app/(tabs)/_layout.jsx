import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { useSelector } from 'react-redux';
import {useSafeAreaInsets} from "react-native-safe-area-context"
// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const theme = useSelector((state) => state.theme.mode);
   const insets = useSafeAreaInsets();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme === "dark" ? "#fff" : "#000",
        tabBarInactiveTintColor: theme === "dark" ? "#888" : "#666",
        headerShown: false,
        tabBarStyle: {
          height: 45+insets.bottom,
          backgroundColor: theme === "dark" ? "#000" : "#fff",
          borderTopColor: theme === "dark" ? "#333" : "#ddd",
          
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Main',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,

        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          headerShown: false,
          title: 'Settings',
          tabBarIcon: ({ color }) => <TabBarIcon name="gear" color={color} />,
        }}
      />
    </Tabs>
  );
}
