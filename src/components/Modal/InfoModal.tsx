import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {GlobalStyle} from '../../Constants/GlobalStyle';
import {Color} from '../../utils/Color';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import CustomButton from '../CustomButton';

interface InfoModalProps {
  visible: Boolean;
  onClose: () => void;
  onBtnPress: () => void;
  value: string;
  sub: string;
}
const InfoModal: React.FC<InfoModalProps> = ({
  visible,
  onClose,
  onBtnPress,
  value,
  sub,
}) => {
  return (
    <Modal
      testID={'modal'}
      isVisible={visible}
      backdropOpacity={0.8}
      swipeDirection={'down'}
      onSwipeComplete={onClose}
      onBackdropPress={onClose}
      style={styles.modalStyling}>
      <View style={styles.modalView}>
        <View style={GlobalStyle.Line} />
        <Text style={GlobalStyle.Heading}>Information about {value}</Text>
        <Text
          style={[
            GlobalStyle.InputHeading,
            {paddingHorizontal: moderateScale(10)},
          ]}>
          {sub}
        </Text>
        <CustomButton
          Ripple={GlobalStyle.PurpleRipple}
          onPress={onClose}
          ButtonStyle={[
            GlobalStyle.ReverseBtn,
            {marginTop: verticalScale(30), marginBottom: verticalScale(20)},
          ]}
          textStyle={{color: Color.Main}}
          title="Close"
        />
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalView: {
    alignItems: 'center',
    backgroundColor: Color.White,
    width: '100%',
    borderTopRightRadius: scale(20),
    borderTopLeftRadius: scale(20),
  },
  modalStyling: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});

export default InfoModal;
