import {Text, StyleSheet} from 'react-native';
import React from 'react';
import {scale, verticalScale} from 'react-native-size-matters';
import {Font} from '../utils/font';
import {Color} from '../utils/Color';

interface ValidationProps {
  restyle?: object;
  title?: string;
}

const Validation: React.FC<ValidationProps> = ({restyle, title}) => {
  return <Text style={[styles.error, restyle]}>{title}</Text>;
};

const styles = StyleSheet.create({
  error: {
    color: Color.red,
    fontSize: scale(13),
    marginTop: verticalScale(5),
    fontFamily: Font.Inter500,
  },
});

export default Validation;
