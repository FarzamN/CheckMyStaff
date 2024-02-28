import React, {forwardRef, useState} from 'react';
import {useController} from 'react-hook-form';
import {StyleSheet, TextInput, View, Text, Pressable} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {Color} from '../utils/Color';
import {Font} from '../utils/font';
import Feather from 'react-native-vector-icons/Feather';
import {GlobalStyle} from '../Constants/GlobalStyle';

const PasswordInput = forwardRef((props, ref) => {
  const {field} = useController({
    control: props.control,
    defaultValue: props.defaultValue || '',
    name: props.name,
    rules: props.rules,
  });

  const [password, setPassword] = useState(true);

  return (
    <>
      <Text style={GlobalStyle.InputHeading}>{props.Heading}</Text>
      <View style={[styles.smallbox, props.style]}>
        <TextInput
          onFocus={props.onFocus}
          textContentType={props.textContentType}
          value={field.value}
          ref={ref}
          onChangeText={field.onChange}
          multiline={props.multiline}
          numberOfLines={props.numberOfLines}
          placeholder={props.placeholder}
          placeholderTextColor={Color.placeholderTextColor}
          style={[styles.InputStyles, props.Gapp, props.restyle]}
          secureTextEntry={password}
          textAlignVertical={props.textAlignVertical}
          pattern={props.pattern}
          label={props.label}
          placeholderStyle={props.placeholderStyle}
          fontSize={props.fontSize}
          maxLength={props.maxLength}
        />
        <Pressable
          android_ripple={GlobalStyle.PurpleRipple}
          onPress={() => setPassword(!password)}>
          <Feather
            color="#575E6E"
            size={20}
            name={password ? 'eye-off' : 'eye'}
          />
        </Pressable>
      </View>
    </>
  );
});

const styles = StyleSheet.create({
  InputStyles: {
    width: '80%',
    height: '100%',
    color: Color.Black,
    fontFamily: Font.Inter500,
    fontSize: scale(15),
  },
  smallbox: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: verticalScale(5),
    width: '100%',
    paddingHorizontal: moderateScale(15),
    height: verticalScale(42),
    backgroundColor: Color.white,
    borderWidth: scale(1),
    borderColor: Color.border,
    borderRadius: scale(10),
  },
});
export default PasswordInput;
