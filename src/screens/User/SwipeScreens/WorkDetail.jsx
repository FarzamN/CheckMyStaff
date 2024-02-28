import {StyleSheet, ScrollView, View} from 'react-native';
import React, {useState} from 'react';
import CustomDropDown from '../../../components/CustomDropDownPicker';
import {
  ContactMode,
  HearAboutUs,
  OccupationData,
  StaffEmployed,
} from '../../../Constants/Data';
import {GlobalStyle} from '../../../Constants/GlobalStyle';
import {verticalScale} from 'react-native-size-matters';
import CustomButton from '../../../components/CustomButton';
import {Color} from '../../../utils/Color';
import {useDispatch, useSelector} from 'react-redux';
import {workDeailsApi} from '../../../redux/actions/UserActions';
import CustomInput from '../../../components/CustomInput';
import {useForm} from 'react-hook-form';
import Validation from '../../../components/Validation';
import {useNavigation} from '@react-navigation/native';

// interface WorkDetailProps {
//   navigation: any;
// }
const WorkDetail = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user_detail = useSelector(state => state.user_detail);
  const [occipation, setOccupation] = useState('');
  const [staff, setStaff] = useState('');
  const [hearAboutUs, setHearAboutUs] = useState('');
  const [contactMode, setContactMode] = useState('');
  const [loader, setLoader] = useState(false);
  const [index, setIndex] = useState(100);
  console.log('user_detail?.Occupation', user_detail);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    mode: 'all',
    defaultValues: {
      occupation: user_detail?.Occupation,
    },
  });

  const onSubmit = elm => {
    if (staff) {
      dispatch(
        workDeailsApi(
          elm,
          staff,
          hearAboutUs,
          contactMode,
          setLoader,
          user_detail,
        ),
      );
    } else {
      alert('Number of staff is required!');
    }
  };

  // console.log('user_detail?.NumEmployed',user_detail);
  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={GlobalStyle.Padding}>
          <CustomInput
            onFocus={() => {
              setIndex(0);
            }}
            style={{
              borderColor:
                index === 0
                  ? Color.Main
                  : errors.occupation
                  ? Color.red
                  : Color.border,
            }}
            Heading="Current Occupation*"
            control={control}
            name="occupation"
            rules={{
              required: '*Current Occupation is required',
            }}
            placeholder="Current Occupation"
          />
          {errors.occupation?.message && (
            <Validation title={errors.occupation.message} />
          )}
          {/* <CustomDropDown
            Heading={'Current Occupation*'}
            items={OccupationData}
            value={occipation}
            setValue={value => setOccupation(value)}
            defaultOption={{
              key: user_detail?.Occupation,
              value: user_detail?.Occupation,
            }}
          /> */}
          <CustomDropDown
            Heading={'Number of Staff Employed*'}
            items={StaffEmployed}
            value={staff}
            setValue={value => setStaff(value)}
            defaultOption={{
              key: user_detail?.NumEmployed,
              value: user_detail?.NumEmployed,
            }}
          />
          <View style={{height: verticalScale(30)}} />
          <CustomDropDown
            Heading={'How did you hear about us?'}
            items={HearAboutUs}
            value={hearAboutUs}
            setValue={value => setHearAboutUs(value)}
            defaultOption={{
              key: user_detail?.Natureofcontact,
              value: user_detail?.Natureofcontact,
            }}
          />
          <CustomDropDown
            Heading={'Preferred Contact Mode'}
            items={ContactMode}
            value={contactMode}
            setValue={value => setContactMode(value)}
            defaultOption={{
              key: user_detail?.PreferredContactMode,
              value: user_detail?.PreferredContactMode,
            }}
          />
        </View>
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
          disabled={loader}
          loader={loader}
          Ripple={GlobalStyle.WhiteRipple}
          title="Save"
          onPress={handleSubmit(onSubmit)}
          //  onPress={() =>
          //    navigation.navigate('WorkDetails', {type: accountType})
          //  }
          ButtonStyle={{flex: 0.45}}
        />
      </View>
    </>
  );
};

export default WorkDetail;

const styles = StyleSheet.create({});
