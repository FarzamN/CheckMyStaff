import React from 'react';
import {StyleSheet, Image, View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {scale, verticalScale} from 'react-native-size-matters';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
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
import {Color} from '../utils/Color';
import { Font } from '../utils/font';

const UserNavigation = () => {
  const Tab = createBottomTabNavigator();
  return (
    // <NavigationContainer>
    <Tab.Navigator
      initialRouteName="dashboard"
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        headerShown: false,
        // tabBarStyle: {
        //   backgroundColor: Color.White,
        //   height: verticalScale(60),
        // },
      }}>
      <Tab.Screen
        name="dashboard"
        component={AllDashboard}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.ImageBox}>
              <Image
                style={styles.Image}
                source={
                  focused
                    ? require('../assets/image/navigator/homeactive.png')
                    : require('../assets/image/navigator/homedeactive.png')
                }
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="alllogs"
        component={AllLogs}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.ImageBox}>
              <Image
                style={styles.Image}
                source={
                  focused
                    ? require('../assets/image/navigator/logactive.png')
                    : require('../assets/image/navigator/logdeactive.png')
                }
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="allsearch"
        component={AllSearch}
        options={{
          tabBarIcon: ({focused}) => (
            <>
            <View style={{
              shadowColor: '#fff',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 100,
              width: 28,
              height: 28,
              bottom:2
            }}>
              <Image
              resizeMode='cover'
                style={{
                  height:'100%',
                  width:'100%',
                }}
                source={
                  focused
                    ? require('../assets/image/navigator/searchbar.png')
                    : require('../assets/image/navigator/searchbar.png')
                }
              />
            </View>
            <Text style={{
              fontFamily: Font.Inter500,
              color: '#71788A',
              fontSize:12,
              top:3
            }}>Search</Text>
            </>
            
          ),
        }}
      />
    </Tab.Navigator>
    // source={require('')}
    // </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  Image: {
    width: scale(100),
    height: scale(100),
    resizeMode: 'contain',
  },
  ImageBox: {
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 100,
  },
});
export default UserNavigation;

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
      <Stack.Screen name="logs" component={Logs} />
      <Stack.Screen
        name="addEmployeeInformation"
        component={AddEmployeeInformation}
      />
    </Stack.Navigator>
  );
}

function AllLogs() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, animation: 'slide_from_right'}}
      initialRouteName="logs">
      <Stack.Screen name="logs" component={Logs} />
    </Stack.Navigator>
  );
}
function AllSearch() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, animation: 'slide_from_right'}}
      initialRouteName="search">
      {/* <Stack.Screen name="home" component={Home} /> */}
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