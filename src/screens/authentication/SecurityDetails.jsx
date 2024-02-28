import {SafeAreaView, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {GlobalStyle} from '../../Constants/GlobalStyle';
import {StatusBar} from 'react-native';
import {Color} from '../../utils/Color';
import Header from '../../components/Header/Header';

import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import CustomButton from '../../components/CustomButton';
import {useForm} from 'react-hook-form';
import Validation from '../../components/Validation';
import PasswordInput from '../../components/PasswordInput';
import CheckBox from 'react-native-check-box';
import ErrorModal from '../../components/Modal/ErrorModal';
import {register} from '../../redux/actions/AuthActions';
import {useDispatch} from 'react-redux';
import Loading from '../../components/Modal/Loading';
import Error from '../../components/Modal/Error';

const SecurityDetails = ({navigation, route}) => {
  const dispatch = useDispatch();
  const accountType = route.params.type;
  const pastData = route.params.data;
  // console.log('pastData', pastData);
  const {
    state,
    residesInEstate,
    estate,
    govLocation,
    title,
    estateLocation,
    company_data,
  } = route.params;

  // console.log(company_data);
  const [index, setIndex] = useState(100);
  const [checkBox, setCheckBox] = useState(false);
  const [agree, setAgree] = useState(false);
  const [notMatch, setNotMatch] = useState(false);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(false);
  const [msg,setMsg] = useState('')

  console.log('notMatch', notMatch);
  console.log('agree', agree);

  console.log('accountType', accountType)

  const onSubmit = data => {
    if (data.password != data.ConfirmPassword) {
      setNotMatch(true);
      setTimeout(() => {
        setNotMatch(false);
      }, 1500);
    } else if (!checkBox) {
      setAgree(true);
      setTimeout(() => {
        setAgree(false);
      }, 1500);
    } else {
      dispatch(
        register(
          pastData,
          data,
          company_data,
          state,
          residesInEstate,
          estate,
          govLocation,
          title,
          estateLocation,
          accountType,
          setLoad,
          setError,
          setMsg
        ),
      );
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
      <Header
        title={'Security Details'}
        step
        step_title="4/4"
        gapp
        percentage={'100%'}
      />
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
              borderColor:
                index === 1
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
          />
          {errors.password && <Validation title={errors.password.message} />}
          <PasswordInput
            onFocus={() => {
              setIndex(2);
            }}
            style={{
              borderColor:
                index === 2
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

          <View style={[GlobalStyle.Row, {marginTop: verticalScale(20)}]}>
            <CheckBox
              checkBoxColor={'#32323266'}
              checkedCheckBoxColor={Color.Main}
              onClick={() => {
                setCheckBox(!checkBox);
              }}
              isChecked={checkBox}
              style={{marginRight: scale(5)}}
            />
            <Text style={{fontSize: scale(10), color: Color.MidGrey}}>
              I agree to{' '}
              <Text 
               onPress={() => navigation.navigate('Term')}
              style={{color: Color.Main, fontSize: scale(10)}}>
                Terms and Conditions
              </Text>
            </Text>
          </View>
        </View>
        <View style={GlobalStyle.EndBtnBox}>
          <CustomButton
            Ripple={GlobalStyle.WhiteRipple}
            title="confirm"
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </View>
      <ErrorModal isVisible={notMatch} message="Password is not matched" />
      <Loading isVisible={load} />
      <ErrorModal
        isVisible={agree}
        message="Please agree to terms and condition"
      />
      <Error isVisible={error} message={msg} onDismiss={() => setError(false)}/>
    </SafeAreaView>
  );
};

export default SecurityDetails;
