import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { useSelector } from 'react-redux';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props ) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const theme=useSelector((state)=>state.theme.mode);
  return (
    <Tabs
      screenOptions={{
         tabBarActiveTintColor: theme === "dark" ? "#fff" : "#000",
        tabBarInactiveTintColor: theme === "dark" ? "#888" : "#666",
        headerShown: useClientOnlyValue(false, true),
        tabBarStyle: {
          height:55,
          backgroundColor: theme === "dark" ? "#000" : "#fff",
          borderTopColor: theme === "dark" ? "#333" : "#ddd",
        },

      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Main',
          headerShown:false,
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          headerShown:false,
          title: 'Settings',
          tabBarIcon: ({ color }) => <TabBarIcon name="gear" color={color} />,
        }}
      />
    </Tabs>
  );
}
