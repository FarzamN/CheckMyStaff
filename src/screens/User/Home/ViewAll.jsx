import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Pressable,
  Platform,
} from 'react-native';
import React, {FC, useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';
import {GlobalStyle} from '../../../Constants/GlobalStyle';
import Header from '../../../components/Header/Header';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {EmpData, LogSorts, downloadData} from '../../../Constants/Data';
import LogsFilterItems from '../../../components/Cards/LogsFilterItems';
import {Color} from '../../../utils/Color';
import {Font} from '../../../utils/font';
import EmptyList from '../../../components/Cards/EmptyList';
import RegisterationCard from '../../../components/Cards/RegisterationCard';
import {useDispatch, useSelector} from 'react-redux';
import {getDashboardData, getEmployeIncidentRep, getEmployePerformnce} from '../../../redux/actions/UserActions';
import {GET_EMPLOYEEPRO_DATA, GET_EMPLOYEE_INCIDENTREP, GET_EMPLOYEE_PERFORMANCE, SEARCH_DETAIL_LOADER} from '../../../redux/reducer/Holder';

const ViewAll = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const get_dashboard_data = useSelector(state => state.get_dashboard_data);

  const slicedData = LogSorts?.slice(0, 2);
  const [selected, setSelected] = useState(null);
  const [DownloadSelected, setDownloadSelected] = useState(null);
  const [download, setDownload] = useState(false);

  const [rows, setRows] = useState(10);
  const [loader, setLoader] = useState(false);
  const [loader2, setLoader2] = useState(false);
  const [loader3, setLoader3] = useState(false);

  const onEndReachedCalledDuringMomentum = useRef(false);
  const [isLoadingMoreData, setIsLoadingMoreData] = useState(false);
  const [isEndReached, setIsEndReached] = useState(false);
  const [getSort, setGetSort] = useState('');
  const [getFilter, setGetFilter] = useState('');

  const [sortSata, setSortData] = useState('newest_to_oldest');
  const [showSortBy, setShowSortBy] = useState(false);

  const [filterData, setFilterData] = useState('all_time');
  const [showFilterData, setShowFilterData] = useState(false);

  const handleFilterMethod = item => {
    setSelected(item.id);
    if (item.id == 1) {
      setShowSortBy(!showSortBy);
      setShowFilterData(false);
    } else {
      setShowFilterData(!showFilterData);
      setShowSortBy(false);
    }
  };
  const handleDownlod = item => {
    setDownloadSelected(item.id);
  };

  // useLayoutEffect(() => {
  //   navigation.getParent()?.setOptions({ tabBarStyle: { 
  //     // display: 'none',
  //     height:0
  //    } });
  // });
  useFocusEffect(
    useCallback(() => {
      navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' } });
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
        // navigation.getParent()?.setOptions({
        //   tabBarStyle: GlobalStyle.HideBar,
        // });
        dispatch({type: SEARCH_DETAIL_LOADER, payload: true});
        dispatch({type: GET_EMPLOYEEPRO_DATA, payload: []});
        dispatch({type: GET_EMPLOYEE_INCIDENTREP, payload: []});
        dispatch({type: GET_EMPLOYEE_PERFORMANCE, payload: {}});
      // dispatch(
      //   getDashboardData(rows, 'newest_to_oldest', 'last_week', setLoader),
      // );
    }, []),
  );

  const handleSortBy = name => {
    setSortData(name);
    setShowSortBy(!showSortBy);
    dispatch(
      getDashboardData(rows, name, filterData, setLoader, setRows, setLoader2,'all'),
    );
  };
  const handleFIilter = name => {
    setFilterData(name);
    setShowFilterData(!showFilterData);
    dispatch(
      getDashboardData(rows, sortSata, name, setLoader, setRows, setLoader2,'all'),
    );
  };

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

  return (
    <SafeAreaView style={GlobalStyle.container}>
      <View
      style={{
        flex:1,
      }}
      >

      <Header
        title="Employees"
        // Download
        // menu
        gapp
        onDownload={() => setDownload(true)}
      />
      <View style={GlobalStyle.grey_container}>
        {/* <ScrollView showsVerticalScrollIndicator={false}> */}
        <View style={styles.HorizontalList}>
          <View style={GlobalStyle.Row}>
            {slicedData?.map((item, index) => {
              return (
                <LogsFilterItems
                  key={index}
                  data={item}
                  restyle={styles.restyleLogBox}
                  onPress={() => handleFilterMethod(item)}
                  ChangeColor={selected == item.id ? Color.Main : Color.Black}
                />
              );
            })}
          </View>
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
                marginLeft: showSortBy ? 10: '50%',
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

        {/* {selected == 1 && (
          <FilterDropDown one onSort={handleSort} get={setGetSort} />
        )}
        {selected == 2 && (
          <FilterDropDown two onFilter={handleFilter} get={setGetFilter} />
        )} */}
        {/* <TouchableOpacity
          onPress={() => navigation.navigate('search')}
          activeOpacity={0.7}
          style={[GlobalStyle.Row, styles.btnBox]}>
          <Feather name="search" color={Color.MidGrey} size={scale(17)} />
          <Text style={styles.text}>Search for your Employees</Text>
        </TouchableOpacity> */}
        <Text style={[GlobalStyle.HomeCountHeading]}>
          {get_dashboard_data?.total} Total Employees
        </Text>
        <View 
        style={{
          flex:1,
          // height:700,
        }}>

        {loader2 ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator size={'large'} color={Color.Main} />
          </View>
        ) : (
          <FlatList
            nestedScrollEnabled
            data={get_dashboard_data?.data}
            ListEmptyComponent={() => {
              return (
                <EmptyList
                  Heading="Empty records"
                  SubHeading="You haven’t added any employee yet."
                  marginTop="20%"
                />
              );
            }}
            renderItem={({item}) => {
              return (
                <RegisterationCard
                  data={item}
                  Search
                  onPress={() => handlenavData(item)}
                />
              );
            }}
            ListFooterComponent={
              loader ? (
                <ActivityIndicator size="large" color={Color.Main} />
              ) : null
            }
            onEndReachedThreshold={0.1}
            onEndReached={({distanceFromEnd}) => {
              console.log('distanceFromEnd', distanceFromEnd)
              if (!onEndReachedCalledDuringMomentum.current) {
                if (distanceFromEnd >= 10 && !loader) {
                  dispatch(
                    getDashboardData(
                      rows + 10,
                      sortSata,
                      showSortBy,
                      setLoader,
                      setRows,
                      setLoader3,
                      'all'
                    ),
                  );
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
        </View>
        {
          Platform.OS == 'android' ?
          
         <View style={GlobalStyle.VerticalSpace} /> 
          
          : null
        }
        {/* </ScrollView> */}
      </View>
      </View>

  
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  HorizontalList: {
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: 10,
  },
  restyleLogBox: {
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnBox: {
    backgroundColor: Color.White,
    borderRadius: 100,
    paddingHorizontal: 13,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: Color.border,
    marginTop: 15,
    marginHorizontal: 10,
  },
  text: {
    color: Color.Grey,
    fontFamily: Font.Inter400,
    fontSize: 14,
    paddingHorizontal: 10,
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

export default ViewAll;
