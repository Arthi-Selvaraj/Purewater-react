import { Tabs } from 'expo-router';
import React from 'react';
import { Image } from 'react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconPath;

          switch (route.name) {
            case 'home':
              iconPath = require('../../assets/icons/home-icon.png');
              break;
            case 'product':
              iconPath = require('../../assets/icons/product-icon.png');
              break;
            case 'cart':
              iconPath = require('../../assets/icons/cart-icon.png');
              break;
            case 'profile':
              iconPath = require('../../assets/icons/profile-icon.png');
              break;
            default:
              iconPath = require('../../assets/icons/home-icon.png');
          }

          return (
            <Image
              source={iconPath}
              style={{
                width: 22,
                height: 22,
                tintColor: focused ? '#007BFF' : '#999',
              }}
              resizeMode="contain"
            />
          );
        },
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#007BFF',
        tabBarInactiveTintColor: '#999',
        headerShown: false,
      })}
    >
      <Tabs.Screen name="home" options={{ title: 'Home' }} />
      <Tabs.Screen name="product" options={{ title: 'Products' }} />
      <Tabs.Screen name="cart" options={{ title: 'Cart' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  );
}
