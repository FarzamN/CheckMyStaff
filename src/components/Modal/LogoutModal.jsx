import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {scale} from 'react-native-size-matters';
import {Color} from '../../utils/Color';
import CustomButton from '../CustomButton';
import {Font} from '../../utils/font';
import {GlobalStyle} from '../../Constants/GlobalStyle';
import VerificationModal from './VerificationModal';

const LogoutModal = props => {
  return (
    <VerificationModal visible={props.visible} onClose={props.onClose}>
      <View style={{alignItems: 'center', marginTop: '20%'}}>
        <Text style={styles.log}>Log out</Text>
        <Text style={styles.sub}>Are you sure you want to logout</Text>
      </View>
      <View style={[GlobalStyle.Row, {marginTop: '20%'}]}>
        <CustomButton
          Ripple={GlobalStyle.PurpleRipple}
          ButtonStyle={[
            GlobalStyle.ReverseBtn,
            {flex: 0.4, marginRight: scale(5)},
          ]}
          textStyle={{color: Color.Main}}
          onPress={props.onClose}
          title="Cancel"
        />
        <CustomButton
          Ripple={GlobalStyle.WhiteRipple}
          ButtonStyle={{flex: 0.4, marginLeft: scale(5)}}
          onPress={props.Logout}
          title="Confirm"
        />
      </View>
    </VerificationModal>
  );
};
const styles = StyleSheet.create({
  log: {
    color: Color.DarkBlue,
    fontFamily: Font.Poppins500,
    fontSize: scale(22),
  },
  sub: {
    color: Color.MidGrey,
    fontFamily: Font.Poppins400,
    fontSize: scale(14),
    marginTop: '5%',
  },
});
export default LogoutModal;
