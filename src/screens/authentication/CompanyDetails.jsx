import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {GlobalStyle} from '../../Constants/GlobalStyle';
import {StatusBar} from 'react-native';
import {Color} from '../../utils/Color';
import Header from '../../components/Header/Header';
import {Titles} from '../../Constants/Data';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import {useForm} from 'react-hook-form';
import CustomDropDown from '../../components/CustomDropDownPicker';
import Validation from '../../components/Validation';
import ErrorModal from '../../components/Modal/ErrorModal';
import {checkEmailAddress} from '../../redux/actions/AuthActions';
import Error from '../../components/Modal/Error';

const CompanyDetails = ({navigation, route}) => {
  const accountType = route.params.type;

  const [index, setIndex] = useState(100);
  const [fill, setFill] = useState(false);

  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState('');

  const [title, setTitle] = useState(null);

  const type = accountType == 'Corporate';

  const fillIt = () => {
    setFill(true);
    setTimeout(() => {
      setFill(false);
    }, 2000);
  };
  const onSubmit = data => {
    if (type) {
      if (title == null) {
        fillIt();
      } else {
        checkEmailAddress(
          accountType,
          data,
          title,
          navigation,
          setLoader,
          setError,
          setMsg,
        );
        // navigation.navigate('WorkDetails', {
        //   type: accountType,
        //   company_data: data,
        //   title: title,
        // });
      }
    } else {
      if (title == null) {
        fillIt();
      } else {
        checkEmailAddress(
          accountType,
          data,
          title,
          navigation,
          setLoader,
          setError,
          setMsg,
        );
        // navigation.navigate('WorkDetails', {
        //   type: accountType,
        //   company_data: data,
        //   title: title,
        // });
      }
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
        title={type ? 'Company Details' : 'Personal Details'}
        step
        step_title="2/4"
        percentage="50%"
        isBtnTitle
        BtnTitle="save"
      />
      <View style={GlobalStyle.grey_container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {type ? (
            <View style={styles.Container_View}>
              <CustomInput
                onFocus={() => {
                  setIndex(0);
                }}
                style={{
                  borderColor:
                    index === 0
                      ? Color.Main
                      : errors.companyName
                      ? Color.red
                      : Color.border,
                }}
                Heading="Compnay Name"
                control={control}
                name="companyName"
                rules={{
                  required: '*Company Name is required',
                }}
                placeholder="Company Name"
              />
              {errors.companyName?.message && (
                <Validation title={errors.companyName.message} />
              )}
              <CustomInput
                onFocus={() => {
                  setIndex(5);
                }}
                style={{
                  borderColor:
                    index === 5
                      ? Color.Main
                      : errors.industry
                      ? Color.red
                      : Color.border,
                }}
                Heading="Industry*"
                control={control}
                name="industry"
                rules={{
                  required: '*Industry is Required',
                }}
                placeholder="Industry"
              />
              {errors.industry?.message && (
                <Validation title={errors?.industry?.message} />
              )}
              <CustomInput
                onFocus={() => {
                  setIndex(1);
                }}
                style={{
                  borderColor:
                    index === 1
                      ? Color.Main
                      : errors.CACNumber
                      ? Color.red
                      : Color.border,
                }}
                Heading="CAC Registration Number*"
                control={control}
                keyboardType="number-pad"
                name="CACNumber"
                rules={{
                  required: '*CAC Registration Number is Required',
                }}
                placeholder="CAC Registration Number"
              />
              {errors.CACNumber?.message && (
                <Validation title={errors?.CACNumber?.message} />
              )}

              <CustomDropDown
                Heading={'Title'}
                items={Titles}
                value={title}
                setValue={value => setTitle(value)}
              />
              <View style={GlobalStyle.VerticalSpace} />
              <CustomInput
                onFocus={() => {
                  setIndex(2);
                }}
                style={{
                  borderColor:
                    index === 2
                      ? Color.Main
                      : errors.f_name
                      ? Color.red
                      : Color.border,
                }}
                Heading="First Name*"
                control={control}
                name="f_name"
                rules={{
                  required: '*First Name is required',
                }}
                placeholder="First Name"
              />
              {errors.f_name && <Validation title={errors.f_name.message} />}
              <CustomInput
                onFocus={() => {
                  setIndex(3);
                }}
                style={{
                  borderColor:
                    index === 3
                      ? Color.Main
                      : errors.l_name
                      ? Color.red
                      : Color.border,
                }}
                Heading="Last Name*"
                control={control}
                name="l_name"
                rules={{
                  required: '*Last Name is required',
                }}
                placeholder="Last Name"
              />
              {errors.l_name && <Validation title={errors.l_name.message} />}
              <CustomInput
                onFocus={() => {
                  setIndex(4);
                }}
                style={{
                  borderColor: error
                  ? Color.red
                  :
                    index === 4
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
              />
              {errors.email && <Validation title={errors.email.message} />}
              {error && <Validation title={msg} />}

              {/* <CustomInput
                onFocus={() => {
                  setIndex(5);
                }}
                style={{
                  borderColor:
                    index === 5
                      ? Color.Main
                      : errors.email
                      ? Color.red
                      : Color.border,
                }}
                Heading="Website"
                control={control}
                keyboardType="email-address"
                name="website"
                defaultValue="https://www.checkmypeople.com/corporate/register"
                value="https://www.checkmypeople.com/corporate/register"
                rules={{
                  required: '*Website is required',
                }}
                placeholder="https//www.example.com"
              /> */}
            </View>
          ) : (
            <View style={styles.Container_View}>
              <CustomDropDown
                Heading={'Title'}
                items={Titles}
                value={title}
                setValue={value => setTitle(value)}
              />

              <CustomInput
                onFocus={() => {
                  setIndex(0);
                }}
                style={{
                  borderColor:
                    index === 0
                      ? Color.Main
                      : errors.firstName
                      ? Color.red
                      : Color.border,
                }}
                Heading="First Name"
                control={control}
                name="f_name"
                rules={{
                  required: '*Name is required',
                }}
                placeholder="First Name"
              />
              {errors.firstName?.message && (
                <Validation title={errors.firstName.message} />
              )}
              <CustomInput
                onFocus={() => {
                  setIndex(1);
                }}
                style={{
                  borderColor:
                    index === 1
                      ? Color.Main
                      : errors.lastName
                      ? Color.red
                      : Color.border,
                }}
                Heading="Last Name*"
                control={control}
                name="l_name"
                rules={{
                  required: '*Last Name is Required',
                }}
                placeholder="Last Name"
              />
              {errors.lastName?.message && (
                <Validation title={errors.lastName.message} />
              )}
              <CustomInput
                onFocus={() => {
                  setIndex(3);
                }}
                style={{
                  borderColor: error
                    ? Color.red
                    : index === 3
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
                placeholder="Email address"
              />
              {errors.email?.message && (
                <Validation title={errors.email.message} />
              )}
              {error && <Validation title={msg} />}

              <CustomInput
                onFocus={() => {
                  setIndex(4);
                }}
                style={{
                  borderColor:
                    index === 4
                      ? Color.Main
                      : errors.number
                      ? Color.red
                      : Color.border,
                }}
                Heading="Telephone"
                control={control}
                keyboardType={'number-pad'}
                name="number"
                rules={{
                  required: '*Phone Number is required',
                }}
                placeholder="Phone Number"
              />
              {errors.number?.message && (
                <Validation title={errors.number.message} />
              )}
              {/* <CustomDropDown
                Heading={'Resides in an Estate*'}
                items={ResidesInEstate}
                value={residesInEstate}
                setValue={value => locationShowing(value)}
              /> */}
              {/* {showLocation && (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                  }}>
                  <CustomDropDown
                    style={{flex: 0.45}}
                    Heading={'Estate Location'}
                    items={EstateLocation}
                    value={estate_Location_value}
                    setValue={value => setEstateLocation(value)}
                  />
                  <CustomDropDown
                    style={{flex: 0.45}}
                    Heading={'Choose Estate'}
                    items={Titles}
                    value={estate}
                    setValue={value => setEstate(value)}
                  />
                </View>
              )} */}

              <View style={{height: verticalScale(20)}} />
            </View>
          )}
        </ScrollView>
      </View>
      <View style={GlobalStyle.EndBtnBox}>
        <CustomButton
          Ripple={GlobalStyle.PurpleRipple}
          textStyle={{color: Color.Main}}
          title="Back"
          onPress={() => navigation.goBack()}
          ButtonStyle={[GlobalStyle.ReverseBtn, {flex: 0.45}]}
        />
        {type ? (
          <CustomButton
            disabled={loader}
            loader={loader}
            Ripple={GlobalStyle.WhiteRipple}
            title="Continue"
            onPress={handleSubmit(onSubmit)}
            ButtonStyle={{flex: 0.45}}
          />
        ) : (
          <CustomButton
            disabled={loader}
            loader={loader}
            Ripple={GlobalStyle.WhiteRipple}
            title="Continue"
            onPress={handleSubmit(onSubmit)}
            ButtonStyle={{flex: 0.45}}
          />
        )}
      </View>
      <ErrorModal isVisible={fill} message="Please fill the from" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
    borderRadius: scale(10),
    padding: moderateScale(20),
    marginTop: verticalScale(10),
    borderWidth: scale(1),
  },
  parent: {
    borderWidth: scale(1),
    borderRadius: scale(100),
    height: verticalScale(10),
    aspectRatio: 1 / 1,
  },
  child: {
    backgroundColor: Color.Main,
    borderRadius: scale(100),
    flex: 1,
    margin: scale(1),
  },
  Container_View: {
    flex: 1,
    paddingHorizontal: moderateScale(15),
    marginTop: scale(10),
  },
});

export default CompanyDetails;
