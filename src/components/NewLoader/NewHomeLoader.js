import {StyleSheet, Text, View, Image} from 'react-native';
import React, {FC} from 'react';
import {scale, verticalScale} from 'react-native-size-matters';
import {Color} from '../../utils/Color';
import {Font} from '../../utils/font';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const NewHomeLoader = () => {
  return (
    <View style={[styles.Container, {marginTop: props.marginTop}]}>
    <View
      style={[
        styles.ImageBox,
        {backgroundColor: props.isImage ? '#F5F5F5' : '#575E6E'},
      ]}>
      {props.isImage ? (
        <Image
          source={require('../../assets/image/emptyRecords.png')}
          resizeMode="contain"
          style={{width: '70%', height: '70%'}}
        />
      ) : (
        <MaterialCommunityIcons
          color={Color.White}
          name="check-decagram-outline"
          size={scale(40)}
        />
      )}
    </View>
    <Text style={styles.Heading}>{props.Heading}</Text>
    <Text style={styles.SubHeading}>{props.SubHeading}</Text>
  </View>
  )
}

export default NewHomeLoader

const styles = StyleSheet.create({
    Container: {
      alignItems: 'center',
    },
  
    ImageBox: {
      marginBottom: verticalScale(12),
      borderRadius: 100,
      width: scale(80),
      aspectRatio: 1 / 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    Heading: {
      color: Color.DarkBlue,
      fontSize: scale(16),
      fontFamily: Font.Poppins600,
    },
    SubHeading: {
      color: Color.MidGrey,
      fontSize: scale(11.5),
      fontFamily: Font.Poppins500,
    },
  });