import React, {useEffect, useState} from 'react';
import {Text, View, SafeAreaView, ScrollView, Pressable} from 'react-native';
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
  City,
  Gender,
  Marital_Status,
  Nationality,
  Nationality2,
} from '../../../Constants/Data';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {format} from 'date-fns';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import CustomButton from '../../../components/CustomButton';
import {useSelector} from 'react-redux';
import NewDropDown from '../../../components/NewDropDown';
import ShowName from '../../../components/NewDropDown/ShowName';

const UpdateBasicInfo = ({navigation, route}) => {
  // const prev_data = route.params.data;
  const prev_data = useSelector(state => state.get_employeepro_data);
  const states = useSelector(state => state.state_value);
  const local_government = useSelector(state => state.local_government);

  const estate_locations = useSelector(state => state.estate_locations);
  const estates = useSelector(state => state.estates);
  const incidence_types = useSelector(state => state.incidence_types);

  const nationalType = prev_data?.Nigerian == 0 ? 'No' : 'Yes';
  const newAgency = prev_data?.agency ? prev_data?.agency : {};
  const getInitialState = states?.find(
    item => item.id == prev_data?.state?.id
  );
  const getInitialLocalGrn = local_government?.find(
    item => item.value == prev_data?.LGA,
  );

console.log('prev_data?.LGA', prev_data?.LGA)

  const [index, setIndex] = useState(99);
  const [gender, setGender] = useState('');
  const [status, setStatus] = useState('');
  const [nationality, setNationality] = useState(nationalType);


  const [city, setCity] = useState({
    key: prev_data?.LGA,
    value: prev_data?.LGA,
  });
  const [state, setState] = useState(null);
  const [stateId, setState_id] = useState(
    getInitialState?.id ? getInitialState?.id : '',
  );
  const [agencyData, SetAgencyData] = useState(newAgency);

  const [isBirthDaySelected, setIsBirthDaySelected] = useState();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [BirthDay, setBirthDay] = useState(null);

  const [newLocalGov, setNewLocalGov] = useState([]);
  const [chcking, setChcking] = useState(false);
  // const [govLocation_id, setGovLocation_id] = useState(null);
  const [localGovrnmnt, setGovLocation] = useState(prev_data?.LGA ? prev_data?.LGA :   '');
console.log('prev_data?.LGA', prev_data?.LGA)
  const {
    control,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm({mode: 'all'});

console.log('localGovrnmnt', localGovrnmnt)
  const formatDate = BirthDay && format(BirthDay?.getTime(), 'yyyy-MM-dd');
  useEffect(() => {
    checkLocalGorv()
  },[])

  const checkLocalGorv = () => {
    if(prev_data?.state?.id){

      const getNewData = local_government?.filter(
        elmn =>
        elmn?.state_id == prev_data?.state?.id && {
          id: elmn?.id,
          state_id: elmn?.state_id,
          label: elmn?.area,
          value: elmn?.area,
        },
        );
        setNewLocalGov(getNewData);
      }
  }

  const onSubmit = data => {
    // Upload_Basics(
    //   data,prev_data?.DOB
    //   saveImage,
    //   status,
    //   Ddate,
    //   data?.DOB,
    //   setLoad,
    //   navigation,
    // );
    navigation.navigate('updatejobinfo', {
      data,
      status,
      BirthDay: formatDate,
      gender,
      lga: typeof localGovrnmnt !== "number" ? localGovrnmnt : getInitialLocalGrn?.value,
      city: watch('city'),
      nationality,
      prev_data,
      stateId,
      agencyData,
    });
  };
 


  // console.log('prev_data?.state?.state', prev_data?.state);
  return (
    <SafeAreaView style={GlobalStyle.container}>
      <Header
        title="Update Basic Info"
        step
        gapp
        // BtnTitle="save"
        // isBtnTitle
        percentage="50%"
        // percentage="33.3333333333%"
        step_title="1/2"
      />
      <View
        style={[
          GlobalStyle.grey_container,
          GlobalStyle.Padding,
          {paddingTop: 20},
        ]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ProfileHeader prev_data={prev_data} />

          <CustomInput
            onFocus={() => {
              setIndex(0);
            }}
            style={{
              borderColor:
                index === 0
                  ? Color.Main
                  : errors.first_name
                  ? Color.red
                  : Color.border,
            }}
            Heading="First Name*"
            control={control}
            name="first_name"
            defaultValue={prev_data?.First_Name}
            rules={{
              required: '*First Name is required',
            }}
            placeholder="First Name*"
            editable={false}
          />
          {errors.first_name && (
            <Validation title={errors.first_name.message} />
          )}
          <CustomInput
               editable={false}
            onFocus={() => {
              setIndex(2);
            }}
            style={{
              borderColor:
                index === 2
                  ? Color.Main
                  : errors.middle_name
                  ? Color.red
                  : Color.border,
            }}
            Heading="Middle Name"
            control={control}
            name="middle_name"
            rules={{
              required: '*Middle Name is required',
            }}
            placeholder="Middle Name"
            defaultValue={prev_data?.Middle_Name}
          />
          {errors.middle_name && (
            <Validation title={errors.middle_name.message} />
          )}
          <CustomInput
               editable={false}
            onFocus={() => {
              setIndex(1);
            }}
            style={{
              borderColor:
                index === 1
                  ? Color.Main
                  : errors.last_name
                  ? Color.red
                  : Color.border,
            }}
            Heading="Last Name*"
            control={control}
            name="last_name"
            rules={{
              required: '*Last Name is required',
            }}
            placeholder="Last Name*"
            defaultValue={prev_data?.Last_Name}
          />
          {errors.last_name && <Validation title={errors.last_name.message} />}

          <View style={[GlobalStyle.Row, {justifyContent: 'space-between'}]}>
            <ShowName
              style={{flex: 0.499}}
              Heading={'Status'}
              name={prev_data?.Marita_Status}
            />
            <ShowName
              style={{flex: 0.499}}
              Heading={'Gender'}
              name={prev_data?.Sex}
            />
            {/* <CustomDropDown
              style={{flex: 0.45}}
              Heading={'Status'}
              items={Marital_Status}
              value={status}
              setValue={value => setStatus(value)}
              defaultOption={{
                key: prev_data?.Marita_Status,
                value: prev_data?.Marita_Status,
              }}
            />
            <CustomDropDown
              style={{flex: 0.45}}
              Heading={'Gender'}
              items={Gender}
              value={gender}
              setValue={value => setGender(value)}
              defaultOption={{key: prev_data?.Sex, value: prev_data?.Sex}}
            /> */}
          </View>
          <Text style={GlobalStyle.InputHeading}>Date of birth</Text>
          <Pressable
          disabled
            android_ripple={GlobalStyle.PurpleRipple}
            onPress={() => setDatePickerVisibility(true)}
            style={GlobalStyle.DateBoX}>
            <Text style={GlobalStyle.ChooseText}>
              {isBirthDaySelected
                ? formatDate
                : prev_data?.DOB
                ? prev_data?.DOB
                : 'Date of birth'}
            </Text>
            <Feather name="calendar" color={Color.MidGrey} size={20} />
          </Pressable>
          <CustomInput
            onFocus={() => {
              setIndex(3);
            }}
            style={{
              borderColor:
                index === 3
                  ? Color.Main
                  : errors.address
                  ? Color.red
                  : Color.border,
            }}
            Heading="Address"
            control={control}
            rules={{
              required: '*Address is required',
            }}
            name="address"
            placeholder="Address"
            defaultValue={prev_data?.Address}
          />
          {errors.address && <Validation title={errors.address.message} />}
          <View style={[GlobalStyle.Row, {justifyContent: 'space-evenly',alignItems:'flex-start'}]}>
            <CustomDropDown
              style={{flex: nationality != 'Yes' ? 1 : 0.5}}
              Heading={'Nationality'}
              items={Nationality2}
              value={nationality}
              setValue={value => setNationality(value)}
              defaultOption={{
                key: prev_data?.Nigerian == 0 ? 'No' : 'Yes',
                value: prev_data?.Nigerian == 0 ? 'No' : 'Yes',
              }}
            />
            <View style={{height:0,width:2}} />
            {nationality != 'Yes' ? null : (
              <CustomDropDown
              save="key"
              style={{flex: 0.5}}
              Heading={'State'}
              items={states}
              value={state}
              setValue={value => {
                const id = states?.find(item => item.label === value)?.id;
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
                // setGovLocation_id(null);
                // setGovLocation(null);
              }}
              defaultOption={{
                key: prev_data?.state?.id,
                value: prev_data?.state?.state,
              }}
            />
            )}
    
          </View>
          {nationality != 'Yes' ? null : (
            <View style={[GlobalStyle.Row, {justifyContent: 'space-between',width:'100%',alignItems:'flex-start'}]}>
              {/* <CustomDropDown
                style={{flex: 0.45}}
                Heading={'LGA'}
                items={local_government}
                value={lga}
                setValue={value => setLga(value)}
                defaultOption={{key: prev_data?.LGA, value: prev_data?.LGA}}
              /> */}
              {chcking ? null : (
              <NewDropDown
              style={{width:"50%"}}
              Heading={'LGA'}
                items={newLocalGov?.length > 0 ? newLocalGov : local_government}
                // value={govLocation}
                save="key"
                setValue={value => {
                  // const id = local_government?.find(
                  //   item => item.label === value,
                  // )?.id;
                  // if (typeof id === 'number' || typeof id === 'string') {
                  //   setGovLocation_id(id);
                  // }
                  setGovLocation(value);
                }}
                defaultOption={{
                  key: getInitialLocalGrn?.id, 
                  value: getInitialLocalGrn?.value
                }}
                />
                )}
              {/* <CustomDropDown
                style={{flex: 0.45}}
                Heading={'City'}
                items={City}
                value={city}
                setValue={value => setCity(value)}
                defaultOption={{key: prev_data?.City, value: prev_data?.City}}
              /> */}
              <View>
              <CustomInput
                style={{
                  borderColor: Color.border,
                  width:"70%",
                  alignSelf: 'flex-start',
                  marginLeft:2,
                  height: 50,
                  top:5
                }}
                restyle={{top:1.5}}
                Heading="City*"
                control={control}
                name="city"
                rules={{
                  required: false,
                }}
                placeholder="City*"
                defaultValue={prev_data?.City}
                /> 
                </View>
            </View>
          )}
          <Text style={GlobalStyle.InputHeading}>Agency</Text>
          <Pressable
            android_ripple={GlobalStyle.PurpleRipple}
            onPress={() =>
              navigation.navigate('agency', {
                SetAgencyData: SetAgencyData,
              })
            }
            style={GlobalStyle.DateBoX}>
            <Text style={GlobalStyle.ChooseText}>
              {agencyData?.AgencyName ? agencyData?.AgencyName : 'Agency Name'}
            </Text>
            <Entypo name="chevron-right" color={Color.MidGrey} size={20} />
          </Pressable>
          <View style={GlobalStyle.VerticalSpace} />
        </ScrollView>
      </View>

      <View style={GlobalStyle.EndBtnBox}>
        <CustomButton
          Ripple={GlobalStyle.WhiteRipple}
          title="Next"
          onPress={handleSubmit(onSubmit)}
        />
      </View>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onCancel={() => setDatePickerVisibility(false)}
        onConfirm={date => {
          setDatePickerVisibility(false);
          setIsBirthDaySelected(true);
          setBirthDay(date);
        }}
      />
    </SafeAreaView>
  );
};

export default UpdateBasicInfo;
