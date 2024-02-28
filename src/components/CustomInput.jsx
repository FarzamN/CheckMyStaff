import React, {forwardRef} from 'react';
import {useController, Control} from 'react-hook-form';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { GlobalStyle } from '../Constants/GlobalStyle';
import { Color } from '../utils/Color';
import { Font } from '../utils/font';

const CustomInput = forwardRef((props, ref) => {
  const {field} = useController({
    control: props.control,
    defaultValue: props.defaultValue || '',
    name: props.name,
    rules: props.rules,
  });

  return (
    <>
      {!props.noHeading && (
        <Text style={GlobalStyle.InputHeading}>{props.Heading}</Text>
      )}

      <View
        style={[
          styles.smallbox,
          {
            height: props.multiline ? verticalScale(80) : verticalScale(42),
          },
          props.style,
        ]}>
        {props.FontAwesome && (
          <FontAwesome
            name={props.FontAwesome_Name}
            size={props.size}
            color={Color.white}
          />
        )}
        {props.MaterialIcons && (
          <MaterialIcons
            name={props.MaterialIcons_Name}
            size={props.size}
            color={Color.white}
          />
        )}
        {props.Fontisto && (
          <Fontisto
            name={props.Fontisto_Name}
            size={props.size}
            color={Color.white}
          />
        )}
        <TextInput
          ref={ref}
          // fontSize={14}
          value={field.value}
          label={props.label}
          onFocus={props.onFocus}
          pattern={props.pattern}
          cursorColor={Color.Main}
          keyboardAppearance="light"
          maxLength={props.maxLength}
          selectionColor={Color.Main}
          multiline={props.multiline}
          onChangeText={field.onChange}
          placeholder={props.placeholder}
          keyboardType={props.keyboardType}
          numberOfLines={props.numberOfLines}
          secureTextEntry={props.secureTextEntry}
          textContentType={props.textContentType}
          placeholderStyle={props.placeholderStyle}
          textAlignVertical={props.multiline ? 'top' : 'center'}
          style={[styles.InputStyles, props.Gapp, props.restyle]}
          placeholderTextColor={
            props.change
              ? props.placeholderTextColor
              : Color.placeholderTextColor
          }
          editable={props.editable}
        />
      </View>
    </>
  );
});

const styles = StyleSheet.create({
  InputStyles: {
    width: '100%',
    height: '100%',
    color: Color.Black,
    fontFamily: Font.Inter500,
    fontSize: 14,
  },
  smallbox: {
    width: '100%',
    flexDirection: 'row',
    borderWidth: 1,
    alignSelf: 'center',
    borderRadius: 10,
    borderColor: Color.border,
    marginTop: 5,
    backgroundColor: Color.white,
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
});
export default CustomInput;
