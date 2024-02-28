import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LottieView from 'lottie-react-native';
import {Color} from '../../utils/Color';
import {scale} from 'react-native-size-matters';
import Modal from 'react-native-modal';
import {GlobalStyle} from '../../Constants/GlobalStyle';

const Loading = ({isVisible, onClose}) => {
  return (
    <Modal
      testID="modal"
      statusBarTranslucent
      onBackdropPress={onClose}
      animationIn={'bounceInRight'}
      animationOut={'bounceOutLeft'}
      isVisible={isVisible}
      style={[styles.modal, GlobalStyle.container]}>
      <View style={styles.buttons}>
      <View        style={[GlobalStyle.LottieView,{
          // backgroundColor:'red',
          width:120
        }]}>
        <LottieView
          autoPlay
          style={{
            height:'100%',
            width:'100%'
          }}
          source={require('../../assets/lotti/loader.json')}
        />
        </View>
        {/* <LottieView
          autoPlay
          style={GlobalStyle.LottieView}
          source={require('../../assets/lotti/loader.json')}
        /> */}
        <Text style={GlobalStyle.ModalText}>Please Wait...</Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
  buttons: {
    backgroundColor: Color.White,
    width: '60%',
    alignSelf: 'center',
    borderRadius: scale(20),
  },
});
export default Loading;
