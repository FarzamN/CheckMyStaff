import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';

import AuthNavigator from './src/navigation/AuthNavigator';
import 'react-native-gesture-handler';
import UserDrawer from './src/navigation/UserDrawer';
import SplashScreen from 'react-native-splash-screen';
import {USER_DETAIL} from './src/redux/reducer/Holder';
import {
  get_state,
  get_incidence_types,
  get_estates,
  get_estate_locations,
  get_local_government,
  get_agency,
} from './src/redux/actions/AuthActions';
import {
  getDashboardData,
  getPaymentHistoryApi,
  userSearchHistory,
} from './src/redux/actions/UserActions';

const App = () => {
  const dispatch = useDispatch();
  const user_detail = useSelector(state => state.user_detail);
  const [loader, setLoader] = useState(false);
  const [loader2, setLoader2] = useState(false);
  const [rows, setRows] = useState(10);

  useEffect(() => {
    dispatch(get_state());
    dispatch(get_local_government());
    dispatch(get_estate_locations());
    dispatch(get_estates());
    dispatch(get_incidence_types());
    dispatch(get_agency());
    dispatch(userSearchHistory());
    dispatch(getPaymentHistoryApi('newest_to_oldest'));
    dispatch(
      getDashboardData(
        10,
        'newest_to_oldest',
        'all_time',
        setLoader,
        setRows,
        setLoader2,
        'home'
      ),
    );
  }, []);

  const checkStatus = async () => {
    const data = await AsyncStorage.getItem('user_detail');
    const userData = JSON.parse(data);
    if (userData != null) {
      dispatch({type: USER_DETAIL, payload: userData});
    } else {
      Toast.show('Please login');
    }
  };

  useEffect(() => {
    checkStatus();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 3000);
  }, []);

  return <>{user_detail == null ? <AuthNavigator /> : <UserDrawer />}</>;
};

export default App;
