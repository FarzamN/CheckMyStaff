import React, {FC, useCallback, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Pressable,
  FlatList,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {GlobalStyle} from '../../../Constants/GlobalStyle';
import {useFocusEffect} from '@react-navigation/native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {Color} from '../../../utils/Color';
import {Font} from '../../../utils/font';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {EmpData, HomeData} from '../../../Constants/Data';
import EmptyList from '../../../components/Cards/EmptyList';
import HomeCard from '../../../components/Cards/HomeCard';
import RegisterationCard from '../../../components/Cards/RegisterationCard';
import {useDispatch, useSelector} from 'react-redux';
import {
  DRAWER_COLOR,
  GET_EMPLOYEEPRO_DATA,
  GET_EMPLOYEE_INCIDENTREP,
  GET_EMPLOYEE_PERFORMANCE,
  SEARCH_DETAIL_LOADER,
  SEARCH_HISTORY_DATA,
} from '../../../redux/reducer/Holder';
import {ExtraSearchByBVN, getEmployeIncidentRep, getEmployePerformnce, searchByBVN, userSearchHistory} from '../../../redux/actions/UserActions';
import moment from 'moment';
import TopupModal from '../../../components/Modal/TopupModal';

const SCREEN_HEIGHT = Dimensions.get('window').height;

const Search = ({navigation}) => {
  const dispatch = useDispatch();
  const search_history_data = useSelector(state => state.search_history_data);

  const [searchQuery, setSearchQuery] = useState('');
  const [SearchLoad, setSearchLoad] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [topUpModal, setTopUpModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [loader2, setLoader2] = useState(false);
  const [newData, setNewData] = useState({});
  const [fullData, setFullData] = useState({});

  console.log('first', topUpModal)

  const onEndReachedCalledDuringMomentum = useRef(false);


  const handleSearch = text => {
    setSearchQuery(text);
  };

  const handleCancel = () => {
    setSearchQuery('');
    setNewData([]);
  };

  useFocusEffect(
    useCallback(() => {
      navigation.getParent()?.setOptions({
        tabBarStyle: GlobalStyle.HideBar,
      });
      dispatch({ type:DRAWER_COLOR, payload: false })
      dispatch({type: SEARCH_DETAIL_LOADER, payload: true});
      dispatch({type: GET_EMPLOYEEPRO_DATA, payload: []});
      dispatch({type: GET_EMPLOYEE_INCIDENTREP, payload: []});
      dispatch({type: GET_EMPLOYEE_PERFORMANCE, payload: {}});
    }, []),
  );

  // console.log('search_history_data', search_history_data);

  const removeSearch = () => {
    dispatch({type: SEARCH_HISTORY_DATA, payload: []});
  };

  const handlenavData = elm => {
    setErrorMsg(null)
    dispatch(getEmployePerformnce(elm?.id));
    dispatch(getEmployeIncidentRep(elm?.id));
    dispatch({type: GET_EMPLOYEEPRO_DATA, payload: elm});
    setTimeout(() => {
      navigation.navigate('SearchResult', {
        type: 'search',
        data: elm,
        newType: 'new',
      });
    }, 1000);
  };

  return (
    <SafeAreaView style={GlobalStyle.container}>
      {/* <View style={styles.InputBox}>
        <View style={GlobalStyle.Row}>
          <Pressable
            onPress={() => navigation.goBack()}
            android_ripple={GlobalStyle.PurpleRipple}>
            <AntDesign
              name="arrowleft"
              color={Color.MidGrey}
              size={scale(22)}
            />
          </Pressable>
          <TextInput
            defaultValue="54651333604"
            style={styles.Input}
            placeholderTextColor="#A9A9A9"
            placeholder="Enter Employees NIN"
            onChangeText={text => setSearchQuery(text)}
            autoFocus
            keyboardType="numeric"
            value={searchQuery}
            onSubmitEditing={() =>
              dispatch(searchByBVN(searchQuery, setNewData, setLoader))
            }
          />
        </View>
        {searchQuery.length >= 1 &&
          (SearchLoad ? (
            <ActivityIndicator
              style={styles.Indicator}
              color={Color.Main}
              size={scale(25)}
            />
          ) : (
            <Pressable style={styles.Indicator} onPress={handleCancel}>
              <Text style={styles.Cancel}>Cancel</Text>
            </Pressable>
          ))}
      </View> */}

      <View style={{
      height: 70,
      backgroundColor: 'white',
      // backgroundColor: '#F5F5F5',
      flexDirection:'row',
      borderBottomWidth: scale(0.5),
      borderBottomColor: Color.border,
      }}>
        <View style={{
          flex:0.8,
          padding:10,
          justifyContent:'center',
          alignItems:'center'
        }}>
          <TextInput
            defaultValue="54651333604"
            style={{
    width: '100%',
    width: '100%',
    color: Color.Black,
    fontFamily: Font.Inter400,
    fontSize: scale(14),
    backgroundColor:'white',
    paddingLeft: 15,
    shadowColor: '#fff',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.4,
    shadowRadius: 1,
    elevation: 3,
    borderRadius:25,
    left:5
    
            }}
            placeholderTextColor="#A9A9A9"
            placeholder="Enter Employee BVN"
            onChangeText={text => setSearchQuery(text)}
            autoFocus
            keyboardType="numeric"
            value={searchQuery}
            onSubmitEditing={() =>
             (  setErrorMsg(null), dispatch(searchByBVN(searchQuery, setNewData, setLoader,setTopUpModal,setErrorMsg)))
            }
          />
        </View>
        <View style={{
          flex:0.2,
          // backgroundColor:'white',
          justifyContent:'center',
          alignItems:'center'
        }}>
           <Pressable  onPress={() => (dispatch(userSearchHistory()),setErrorMsg(null),navigation.goBack())}>
              <Text style={{
                 fontSize: 15,
                 fontFamily: Font.Gilroy600,
                 marginVertical: 11,
                 color: Color.Black,
                 right:5
              }}>Cancel</Text>
            </Pressable>
        </View>

      </View>

      {loader ? (
        <View
          style={{
            height: (SCREEN_HEIGHT * 1) / 1.5,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size={'large'} color={Color.Main} />
        </View>
      ) :    errorMsg ? null :(
        <FlatList
          data={newData?.data?.length > 0 ? newData?.data : search_history_data}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => {
            return (
              <View
                style={[
                  GlobalStyle.Space_between,
                  {
                    paddingHorizontal: moderateScale(20),
                  },
                ]}>
                {search_history_data?.length > 0 && newData?.per_page  == null ? (
                  <>
                    <Text style={styles.Recent}>Recent Searches</Text>
                    {/* <Pressable
                      android_ripple={{color: 'red', borderless: true}}
                      onPress={removeSearch}>
                      <Ionicons
                        name="close"
                        color={Color.Black}
                        size={scale(20)}
                      />
                    </Pressable> */}
                  </>
                ) : null}
              </View>
            );
          }}
          ListEmptyComponent={() => {
            return (
              <View
                style={{
                  height: (SCREEN_HEIGHT * 1) / 1.5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  {
                    topUpModal ? null :
                <EmptyList
                  Heading="No Record Found"
                  isImage
                />
                  }
              </View>
            );
          }}
          renderItem={({item}) => {
            const dateSep = moment(item?.date, 'YYYY-MM-DD HH:mm:ss');
            const newSeparated = dateSep.format('DD/MM/YYYY');
            return (
              newData?.data?.length > 0 ?
              <RegisterationCard
                // onPress={() =>
                //   navigation.navigate('SearchResult', {type: 'search'})
                // }
                onPress={() => handlenavData(item)}
                Search
                data={item}
              />
              :
              <TouchableOpacity 
              onPress={() => ( setErrorMsg(null),setSearchQuery(item?.bvn),dispatch(searchByBVN(item?.bvn, setNewData, setLoader,setTopUpModal,setErrorMsg)))}>

              <View style={{
                height: 40,
                borderTopWidth: 1,
                borderColor: Color.border,
                // backgroundColor:'red',
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'space-between',
                paddingHorizontal:20
              }}>
     <Text style={{
       color: Color.Black,
       //  paddingLeft: 10,
       fontFamily: Font.Inter600,
      }}>
            {item?.bvn}
          </Text>
     <Text style={{
       color: Color.Black,
       //  paddingLeft: 10,
       color: Color.MidGrey,
      }}>
            {newSeparated}
          </Text>
              </View>
       </TouchableOpacity>
            );
          }}
          ListFooterComponent={
            loader2 ? (
              <ActivityIndicator size="large" color={Color.Main} />
            ) : null
          }
          onEndReachedThreshold={0.1}
            onEndReached={({distanceFromEnd}) => {
              console.log('distanceFromEnd', distanceFromEnd)
              if (!onEndReachedCalledDuringMomentum.current) {
                if (distanceFromEnd >= 10 && !loader && newData?.data?.length > 5 ) {
                    ExtraSearchByBVN(
                     newData?.next_page_url, searchQuery, setNewData, setLoader2,newData
                    ),
                  onEndReachedCalledDuringMomentum.current = true;
                } else {
                  console.log('object');
                }
              }
            }}
            onMomentumScrollBegin={() => {
              onEndReachedCalledDuringMomentum.current = false;
            }}
        />
      )}

      <TopupModal
        visible={topUpModal}
        onClose={() => setTopUpModal(false)}
        onBtnPress={() => (setTopUpModal(false),navigation.navigate('balance'))}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Line: {
    borderWidth: scale(0.5),
    borderColor: Color.border,
    marginTop: verticalScale(20),
  },
  InputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 100,
    width: '90%',
    alignSelf: 'center',
    height: verticalScale(50),
    paddingHorizontal: moderateScale(15),
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: verticalScale(10),
  },
  Input: {
    marginLeft: scale(7),
    width: '100%',
    color: Color.Black,
    fontFamily: Font.Inter400,
    fontSize: scale(14),
    backgroundColor:'white'
  },
  Cancel: {
    color: Color.Black,
    // fontFamily: Font.Gilroy800,
  },
  Recent: {
    fontSize: 15,
    fontFamily: Font.Gilroy600,
    marginVertical: 11,
    color: Color.Black,
  },
  Indicator: {position: 'absolute', right: scale(20)},
});

export default Search;
