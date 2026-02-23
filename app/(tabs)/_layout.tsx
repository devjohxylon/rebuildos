import React from "react";
import { Tabs } from "expo-router";
import { View, Text } from "react-native";
import { Home, Search, Heart, ChefHat } from "lucide-react-native";
import { COLORS } from "@/constants/theme";

interface TabIconProps {
  icon: React.ReactNode;
  label: string;
  focused: boolean;
}

function TabIcon({ icon, label, focused }: TabIconProps) {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 8,
        gap: 2,
      }}
    >
      <View
        style={{
          width: 44,
          height: 32,
          borderRadius: 16,
          backgroundColor: focused ? COLORS.hotpink + "25" : "transparent",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </View>
      <Text
        style={{
          fontSize: 10,
          fontWeight: focused ? "700" : "500",
          color: focused ? COLORS.hotpink : COLORS.gray,
        }}
      >
        {label}
      </Text>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.bgCard,
          borderTopWidth: 0,
          height: 85,
          paddingBottom: 20,
          shadowColor: COLORS.hotpink,
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.15,
          shadowRadius: 16,
          elevation: 8,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          position: "absolute",
        },
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={
                <Home
                  size={22}
                  color={focused ? COLORS.hotpink : COLORS.gray}
                  fill={focused ? COLORS.hotpink : "transparent"}
                />
              }
              label="Home"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={
                <Search
                  size={22}
                  color={focused ? COLORS.hotpink : COLORS.gray}
                />
              }
              label="Explore"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={
                <Heart
                  size={22}
                  color={focused ? COLORS.hotpink : COLORS.gray}
                  fill={focused ? COLORS.hotpink : "transparent"}
                />
              }
              label="Favorites"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={
                <ChefHat
                  size={22}
                  color={focused ? COLORS.hotpink : COLORS.gray}
                />
              }
              label="Me"
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}
