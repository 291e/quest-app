import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStackNavigator from './navigation/MainStackNavigator';
import { Provider } from 'react-redux';
import store from './store/store';
import { RootStackParamList } from './navigation/types';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (

    <Provider store={store}>
    <NavigationContainer>
      <MainStackNavigator />
    </NavigationContainer>
    </Provider>
  );
};

export default App;
