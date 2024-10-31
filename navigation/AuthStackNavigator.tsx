import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './types';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

const Stack = createStackNavigator<RootStackParamList>();

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: '로그인' }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ title: '회원가입' }} />
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;