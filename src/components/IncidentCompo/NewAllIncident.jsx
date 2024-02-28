import React, {FC, useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  ScrollView,
  Dimensions,
  Button,
  TouchableOpacity,
} from 'react-native';
import {GlobalStyle} from '../../Constants/GlobalStyle';
import Header from '../Header/Header';
import {IncidentData} from '../../Constants/Data';
import CustomButton from '../CustomButton';
import {scale} from 'react-native-size-matters';
import {verticalScale} from 'react-native-size-matters';
import {Color} from '../../utils/Color';
import {Font} from '../../utils/font';
import {moderateScale} from 'react-native-size-matters';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {moderateVerticalScale} from 'react-native-size-matters';
import KeyValue from '../Cards/KeyValue';
import {format} from 'date-fns';
import RNFS from 'react-native-fs';
import * as Progress from 'react-native-progress';
import AllIRComp from './AllIRComp';
import moment from 'moment';

const windowWidth = Dimensions.get('window').width;

const NewAllIncident = ({incidenceReports}) => {
  const itemsPerBox = 2; // Number of items per box
  const pageSize = 2; // Number of boxes per page
  const [currentPage, setCurrentPage] = useState(1);

  const boxes = incidenceReports.reduce((acc, item, index) => {
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

  const scrollViewRef = useRef();

  const scrollToPage = page => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: (page - 1) * Dimensions.get('window').width,
        animated: true,
      });
      setCurrentPage(page);
    }
  };
  const scrollToPage2 = page => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: (page - 1) * Dimensions.get('window').width,
        animated: true,
      });
      setCurrentPage(page);
    }
  };

  return (
    <View style={{flex: 1}}>
      {/* <ScrollView
        nestedScrollEnabled
        horizontal
        pagingEnabled
        ref={scrollViewRef}
        onMomentumScrollEnd={event => {
          const page =
            Math.ceil(
              event.nativeEvent.contentOffset.x /
                Dimensions.get('window').width,
            ) + 1;
          setCurrentPage(page);
        }}> */}
        {/* {boxes.map((box, boxIndex) => {
          return ( */}
            {/* <View
              key={boxIndex}
              style={{
                width: Dimensions.get('window').width,
                height: '100%',
                paddingHorizontal: 10,
              }}> */}
              <ScrollView
                showsVerticalScrollIndicator={false}
                // style={{
                //   height: 450,
                // }}
                >
                {incidenceReports?.map((item) => {
                  // const inputDateString = item?.Date_Submitted;
                  // console.log('item?.Date_Submitted', item?.Date_Submitted)
                  // const inputDate = new Date(inputDateString);
                  // const formattedDate = format(inputDate, 'dd/mm/yyyy');

                  const dateSep = moment(item?.Date_Submitted, 'YYYY-MM-DD HH:mm:ss');
                  const newSeparated = dateSep.format('DD/MM/YYYY');

                  return (
                    <AllIRComp key={item.id} date={newSeparated} item={item} />
                  );
                })}
                {/* <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    height: 45,
                    width: '100%',
                    alignItems: 'center',
                    marginVertical: 15,
                  }}>
                  <View
                    style={{
                      height: 45,
                      width: '20%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      disabled={currentPage == 1}
                      onPress={() => scrollToPage(currentPage - 1)}
                      style={{
                        height: 40,
                        width: 40,
                        borderRadius: 100,
                        backgroundColor: 'white',
                        borderWidth: 1,
                        borderColor: Color.Main,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <AntDesign size={15} color={Color.Main} name="left" />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      height: 45,
                      width: '60%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      // flexDirection: 'row',
                    }}>
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={{
                        alignItems: 'center',
                      }}>
                      {Array.from({length: boxes?.length})?.map(
                        (item, index) => (
                          <TouchableOpacity
                            key={index + '-box'}
                            onPress={() => scrollToPage2(index + 1)}>
                            <View
                              style={{
                                height: 25,
                                width: 25,
                                borderRadius: 100,
                                backgroundColor:
                                  currentPage == index + 1
                                    ? '#f5f5f5'
                                    : 'white',
                                justifyContent: 'center',
                                alignItems: 'center',
                                margin: 2,
                              }}>
                              <Text>{1 + index}</Text>
                            </View>
                          </TouchableOpacity>
                        ),
                      )}
                    </ScrollView>
                  </View>
                  <View
                    style={{
                      height: 45,
                      width: '20%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      disabled={currentPage == boxes?.length}
                      onPress={() => scrollToPage(currentPage + 1)}
                      style={{
                        height: 40,
                        width: 40,
                        borderRadius: 100,
                        backgroundColor: 'white',
                        borderWidth: 1,
                        borderColor: Color.Main,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <AntDesign size={15} color={Color.Main} name="right" />
                    </TouchableOpacity>
                  </View>
                </View> */}
              </ScrollView>
            {/* </View> */}
        {/* //   );
        // })} */}
      {/* </ScrollView> */}
      {/* <View style={{height: verticalScale(70)}} /> */}
    </View>
  );
};

export default NewAllIncident;

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
