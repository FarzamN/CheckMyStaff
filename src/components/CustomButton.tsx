import {StyleSheet, Text, Pressable, ActivityIndicator} from 'react-native';
import React from 'react';
import {scale, verticalScale} from 'react-native-size-matters';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Font} from '../utils/font';
import {Color} from '../utils/Color';
import {GlobalStyle} from '../Constants/GlobalStyle';

interface CustomButtonProps {
  disabled?: boolean;
  onPress: () => void;
  ButtonStyle?: object;
  File?: boolean;
  FontAwesome?: boolean;
  loader?: boolean;
  textStyle?: object;
  title: string;
  selected?: boolean;
  Ripple?: object;
}

const CustomButton: React.FC<CustomButtonProps> = props => {
  return (
    <Pressable
      android_ripple={props.Ripple}
      disabled={props.disabled}
      onPress={props.onPress}
      style={[styles.containerStyle, props.ButtonStyle]}>
      {props.File && (
        <Feather
          style={{paddingHorizontal: 5}}
          name="upload"
          color={Color.MidGrey}
          size={20}
        />
      )}
      {props.FontAwesome && (
        <FontAwesome5
          style={{paddingHorizontal: 5}}
          name="check-double"
          color={Color.White}
          size={15}
        />
      )}
      {props.loader ? (
        <ActivityIndicator size={'small'} color={'white'} />
      ) : (
        <Text style={[styles.font, props.textStyle]}>{props.title}</Text>
      )}
      {props.selected && (
        <AntDesign
          style={{paddingHorizontal: 5}}
          name="checkcircle"
          color={Color.Main}
          size={20}
        />
      )}
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  containerStyle: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    marginTop: 5,
    alignSelf: 'center',
    backgroundColor: Color.Main,
    height: 45,
    borderWidth: 1,
    flexDirection: 'row',
    overflow: 'hidden',
    borderColor: Color.Main,
  },

  font: {
    color: Color.white,
    fontSize: 14,
    textTransform: 'capitalize',
    fontFamily: Font.Inter500,
  },
});
