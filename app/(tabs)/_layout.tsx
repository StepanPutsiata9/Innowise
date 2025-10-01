import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { useSelector } from "react-redux";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { RootState } from "@/store/store";
import { StyleProp, TextStyle } from "react-native";
import { useTheme } from "@/features/theme";

type TabBarIconProps = {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
  style?: StyleProp<TextStyle>;
};

function TabBarIcon({ ...props }: TabBarIconProps) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

interface TabIconProps {
  color: string;
  focused: boolean;
  size: number;
}

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.tabActiveColor,
        tabBarInactiveTintColor: colors.tabInactiveColor,
        headerShown: false,
        tabBarStyle: {
          height: 55 + insets.bottom,
          backgroundColor: colors.backgroundColor,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Main",
          headerShown: false,
          tabBarIcon: ({ color }: TabIconProps) => (
            <TabBarIcon name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          headerShown: false,
          title: "Settings",
          tabBarIcon: ({ color }: TabIconProps) => (
            <TabBarIcon name="gear" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
