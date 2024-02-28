import React, { FC } from 'react';
import { Text, View } from 'react-native';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';
import { Colors } from '../../utils/Color';
import { GlobalStyle } from '../../Constants/GlobalStyle';
import { verticalScale } from 'react-native-size-matters';

interface ConnectionModalProps {
  isVisible: boolean;
}

const ConnectionModal: FC<ConnectionModalProps> = ({ isVisible }) => {
  return (
    <Modal
      isVisible={isVisible}
      style={[GlobalStyle.MainModal, { backgroundColor: 'rgba(0,0,0,0.5)' }]}>
      <View style={GlobalStyle.ModalContainer}>
        <LottieView
          autoPlay
          style={[GlobalStyle.LottieView, { marginVertical: verticalScale(13) }]}
          source={require('../../assets/lotti/noInternetConnection.json')}
        />
        <Text style={[GlobalStyle.ModalText, { color: Colors.Danger }]}>
          {"You don't have internet connection"}
        </Text>
      </View>
    </Modal>
  );
};

export default ConnectionModal;
