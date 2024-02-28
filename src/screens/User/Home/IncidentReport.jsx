import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  ScrollView,
  Dimensions,
  Button,
  FlatList,
  Platform,
} from 'react-native';
import {GlobalStyle} from '../../../Constants/GlobalStyle';
import Header from '../../../components/Header/Header';
import {IncidentData} from '../../../Constants/Data';
import CustomButton from '../../../components/CustomButton';
import {scale} from 'react-native-size-matters';
import {verticalScale} from 'react-native-size-matters';
import {Color} from '../../../utils/Color';
import {Font} from '../../../utils/font';
import {moderateScale} from 'react-native-size-matters';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import {moderateVerticalScale} from 'react-native-size-matters';
import KeyValue from '../../../components/Cards/KeyValue';
import AllIncident from '../../../components/IncidentCompo/AllIncident';
import GoodIncident from '../../../components/IncidentCompo/GoodIncident';
import BadIncident from '../../../components/IncidentCompo/BadIncident';
import NewAllIncident from '../../../components/IncidentCompo/NewAllIncident';
import NewGoodIncident from '../../../components/IncidentCompo/NewGoodIncident';
import NewBadIncident from '../../../components/IncidentCompo/NewBadIncident';
import {useFocusEffect} from '@react-navigation/native';
import {
  getEmployeIncidentRep,
  getEmployePerformnce,
} from '../../../redux/actions/UserActions';
import {useDispatch, useSelector} from 'react-redux';
import EmptyList from '../../../components/Cards/EmptyList';

const windowWidth = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const IncidentReport = ({navigation, route}) => {
  const dispatch = useDispatch();
  const incidenceReports = useSelector(state => state.get_employee_incidentrep);
  const {userData} = route.params;
  // console.log('userData?.empid', userData?.id);
  const [select, setSelect] = useState(1);

  useFocusEffect(
    useCallback(() => {
      dispatch(getEmployeIncidentRep(userData?.id));
    }, []),
  );

  const handelChange = item => {
    setSelect(item.id);
  };

  const itemsPerBox = 2; // Number of items per box
  const pageSize = 2; // Number of boxes per page
  const [currentPage, setCurrentPage] = useState(1);

  const scrollViewRef = useRef();

  const boxes = incidenceReports?.reduce((acc, item, index) => {
    const boxIndex = Math.floor(index / itemsPerBox);
    if (!acc[boxIndex]) {
      acc[boxIndex] = [];
    }
    acc[boxIndex].push(item);
    return acc;
  }, []);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(boxes.length / pageSize)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const scrollToPage = page => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: (page - 1) * Dimensions.get('window').width,
        animated: true,
      });
    }
  };

  const goodData = incidenceReports?.filter(item => item?.rate == 'Good');
  const badData = incidenceReports?.filter(item => item?.rate == 'Bad');

  return (
    <SafeAreaView style={GlobalStyle.container}>
      <Header title="Incident Report" gapp />
      <View style={[GlobalStyle.Row, styles.Row]}>
        {incidenceReports?.length > 0 ?  IncidentData?.map(item => (
          <>
            <CustomButton
              Ripple={GlobalStyle.PurpleRipple}
              data={item}
              key={item.id}
              title={item.title}
              onPress={() => handelChange(item)}
              textStyle={[
                styles.ChangeText,
                {
                  color: select == item.id ? Color.Main : Color.MidGrey,
                },
              ]}
              ButtonStyle={[
                styles.containerStyle,
                {
                  backgroundColor: select == item.id ? '#EFE9F1' : Color.White,
                  borderColor: select == item.id ? Color.Main : Color.MidGrey,
                },
              ]}
            />
          </>
        ))
      :

      <View
      style={{
        height: (SCREEN_HEIGHT * 1) / 1.5,
        width:'100%',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor:'red'
      }}>
      <EmptyList
        Heading="Empty records"
        SubHeading="No Incidence records yet!"
        //  marginTop="30%"
        isImage
      />
    </View>
      }
      </View>

      {select == 1 && <NewAllIncident incidenceReports={incidenceReports} />}

      {select == 2 && <NewGoodIncident incidenceReports={incidenceReports} />}

      {select == 3 && <NewBadIncident incidenceReports={incidenceReports} />}
<View style={{height:40}} />
      <View
        style={[
          GlobalStyle.EndBtnBox,
          {
            position: 'absolute',
            zIndex: 99,
            bottom: Platform.OS == 'android' ? 0 : 10,
            width: '100%',
            // backgroundColor: 'rgba(0, 0, 0, 0.1)',
          },
        ]}>
        <CustomButton
          Ripple={GlobalStyle.WhiteRipple}
          onPress={() =>
            navigation.navigate('reportIncident', {
              userData: userData,
            })
          }
          title="Add new incidence"
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  containerStyle: {
    borderRadius: scale(100),
    height: verticalScale(40),
    width: '32%',
    borderWidth: scale(1),
    marginRight: scale(5),
  },
  ChangeText: {
    fontSize: scale(13),
  },
  Date: {
    color: Color.Black,
    fontFamily: Font.Inter500,
    fontSize: scale(15),
    marginTop: verticalScale(20),
  },
  ItemBox: {
    borderWidth: scale(1),
    borderRadius: scale(8),
    padding: moderateScale(10),
    marginTop: verticalScale(15),
    marginBottom: 20,
  },
  btnBox: {
    backgroundColor: '#A0A4AD',
    borderRadius: 100,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: moderateVerticalScale(10),
    marginTop: verticalScale(10),
    overflow: 'hidden',
  },
  lineText: {
    textDecorationLine: 'underline',
  },
  BtnText: {
    color: Color.White,
    fontSize: scale(16),
    marginLeft: scale(8),
  },
  IconBox: {
    borderWidth: scale(1.5),
    borderColor: Color.White,
    borderRadius: scale(5),
    padding: moderateScale(3),
  },
  arrowBox: {
    overflow: 'hidden',
    borderRadius: scale(100),
    justifyContent: 'center',
    alignContent: 'center',
  },
  Row: {
    paddingHorizontal: 15,
    marginVertical: 3,
  },
  container: {
    flex: 1,
  },
  incidentItem: {
    width: windowWidth,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});

export default IncidentReport;
