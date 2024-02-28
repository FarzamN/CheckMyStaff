import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TextInput,
} from 'react-native';
import React, {FC, useState} from 'react';
import Header from '../../../components/Header/Header';
import {GlobalStyle} from '../../../Constants/GlobalStyle';
import {moderateVerticalScale, verticalScale} from 'react-native-size-matters';
import ProfileHeader from '../../../components/Header/ProfileHeader';
import CustomButton from '../../../components/CustomButton';
import {useForm} from 'react-hook-form';
import CustomInput from '../../../components/CustomInput';
import {Color} from '../../../utils/Color';
import Validation from '../../../components/Validation';
import {useNavigation} from '@react-navigation/native';
import {Employee_info, Upload_Basics} from '../../../redux/actions/UserActions';
import {useDispatch, useSelector} from 'react-redux';
import Loading from '../../../components/Modal/Loading';
import TopupModal from '../../../components/Modal/TopupModal';

const UpdateAssigment = ({navigation, route}) => {
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
    elm,
    occupation,
    Hired,
    Separated,
    conduct,
    yes,
    carrier,
    stateId,
    agencyData,
  } = route.params;

  // console.log(
  //   'object =======>',
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
  //   Hired,
  //   Separated,
  //   conduct,
  //   yes,
  //   carrier,
  //   stateId,
  //   agencyData,
  // );
  // console.log('get_employeepro_data?.id', get_employeepro_data?.id);
  const [index, setIndex] = useState(10);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [success, setSuccess] = useState(false);
  const [newData, setNewData] = useState({});

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    mode: 'all',
    defaultValues: {
      description: prev_data?.Assessment,
    },
  });

  const onSubmit = elmnt => {
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
        Hired,
        Separated,
        conduct,
        yes,
        carrier,
        elmnt,
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
        title="Assessment"
        step
        gapp
        // BtnTitle="save"
        // isBtnTitle
        percentage="100%"
        step_title="3/3"
      />
      <View
        style={[
          GlobalStyle.grey_container,
          GlobalStyle.Padding,
          {paddingTop: moderateVerticalScale(20)},
        ]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ProfileHeader prev_data={prev_data} />

          {/* <CustomInput
            onFocus={() => {
              setIndex(0);
            }}
            multiline
            style={{
              borderColor:
                index === 0
                  ? Color.Main
                  : errors.description
                  ? Color.red
                  : Color.border,
              height: verticalScale(130),
              paddingTop: moderateVerticalScale(10),
            }}
            Heading="Employee assessment"
            control={control}
            rules={{
              required: '*required',
            }}
            placeholder="Employee assessment"
            name="description"
            textAlignVertical="top"
          />
          {errors.description && (
            <Validation title={errors.description.message} />
          )} */}
        </ScrollView>
      </View>

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
      <View style={GlobalStyle.EndBtnBox}>
        <CustomButton
          Ripple={GlobalStyle.WhiteRipple}
          title="Submit"
          // onPress={() => navigation.navigate('home')}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </SafeAreaView>
  );
};

export default UpdateAssigment;

const styles = StyleSheet.create({});
