import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Color} from '../../utils/Color';
import {moderateScale,  verticalScale} from 'react-native-size-matters';
import {Font} from '../../utils/font';

const BannerHeading = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{props.heading}</Text>
      <Text style={styles.sub_heading}>{props.sub_heading}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: moderateScale(25),
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 20,
    color: Color.Black,
    fontFamily: Font.Inter500,
  },
  sub_heading: {
    color: Color.MidGrey,
    fontFamily: Font.Inter400,
    fontSize: 16,
    marginTop: verticalScale(10),
  },
});

export default BannerHeading;
