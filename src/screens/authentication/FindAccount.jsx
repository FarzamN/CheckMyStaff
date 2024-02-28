import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, SafeAreaView, StatusBar} from 'react-native';
import {GlobalStyle} from '../../Constants/GlobalStyle';
import {Color} from '../../utils/Color';
import Header from '../../components/Header/Header';
import {scale, moderateScale} from 'react-native-size-matters';
import CustomInput from '../../components/CustomInput';
import {useForm} from 'react-hook-form';
import Validation from '../../components/Validation';
import CustomButton from '../../components/CustomButton';
import Loading from '../../components/Modal/Loading';
import {useDispatch} from 'react-redux';
import {find_account} from '../../redux/actions/AuthActions';
import Error from '../../components/Modal/Error';

const FindAccount = ({navigation}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [msg,setMsg] = useState('')
  
  const onSubmit = data => {
    dispatch(find_account(data, navigation, setLoading,setError,setMsg));
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
      <Header title="Find your account" gapp />
      <View style={styles.MainBox}>
        <Text style={[GlobalStyle.Heading, {fontSize: scale(14)}]}>
          Please enter your email to get an otp
        </Text>
        <CustomInput
        
          style={{
            borderColor:
            error
            ? Color.red
            : Color.Main,
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
        />
        {errors.email && <Validation title={errors.email.message} />}
        {error && <Validation title={msg} />}
        <View style={{height: '20%'}} />
        <CustomButton
          Ripple={GlobalStyle.WhiteRipple}
          onPress={handleSubmit(onSubmit)}
          ButtonStyle={{width: '100%'}}
          title="Verify"
        />
      </View>
      <Loading isVisible={loading} onClose={() => setLoading(false)} />

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  MainBox: {
    paddingHorizontal: moderateScale(18),
    marginTop: '12%',
  },
});
export default FindAccount;
