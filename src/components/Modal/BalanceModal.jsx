import React from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';
import VerificationModal from './VerificationModal';
import {GlobalStyle} from '../../Constants/GlobalStyle';
import {moderateScale, scale} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Color} from '../../utils/Color';
import {Font} from '../../utils/font';

const BalanceModal = ({
  visible,
  onPress,
  onClose,
  onPlus,
  onMinus,
  index,
  number,
  newModalStyle,
  newStylee
}) => {
  const plus = index === 1 ? Color.Main : Color.MidGrey;
  const minus = index === 2 ? Color.Main : Color.MidGrey;

  return (
    <VerificationModal
    newModalStyle={newModalStyle}
    newStylee={newStylee}
      Head
      Heading="Top up your balance"
      btn
      title="Make Payment"
      visible={visible}
      btn2
      BtnTwoTitle="do it later"
      onPress={onPress}
      onClose={onClose}>
      <View style={[GlobalStyle.Row, styles.minBox]}>
      <Pressable
          onPress={onMinus}
          style={[styles.iconBox, {borderColor: minus}]}
          android_ripple={GlobalStyle.PurpleRipple}>
          <AntDesign name="minus" color={minus} size={scale(25)} />
        </Pressable>
        <Text style={styles.value}>{number}</Text>
        <Pressable
          onPress={onPlus}
          style={[styles.iconBox, {borderColor: plus}]}
          android_ripple={GlobalStyle.PurpleRipple}>
          <AntDesign name="plus" color={plus} size={scale(25)} />
        </Pressable>
      </View>
    </VerificationModal>
  );
};

const styles = StyleSheet.create({
  iconBox: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(100),
    borderWidth: scale(1),
    padding: moderateScale(10),
  },
  value: {
    fontFamily: Font.Inter500,
    fontSize: scale(35),
    color: Color.DarkBlue,
  },
  minBox: {
    justifyContent: 'space-between',
    width: '90%',
    marginVertical: '15%',
  },
});
export default BalanceModal;
