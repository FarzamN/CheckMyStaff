import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {GlobalStyle} from '../../../Constants/GlobalStyle';
import {Color} from '../../../utils/Color';
import {
  moderateVerticalScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';
import {Font} from '../../../utils/font';

const About: FC = () => {
  return (
    <View style={GlobalStyle.Padding}>
      <Text
        style={[
          GlobalStyle.Heading,
          {textAlign: 'left', marginTop: verticalScale(20)},
        ]}>
        About employee
      </Text>
      <View style={styles.Container}>
        <View style={[GlobalStyle.Row, styles.RowContrainer]}>
          <Text style={styles.key}>Employee ID:</Text>
          <Text style={styles.value}>Nil</Text>
        </View>
        <View style={[GlobalStyle.Row, styles.RowContrainer]}>
          <Text style={styles.key}>Search Date:</Text>
          <Text style={styles.value}>20 12,2019</Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  Container: {
    backgroundColor: Color.white,
  },
  key: {
    color: Color.MidGrey,
    fontSize: scale(15),
    fontFamily: Font.Inter500,
    width: '55%',
  },
  value: {
    color: Color.Black,
    fontSize: scale(15),
    fontFamily: Font.Inter500,
  },
  RowContrainer: {
    paddingVertical: moderateVerticalScale(10),
  },
});
export default About;
