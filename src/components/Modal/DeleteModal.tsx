import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {GlobalStyle} from '../../Constants/GlobalStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../utils/Color';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {Font} from '../../utils/font';
import CustomButton from '../CustomButton';

interface DeleteModalProps {
  visible: boolean;
  KeepPress: () => void;
  DeletePress: () => void;
  OnClose: () => void;
  value: string;
}

const DeleteModal: FC<DeleteModalProps> = ({
  visible,
  KeepPress,
  DeletePress,
  OnClose,
  value,
}) => {
  return (
    <Modal
      isVisible={visible}
      style={GlobalStyle.MainModal}
      onBackButtonPress={OnClose}
      onBackdropPress={OnClose}
      animationIn={'bounce'}
      animationOut={'bounceOut'}>
      <View style={[GlobalStyle.ModalContainer, styles.ModalContainer]}>
        <View style={styles.iconBox}>
          <Ionicons name="warning" color={Colors.Danger} size={scale(30)} />
        </View>
        <Text style={styles.Heading}>Delete {value}</Text>
        <Text style={styles.SubHeading}>
          {`You're`} going to delete {value}. Are you sure?
        </Text>
        <View style={[GlobalStyle.Row, {justifyContent: 'space-evenly'}]}>
          <CustomButton
            Ripple={GlobalStyle.PurpleRipple}
            onPress={KeepPress}
            textStyle={styles.textStyle}
            containerStyle={[
              styles.containerStyle,
              {backgroundColor: '#F5F5F7'},
            ]}
            title="No, Keep It."
          />
          <CustomButton
            Ripple={GlobalStyle.WhiteRipple}
            onPress={DeletePress}
            textStyle={[styles.textStyle, {color: Colors.White}]}
            containerStyle={[
              styles.containerStyle,
              {backgroundColor: Colors.Danger},
            ]}
            title="Yes, Delete!"
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  iconBox: {
    backgroundColor: 'rgba(153, 0, 0, 0.3)',
    borderRadius: 100,
    padding: moderateScale(5),
    alignSelf: 'center',
    marginBottom: verticalScale(5),
    aspectRatio: 1 / 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Heading: {
    color: Colors.Black,
    fontSize: scale(18),
    textAlign: 'center',
    fontFamily: Font.Poppins500,
  },
  SubHeading: {
    color: Colors.Black,
    fontSize: scale(14),
    textAlign: 'center',
    fontFamily: Font.Poppins400,
  },
  ModalContainer: {
    width: '80%',
    padding: 20,
  },
  containerStyle: {
    width: '45%',
    borderRadius: scale(30),
    borderWidth: 0,
    height: verticalScale(40),
  },
  textStyle: {
    fontSize: scale(13),
  },
});

export default DeleteModal;
