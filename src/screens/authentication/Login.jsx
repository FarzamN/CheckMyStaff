import React, {useEffect, useState} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import {Color} from '../../utils/Color';
import {GlobalStyle} from '../../Constants/GlobalStyle';
import {moderateScale, scale} from 'react-native-size-matters';
import CustomInput from '../../components/CustomInput';
import {useForm} from 'react-hook-form';
import Validation from '../../components/Validation';
import PasswordInput from '../../components/PasswordInput';
import CustomButton from '../../components/CustomButton';
import {Font} from '../../utils/font';
import {useDispatch} from 'react-redux';
import {login_api} from '../../redux/actions/AuthActions';
import Loading from '../../components/Modal/Loading';
import Error from '../../components/Modal/Error';

const Login = ({navigation}) => {
  const [index, setIndex] = useState(100);
  const [load, setLoad] = useState(false);
  const [isError, setIsError] = useState(false);
  const [msg, setmsg] = useState('');
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({mode: 'all'});

  const onSubmit = data => {
    dispatch(login_api(data, setLoad, setIsError, setmsg));
  };

  useEffect(() => {
    setIsError(false)
  }, [])
  

  return (
    <SafeAreaView style={GlobalStyle.grey_container}>
      <StatusBar
        translucent={false}
        backgroundColor={Color.LightGrey}
        barStyle="dark-content"
      />
      <View style={styles.MainContainer}>
        <Text style={[GlobalStyle.Heading]}>Welcome Back</Text>
        <Text
          style={[
            GlobalStyle.subHeading,
            {color: Color.Grey, textAlign: 'center', marginTop: 15},
          ]}>
          Please enter your details to sign in
        </Text>
      </View>
      <View
        style={[styles.MainContainer, {paddingHorizontal: moderateScale(15)}]}>
        <CustomInput
          onFocus={() => {
            setIndex(0);
          }}
          style={{
            borderColor: isError
              ? Color.red
              : index === 0
              ? Color.Main
              : errors.email
              ? Color.red
              : Color.border,
          }}
          Heading="Email"
          control={control}
          keyboardType="email-address"
          name="email"
          rules={{
            required: '*Email is required',
            pattern: {
              value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
              message: 'Email is not valid',
            },
          }}
          placeholder="Email Address"
          // defaultValue="corporateapp@logicsdrive.com"
          // defaultValue="naeem@larasoft.io"
          // defaultValue="corporate@gmail.com"
        />
        {errors.email && <Validation title={errors.email.message} />}
        <PasswordInput
          onFocus={() => {
            setIndex(1);
          }}
          style={{
            borderColor: isError
              ? Color.red
              : index === 1
              ? Color.Main
              : errors.password
              ? Color.red
              : Color.border,
          }}
          Heading="Password"
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
          placeholderTextColor={'#32323266'}
          // defaultValue="12345678"
        />
        {errors.password && <Validation title={errors.password.message} />}
        {isError && <Validation title={msg} />}
        <Text
          onPress={() => navigation.navigate('find_account')}
          style={GlobalStyle.InputHeading}>
          Forgot Password
        </Text>
        <CustomButton
          Ripple={GlobalStyle.WhiteRipple}
          onPress={handleSubmit(onSubmit)}
          ButtonStyle={styles.MainContainer}
          title="Log In"
        />
        <Text
          style={[
            GlobalStyle.InputHeading,
            styles.MainContainer,
            {textAlign: 'center', fontSize: scale(13)},
          ]}>
          {`Don't have an account?`}
          {'  '}
          <Text
            onPress={() => navigation.navigate('AccountType')}
            style={[
              GlobalStyle.InputHeading,
              {color: Color.Main, fontSize: 13},
            ]}>
            Sign Up{' '}
          </Text>
        </Text>
      </View>
      <Loading isVisible={load} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    marginTop: '12%',
    width: '100%',
  },
  SubHeading: {
    textAlign: 'center',
    color: Color.Black,
    fontSize: 14,
    fontFamily: Font.Poppins500,
  },
});

export default Login;
