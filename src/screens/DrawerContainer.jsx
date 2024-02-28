import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  View,
  Platform,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {scale, verticalScale} from 'react-native-size-matters';
import {GlobalStyle} from '../Constants/GlobalStyle';
import {Color} from '../utils/Color';
import {Font} from '../utils/font';
import LogoutModal from '../components/Modal/LogoutModal';
import {useDispatch, useSelector} from 'react-redux';
import {DRAWER_COLOR, GET_DASHBOARD_DATA, GET_EMPLOYEEPRO_DATA, GET_EMPLOYEE_INCIDENTREP, GET_EMPLOYEE_PERFORMANCE, GET_LOGHISTORY_DATA, GET_NEW_DASHBOARD_DATA, GET_PAYMENTHISTORY_DATA, SEARCH_HISTORY_DATA, USER_DETAIL} from '../redux/reducer/Holder';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation,useIsFocused } from '@react-navigation/native';



const DrawerContainer = (props) => {

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user_detail = useSelector(state => state.user_detail);
  const drawer_color = useSelector(state => state.drawer_color);


  const [logout, setLogout] = useState(false);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user_detail');
    dispatch({type: USER_DETAIL, payload: null});
    dispatch({
      type: GET_DASHBOARD_DATA,
      payload: null,
    });

    dispatch({type: GET_NEW_DASHBOARD_DATA, payload: []});
    dispatch({type: GET_EMPLOYEEPRO_DATA, payload: []});
    dispatch({type: GET_EMPLOYEE_INCIDENTREP, payload: []});
    dispatch({type: GET_EMPLOYEE_PERFORMANCE, payload: {}});
    dispatch({type: GET_LOGHISTORY_DATA, payload: {}});
    dispatch({type: GET_PAYMENTHISTORY_DATA, payload: {}});
    dispatch({
      type: SEARCH_HISTORY_DATA,
      payload: [],
    });
  };
  // console.log('user_detail', user_detail);
  return (
    <SafeAreaView style={GlobalStyle.container}>
      <View style={GlobalStyle.Padding}>
        {/* <Image
          source={require('../assets/image/dp.jpg')}
          style={styles.sideMenuProfileIcon}
        /> */}
        <View
          style={{
            width: scale(60),
            height: scale(60),
            backgroundColor: 'white',
            borderRadius: 100,
            overflow: 'hidden',
          }}>
          <Image
            resizeMode="contain"
            style={{
              height: '100%',
              width: '100%',
            }}
            source={require('../assets/image/logo.png')}
          />
        </View>
        <Text style={styles.name}>
          {user_detail.First_Name} {user_detail?.Last_Name}
        </Text>
        <Text style={styles.email}>{user_detail?.Email}</Text>
      </View>
      {Platform.OS == 'android' ? <View style={styles.Line} /> : null}
      <DrawerContentScrollView {...props}>

        
      <DrawerItem
      
          style={{  backgroundColor: drawer_color ?  '#ECE5EF' : Color.White}}
          icon={() => (
            <AntDesign name="home" size={20} color={Color.DarkGrey} />
          )}
          labelStyle={{
            // color: Color.DarkGrey,
            marginLeft: -15,
            color: Color.Black,
            fontFamily: Font.Poppins500,
            fontSize: 14,
          }}
          label="Home"
          onPress={() => (dispatch({ type:DRAWER_COLOR, payload: true }), navigation.navigate('home'))}
        />



        <DrawerItemList {...props} />
        <DrawerItem
          style={{backgroundColor:Color.White}}
          icon={() => (
            <Feather color={Color.DarkGrey} size={20} name="log-out" />
          )}
          labelStyle={{
            // color: Color.DarkGrey,
            marginLeft: -15,
            color: Color.Black,
            fontFamily: Font.Poppins500,
            fontSize: 14,
          }}
          label="Log Out"
          onPress={() => setLogout(true)}
        />
      </DrawerContentScrollView>
      <LogoutModal
        visible={logout}
        onClose={() => setLogout(false)}
        Logout={handleLogout}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    width: 60,
    height: 60,
    marginTop: 20,
    borderRadius: 100,
  },
  name: {
    color: Color.Black,
    fontFamily: Font.Poppins500,
    fontSize: 14,
    marginTop: 10,
  },
  email: {
    color: Color.MidGrey,
    fontFamily: Font.Poppins500,
    fontSize: 12,
  },
  Line: {
    borderWidth: 1,
    borderColor: Color.LightGrey,
    marginTop: 10,
  },
});

export default DrawerContainer;


