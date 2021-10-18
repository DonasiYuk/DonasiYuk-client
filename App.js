import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from './screen/Login';
import Register from './screen/Register';
import Create from "./screen/Create";
import Edit from "./screen/Edit";
import store from './stores';
import DonasiSaya from './screen/DonasiSaya';
import DonationList from './screen/DonationList';
import ReportForm from './screen/ReportForm'
import DetailPage from './screen/Detail';

export default function App() {

  const Stack = createNativeStackNavigator()
  
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Create" component={Create} />
          <Stack.Screen name="Edit" component={Edit} />
          <Stack.Screen name="DonasiSaya" component={DonasiSaya} />
          <Stack.Screen name="ListDonasi" component={DonationList}/>
          <Stack.Screen name="ReportForm" component={ReportForm} />
          <Stack.Screen name="DetaiPage" component={DetailPage}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
