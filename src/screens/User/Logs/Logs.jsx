import React, {useState, FC, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Pressable,
  TouchableWithoutFeedback,
  Image,
  ActivityIndicator,
  Platform,
  Dimensions,
} from 'react-native';
import {GlobalStyle} from '../../../Constants/GlobalStyle';
import Header from '../../../components/Header/Header';
import {Color} from '../../../utils/Color';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';

import {LogHistory, LogSorts, SearchValues} from '../../../Constants/Data';
import {Font} from '../../../utils/font';
import LogsFilterItems from '../../../components/Cards/LogsFilterItems';
import FilterDropDown from '../../../components/Cards/FilterDropDown';
import EmptyList from '../../../components/Cards/EmptyList';
import Modal from 'react-native-modal';
import CustomButton from '../../../components/CustomButton';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import VerificationModal from '../../../components/Modal/VerificationModal';
import PricingValue from '../../../components/Cards/PricingValue';
import KeyValue from '../../../components/Cards/KeyValue';
import {useFocusEffect} from '@react-navigation/native';
import {verificationHistoryApi} from '../../../redux/actions/UserActions';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import { DRAWER_COLOR } from '../../../redux/reducer/Holder';

// interface LogsProps {
//   navigation: any;
// }

const SCREEN_HEIGHT = Dimensions.get('window').height;

