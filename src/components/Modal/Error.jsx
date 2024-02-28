import React from 'react';
import {View, Text, StyleSheet, StatusBar, Platform} from 'react-native';
import Modal from 'react-native-modal';
import {Color} from '../../utils/Color';
import {GlobalStyle} from '../../Constants/GlobalStyle';
import CustomButton from '../CustomButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {scale, verticalScale} from 'react-native-size-matters';
import {Font} from '../../utils/font';

const Error = ({message, isVisible, onDismiss}) => {
  return (
    <Modal
      onBackButtonPress={onDismiss}
      onBackdropPress={onDismiss}
      isVisible={isVisible}
      animationIn={'fadeInDownBig'}
      animationOut={"fadeOutUp"}
      backdropOpacity={0.7}
      style={[GlobalStyle.MainModal,{backgroundColor: Color.Non,marginTop: Platform.OS == 'android'? 0: 30}]}>
      <View style={GlobalStyle.ModalContainer}>
        <View style={[GlobalStyle.Row, {width: '90%', alignSelf: 'center'}]}>
          <AntDesign
            name="exclamationcircleo"
            color={Color.red}
            size={scale(20)}
          />
          <View style={{marginHorizontal: scale(10)}}>
            <Text style={[styles.Heading, {textAlign: 'left'}]}>Error!</Text>
            <Text style={styles.ModalText}>{message}</Text>
          </View>
        </View>

        <CustomButton
          Ripple={styles.Ripple}
          textStyle={{color: Color.red}}
          ButtonStyle={[GlobalStyle.ErrorBtn, {marginTop: verticalScale(20)}]}
          title="Dismiss"
          onPress={onDismiss}
        />
      </View>
    </Modal>
  );
};

export default Error;

const styles = StyleSheet.create({
  Ripple: {
    color: Color.white,
  },
  Heading: {
    fontFamily: Font.Inter500,
    fontSize: 15,
    color: Color.Black,
    marginBottom: 7,
  },
  ModalText: {
    fontSize: 13,
    color: Color.Grey,
    fontFamily: Font.Inter400,
  },
});
