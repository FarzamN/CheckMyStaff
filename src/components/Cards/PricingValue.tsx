import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {GlobalStyle} from '../../Constants/GlobalStyle';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';
import {Color} from '../../utils/Color';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';

interface PricingValueProps {
  title: string;
  data: any;
  onPress: () => void;
  Dot: boolean;
  focus: boolean;
}
const PricingValue: React.FC<PricingValueProps> = ({
  data,
  onPress,
  Dot,
  focus,
}) => {
  return (
    <Pressable
      disabled={data.title == 'NIN' || data.title == 'Driving License'}
      style={[
        styles.container,
        {
          borderColor: focus ? Color.Main : Color.Non,
          backgroundColor: focus ? '#8c519f26' : Color.White,
        },
      ]}
      onPress={onPress}
      android_ripple={GlobalStyle.PurpleRipple}>
      <Text style={[GlobalStyle.Heading, {textAlign: 'left'}]}>
        {data.title}
      </Text>
      {Dot ? (
        <Fontisto
          name={focus ? 'radio-btn-active' : 'radio-btn-passive'}
          size={scale(15)}
          color={focus ? Color.Main : Color.Grey}
        />
      ) : (
        <MaterialCommunityIcons
          name={focus ? 'checkbox-marked' : 'checkbox-blank-outline'}
          color={focus ? Color.Main : Color.MidGrey}
          size={scale(20)}
        />
      )}
    </Pressable>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '70%',
    borderRadius: scale(10),
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateVerticalScale(13),
    marginTop: verticalScale(10),
    borderWidth: scale(1),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: '6%',
    alignItems: 'center',
    overflow: 'hidden',
  },
});

export default PricingValue;
