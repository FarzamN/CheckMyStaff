import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import {GlobalStyle} from '../../../Constants/GlobalStyle';
import Header from '../../../components/Header/Header';
import ProfileHeader from '../../../components/Header/ProfileHeader';
import {moderateVerticalScale, scale} from 'react-native-size-matters';
import CustomInput from '../../../components/CustomInput';
import {Color} from '../../../utils/Color';
import {useForm} from 'react-hook-form';
import Validation from '../../../components/Validation';
import CustomDropDown from '../../../components/CustomDropDownPicker';

import {
  Carrier,
  Conduct,
  Current_Occupation,
  ResidesInEstate,
} from '../../../Constants/Data';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {format} from 'date-fns';
import Feather from 'react-native-vector-icons/Feather';
import CustomButton from '../../../components/CustomButton';
import moment from 'moment';
import { Employee_info, Upload_Basics } from '../../../redux/actions/UserActions';
import { useDispatch, useSelector } from 'react-redux';
import TopupModal from '../../../components/Modal/TopupModal';
import Loading from '../../../components/Modal/Loading';

const UpdateJobInfo = ({navigation, route}) => {
  const dispatch = useDispatch(); 
  const image = useSelector(state => state.add_profile_image);
  const get_employeepro_data = useSelector(state => state.get_employeepro_data);
  
  const {
    data,
    status,
    BirthDay,
    gender,
    lga,
    city,
    nationality,
    prev_data,
    stateId,
    agencyData,
  } = route.params;
  const gethiredDate = prev_data?.Date_Hired
    ? prev_data?.Date_Hired + 'T07:47:54.389Z'
    : null;
  const getsepratedDate = prev_data?.Date_Seperated
    ? prev_data?.Date_Seperated + 'T07:47:54.389Z'
    : null;

  const [occupation, setOccupation] = useState('');
  const [conduct, setConduct] = useState('');
  const [yes, setYes] = useState('');
  const [carrier, setCarrier] = useState('');

  const [index, setIndex] = useState(99);

  const [isSeparatedSelected, setIsSeperatedSelected] = useState();
  const [isHiredSelected, setIsHiredSelected] = useState();
  const [isHired, setIsHired] = useState(false);
  const [isSeparated, setIsSeparated] = useState(false);

  const [Separated, setSeparated] = useState(null);
  const [Hired, setHired] = useState(null);

  const dateHire = moment(Hired, 'YYYY-MM-DD HH:mm:ss');
  const newhired = Hired && dateHire.format('YYYY-MM-DD');

  const dateSep =  moment(Separated, 'YYYY-MM-DD HH:mm:ss');
  const newSeparated = Separated && dateSep.format('YYYY-MM-DD');


  // const newhired = format(Hired?.getTime(), 'yyyy-MM-dd');
  // const newSeparated = format(Separated?.getTime(), 'yyyy-MM-dd');
  // 'yyyy-MM-dd'

  const onHiredConfirm = date => {
    setIsHired(false);
    setIsHiredSelected(true);
    setHired(date);
  };

  const onSeparatedConfirm = date => {
    setIsSeparated(false);
    setIsSeperatedSelected(true);
    setSeparated(date);
  };

  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [success, setSuccess] = useState(false);
  const [newData, setNewData] = useState({});

  console.log('  newhired,',          newSeparated,newhired)
  console.log('lga', lga)
  console.log('nationality', nationality)

  const onSubmit = elm => {
    // navigation.navigate('updateassigment', {
    //   data,
    //   status,
    //   BirthDay,
    //   gender,
    //   lga,
    //   city,
    //   nationality,
    //   prev_data,
    //   elm,
    //   occupation,
    //   Hired: newhired,
    //   Separated: newSeparated,
    //   conduct,
    //   yes,
    //   carrier,
    //   stateId,
    //   agencyData,
    // });
const chckDataAgain = newhired ? newhired :prev_data?.Date_Hired
    dispatch(
      Upload_Basics(
        data,
        status,
        BirthDay,
        gender,
        lga,
        city,
        nationality,
        prev_data,
        elm,
        occupation,
        chckDataAgain,
         newSeparated,
        conduct,
        yes,
        carrier,
        null,
        image,
        stateId,
        setLoading,
        navigation,
        agencyData,
        setSuccess,
        setNewData,
      ),
    );
  };

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    mode: 'all',
    defaultValues: {
      phone: prev_data?.Telephone ? prev_data?.Telephone : prev_data?.CellPhone,
      email: prev_data?.Email,
      g_name: prev_data?.RefereeName,
      g_phone: prev_data?.RefereeContactPhone,
      g_address: prev_data?.RefereeContactAddress,
    },
  });


  const onUpdate = () => {
    // setSuccess(false);
    dispatch(
      Employee_info(
        setLoading2,
        get_employeepro_data?.id,
        navigation,
        setSuccess,
      ),
    );
    // navigation.navigate('home');
    // navigation.navigate('SearchResult', {
    //   type: 'detail',
    //   data: newData,
    //   newType: 'v',
    // });
  };
  return (
    <SafeAreaView style={GlobalStyle.container}>
      <Header
        title="Update Job Info"
        step
        gapp
        // BtnTitle="save"
        // isBtnTitle
        percentage="100%"
        // percentage="66.6666666667%"
        step_title="2/2"
      />
      <View
        style={[
          GlobalStyle.grey_container,
          GlobalStyle.Padding,
          {paddingTop: moderateVerticalScale(20)},
        ]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ProfileHeader prev_data={prev_data} />
          <CustomDropDown
            Heading={'Current Occupation'}
            items={Current_Occupation}
            value={occupation}
            setValue={value => setOccupation(value)}
            defaultOption={{
              key: prev_data?.Occupation,
              value: prev_data?.Occupation,
            }}
          />

          <Text style={GlobalStyle.InputHeading}>Date Hired</Text>
          <Pressable
            android_ripple={GlobalStyle.PurpleRipple}
            onPress={() => setIsHired(true)}
            style={GlobalStyle.DateBoX}>
            <Text style={GlobalStyle.ChooseText}>
              {isHiredSelected
                ? newhired
                : prev_data?.Date_Hired
                ? prev_data?.Date_Hired
                : 'Date Hired'}
            </Text>
            <Feather name="calendar" color={Color.MidGrey} size={scale(20)} />
          </Pressable>

          <Text style={GlobalStyle.InputHeading}>Date Separated</Text>
          <Pressable
            android_ripple={GlobalStyle.PurpleRipple}
            onPress={() => setIsSeparated(true)}
            style={GlobalStyle.DateBoX}>
            <Text style={GlobalStyle.ChooseText}>
              {isSeparatedSelected
                ? newSeparated
                : prev_data?.Date_Seperated
                ? prev_data?.Date_Seperated
                : 'Date Separated'}
            </Text>
            <Feather name="calendar" color={Color.MidGrey} size={scale(20)} />
          </Pressable>
          {/* <View style={GlobalStyle.VerticalSpace} /> */}

          <CustomDropDown
            Heading={'Conduct'}
            items={Conduct}
            value={conduct}
            setValue={value => setConduct(value)}
            defaultOption={{
              key: prev_data?.Conduct,
              value: prev_data?.Conduct,
            }}
          />

          <CustomDropDown
            Heading={'Hire Again ?'}
            items={ResidesInEstate}
            value={yes}
            setValue={value => setYes(value)}
            defaultOption={{
              key: prev_data?.Hire_Again == 1 ? 'Yes' : 'No',
              value: prev_data?.Hire_Again == 1 ? 'Yes' : 'No',
            }}
          />
          <CustomInput
            onFocus={() => {
              setIndex(0);
            }}
            style={{
              borderColor:
                index === 0
                  ? Color.Main
                  : errors.phone
                  ? Color.red
                  : Color.border,
            }}
            keyboardType="numeric"
            Heading="Phone number"
            control={control}
            name="phone"
            placeholder="Phone number"
          />
          {errors.phone && <Validation title={errors.phone.message} />}

          <CustomDropDown
            Heading={'Phone carrier'}
            items={Carrier}
            value={carrier}
            setValue={value => setCarrier(value)}
            defaultOption={{
              key: prev_data?.PhoneCarrier,
              value: prev_data?.PhoneCarrier,
            }}
          />

          <CustomInput
            onFocus={() => {
              setIndex(1);
            }}
            style={{
              borderColor:
                index === 1
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

          <CustomInput
            onFocus={() => {
              setIndex(2);
            }}
            style={{
              borderColor:
                index === 2
                  ? Color.Main
                  : errors.g_name
                  ? Color.red
                  : Color.border,
            }}
            Heading="Guarantor Name"
            control={control}
            name="g_name"
            // rules={{
            //   required: '*Guarantor Name is required',
            // }}
            placeholder="Guarantor Name"
          />
          {/* {errors.g_name && <Validation title={errors.g_name.message} />} */}

          <CustomInput
            onFocus={() => {
              setIndex(3);
            }}
            style={{
              borderColor:
                index === 3
                  ? Color.Main
                  : errors.g_phone
                  ? Color.red
                  : Color.border,
            }}
            Heading="Guarantor Phone Number"
            control={control}
            keyboardType="numeric"
            name="g_phone"
            // rules={{
            //   required: '*Guarantor Phone Number is required',
            // }}
            placeholder="Guarantor Phone Number"
          />
          {/* {errors.g_phone && <Validation title={errors.g_phone.message} />} */}
          <CustomInput
            onFocus={() => {
              setIndex(4);
            }}
            style={{
              borderColor:
                index === 3
                  ? Color.Main
                  : errors.g_address
                  ? Color.red
                  : Color.border,
            }}
            Heading="Guarantor address"
            control={control}
            name="g_address"
            // rules={{
            //   required: '*Guarantor address is required',
            // }}
            placeholder="Guarantor address"
          />
          {/* {errors.g_address && <Validation title={errors.g_address.message} />} */}

          <View style={GlobalStyle.VerticalSpace} />
        </ScrollView>
      </View>
      <View style={GlobalStyle.EndBtnBox}>
        <CustomButton
          Ripple={GlobalStyle.WhiteRipple}
          title="Submit"
          // title="Next"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
      <DateTimePickerModal
        isVisible={isHired}
        mode="date"
        onCancel={() => setIsHired(false)}
        onConfirm={date => onHiredConfirm(date)}
      />

      <DateTimePickerModal
        isVisible={isSeparated}
        mode="date"
        onCancel={() => setIsSeparated(false)}
        onConfirm={date => onSeparatedConfirm(date)}
      />

<TopupModal
        check
        doIt
        visible={success}
        subText="Your employee’s information has been updated successfully!"
        addEmp
        // onClose={() => navigation.navigate('home')}
        onClose={() => setSuccess(false)}
        onBtnPress={onUpdate}
        newText="Done"
      />

      <Loading isVisible={loading} />
    </SafeAreaView>
  );
};

export default UpdateJobInfo;

const styles = StyleSheet.create({});
