import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import Splash from '../screens/authentication/Splash';
import Login from '../screens/authentication/Login';
import Reset from '../screens/authentication/Reset';
import FindAccount from '../screens/authentication/FindAccount';
import AccountType from '../screens/authentication/AccountType';
import CompanyDetails from '../screens/authentication/CompanyDetails';
import WorkDetails from '../screens/authentication/WorkDetails';
import Term from '../screens/authentication/Term';
import SecurityDetails from '../screens/authentication/SecurityDetails';
import ChangePassword from '../screens/authentication/ChangePassword';

const AuthNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false, animation: 'slide_from_right'}}
        initialRouteName="Splash">
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="reset" component={Reset} />
        <Stack.Screen name="find_account" component={FindAccount} />
        <Stack.Screen name="AccountType" component={AccountType} />
        <Stack.Screen name="CompanyDetails" component={CompanyDetails} />
        <Stack.Screen name="WorkDetails" component={WorkDetails} />
        <Stack.Screen name="SecurityDetails" component={SecurityDetails} />
        <Stack.Screen name="change_password" component={ChangePassword} />
        <Stack.Screen name="Term" component={Term} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthNavigator;
