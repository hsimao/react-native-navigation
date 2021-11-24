import React, { useState, useEffect, useMemo, useLayoutEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AuthContext } from './src/context';

import {
  SignIn,
  CreateAccount,
  Search,
  Search2,
  Profile,
  Home,
  Details,
  Splash,
} from './src/screens';

// NOTE: 要做出登入登出時有轉場效果, 需要將 auth group, app group 包裝在同一個層級內
const RootStack = createNativeStackNavigator();
const RootStackScreen = ({ userToken }) => (
  <RootStack.Navigator screenOptions={{ headerShown: false }}>
    {userToken ? (
      <RootStack.Screen name="App" component={AppDrawerScreen} />
    ) : (
      <RootStack.Screen name="Auth" component={AuthStackScreen} />
    )}
  </RootStack.Navigator>
);

// RootStack => AppDrawer
// NOTE: 因為 AppDrawerScreen 在跟 AuthScreen 切換時, Drawer Header 不能隱藏, 否者轉場效果會有閃跳問題
// 這邊將透過隱藏子層 header, 並更新父層 header title 來解決此問題
const AppDrawer = createDrawerNavigator();
const AppDrawerScreen = () => (
  <AppDrawer.Navigator
    initialRouteName="AppProfile"
    screenOptions={{ headerLeft: () => null }}
  >
    {/* 因為只有首次切換登入時會有此問題, 第一個看到的 screen Profile 需要特別處理即可, 其他 screen 可直接隱藏 header */}
    <AppDrawer.Screen
      name="AppHome"
      component={TabsNavigator}
      options={{ headerShown: false, title: 'Home' }}
    />
    <AppDrawer.Screen
      name="AppProfile"
      component={ProfileStackScreen}
      options={{ title: 'Profile' }}
    />
  </AppDrawer.Navigator>
);

// RootStack => AuthStackScreen
const AuthStack = createNativeStackNavigator();
const AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      name="SignIn"
      component={SignIn}
      options={{ title: 'Sign In' }}
    />
    <AuthStack.Screen
      name="CreateAccount"
      component={CreateAccount}
      options={{ title: 'Create Account' }}
    />
  </AuthStack.Navigator>
);

// RootStack => AppDrawer => TabsNavigator => HomeStackScreen
const HomeStack = createNativeStackNavigator();
const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen
      name="AppHomeScreen"
      component={Home}
      options={{ title: 'Home' }}
    />
    <HomeStack.Screen
      name="AppHomeDetailsScreen"
      component={Details}
      options={({ route }) => ({
        // 依據 navigation push 傳的 params 來設置導航 title
        title: route.params?.name,
      })}
    />
  </HomeStack.Navigator>
);

// RootStack => AppDrawer => TabsNavigator => SearchStackScreen
const SearchStack = createNativeStackNavigator();
const SearchStackScreen = () => (
  <SearchStack.Navigator>
    <SearchStack.Screen
      name="AppSearchScreen"
      component={Search}
      options={{ title: 'Search' }}
    />
    <SearchStack.Screen
      name="AppSearchScreen2"
      component={Search2}
      options={{ title: 'Search2' }}
    />
  </SearchStack.Navigator>
);

// RootStack => AppDrawer => ProfileStackScreen
const ProfileStack = createNativeStackNavigator();
const ProfileStackScreen = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen name="AppProfileScreen" component={Profile} />
  </ProfileStack.Navigator>
);

// RootStack => AppDrawer => TabsNavigator
const Tabs = createBottomTabNavigator();
const TabsNavigator = () => (
  <Tabs.Navigator
    screenOptions={{
      tabBarIcon: () => null,
      headerShown: false,
    }}
  >
    <Tabs.Screen
      name="AppHomeTab"
      component={HomeStackScreen}
      options={{ title: 'Home' }}
    />
    <Tabs.Screen
      name="AppSearchTab"
      component={SearchStackScreen}
      options={{ title: 'Search' }}
    />
  </Tabs.Navigator>
);

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  const authContext = useMemo(() => {
    return {
      signIn: () => {
        setIsLoading(false);
        setUserToken('1234');
      },
      signUp: () => {
        setIsLoading(false);
        setUserToken('1234');
      },
      signOut: () => {
        setIsLoading(false);
        setUserToken(null);
      },
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return <Splash />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <RootStackScreen userToken={userToken} />
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
