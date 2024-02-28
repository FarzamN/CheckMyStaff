import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';

import {GlobalStyle} from '../../Constants/GlobalStyle';

interface SuccessProps {
  message: String;
  isVisible: Boolean;
}
const Success: React.FC<SuccessProps> = ({message, isVisible}) => {
  return (
    <Modal visible={isVisible} style={GlobalStyle.MainModal}>
      <SafeAreaView style={GlobalStyle.ModalContainer}>
        <LottieView
          autoPlay
          loop={false}
          style={GlobalStyle.LottieView}
          source={require('../../assets/lotti/success.json')}
        />
        <Text style={GlobalStyle.ModalText}>{message}</Text>
      </SafeAreaView>
    </Modal>
  );
};
export default Success;
