import {ScrollView, SafeAreaView, View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {GlobalStyle} from '../../Constants/GlobalStyle';
import {StatusBar} from 'react-native';
import {Color} from '../../utils/Color';
import Header from '../../components/Header/Header';

import {moderateScale, scale} from 'react-native-size-matters';
import CustomButton from '../../components/CustomButton';
import {useForm} from 'react-hook-form';
import CustomDropDown from '../../components/CustomDropDownPicker';
import ErrorModal from '../../components/Modal/ErrorModal';
import CustomInput from '../../components/CustomInput';
import Validation from '../../components/Validation';
import {useSelector} from 'react-redux';
import NewDropDown from '../../components/NewDropDown';

const WorkDetails = ({navigation, route}) => {
  const {type, company_data, title} = route.params;

  const State = useSelector(state => state.state_value);
  const local_government = useSelector(state => state.local_government);
  const [index, setIndex] = useState(100);

  const [state, setState] = useState(null);
  const [govLocation, setGovLocation] = useState(null);

  const [state_id, setState_id] = useState(null);
  const [govLocation_id, setGovLocation_id] = useState(null);

  const [chcking, setChcking] = useState(false);

  const [newLocalGov, setNewLocalGov] = useState([]);

  // console.log('govLocation_id', govLocation_id);
  // console.log('govLocation', govLocation);

  const onSubmit = data => {
    if (type == 'Individual') {
      if (state == null && govLocation == null) {
        fillForm();
      } else {
        navigation.navigate('SecurityDetails', {
          type: type,
          data: data,
          company_data: company_data,
          state: state_id,
          govLocation: govLocation_id,
          title: title,
        });
      }
    } else {
      if (state == null) {
        fillForm();
      } else if (govLocation == null) {
        fillForm();
      } else {
        navigation.navigate('SecurityDetails', {
          type: type,
          data: data,
          company_data: company_data,
          title: title,
          state: state,
          govLocation: govLocation_id,
        });
      }
    }
  };
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({mode: 'all'});

  const [fill, setFill] = useState(false);
  const fillForm = () => {
    setFill(true);
    setTimeout(() => {
      setFill(false);
    }, 1500);
  };
  // useEffect(() => {
  //   setGovLocation_id(null);
  //   setGovLocation(null);
  // }, [state]);
  
  return (
    <SafeAreaView style={GlobalStyle.container}>
      <StatusBar
        translucent={false}
        backgroundColor={Color.white}
        barStyle="dark-content"
      />
      <Header
        title="Work Details"
        step
        step_title="3/4"
        gapp
        percentage="75%"
      />
      <View style={GlobalStyle.grey_container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              flex: 1,
              paddingHorizontal: moderateScale(15),
              marginTop: scale(10),
            }}>
            <CustomDropDown
              save="key"
              Heading={'State of Residence*'}
              items={State}
              value={state}
              setValue={value => {
                const id = State?.find(item => item.label === value)?.id;
                if (typeof id === 'number' || typeof id === 'string') {
                  setState_id(id);

                  const getNewData = local_government?.filter(
                    elmn =>
                      elmn?.state_id == id && {
                        id: elmn?.id,
                        state_id: elmn?.state_id,
                        label: elmn?.area,
                        value: elmn?.area,
                      },
                  );

                  setNewLocalGov(getNewData);
                }
                setChcking(true);
                setTimeout(() => {
                  setChcking(false);
                }, 0);
                setState(value);
                setGovLocation_id(null);
                setGovLocation(null);
              }}
            />
            {chcking ? null : (
              <NewDropDown
                Heading={'Local Government*'}
                items={newLocalGov?.length > 0 ? newLocalGov : local_government}
                // value={govLocation}
                save="key"
                setValue={value => {
                  const id = local_government?.find(
                    item => item.label === value,
                  )?.id;
                  if (typeof id === 'number' || typeof id === 'string') {
                    setGovLocation_id(id);
                  }
                  setGovLocation(value);
                }}
              />
            )}
            <CustomInput
              onFocus={() => {
                setIndex(2);
              }}
              style={{
                borderColor:
                  index === 2
                    ? Color.Main
                    : errors.city
                    ? Color.red
                    : Color.border,
              }}
              Heading="City*"
              control={control}
              name="city"
              rules={{
                required: '*City is required',
              }}
              placeholder="City"
            />
            {errors.city?.message && <Validation title={errors.city.message} />}
            {type == 'Individual' ? (
              <>
                <CustomInput
                  onFocus={() => {
                    setIndex(3);
                  }}
                  style={{
                    borderColor:
                      index === 3
                        ? Color.Main
                        : errors.occupation
                        ? Color.red
                        : Color.border,
                  }}
                  Heading="Present Occupation*"
                  control={control}
                  name="occupation"
                  rules={{
                    required: '*Present Occupation is required',
                  }}
                  placeholder="Present Occupation"
                />
                {errors.occupation?.message && (
                  <Validation title={errors.occupation.message} />
                )}
              </>
            ) : (
              <>
                <CustomInput
                  onFocus={() => {
                    setIndex(3);
                  }}
                  style={{
                    borderColor:
                      index === 3
                        ? Color.Main
                        : errors.jobtitle
                        ? Color.red
                        : Color.border,
                  }}
                  Heading="Job title*"
                  control={control}
                  name="jobtitle"
                  rules={{
                    required: '*Job title is required',
                  }}
                  placeholder="Job title"
                />
                {errors.jobtitle?.message && (
                  <Validation title={errors.jobtitle.message} />
                )}
              </>
            )}

            <View style={{height: 10}} />
          </View>
          <ErrorModal isVisible={fill} message="Please fill the form" />
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
        <CustomButton
          Ripple={GlobalStyle.WhiteRipple}
          title="Continue"
          onPress={handleSubmit(onSubmit)}
          ButtonStyle={{flex: 0.45}}
        />
      </View>
    </SafeAreaView>
  );
};

export default WorkDetails;