const Logs = ({navigation}) => {
  const dispatch = useDispatch();
  const get_loghistory_data = useSelector(state => state.get_loghistory_data);

  const [selected, setSelected] = useState(null);
  const [SearchSelected, setSearchSelected] = useState(null);
  const [detail, setDetail] = useState(false);
  const [Vertify, setVertify] = useState(false);
  const [loader, setLoader] = useState(false);

  const [sortSata, setSortData] = useState('newest_to_oldest');
  const [showSortBy, setShowSortBy] = useState(false);

  const [filterData, setFilterData] = useState('');
  const [showFilterData, setShowFilterData] = useState(false);

  const [statusData, setStatusData] = useState('pass');
  const [showStatusData, setShowStatusData] = useState(false);

  const [singleData, setSignleData] = useState({});
  const [verificationDate, setVerifacationDate] = useState(new Date());

  useFocusEffect(
    useCallback(() => {
      navigation.getParent()?.setOptions({
        tabBarStyle: GlobalStyle.showBar,
      });
      dispatch({ type:DRAWER_COLOR, payload: false })
    }, []),
  );

  const handleFilterMethod = item => {
    // setSelected(item.id);
    if (item?.id == 1) {
      setShowSortBy(!showSortBy);
      setShowFilterData(false);
      setShowStatusData(false);
    } else if (item?.id == 2) {
      setShowFilterData(!showFilterData);
      setShowSortBy(false);
      setShowStatusData(false);
    } else {
      setShowSortBy(false);
      setShowFilterData(false);
      setShowStatusData(!showStatusData);
    }
  };
  const onItemPress = elm => {
    const dateSep = moment(elm?.Verify_Date, 'YYYY-MM-DD HH:mm:ss');
    const newSeparated = dateSep.format('DD/MM/YYYY');

    setVerifacationDate(newSeparated);
    setSignleData(elm);
    setDetail(true);
  };
  const onClose = () => {
    setDetail(false);
  };
  const handleSelect = item => {
    setSearchSelected(item.id);
  };

  const handleSortBy = name => {
    console.log('sortSata, name, statusData,', sortSata, name, statusData,)
    setSortData(name);
    setShowSortBy(!showSortBy);
    dispatch(verificationHistoryApi(name, filterData, statusData, setLoader));
  };
  const handleFIilter = name => {
    console.log('sortSata, name, statusData,', sortSata, name, statusData,)
    setFilterData(name);
    setShowFilterData(!showFilterData);
    dispatch(verificationHistoryApi(sortSata, name, statusData, setLoader));
  };
  const handleStatus = name => {
    console.log('sortSata, name, statusData,', sortSata, name, statusData,)
    setStatusData(name);
    setShowStatusData(!showStatusData);
    dispatch(verificationHistoryApi(sortSata, filterData, name, setLoader));
  };

  return (
    <TouchableWithoutFeedback onPress={() => setSelected(0)}>
      <SafeAreaView style={GlobalStyle.container}>
        <Header title="Log History" gapp menu />
        <View style={GlobalStyle.grey_container}>
          <View style={styles.HorizontalList}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={LogSorts}
              keyExtractor={LogSorts.id}
              renderItem={({item}) => {
                return (
                  <LogsFilterItems
                    data={item}
                    ChangeColor={selected == item.id ? Color.Main : Color.Black}
                    onPress={() => handleFilterMethod(item)}
                  />
                );
              }}
            />
          </View>
          {showSortBy && (
            <View style={styles.MianBxo}>
              <Pressable
                onPress={() => handleSortBy('alphabetical')}
                style={{overflow: 'hidden'}}
                android_ripple={GlobalStyle.PurpleRipple}>
                <Text style={styles.label}>Alphabetical</Text>
              </Pressable>
              <Pressable
                onPress={() => handleSortBy('newest_to_oldest')}
                style={{overflow: 'hidden'}}
                android_ripple={GlobalStyle.PurpleRipple}>
                <Text style={styles.label}>Newest to oldest</Text>
              </Pressable>
              <Pressable
                onPress={() => handleSortBy('oldest_to_newest')}
                style={{overflow: 'hidden'}}
                android_ripple={GlobalStyle.PurpleRipple}>
                <Text style={styles.label}>Oldest to newest</Text>
              </Pressable>
            </View>
          )}
          {showFilterData && (
            <View
              style={[
                styles.MianBxo,
                {
                  marginLeft: '22%',
                },
              ]}>
              <Pressable
                onPress={() => handleFIilter('all_time')}
                style={{overflow: 'hidden'}}
                android_ripple={GlobalStyle.PurpleRipple}>
                <Text style={styles.label}>All time</Text>
              </Pressable>
              <Pressable
                onPress={() => handleFIilter('last_week')}
                style={{overflow: 'hidden'}}
                android_ripple={GlobalStyle.PurpleRipple}>
                <Text style={styles.label}>Last Week</Text>
              </Pressable>
              <Pressable
                onPress={() => handleFIilter('this_month')}
                style={{overflow: 'hidden'}}
                android_ripple={GlobalStyle.PurpleRipple}>
                <Text style={styles.label}>This Month</Text>
              </Pressable>
              <Pressable
                onPress={() => handleFIilter('this_year')}
                style={{overflow: 'hidden'}}
                android_ripple={GlobalStyle.PurpleRipple}>
                <Text style={styles.label}>This Year</Text>
              </Pressable>
            </View>
          )}
          {showStatusData && (
            <View
              style={[
                styles.MianBxo,
                {
                  marginLeft: '50%',
                },
              ]}>
              <Pressable
                onPress={() => handleStatus('')}
                style={{overflow: 'hidden'}}
                android_ripple={GlobalStyle.PurpleRipple}>
                <Text style={styles.label}>All</Text>
              </Pressable>
              <Pressable
                onPress={() => handleStatus('pass')}
                style={{overflow: 'hidden'}}
                android_ripple={GlobalStyle.PurpleRipple}>
                <Text style={styles.label}>Pass</Text>
              </Pressable>
              <Pressable
                onPress={() => handleStatus('Failed')}
                style={{overflow: 'hidden'}}
                android_ripple={GlobalStyle.PurpleRipple}>
                <Text style={styles.label}>Fail</Text>
              </Pressable>
            </View>
          )}
          <View
            style={{
              flec: 1,
              backgroundColor: '#fafafa',
            }}>
            {loader ? (
              <View
              style={{
                height: (SCREEN_HEIGHT * 1) / 1.5,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <ActivityIndicator size={'large'} color={Color.Main} />
              </View>
            ) : (
              <FlatList
                data={get_loghistory_data?.data}
                keyExtractor={item => item.id.toString()}
                ListEmptyComponent={() => {
                  return (
                    <View
                      style={{
                        height: (SCREEN_HEIGHT * 1) / 1.5,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <EmptyList
                        Heading="Empty records"
                        SubHeading="You haven’t made any verifications yet"
                        //  marginTop="30%"
                        isImage
                      />
                    </View>
                  );
                }}
                renderItem={({item}) => {
                  // console.log('item', item);
                  const dateSep = moment(
                    item?.Verify_Date,
                    'YYYY-MM-DD HH:mm:ss',
                  );
                  const newSeparated = dateSep.format('DD/MM/YYYY');

                  const formatNumberForSecurity = number => {
                    const numberString = number?.toString();
                    const lastTwoDigits = numberString?.substring(
                      numberString.length - 3,
                    );

                    return `******* ${lastTwoDigits}`;
                  };

                  return (
                    <Pressable
                      onPress={() => onItemPress(item)}
                      android_ripple={GlobalStyle.PurpleRipple}
                      // style={[GlobalStyle.Row, styles.LogContainer]}
                      >
                      <View 
                      style={{
                        height:80,
                        backgroundColor:'white',
                        borderTopWidth: 1,
                        borderColor: Color.border,
                        flexDirection:'row'
                      }}
                      >
                        <View style={{flex:0.25,justifyContent:'center',alignItems:'center'}}>
                          <View style={{ height:60,width:60,borderRadius:100,overflow:'hidden' }}>
                          {/* <Image

                              source={{uri: item?.image}}
                              style={GlobalStyle.Image}
                            /> */}
                            {item?.image ? (
                          // <View style={styles.ImageBox}>
                            <Image
                              source={{uri: item?.image}}
                              style={GlobalStyle.Image}
                            />
                          // </View>
                        ) : (
                          <View
                            style={[
                              GlobalStyle.Image,
                              {backgroundColor: 'black',   width: 100,
                              height:100,},
                            ]}>
                            <View style={GlobalStyle.Image} />
                          </View>
                        )}
                          </View>
                        </View>
                        <View style={{flex:0.75,flexDirection:'row'}}>
                              <View style={{flex:0.65,justifyContent:'center'}}>
                              <Text
                            numberOfLines={1}
                            style={{
                              color: Color.Black,
                              fontSize: 14,
                              fontFamily: Font.Inter500,
                              // backgroundColor:'red',
                              // width:'50%',
                            }}>
                            {item?.First_Name}{' '}{item?.Last_Name}
                          </Text>
                          <Text
                            style={{
                              color: '#828898',
                              fontSize: 12,
                            }}>
                            BVN{' '}
                            {item?.BVN
                              ? formatNumberForSecurity(item?.BVN)
                              : 'not available'}
                          </Text>
                              </View>
                              <View style={{flex:0.35,paddingHorizontal:5,justifyContent:'center',alignItems:'center'}}>
                              <View
                          style={[
                            GlobalStyle.Row,
                            {
                              backgroundColor: item.status
                                ? '#E1FAEA'
                                : '#FFE3E3',
                              borderRadius: 100,
                              paddingHorizontal: 7,
                              paddingVertical: 5,
                              justifyContent:'center'
                            },
                          ]}>
                          <View
                            style={[
                              styles.Dot,
                              {
                                backgroundColor:
                                  item?.status == 'Pass'
                                    ? '#019939'
                                    : '#E12121',
                              },
                            ]}
                          />
                          <Text
                            style={[
                              styles.StatusText,
                              {
                                color:
                                  item?.status == 'Pass'
                                    ? '#016626'
                                    : '#961616',
                              },
                            ]}>
                            {item?.status == 'Pass' ? 'Successful' : 'Failed'}
                          </Text>
                        </View>
                        <Text style={styles.date}>{newSeparated}</Text>
                              </View>
                        </View>
                      </View>
                    </Pressable>
                  );
                }}
              />
            )}
          </View>
        </View>

        <VerificationModal
          visible={detail}
          newModalStyle={{
            flex: Platform.OS == 'android' ? 0.55 : 0.5,
          }}
          onClose={onClose}
          Head
          Heading="Verifications detail"
          btn
          title="Cancel"
          ButtonStyle={GlobalStyle.ReverseBtn}
          textStyle={{color: Color.Main}}
          onPress={onClose}>
          <View style={GlobalStyle.KeyValueContainer}>
            <KeyValue keys="Verification type" value={singleData?.type} />
            <KeyValue
              keys="BVN Number"
              value={singleData?.BVN ? singleData?.BVN : 'Not available'}
            />
            <KeyValue keys="Date" value={verificationDate} />
            <KeyValue keys="Payment date" value={verificationDate} />
            <KeyValue keys="Cost" value={'N' + singleData?.cost} />
            <KeyValue
              status={singleData?.status}
              newType
              keys="Status"
              value={'N' + singleData?.cost}
            />
          </View>
        </VerificationModal>
        {/* <Pressable

          onPress={() => setVertify(true)}
          android_ripple={GlobalStyle.PurpleRipple}
          style={GlobalStyle.PlusBox}>
          <FontAwesome6 name="plus" size={20} color={Color.LightGrey} />
        </Pressable> */}
        <VerificationModal
          // newModalStyle={{
          //   flex: Platform.OS == 'android' ? 0.55 : 0.45,
          // }}
          newTopStyle={-45}
          Head
          Heading="Choose your means of Searching"
          btn
          title="Continue"
          onPress={() => setVertify(false)}
          visible={Vertify}
          onClose={() => setVertify(false)}>
          <FlatList
            data={SearchValues}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <PricingValue
                onPress={() => handleSelect(item)}
                data={item}
                focus={SearchSelected == item.id}
                Dot
              />
            )}
          />
        </VerificationModal>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  HorizontalList: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 3,
    backgroundColor: Color.white,
    paddingVertical: 5,
  },
  DropDownStyle: {
    width: '40%',
    borderWidth: 0,
    elevation: 2,
  },
  dropDownContainerStyle: {
    backgroundColor: 'white',
    zIndex: 9000,
    elevation: 9000,
  },
  ImageBox: {
    width: 100,
    height:100,
    overflow: 'hidden',
    borderRadius: 100,
    marginRight: 10,
  },
  name: {
    color: Color.Black,
    fontSize: 12,
  },
  date: {
    color: Color.MidGrey,
    fontSize: 12,
    textAlign: 'right',
    fontFamily: Font.Inter400,
  },
  LogContainer: {
    paddingLeft: 20,
    paddingRight: 10,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderColor: Color.border,
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  Dot: {
    width: 8,
    aspectRatio: 1 / 1,
    borderRadius: 100,
    marginRight: 3,
  },
  StatusText: {
    fontFamily: Font.Inter500,
    fontSize: 11,
  },
  modalView: {
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    width: '100%',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    flex: 0.5,
  },
  modalStyling: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  Heading: {
    color: Color.DarkBlue,
    fontFamily: Font.Inter500,
    fontSize: 18,
    textAlign: 'center',
  },

  key: {
    color: Color.MidGrey,
    fontSize: 15,
    fontFamily: Font.Inter500,
    width: '55%',
  },
  value: {
    color: Color.Black,
    fontSize: 15,
    fontFamily: Font.Inter500,
  },
  RowContrainer: {
    paddingVertical: 10,
  },
  label: {
    color: Color.Black,
    fontSize: 14,
    paddingVertical: 5,
  },
  MianBxo: {
    marginLeft: 10,
    width: '45%',
    paddingHorizontal: 20,
    paddingVertical: 20,
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
    top: '10%',
    backgroundColor: Color.White,
    zIndex: 99,
  },
});

export default Logs;
