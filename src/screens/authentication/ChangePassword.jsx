import {StyleSheet, Text, View, StatusBar, SafeAreaView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {GlobalStyle} from '../../Constants/GlobalStyle';
import {Color} from '../../utils/Color';
import {useForm} from 'react-hook-form';
import Header from '../../components/Header/Header';
import Validation from '../../components/Validation';
import PasswordInput from '../../components/PasswordInput';
import {moderateScale, scale} from 'react-native-size-matters';
import CustomButton from '../../components/CustomButton';
import ErrorModal from '../../components/Modal/ErrorModal';
import Loading from '../../components/Modal/Loading';
import {change_password} from '../../redux/actions/AuthActions';
import Error from '../../components/Modal/Error';

const ChangePassword = ({navigation}) => {
  const [index, setIndex] = useState(100);
  const [notMatch, setNotMatch] = useState(false);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState('');

  const onSubmit = data => {
    if (data.password == data.ConfirmPassword) {
      change_password(data, navigation, setLoad, setError, setMsg);
    } else {
      setNotMatch(true);
      setTimeout(() => {
        setNotMatch(false);
      }, 2000);
    }
  };
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({mode: 'all'});
  useEffect(() => {
    setError(false)
  }, [])
  
  return (
    <SafeAreaView style={GlobalStyle.container}>
      <StatusBar
        translucent={false}
        backgroundColor={Color.white}
        barStyle="dark-content"
      />
      <Header title={'Reset Your password'} gapp />
      <View style={GlobalStyle.grey_container}>
        <View
          style={{
            flex: 1,
            paddingHorizontal: moderateScale(15),
            marginTop: scale(10),
          }}>
          <PasswordInput
            onFocus={() => {
              setIndex(1);
            }}
            style={{
              borderColor: notMatch
                ? Color.red
                : index === 1
                ? Color.Main
                : errors.password
                ? Color.red
                : Color.border,
            }}
            Heading="Create Password"
            control={control}
            name="password"
            rules={{
              required: '*Password is required',
              minLength: {
                value: 8,
                message: '*Password too short (minimum length is 8)',
              },
              maxLength: {
                value: 16,
                message: '*Password too long (maximum length is 16)',
              },
            }}
            placeholder="Password"
            maxLength={20}
          />
          {errors.password && <Validation title={errors.password.message} />}
          <PasswordInput
            onFocus={() => {
              setIndex(2);
            }}
            style={{
              borderColor: notMatch
                ? Color.red
                : index === 2
                ? Color.Main
                : errors.ConfirmPassword
                ? Color.red
                : Color.border,
            }}
            Heading="Confirm Password"
            control={control}
            name="ConfirmPassword"
            rules={{
              required: '*Password is required',
              minLength: {
                value: 8,
                message: '*Password too short (minimum length is 8)',
              },
              maxLength: {
                value: 16,
                message: '*Password too long (maximum length is 16)',
              },
            }}
            placeholder="Password"
            maxLength={20}
          />
          {errors.ConfirmPassword && (
            <Validation title={errors.ConfirmPassword.message} />
          )}
          {notMatch && <Validation title="Password is not matched" />}
        </View>
        <View style={GlobalStyle.EndBtnBox}>
          <CustomButton
            Ripple={GlobalStyle.WhiteRipple}
            title="confirm"
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </View>
      {/* <ErrorModal isVisible={notMatch} message="Password is not matched" /> */}
      <Loading onClose={() => setLoad(false)} isVisible={load} />
      <Error
        isVisible={error}
        message={msg}
        onDismiss={() => setError(false)}
      />
    </SafeAreaView>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({});
