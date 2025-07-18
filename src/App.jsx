import React from 'react';
import { StatusBar, StyleSheet, useColorScheme, TouchableOpacity, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/Home/HomeScreen';
import SignInScreen from './screens/Auth/SignInScreen';
import SignUpScreen from './screens/Auth/SignUpScreen';
import ProductDetailsScreen from './screens/Product/ProductDetailsScreen';
import CartScreen from './screens/Cart/CartScreen';
import { CartProvider } from './context/CartContext';
import OrderHistoryScreen from './screens/Order/OrderHistoryScreen';

const Stack = createStackNavigator();

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const barStyle = isDarkMode ? 'light-content' : 'dark-content';
  const backgroundColor = isDarkMode ? '#000' : '#fff';

  return (
    <SafeAreaProvider>
      <CartProvider>
        <SafeAreaView style={[styles.container, { backgroundColor }]}>
          <StatusBar barStyle={barStyle} backgroundColor={backgroundColor} />

          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="SignIn"
              screenOptions={({ navigation }) => ({
                headerStyle: { backgroundColor },
                headerTintColor: isDarkMode ? '#fff' : '#000'
              })}
            >
              <Stack.Screen name="SignIn" component={SignInScreen} options={{ title: 'Sign In' }} />
              <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: 'Sign Up' }} />
              <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
              <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} options={{ title: 'Product Details' }} />
              <Stack.Screen name="Cart" component={CartScreen} options={{ title: 'Your Cart' }} />
              <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} options={{ title: 'Order History' }} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </CartProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 }
});