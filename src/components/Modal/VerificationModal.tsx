import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {GlobalStyle} from '../../Constants/GlobalStyle';
import Modal from 'react-native-modal';
import {scale, verticalScale} from 'react-native-size-matters';
import {Color} from '../../utils/Color';
import {Font} from '../../utils/font';
import CustomButton from '../CustomButton';

interface VerificationModalProps {
  btn2: Boolean;
  visible: Boolean;
  onClose: () => void;
  ButtonStyle: object;
  textStyle: object;
  newStylee: object;
  Data: object;
  children: any;
  Head: boolean;
  Heading: string;
  onPress: () => void;
  btn: Boolean;
  propagateSwipe: Boolean;
  title: string;
  BtnTwoTitle: string;
}

const VerificationModal: React.FC<VerificationModalProps> = ({
  visible,
  onClose,
  children,
  Head,
  Heading,
  onPress,
  btn,
  title,
  ButtonStyle,
  textStyle,
  btn2,
  BtnTwoTitle,
  propagateSwipe,
  newModalStyle,
  newTopStyle,
  newStylee
}) => {
  return (
    <>
      <Modal
        testID={'modal'}
        isVisible={visible}
        propagateSwipe={propagateSwipe}
        statusBarTranslucent
        backdropOpacity={0.8}
        swipeDirection={'down'}
        onSwipeComplete={onClose}
        onBackdropPress={onClose}
        style={styles.modalStyling}>
        <View style={[styles.modalView, newModalStyle]}>
          <View style={GlobalStyle.Line} />
          {Head && <Text style={styles.Heading}>{Heading}</Text>}
          {children}
          {btn && (
            <CustomButton
              title={title}
              Ripple={
                ButtonStyle ? GlobalStyle.PurpleRipple : GlobalStyle.WhiteRipple
              }
              onPress={onPress}
              textStyle={textStyle}
              ButtonStyle={[
                ButtonStyle,
                {
                  top: newTopStyle ? newTopStyle : 20,
                },
              ]}
            />
          )}
          {btn2 && (
            <CustomButton
              title={BtnTwoTitle}
              Ripple={GlobalStyle.PurpleRipple}
              onPress={onClose}
              textStyle={{color: Color.MidGrey}}
              ButtonStyle={[styles.BtnTwoStyle,newStylee]}
            />
          )}
        </View>
      </Modal>
    </>
  );
};
const styles = StyleSheet.create({
  Heading: {
    color: Color.DarkBlue,
    fontFamily: Font.Inter500,
    fontSize: 17,
    marginVertical: 10,
  },
  modalView: {
    alignItems: 'center',
    backgroundColor: Color.LightGrey,
    width: '100%',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    flex: 0.55,
  },
  modalStyling: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  BtnTwoStyle: {
    backgroundColor: Color.Non,
    borderColor: Color.Non,
  },
});

export default VerificationModal;
