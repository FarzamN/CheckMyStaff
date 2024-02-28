import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ProgressBar from 'react-native-animated-progress';

import {Color} from '../utils/Color';
import {GlobalStyle} from '../Constants/GlobalStyle';
import {scale, verticalScale} from 'react-native-size-matters';
import {Font} from '../utils/font';

interface BarProps {
  title: string;
  Heading: string;
  progress: string | number | object;
  data: any;
}
const Progressbar: FC<BarProps> = ({data}) => {
  return (
    <>
      <Text style={styles.Heading}>{data.Heading}</Text>
      <View style={[GlobalStyle.Row, styles.RowBox]}>
        <Text style={styles.title}>{data.title}</Text>
        <View style={styles.PropgressBox}>
          <View style={[styles.inner, {width: data.progress}]} />
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  title: {
    color: Color.Black,
    fontSize: scale(16),
    marginRight: scale(5),
  },
  PropgressBox: {
    borderRadius: 100,
    borderWidth: scale(1),
    borderColor: Color.border,
    height: verticalScale(9),
    width: '90%',
  },
  inner: {
    backgroundColor: Color.Main,
    height: '100%',
    borderRadius: 100,
  },
  Heading: {
    color: Color.MidGrey,
    fontSize: scale(15),
    fontFamily: Font.Inter400,
  },
  RowBox: {marginTop: verticalScale(8), marginBottom: verticalScale(12)},
});

export default Progressbar;

{
  /* <ProgressBar
        progress={props.progress}
        height={scale(10)}
        backgroundColor={Color.Main}
        trackColor={Color.LightGrey}
      /> */
}
