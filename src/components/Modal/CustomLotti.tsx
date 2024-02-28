import {Text, SafeAreaView} from 'react-native';
import React from 'react';

import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';
import {GlobalStyle} from '../../Constants/GlobalStyle';

interface CustomLottiProps {
  isVisible: boolean;
  Title: string;
  source: any; // Replace 'any' with the correct type of your Lottie source
  Title2?: string;
  TitleTrue: boolean;
  TextRestyle?: any; // Replace 'any' with the correct type for TextRestyle
}

const CustomLotti: React.FC<CustomLottiProps> = ({
  isVisible,
  Title,
  source,
  Title2,
  TitleTrue,
  TextRestyle,
}) => {
  return (
    <SafeAreaView style={{justifyContent: 'center'}}>
      <Modal isVisible={isVisible} style={GlobalStyle.MainModal}>
        <SafeAreaView style={GlobalStyle.ModalContainer}>
          <LottieView autoPlay style={GlobalStyle.LottieView} source={source} />
          <Text style={[GlobalStyle.ModalText, TextRestyle]}>{Title}</Text>
          {TitleTrue ? (
            <Text style={[GlobalStyle.ModalText, {padding: 0}]}>{Title2}</Text>
          ) : null}
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

export default CustomLotti;
