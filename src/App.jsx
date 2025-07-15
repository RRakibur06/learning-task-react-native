import React from 'react';
import { StatusBar, StyleSheet, useColorScheme } from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView
} from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/Home/HomeScreen';
import Practice from './screens/Practice/Practice';
import PracticeTwo from './screens/Practice/PracticeTwo';
import PracticeThree from './screens/Practice/PracticeThree';
import SignInScreen from './screens/Auth/SignInScreen';
import SignUpScreen from './screens/Auth/SignUpScreen';
import ProductDetailsScreen from './screens/Product/ProductDetailsScreen';

const Stack = createStackNavigator();

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const barStyle = isDarkMode ? 'light-content' : 'dark-content';
  const backgroundColor = isDarkMode ? '#000' : '#fff';

  return (
    <SafeAreaProvider>
      {/* SafeAreaView now uses your styles */}
      <SafeAreaView style={[styles.container, { backgroundColor }]}>
        <StatusBar
          barStyle={barStyle}
          backgroundColor={backgroundColor}
        />

        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="SignIn"
            screenOptions={{
              headerStyle: { backgroundColor },
              headerTintColor: isDarkMode ? '#fff' : '#000'
            }}
          >
            <Stack.Screen
              name="SignIn"
              component={SignInScreen}
              options={{ title: 'Sign In' }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUpScreen}
              options={{ title: 'Sign Up' }}
            />

            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ProductDetails"
              component={ProductDetailsScreen}
              options={{ title: 'Product Details' }}
            />

            <Stack.Screen
              name="Practice"
              component={Practice}
              options={{ title: 'Practice Screen One' }}
            />
            <Stack.Screen
              name="PracticeTwo"
              component={PracticeTwo}
              options={{ title: 'Practice Screen Two' }}
            />
            <Stack.Screen
              name="PracticeThree"
              component={PracticeThree}
              options={{ title: 'Practice Screen Three' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});