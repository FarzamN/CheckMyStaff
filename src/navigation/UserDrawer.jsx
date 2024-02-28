import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerContainer from '../screens/DrawerContainer';
import Profile from '../screens/User/Home/Profile';
import AccountSetting from '../screens/User/Home/AccountSetting';
import Security from '../screens/User/Home/Security';
import {NavigationContainer,useIsFocused} from '@react-navigation/native';
import UserNavigation from './UserNavigation';
import {Font} from '../utils/font';
import {Color} from '../utils/Color';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Home from '../screens/User/Home/Home';
import verify from '../screens/User/Home/Verify';
import Search from '../screens/User/Home/Search';
import SearchResult from '../screens/User/Home/SearchResult';
import IncidentReport from '../screens/User/Home/IncidentReport';
import ReportIncident from '../screens/User/Home/ReportIncident';
import PerformanceHistory from '../screens/User/Home/PerformanceHistory';
import Rating from '../screens/User/Home/Rating';
import RatingFeedBack from '../screens/User/Home/RatingFeedBack';

import UpdateBasicInfo from '../screens/User/Home/UpdateBasicInfo';
import UpdateJobInfo from '../screens/User/Home/UpdateJobInfo';
import UpdateAssigment from '../screens/User/Home/UpdateAssigment';
import Agency from '../screens/User/Home/Agency';
import ViewAll from '../screens/User/Home/ViewAll';
import AddAgency from '../screens/User/Home/AddAgency';
import AddEmployeeInformation from '../screens/User/Home/AddEmployeeInformation';
import Logs from '../screens/User/Logs/Logs';
import Balance from '../screens/User/BalanceFolder/Balance';
import Term from '../screens/authentication/Term';
import Payment from '../screens/User/PaymentFolder/Payment';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const UserDrawer = () => {
  const Drawer = createDrawerNavigator();
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
          drawerActiveTintColor: Color.DarkGrey,
          drawerActiveBackgroundColor: '#ECE5EF',
          drawerInactiveTintColor: Color.DarkGrey,
          drawerInactiveBackgroundColor: Color.White,
          drawerLabelStyle: {
            marginLeft: -15,
            // fontFamily: Font.Poppins600,
            // color: Color.Black,
            fontFamily: Font.Poppins500,
            fontSize: 14,
          },
        }}
        initialRouteName="home1"
        drawerContent={props => <DrawerContainer {...props}/>}>
        <Drawer.Screen
          name="home1"
          component={UserNavigation}
          options={({ color, size, focused }) => ({
            drawerItemStyle: { display: 'none' },
            title: 'Home',
            drawerIcon: () => (
              <AntDesign name="home" size={20} color={'black'} />
            ),
          })}
        />
        {/* <Drawer.Screen
          name="newHome"
          component={AllDashboard}
          options={{
            // drawerItemStyle: { display: 'none' },
            title: 'Home',
            drawerIcon: () => (
              <AntDesign name="home" size={20} color={Color.DarkGrey} />
            ),
          }}
        /> */}
        <Drawer.Screen
          options={({ color, size, focused }) =>  ({
            title: 'Profile',
            drawerIcon: ({ color, size }) => (
              <AntDesign name="user" size={20} color={color} />
            ),
          })}
          name="Profile"
          component={Profile}
        />
        <Drawer.Screen
          name="accountsetting"
          component={AccountSetting}
          options={{
            title: 'Account Setting',
            drawerIcon: () => (
              <Feather name="settings" size={20} color={Color.DarkGrey} />
            ),
          }}
        />
        <Drawer.Screen
          name="security"
          component={Security}
          options={{
            title: 'Security',
            drawerIcon: () => (
              <Feather name="lock" size={20} color={Color.DarkGrey} />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default UserDrawer;

const Stack = createNativeStackNavigator();

function AllDashboard() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, animation: 'slide_from_right'}}
      initialRouteName="home">
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="verify" component={verify} />
      <Stack.Screen name="view_all" component={ViewAll} />
      <Stack.Screen name="search" component={Search} />
      <Stack.Screen name="SearchResult" component={SearchResult} />
      <Stack.Screen name="incidentReport" component={IncidentReport} />
      <Stack.Screen name="reportIncident" component={ReportIncident} />
      <Stack.Screen name="performanceHistory" component={PerformanceHistory} />
      <Stack.Screen name="rating" component={Rating} />
      <Stack.Screen name="ratingFeedBack" component={RatingFeedBack} />
      <Stack.Screen name="updatebasicinfo" component={UpdateBasicInfo} />
      <Stack.Screen name="updatejobinfo" component={UpdateJobInfo} />
      <Stack.Screen name="updateassigment" component={UpdateAssigment} />
      <Stack.Screen name="agency" component={Agency} />
      <Stack.Screen name="addagency" component={AddAgency} />
      <Stack.Screen name="balance" component={Balance} />
      <Stack.Screen name="Term" component={Term} />
      <Stack.Screen name="payment" component={Payment} />
      <Stack.Screen
        name="addEmployeeInformation"
        component={AddEmployeeInformation}
      />
    </Stack.Navigator>
  );
}