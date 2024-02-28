import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LottieView from 'lottie-react-native';
import {scale} from 'react-native-size-matters';
import ReactNativeModal from 'react-native-modal';
import {GlobalStyle} from '../../Constants/GlobalStyle';
import {Color} from '../../utils/Color';

const ErrorModal = ({isVisible, message}) => {
  return (
    <ReactNativeModal
      isVisible={isVisible}
      style={[styles.modal, GlobalStyle.Container]}>
      <View style={styles.buttons}>
        <View
          style={[
            GlobalStyle.LottieView,
            {
              width: 120,
            },
          ]}>
          <LottieView
            autoPlay
            style={{
              height: '100%',
              width: '100%',
            }}
            source={require('../../assets/lotti/error.json')}
          />
        </View>

        <Text style={[GlobalStyle.ModalText, {color: Color.red}]}>
          {message}
        </Text>
      </View>
    </ReactNativeModal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
  buttons: {
    backgroundColor: '#fff',
    width: '70%',
    alignSelf: 'center',
    borderRadius: scale(15),
  },
});
export default ErrorModal;
