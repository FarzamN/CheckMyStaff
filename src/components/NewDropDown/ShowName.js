import React, {forwardRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import { Color } from '../../utils/Color';
import { Font } from '../../utils/font';
import { GlobalStyle } from '../../Constants/GlobalStyle';



const ShowName = (props) => {
  return (
    <View style={props.style}>
    <Text style={GlobalStyle.InputHeading}>{props.Heading}</Text>
    <View style={styles.boxStyles}>
        <Text style={{
                 color: Color.Black,
                 fontSize: 14,
                 fontFamily: Font.Inter500,
                 marginLeft:15
        }}>{props.name}</Text>
    </View>
  </View>
  )
}

const styles = StyleSheet.create({
    boxStyles: {
      height: 50,
      justifyContent: 'center',
      borderRadius: 10,
      marginTop: 10,
      borderWidth: 1,
      borderColor: Color.border,
      backgroundColor: Color.White,
    },
  });
export default ShowName
