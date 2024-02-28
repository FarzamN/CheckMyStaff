import React, {FC} from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';
import {GlobalStyle} from '../../Constants/GlobalStyle';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import {Color} from '../../utils/Color';
import {Font} from '../../utils/font';
import moment from 'moment';

// interface balanceProps {
//   title: string;
//   date: string;
//   data: any;
//   onPress: () => void;
// }

const BalanceCard = ({onPress, data}) => {
  const dateSep = moment(data?.PaymentDate, 'YYYY-MM-DD HH:mm:ss');
  const newSeparated = dateSep.format('DD/MM/YYYY');
  return (
    <Pressable
      android_ripple={GlobalStyle.PurpleRipple}
      onPress={onPress}
      style={{
        height: 70,
        marginBottom: 5,
        flexDirection: 'row',
        marginHorizontal: 20,
        borderBottomWidth: scale(1),
        borderColor: Color.border,
        paddingVertical: 10,
        overflow: 'hidden',
      }}
      // style={[GlobalStyle.Row, styles.Container]}
    >
      <View style={{flex: 2}}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            // alignItems: 'center',
          }}>
          <Text style={styles.title}>
            {data?.OrderNumber ? data?.OrderNumber : null}{' '}
            {/* {data?.Last_Name ? data?.Last_Name : 'Test'} */}
          </Text>
        </View>
        <View style={{flex: 1, marginTop: 3}}>
          <Text style={styles.subTexts} numberOfLines={2}>
            {data?.Cust_id ? data?.Cust_id : null}
          </Text>
        </View>
      </View>
      <View style={{flex: 1}}>
        <View
          style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
          <Text style={[styles.title, {textAlign: 'right'}]} numberOfLines={2}>
            N{data?.AmountPaid}
          </Text>
        </View>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <Text style={styles.date}>{newSeparated}</Text>
        </View>
      </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  subTexts: {
    color: '#71788A',
    fontSize: 12,
    fontFamily: Font.Inter400,
    // maxWidth: '85%',
  },
  title: {
    color: '#22293B',
    fontSize: 14,
    fontFamily: Font.Inter500,
  },
  Container: {
    paddingHorizontal: moderateScale(20),
    borderBottomWidth: scale(1),
    borderColor: Color.border,
    paddingVertical: moderateVerticalScale(15),
    overflow: 'hidden',
  },
  date: {
    color: '#71788A',
     fontSize: 12,
      fontFamily: Font.Inter400,
    },
});

export default BalanceCard;
