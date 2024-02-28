import React, {useState, useCallback, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Platform,
} from 'react-native';
import {
  moderateVerticalScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';
import {GlobalStyle} from '../../../Constants/GlobalStyle';
import {Color} from '../../../utils/Color';
import Header from '../../../components/Header/Header';
import * as Anime from 'react-native-animatable';

import {Font} from '../../../utils/font';
import HomeCard from '../../../components/Cards/HomeCard';
import RegisterationCard from '../../../components/Cards/RegisterationCard';
import EmptyList from '../../../components/Cards/EmptyList';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Entypo from 'react-native-vector-icons/Entypo';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import TopupModal from '../../../components/Modal/TopupModal';
import Feather from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';
import {
  getDashboardData,
  getEmployeIncidentRep,
  getEmployePerformnce,
  getPaymentHistoryApi,
  getUserDetailss,
  userSearchHistory,
  verificationHistoryApi,
} from '../../../redux/actions/UserActions';
import {DRAWER_COLOR, GET_EMPLOYEEPRO_DATA, GET_EMPLOYEE_INCIDENTREP, GET_EMPLOYEE_PERFORMANCE, SEARCH_DETAIL_LOADER} from '../../../redux/reducer/Holder';
// import {dashboard_member} from '../../../redux/actions/UserActions';
import { useIsFocused } from '@react-navigation/native';

const Home = () => {
  const dispatch = useDispatch();
  const scrollViewRef = useRef();
  const navigation = useNavigation();
  const user_detail = useSelector(state => state.user_detail);
  // const get_dashboard_data = useSelector(state => state.get_dashboard_data);
  const get_dashboard_data = useSelector(state => state.get_new_dashboard_data);
  const sortHomeData = get_dashboard_data?.data?.slice(0, 4);

  const isFocused = useIsFocused();

  const [refreshing, setRefreshing] = useState(false);
  const [topupModal, setTopupModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [loader2, setLoader2] = useState(false);
  const [loader21, setLoader21] = useState(false);
  const [rows, setRows] = useState(10);
  const verified = user_detail?.identity_verified == 0;

  const onAdd = () => {
    if (verified) {
      navigation.navigate('verify', {method: 'verify'});
    } else {
      navigation.navigate('verify', {method: 'AddEmp'});
    }
  };

  useEffect(() => {
    dispatch({ type:DRAWER_COLOR, payload: isFocused })
  
  }, [isFocused])
  
  

  useFocusEffect(
    useCallback(() => {
      navigation.getParent()?.setOptions({
        tabBarStyle: GlobalStyle.showBar,
      });
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
      dispatch(getPaymentHistoryApi('newest_to_oldest'));
      dispatch({type: SEARCH_DETAIL_LOADER, payload: true});
      dispatch({type: GET_EMPLOYEEPRO_DATA, payload: []});
      dispatch({type: GET_EMPLOYEE_INCIDENTREP, payload: []});
      dispatch({type: GET_EMPLOYEE_PERFORMANCE, payload: {}});
   
      setTimeout(() => {
        dispatch(
          verificationHistoryApi('newest_to_oldest', '', 'pass', setLoader21),
        );
        dispatch(userSearchHistory());
        dispatch(getUserDetailss());
      }, 2000);
  
    }, []),
  );
// console.log('user_detail?.bvn', user_detail)
  const handlenavData = elm => {
    dispatch(getEmployePerformnce(elm?.id));
    dispatch(getEmployeIncidentRep(elm?.id));
    dispatch({type: GET_EMPLOYEEPRO_DATA, payload: elm});
    // setTimeout(() => {
      navigation.navigate('SearchResult', {
        type: 'detail',
        data: elm,
        newType: 'new',
      });
    // }, 1000);
  };

  const HomeData = [
    {
      id: 1,
      number: user_detail?.Account_Bal ? user_detail?.Account_Bal : 0,
      title: 'Account balance',
      color: ['#A2799C', '#8879AD'],
      type: 'balance',
      nav: 'balance',
    },
    {
      id: 2,
      number: user_detail?.no_of_employees ? user_detail?.no_of_employees : 0,
      title: 'Total Employee',
      color: ['#566145', '#543631'],
      type: 'total',
      nav: 'view_all',
    },
    {
      id: 3,
      number: user_detail?.no_of_verifications ? user_detail?.no_of_verifications : 0,
      title: 'BVN',
      color: ['#474E5C', '#474E5C'],
      type: 'nin',
      nav: 'alllogs',
    },
  ];


  const handleRefresh = () => {
    setRefreshing(true);
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
    dispatch(getPaymentHistoryApi('newest_to_oldest'));

      dispatch(
        verificationHistoryApi('newest_to_oldest', '', 'pass', setLoader21),
      );
      dispatch(userSearchHistory());
      dispatch(getUserDetailss());
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);

  }

  return (
    <SafeAreaView style={GlobalStyle.grey_container}>
      <StatusBar backgroundColor={Color.white} barStyle="dark-content" />
      <Header title="CheckMyStaff" search menu />
      <ScrollView 
               ref={scrollViewRef}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
      nestedScrollEnabled showsVerticalScrollIndicator={false}>
        {user_detail?.identity_verified == 0 && (
          <Anime.View
            duration={2000}
            animation="tada"
            iterationDelay={1000}
            style={GlobalStyle.Padding}>
            <Pressable
              onPress={onAdd}
              android_ripple={GlobalStyle.PurpleRipple}
              style={[GlobalStyle.Row, styles.errorContainer]}>
              <Feather
                name="alert-octagon"
                style={{marginRight: scale(7)}}
                color="#B43839"
                size={scale(20)}
              />
              <Text style={styles.ErrorText}>
                Click to verify your{' '}
                <Text style={styles.IDENTITY}>IDENTITY</Text> now
              </Text>
            </Pressable>
          </Anime.View>
        )}

        <FlatList
          horizontal
 
          data={HomeData}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          ListHeaderComponent={() => {
            return <View style={GlobalStyle.Space} />;
          }}
          renderItem={({item}) => {
            return <HomeCard data={item} />;
          }}
        />
        {get_dashboard_data?.data?.length > 0 && (
          <View
            style={[
              GlobalStyle.Row,
              {
                justifyContent: 'space-between',
                marginVertical: verticalScale(8),
              },
            ]}>
            <Text
              style={{
                fontFamily: Font.Inter600,
                fontSize: 16,
                paddingLeft: 20,
                color: Color.Black,
              }}>
              Employees ({get_dashboard_data?.data?.length})
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('view_all')}
              style={GlobalStyle.Row}>
              <Text
                style={[
                  GlobalStyle.HomeCountHeading,
                  {color: Color.Main, paddingHorizontal: 0},
                ]}>
                View all
              </Text>
              <Entypo
                name="chevron-right"
                size={scale(20)}
                color={Color.Main}
              />
            </TouchableOpacity>
          </View>
        )}

        <FlatList
          nestedScrollEnabled
          scrollEnabled={false}
          data={get_dashboard_data?.data}
          ListEmptyComponent={() => {
            return loader ? (
              <View
                style={{
                  height: 200,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ActivityIndicator size={'large'} color={Color.Main} />
              </View>
            ) : (
              <EmptyList
                Heading="Empty records"
                SubHeading="You haven’t added any employee yet."
                marginTop="20%"
                isImage
              />
            );
          }}
          renderItem={({item}) => {
            return (
              <RegisterationCard
                data={item}
                Search
                // onPress={() =>
                //   navigation.navigate('SearchResult', {
                //     type: 'detail',
                //     data: item,
                //     newType: 'new',
                //   })
                // }
                onPress={() => handlenavData(item)}
              />
            );
          }}
        />

        <View style={{height: 60}} />
      </ScrollView>
      <Pressable
        disabled={verified}
        onPress={onAdd}
        android_ripple={
          verified ? GlobalStyle.PurpleRipple : GlobalStyle.WhiteRipple
        }
        style={[
          GlobalStyle.PlusBox,
          {
            backgroundColor: verified ? '#CFD0D4' : Color.Main,
            bottom: Platform.OS == 'android' ? 70 : 90,
          },
        ]}>
        <FontAwesome6 name="plus" size={scale(20)} color={Color.LightGrey} />
      </Pressable>
      <TopupModal
        visible={topupModal}
        onClose={() => setTopupModal(false)}
        onBtnPress={() => navigation.navigate('payment_method')}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  errorContainer: {
    backgroundColor: '#F9EAEA',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: moderateVerticalScale(12),
    marginTop: verticalScale(10),
    borderRadius: scale(10),
    overflow: 'hidden',
  },
  ErrorText: {
    color: Color.Black,
    fontFamily: Font.Gilroy500,
    fontSize: scale(14),
  },
  IDENTITY: {
    color: Color.red,
  },
});

export default Home;
