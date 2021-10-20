import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from './screen/Login';
import Register from './screen/Register';
import Create from "./screen/Create";
import Edit from "./screen/Edit";
import store from './stores';
import DonasiSaya from './screen/DonasiSaya';
import HomePage from './screen/DonationList';
import ReportForm from './screen/ReportForm'
import DetailPage from './screen/Detail';
import HistoryTransaction from './screen/HistoryTransaction';

export default function App() {

  const Stack = createNativeStackNavigator()
  
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Create" component={Create} options={{ headerStyle: { backgroundColor: '#3DB2FF' }, headerTitleStyle: { color: 'white' }}} />
          <Stack.Screen name="Donasi Saya" component={DonasiSaya} options={{ headerStyle: { backgroundColor: '#3DB2FF' }, headerTitleStyle: { color: 'white' }}} />
          <Stack.Screen name="HomePage" component={HomePage} options={{ headerShown: false }}/>
          <Stack.Screen name="ReportForm" component={ReportForm} />
          <Stack.Screen 
            name="Detail" 
            component={DetailPage}
            options={({route}) => ({
              headerBackTitleVisible: false,
              headerTitle: false,
              headerTransparent: true,
              headerTintColor: '#fff'
            })}
          />
          <Stack.Screen name="History Transaction" component={HistoryTransaction} options={{ headerStyle: { backgroundColor: '#3DB2FF' }, headerTitleStyle: { color: 'white' }}} />
          <Stack.Screen name="Edit" component={Edit} />
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
