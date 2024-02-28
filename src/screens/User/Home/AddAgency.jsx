import {StyleSheet, Text, View, SafeAreaView, ScrollView} from 'react-native';
import React, {FC, useState} from 'react';
import {GlobalStyle} from '../../../Constants/GlobalStyle';
import {moderateVerticalScale} from 'react-native-size-matters';
import Header from '../../../components/Header/Header';
import CustomInput from '../../../components/CustomInput';
import {Color} from '../../../utils/Color';
import Validation from '../../../components/Validation';
import {useForm} from 'react-hook-form';
import CustomButton from '../../../components/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import CustomDropDown from '../../../components/CustomDropDownPicker';
import {City, Conduct} from '../../../Constants/Data';
import {addAgencyData} from '../../../redux/actions/UserActions';

// interface AddAgencyProps {
//   navigation: any;
// }
const AddAgency = ({navigation, route}) => {
  const {data, setData} = route.params;
  const dispatch = useDispatch();

  const states = useSelector(state => state.state_value);
  const incidence_types = useSelector(state => state.incidence_types);

  const [index, setIndex] = useState(99);
  const [city, setCity] = useState('');
  const [assesment, setAssesment] = useState('');
  const [state, setState] = useState('');
  const [stateId, setState_id] = useState('');
  const [loader, setLoader] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    mode: 'all',
    // defaultValues:{
    //   name: data?.AgencyName,
    //   cvc: data?.AgencyName,
    //   address: data?.AgencyAddress,
    //   state: data?.AgencyName,
    //   city: data?.AgencyCity,
    //   contact: data?.AgencyContactPerson,
    //   email: data?.AgencyEmail,
    //   website: data?.website
    // }
  });

  const handleOnSubmit = elm => {
    console.log('elm', elm);
    dispatch(addAgencyData(elm, stateId, city, setLoader, navigation, setData));
    // navigation.navigate('home')
  };
  return (
    <SafeAreaView style={GlobalStyle.container}>
      <Header title="Add Agency" gapp />
      <View
        style={[
          GlobalStyle.grey_container,
          GlobalStyle.Padding,
          {paddingTop: moderateVerticalScale(20)},
        ]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <CustomInput
            onFocus={() => {
              setIndex(0);
            }}
            style={{
              borderColor:
                index === 0
                  ? Color.Main
                  : errors.name
                  ? Color.red
                  : Color.border,
            }}
            rules={{
              required: 'Agency name is required',
            }}
            Heading="Agency Name"
            control={control}
            name="name"
            placeholder="Agency Name"
          />
          {errors.name && <Validation title={errors.name.message} />}
          <CustomInput
            onFocus={() => {
              setIndex(1);
            }}
            style={{
              borderColor:
                index === 1
                  ? Color.Main
                  : errors.cac
                  ? Color.red
                  : Color.border,
            }}
            rules={{
              required: 'CAC is required',
            }}
            Heading="CAC"
            keyboardType="numeric"
            control={control}
            name="cac"
            placeholder="CAC"
          />
          {errors.cac && <Validation title={errors.cac.message} />}
          <CustomInput
            onFocus={() => {
              setIndex(2);
            }}
            style={{
              borderColor:
                index === 2
                  ? Color.Main
                  : errors.address
                  ? Color.red
                  : Color.border,
            }}
            rules={{
              required: 'Agency Address is required',
            }}
            Heading="Agency Address"
            control={control}
            name="address"
            placeholder="Agency Address"
          />
          {errors.address && <Validation title={errors.address.message} />}

          {/* <CustomDropDown
              style={{flex: 0.45}}
              save="key"
              Heading={'Agency State'}
              items={states}
              value={state}
              setValue={value => {
                const id = states?.find(item => item.label === value)?.id;
                if (typeof id === 'number' || typeof id === 'string') {
                  setState_id(id);
                }
                setState(value);
              }}
            /> */}

          <View style={GlobalStyle.Space_between}>
            <CustomDropDown
              style={{flex: 0.49}}
              Heading={'Agency State'}
              items={states}
              value={state}
              setValue={value => {
                const id = states?.find(item => item.label === value)?.id;
                if (typeof id === 'number' || typeof id === 'string') {
                  setState_id(id);
                }
                setState(value);
              }}
            />
            <CustomDropDown
              style={{flex: 0.49}}
              Heading={'Agency City'}
              items={City}
              value={city}
              setValue={value => setCity(value)}
            />
          </View>

          <CustomInput
            onFocus={() => {
              setIndex(5);
            }}
            style={{
              borderColor:
                index === 5
                  ? Color.Main
                  : errors.contact
                  ? Color.red
                  : Color.border,
            }}
            rules={{
              required: 'Agency Contact Person is required',
            }}
            Heading="Agency Contact Person"
            control={control}
            name="contact"
            placeholder="Agency Contact Person"
          />
          {errors.contact && <Validation title={errors.contact.message} />}
          <CustomInput
            onFocus={() => {
              setIndex(6);
            }}
            style={{
              borderColor:
                index === 6
                  ? Color.Main
                  : errors.contact
                  ? Color.red
                  : Color.border,
            }}
            rules={{
              required: 'Assesment is required',
            }}
            Heading="Assesment"
            control={control}
            name="assesment"
            placeholder="Assesment"
          />
          {errors.assesment && <Validation title={errors.assesment.message} />}
          {/* <CustomDropDown
            Heading={'Assesment'}
            items={Conduct}
            value={assesment}
            setValue={value => {
              const id = incidence_types?.find(
                item => item.label === value,
              )?.id;
              if (typeof id === 'number' || typeof id === 'string') {
                setState_id(id);
              }
              setAssesment(value);
            }}
          /> */}
          <CustomInput
            onFocus={() => {
              setIndex(7);
            }}
            style={{
              borderColor:
                index === 7
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
              required: 'Email is required',
              pattern: {
                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                message: 'Email is not valid',
              },
            }}
            placeholder="Email Address"
          />
          {errors.email && <Validation title={errors.email.message} />}

          <CustomInput
            onFocus={() => {
              setIndex(8);
            }}
            style={{
              borderColor:
                index === 8
                  ? Color.Main
                  : errors.phone
                  ? Color.red
                  : Color.border,
            }}
            Heading="Phone Number"
            keyboardType="numeric"
            control={control}
            rules={{
              required: 'Phone Number is required',
            }}
            name="phone"
            placeholder="Phone Number"
          />
          {errors.phone && <Validation title={errors.phone.message} />}

          <CustomInput
            onFocus={() => {
              setIndex(9);
            }}
            style={{
              borderColor:
                index === 9
                  ? Color.Main
                  : errors.website
                  ? Color.red
                  : Color.border,
            }}
            Heading="Website"
            control={control}
            name="website"
            placeholder="Website"
            rules={{
              required: 'Website is required',
              pattern: {
                value:
                  /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+)\.([a-zA-Z]{2,})(\/\S*)?$/i,
                message: 'Link is not valid',
              },
            }}
          />
          {errors.website && <Validation title={errors.website.message} />}
          <View style={GlobalStyle.VerticalSpace} />
        </ScrollView>
      </View>
      <View style={GlobalStyle.EndBtnBox}>
        <CustomButton
          Ripple={GlobalStyle.WhiteRipple}
          title="Save"
          onPress={handleSubmit(handleOnSubmit)}
          disabled={loader}
          loader={loader}
          // onPress={() => navigation.navigate('home')}
        />
      </View>
    </SafeAreaView>
  );
};

export default AddAgency;

const styles = StyleSheet.create({});
