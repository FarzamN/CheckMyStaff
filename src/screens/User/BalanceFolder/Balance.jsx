import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Pressable,
  FlatList,
  Platform,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {GlobalStyle} from '../../../Constants/GlobalStyle';
import Header from '../../../components/Header/Header';
import {useFocusEffect} from '@react-navigation/native';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';
import Entypo from 'react-native-vector-icons/Entypo';
import {Color} from '../../../utils/Color';
import {Font} from '../../../utils/font';
import CustomButton from '../../../components/CustomButton';
import EmptyList from '../../../components/Cards/EmptyList';
import {BalanceData} from '../../../Constants/Data';
import BalanceCard from '../../../components/Cards/BalanceCard';
import VerificationModal from '../../../components/Modal/VerificationModal';
import KeyValue from '../../../components/Cards/KeyValue';
import BalanceModal from '../../../components/Modal/BalanceModal';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import { getPaymentHistoryApi } from '../../../redux/actions/UserActions';

const Balance = ({navigation,scrollViewRef}) => {
  const dispatch = useDispatch()
  const get_paymenthistory_data = useSelector(
    state => state.get_paymenthistory_data,
  );
  const user_detail = useSelector(state => state.user_detail);
  const paymenthistory_loader = useSelector(state => state.paymenthistory_loader);

  const [code, setCode] = useState(false);
  const [Value, setValue] = useState(false);
  const [TopUp, setTopUp] = useState(false);
  const [index, setIndex] = useState(9);
  const [number, setNumber] = useState(1000);

  const [modalData, setModalData] = useState({});
  const [verificationDate, setVerifacationDate] = useState(new Date());

  const [filterData, setFilterData] = useState('newest_to_oldest');
  const [showFilterData, setShowFilterData] = useState(false);

  const [refreshing, setRefreshing] = useState(false);

  // useEffect(() => {
  //   dispatch(getPaymentHistoryApi('newest_to_oldest'));
  // },[])

  const handleCode = () => {
    setCode(!code);
  };
  const handleSort = () => {
    setShowFilterData(!showFilterData);
  };
  const handlePlus = () => {
    setIndex(1);
    setNumber(number + 1000);
  };
  const handleMinus = () => {
    setIndex(2);
    if (number === 1000) {
      setNumber(1000);
    } else {
      setNumber(number - 1000);
    }
  };

  useFocusEffect(
    useCallback(() => {
      navigation.getParent()?.setOptions({
        tabBarStyle: GlobalStyle.HideBar,
      });
    }, []),
  );

  const handleDate = elm => {
    const dateSep = moment(elm?.PaymentDate, 'YYYY-MM-DD HH:mm:ss');
    const newSeparated = dateSep.format('DD/MM/YYYY');

    setVerifacationDate(newSeparated);
    setModalData(elm);
    setValue(true);
  };

  const handleFIilter = name => {
    setFilterData(name);
    setShowFilterData(!showFilterData);
    dispatch(getPaymentHistoryApi(name));
    // dispatch(
    //   getDashboardData(rows, sortSata, name, setLoader, setRows, setLoader2),
    // );
  };


  const handleRefresh = () => {
    setRefreshing(true);
    dispatch(getPaymentHistoryApi('newest_to_oldest'));
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);

  }

  console.log('get_paymenthistory_data?.data', get_paymenthistory_data)
  return (
    <SafeAreaView style={GlobalStyle.container}>
      <Header title="Balance " gapp />
      <View style={GlobalStyle.grey_container}>
        <View style={GlobalStyle.Padding}>
          {/* <ScrollView showsVerticalScrollIndicator={false}> */}
          <View style={styles.BalanceBox}>
            <View style={styles.Row}>
              <View>
                <Text style={styles.text}>Balance</Text>
                <Text style={styles.Number}>
                  {code ?  	'₦‎ ' + user_detail?.Account_Bal : '••••••'}
                </Text>
              </View>
              <Pressable
                onPress={handleCode}
                android_ripple={GlobalStyle.PurpleRipple}>
                <Entypo
                  name={code ? 'eye' : 'eye-with-line'}
                  color={Color.MidGrey}
                  size={scale(20)}
                />
              </Pressable>
            </View>
            <CustomButton
              onPress={() => setTopUp(true)}
              title="Top Up"
              ButtonStyle={styles.Btn}
              Ripple={GlobalStyle.WhiteRipple}
            />
          </View>
{
  get_paymenthistory_data?.data?.length > 0 ?
          <View style={[styles.Row, {marginTop: verticalScale(15)}]}>
            <Text style={styles.Transaction}>
              Transaction{' '}
              <Text
                style={{
                  color: '#71788A',
                  fontFamily: Font.Inter500,
                  fontSize: 14,
                }}>
                ({get_paymenthistory_data?.data?.length})
              </Text>
            </Text>

            <Pressable
              android_ripple={GlobalStyle.PurpleRipple}
              onPress={handleSort}
              style={GlobalStyle.Row}>
              <Text style={styles.stored}>Sort by </Text>
              <Entypo name="chevron-down" size={scale(17)} color={Color.Main} />
            </Pressable>
          </View>
: null
}
        </View>
        {showFilterData && (
          <View
            style={[
              styles.MianBxo,
              {
                marginLeft: '40%',
              },
            ]}>
                       {/* <View style={styles.MianBxo}> */}
            <Pressable
              onPress={() => handleFIilter('alphabetical')}
              style={{overflow: 'hidden'}}
              android_ripple={GlobalStyle.PurpleRipple}>
              <Text style={styles.label}>Alphabetical</Text>
            </Pressable>
            <Pressable
              onPress={() => handleFIilter('newest_to_oldest')}
              style={{overflow: 'hidden'}}
              android_ripple={GlobalStyle.PurpleRipple}>
              <Text style={styles.label}>Newest to oldest</Text>
            </Pressable>
            <Pressable
              onPress={() => handleFIilter('oldest_to_newest')}
              style={{overflow: 'hidden'}}
              android_ripple={GlobalStyle.PurpleRipple}>
              <Text style={styles.label}>Oldest to newest</Text>
            </Pressable>
          {/* </View> */}
            {/* <Pressable
              onPress={() => handleFIilter('desc')}
              style={{overflow: 'hidden'}}
              android_ripple={GlobalStyle.PurpleRipple}>
              <Text style={styles.label}>Descripton</Text>
            </Pressable> */}
          </View>
        )}
        {
          paymenthistory_loader ?
          <View
                style={{
                  height: 200,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ActivityIndicator size={'large'} color={Color.Main} />
              </View>
               :
        <FlatList
        ref={scrollViewRef}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
          showsVerticalScrollIndicator={false}
          data={get_paymenthistory_data?.data}
          keyExtractor={item => item.id.toString()}
          ListEmptyComponent={() => (
            <EmptyList
              Heading="Empty records"
              SubHeading="You haven't made any transaction yet."
              image={require('../../../assets/image/emptyRecords.png')}
              isImage
              marginTop="25%"
            />
          )}
          renderItem={({item}) => {
            return <BalanceCard data={item} onPress={() => handleDate(item)} />;
          }}
        />
        }
      </View>
      <VerificationModal
        newModalStyle={{
          flex: modalData?.Email && modalData?.First_Name ? 0.5 : 0.5,
        }}
        Head
        Heading="Transaction Detail"
        btn
        title="Close"
        visible={Value}
        textStyle={{color: Color.Main}}
        ButtonStyle={GlobalStyle.ReverseBtn}
        onPress={() => setValue(false)}
        onClose={() => setValue(false)}>
        <View style={GlobalStyle.KeyValueContainer}>
          {modalData?.First_Name && (
            <KeyValue
              keys="Name"
              value={
                modalData?.First_Name
                  ? modalData?.First_Name + ' ' + modalData?.Last_Name
                  : null
              }
            />
          )}

          {modalData?.Email && (
            <KeyValue keys="Email" value={modalData?.Email} />
          )}

          <KeyValue keys="Order number" value={modalData?.OrderNumber} />
          <KeyValue keys="Payment" value={verificationDate} />
          <KeyValue keys="Amount" value={'N' + modalData?.AmountPaid} />
        </View>
      </VerificationModal>
      <BalanceModal
           newModalStyle={{
            flex: 0.6 ,
          }}
          newStylee={{
            top: 25
          }}
        visible={TopUp}
        onClose={() => setTopUp(false)}
        onPlus={handlePlus}
        onMinus={handleMinus}
        index={index}
        number={number}
        onPress={() =>(
          navigation.navigate('payment', {
            amount: number,
          }),
          setTopUp(false)
        )}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  BalanceBox: {
    backgroundColor: '#EFE9F1',
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginTop: 20,
  },
  text: {
    color: '#71788A',
    fontFamily: Font.Inter400,
    fontSize: 14,
    marginBottom: 10,
  },
  MianBxo: {
    marginLeft: 10,
    width: '45%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
    position: 'absolute',
    top: '35%',
    backgroundColor: Color.White,
    zIndex: 99,
  },
  label: {
    color: Color.Black,
    fontSize: 14,
    paddingVertical: 5,
  },
  Number: {
    color: '#22293B',
    // textDecorationLine: 'underline',
    fontFamily: Font.Inter500,
    fontSize: 20,
  },
  Row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  Btn: {height: 40, marginTop: 20, width: '100%'},
  Transaction: {
    color: '#22293B',
    fontFamily: Font.Inter500,
    fontSize: 14,
  },
  stored: {
    color: Color.Main,
    fontFamily: Font.Inter500,
    fontSize: 12,
  },
});

export default Balance;
