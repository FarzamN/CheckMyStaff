import React, {FC, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  ScrollView,
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
import Entypo from 'react-native-vector-icons/Entypo';
import {moderateVerticalScale} from 'react-native-size-matters';
import KeyValue from '../Cards/KeyValue';
import {format} from 'date-fns';

const AllIncident = ({data}) => {
  return data?.map((item, index) => {
    const inputDateString = item?.Date_Submitted;
    const inputDate = new Date(inputDateString);
    const formattedDate = format(inputDate, 'dd,MMM,y');
    // const newhired = format(item?.Date_Submitted?.getTime(), 'dd,MM,yyyy');
    return (
      <>
        <Text key={index} style={styles.Date}>
          {/* {12,march,2023} */}
          {formattedDate}
        </Text>
        <View
          style={[
            styles.ItemBox,
            {
              backgroundColor: item?.rate == 'good' ? '#F1F5F9' : '#F9F2F2',
              borderColor: item?.rate == 'good' ? '#4991E7' : '#EB5757',
            },
          ]}>
          <KeyValue keys="Reported Incidence" value={item?.Incident} />
          <KeyValue keys="Date Submitted" value={formattedDate} />
          <KeyValue keys="Assessment" value={item?.Comment} />
          <KeyValue keys="Resolution" value={item?.Resolution} />
          <KeyValue keys="Mode" value={item?.Feedback_Mode} />
          <KeyValue keys="Action Taken" value={item?.External_Action_Taken} />
          <KeyValue keys="Incidence type" value={item?.rate} />
          <KeyValue
            keys="Documentation"
            value={item?.ExternalReport ? 'Yes' : 'NO'}
          />
          {/* <Pressable
            style={[styles.btnBox, GlobalStyle.Row]}
            android_ripple={GlobalStyle.WhiteRipple}>
            <View style={styles.IconBox}>
              <Fontisto name="paperclip" color={Color.White} size={scale(15)} />
            </View>
            <Text style={styles.BtnText}>
              Download <Text style={styles.lineText}>CourtCase.pdf</Text>
            </Text>
          </Pressable> */}
        </View>
      </>
    );
  });
};

export default AllIncident;

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
});
