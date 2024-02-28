import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {GlobalStyle} from '../../Constants/GlobalStyle';
import CustomButton from '../CustomButton';
import {Color} from '../../utils/Color';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {Font} from '../../utils/font';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import {Image} from 'react-native-animatable';
import Icon from '../../assets/image/Icon.svg';

const TopupModal = ({
  visible,
  onClose,
  onBtnPress,
  check,
  onCheckPress,
  addEmp,
  subText,
  newText,
  doIt,
  neewStyle,
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
        <View style={[GlobalStyle.Line, {marginVertical: 0}]} />
        <View style={styles.modalView}>
          {addEmp ? (
            <View
              style={{
                borderRadius: 100,
                height: 88,
                width: 88,
              }}>
              <Image
                resizeMode="contain"
                source={require('../../assets/image/newimg.png')}
                style={{
                  height: '100%',
                  width: '100%',
                }}
              />
            </View>
          ) : check ? (
            <View
              style={[
                styles.iconBox,
                {backgroundColor: addEmp ? '#00C099' : '#E1F4F0'},
              ]}>
              <Octicons name="check-circle" color="#00C099" size={30} />
            </View>
          ) : (
            <View
              style={[
                styles.iconBox,
                {backgroundColor: addEmp ? '#00C099' : '#E1F4F0'},
              ]}>
              <Ionicons name="wallet-outline" color="#00C099" size={30} />
            </View>
          )}
          <Text
            style={[
              GlobalStyle.Heading,
              {
                marginVertical: 10,
                textAlign: 'center',
                color: Color.Black,
                fontSize: 16,
                fontFamily: Font.Inter500,
              },
            ]}>
            {check ? 'Success!' : 'Top Up account'}
          </Text>
          {addEmp ? (
            <Text style={[styles.SubHeading, neewStyle]}>{subText}</Text>
          ) : (
            <>
              <Text style={styles.SubHeading}>
                {check
                  ? 'Your Identity has been verified. Successfully thank you'
            //       : `You have no funds in your account to verify your Identity. Top up
            // your account before can continue`}
            : "Verification costs N500, please top up your wallet to verify"}
              </Text>
            </>
          )}
        </View>
        {addEmp ? (
          <>
            <CustomButton
              Ripple={GlobalStyle.WhiteRipple}
              title={newText ? newText : 'Update Information'}
              onPress={onBtnPress}
              ButtonStyle={{
                marginBottom: 10,
              }}
            />
            {!doIt ? (
              <CustomButton
                Ripple={GlobalStyle.PurpleRipple}
                title="Do it Later"
                onPress={onClose}
                ButtonStyle={styles.TransparentButton}
                textStyle={styles.TransparentButtonText}
              />
            ) : null}
          </>
        ) : check ? (
          <CustomButton
            Ripple={GlobalStyle.PurpleRipple}
            title="Done"
            onPress={onCheckPress}
            ButtonStyle={GlobalStyle.ReverseBtn}
            textStyle={{color: Color.Main}}
          />
        ) : (
          <>
            <CustomButton
              Ripple={GlobalStyle.WhiteRipple}
              title="Top Up Balance"
              onPress={onBtnPress}
              ButtonStyle={{
                marginBottom: 10,
              }}
            />
            <CustomButton
              Ripple={GlobalStyle.PurpleRipple}
              title="Do it Later"
              onPress={onClose}
              ButtonStyle={styles.TransparentButton}
              textStyle={styles.TransparentButtonText}
            />
          </>
        )}
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  SubHeading: {
    color: Color.Grey,
    fontSize: 15,
    fontFamily: Font.Inter300,
    width: '80%',
    textAlign: 'center',
  },
  modalStyling: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.White,
    // padding: 20,
    width: '100%',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    flex: 0.9,
  },
  Later: {
    color: Color.MidGrey,
    marginTop: 10,
  },
  iconBox: {
    borderRadius: 100,
    padding: 20,
  },
  TransparentButton: {
    backgroundColor: Color.Non,
    borderColor: Color.Non,
  },
  TransparentButtonText: {
    color: Color.Grey,
  },
});
export default TopupModal;
