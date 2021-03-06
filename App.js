import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import UserInputScreen from './components/UserInputScreen'
import GestureSpinnerWheel from './components/GestureSpinnerWheel'
import WinnerScreen from './components/WinnerScreen'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore } from 'redux'
import reducer from './reducers'
import middleware from './middleware'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset'

const Stack = createStackNavigator();
const MainNav = () => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen
      name="User Input Screen"
      component={UserInputScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Gesture Spinner Wheel"
      component={GestureSpinnerWheel}
    />
    <Stack.Screen
      name="Winner Screen"
      component={WinnerScreen}
      options={{ gestureEnabled: false }}
    />
  </Stack.Navigator>
);

export default class App extends React.Component {
  state = {
    isReady: false,
  }
  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._cacheResourcesAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }

    return (
      <Provider store={createStore(reducer, composeWithDevTools(middleware))}>
        <NavigationContainer>
          <MainNav />
          <StatusBar style="auto" />
        </NavigationContainer>
      </Provider>
    );
  }

  async _cacheResourcesAsync() {
    const images = [require('./assets/images/splashscreen.png')];

    const cacheImages = images.map(image => {
      return Asset.fromModule(image).downloadAsync();
    });
    return Promise.all(cacheImages);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
