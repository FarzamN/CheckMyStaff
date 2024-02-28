import {StyleSheet, SafeAreaView, View, ScrollView} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {GlobalStyle} from '../../../Constants/GlobalStyle';
import Header from '../../../components/Header/Header';
import PasswordInput from '../../../components/PasswordInput';
import {Color} from '../../../utils/Color';
import {useForm} from 'react-hook-form';
import Validation from '../../../components/Validation';
import {verticalScale} from 'react-native-size-matters';
import CustomButton from '../../../components/CustomButton';
import Toast from 'react-native-simple-toast';
import { changePassword } from '../../../redux/actions/UserActions';
import Loading from '../../../components/Modal/Loading';
import { useDispatch } from 'react-redux';
import { DRAWER_COLOR } from '../../../redux/reducer/Holder';
import { useFocusEffect } from '@react-navigation/native';

const Security = ({navigation}) => {
  const dispatch = useDispatch();
  const [index, setIndex] = useState(100);
const [loader,setLoader] = useState(false)
const [error,setError] = useState(false)
const [msg,setMsg] = useState('')

const [oldError,setOldError] = useState(false)
const [oldMsg,setOldMsg] = useState('')

const [sameError,setSameError] = useState(false)
const [sameMsg,setSameMsg] = useState('')

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm({mode: 'all'});

  useFocusEffect(
    useCallback(() => {
      dispatch({ type:DRAWER_COLOR, payload: false })
    }, []),
  );
  
  


  const onSUbmut = (elm) => {
    if(elm?.c_password == elm?.new_password){
      changePassword(elm,setLoader,navigation,reset,setOldError,setOldMsg,setSameError,setSameMsg)
    }else{
      setError(true)
      setMsg('New password and Confirm password do not match')
    }
  }
  useEffect(() => {
    setSameError(false)
    setOldError(false)
    setError(false)
  }, [])
  return (
    <SafeAreaView style={GlobalStyle.container}>
      <Header title={'Security'} gapp />
      <ScrollView>
        <View style={GlobalStyle.grey_container}>
          <View style={GlobalStyle.Padding}>
            <PasswordInput
              onFocus={() => {
                setIndex(0);
              }}
              style={{
                borderColor: oldError ? Color.red :
                  index === 0
                    ? Color.Main
                    : errors.password
                    ? Color.red
                    : Color.border,
              }}
              Heading="Current Password"
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
            />
            {errors.password && <Validation title={errors.password.message} />}
            {oldError && <Validation title={oldMsg} />}

            <PasswordInput
              onFocus={() => {
                setIndex(1);
              }}
              style={{
                borderColor:error ? Color.red :
                  index === 1
                    ? Color.Main
                    : errors.ConfirmPassword
                    ? Color.red
                    : Color.border,
              }}
              Heading="New Password"
              control={control}
              name="new_password"
              rules={{
                required: '*New Password is required',
                minLength: {
                  value: 8,
                  message: '*New Password too short (minimum length is 8)',
                },
                maxLength: {
                  value: 16,
                  message: '*New Password too long (maximum length is 16)',
                },
              }}
              placeholder="New Password"
              maxLength={20}
            />
            {errors.new_password && (
              <Validation title={errors.new_password.message} />
            )}
            <PasswordInput
              onFocus={() => {
                setIndex(2);
              }}
              style={{
                borderColor: error ? Color.red :
                  index === 2
                    ? Color.Main
                    : errors.password
                    ? Color.red
                    : Color.border,
              }}
              Heading="Confirm Password"
              control={control}
              name="c_password"
              rules={{
                required: '*Confirm Password is required',
                minLength: {
                  value: 8,
                  message: '*Confirm Password too short (minimum length is 8)',
                },
                maxLength: {
                  value: 16,
                  message: '*Confirm Password too long (maximum length is 16)',
                },
              }}
              placeholder="Confirm Password"
              maxLength={20}
            />
            {errors.c_password && (
              <Validation title={errors.c_password.message} />
            )}
        {error && <Validation title={msg} />}
        {sameError && <Validation title={sameMsg} />}

          </View>
        </View>
        <View style={{height: verticalScale(20)}} />
      </ScrollView>
      <View style={GlobalStyle.EndBtnBox}>
        <CustomButton
          Ripple={GlobalStyle.PurpleRipple}
          title="Cancel"
          onPress={() => navigation.goBack()}
          ButtonStyle={[
            GlobalStyle.ReverseBtn,
            {flex: 0.45, borderColor: Color.MidGrey},
          ]}
          textStyle={{color: Color.Grey}}
        />
        <CustomButton
          title="Save"
          Ripple={GlobalStyle.WhiteRipple}
          onPress={handleSubmit(onSUbmut)}
          //  onPress={() =>
          //    navigation.navigate('WorkDetails', {type: accountType})
          //  }
          ButtonStyle={{flex: 0.45}}
        />
      </View>

      <Loading isVisible={loader} />
    </SafeAreaView>
  );
};

export default Security;

const styles = StyleSheet.create({});
