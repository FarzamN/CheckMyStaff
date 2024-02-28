import {StyleSheet, ScrollView, View, SafeAreaView} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomDropDown from '../../../components/CustomDropDownPicker';
import {
  City,
  EstateLocation,
  ResidesInEstate,
  State,
  Titles,
} from '../../../Constants/Data';
import {GlobalStyle} from '../../../Constants/GlobalStyle';
import CustomInput from '../../../components/CustomInput';
import {useForm} from 'react-hook-form';
import {Color} from '../../../utils/Color';
import Validation from '../../../components/Validation';
import {verticalScale} from 'react-native-size-matters';
import CustomButton from '../../../components/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import {personalDeailsApi} from '../../../redux/actions/UserActions';
import {useNavigation} from '@react-navigation/native';
import NewDropDown from '../../../components/NewDropDown';
import Header from '../../../components/Header/Header';

const CorporateAccSet = () => {
    const dispatch = useDispatch();
  const navigation = useNavigation();
  const user_detail = useSelector(state => state.user_detail);

  const states = useSelector(state => state.state_value);
  const local_government = useSelector(state => state.local_government);
  const estate_locations = useSelector(state => state.estate_locations);
  const choose_estates = useSelector(state => state.estates);
  // console.log('states', states);
  const getInitialState = states?.find(
    item => item.id == user_detail?.state_id,
  );
  const getInitialLocalGrn = local_government?.find(
    item => item.id == user_detail?.LocalGovernment,
  );

  console.log('getInitialLocalGrn', user_detail)

  const [contactMode, setContactMode] = useState('');
  const [state, setState] = useState(null);
  const [title, setTitle] = useState('');
  const [index, setIndex] = useState(100);
  const [showLocation, setShowLocation] = useState(false);

  const [estateLocation, setEstateLocation] = useState('');
  const [NewTitle, setNewTitle] = useState(null);
  const [residesInEstate, setResidesInEstate] = useState('');
  const [city, setCity] = useState('');
  const [stateId, setState_id] = useState(getInitialState?.id);
  const [chooseStateData, setChooseStateData] = useState('');
  const [localGovrnmnt, setGovLocation] = useState(getInitialLocalGrn?.value ? getInitialLocalGrn?.value :  '');
  const [jobTitle, setJobTitle] = useState('');

  const [govLocation_id, setGovLocation_id] = useState(getInitialLocalGrn?.id ? getInitialLocalGrn?.id : null);

  const [loader, setLoader] = useState(false);
  const [newLocalGov, setNewLocalGov] = useState([]);
  const [chcking, setChcking] = useState(false);
  useEffect(() => {
    checkLocalGorv()
  },[])

  const checkLocalGorv = () => {
    if(user_detail?.state_id){

      const getNewData = local_government?.filter(
        elmn =>
        elmn?.state_id == user_detail?.state_id && {
          id: elmn?.id,
          state_id: elmn?.state_id,
          label: elmn?.area,
          value: elmn?.area,
        },
        );
        setNewLocalGov(getNewData);
      }
  }

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    mode: 'all',
    defaultValues: {
      firstname: user_detail?.First_Name,
      lastname: user_detail?.Last_Name,
      middlename: user_detail?.Middle_Name,
      address: user_detail?.Address,
      phone: user_detail?.Telephone,
      jobtitle: user_detail?.JobTitle,
    },
  });

  const onSubmit = elm => {
    if (stateId || getInitialState?.id) {
      if (localGovrnmnt) {
        dispatch(
          personalDeailsApi(
            elm,
            NewTitle,
            stateId,
            govLocation_id,
            elm?.jobtitle,
            setLoader,
            user_detail,
          ),
        );
      } else {
        alert('Local government is required!');
      }
    } else {
      alert('State is required!');
    }
  };
  return (
    <>
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={GlobalStyle.Padding}>
        <CustomDropDown
          Heading={'Title'}
          items={Titles}
          value={NewTitle}
          setValue={value => setNewTitle(value)}
          defaultOption={{
            key: user_detail?.Title,
            value: user_detail?.Title,
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
                : errors.firstname
                ? Color.red
                : Color.border,
          }}
          Heading="First Name"
          control={control}
          name="firstname"
          rules={{
            required: '*First Name is required',
          }}
          placeholder="First Name"
        />
        {errors.firstname && <Validation title={errors.firstname.message} />}
        <CustomInput
          onFocus={() => {
            setIndex(1);
          }}
          style={{
            borderColor:
              index === 1
                ? Color.Main
                : errors.last_email
                ? Color.red
                : Color.border,
          }}
          Heading="Middle Name"
          control={control}
          name="middlename"
          rules={{
            required: '*Middle Name is required',
          }}
          placeholder="Middle Name"
        />
        {errors.middlename && (
          <Validation title={errors.middlename.message} />
        )}
        <CustomInput
          onFocus={() => {
            setIndex(2);
          }}
          style={{
            borderColor:
              index === 2
                ? Color.Main
                : errors.last_email
                ? Color.red
                : Color.border,
          }}
          Heading="Last Name"
          control={control}
          name="lastname"
          rules={{
            required: '*Last Name is required',
          }}
          placeholder="Last Name"
        />
        {errors.lastname && <Validation title={errors.lastname.message} />}
        <CustomInput
          onFocus={() => {
            setIndex(3);
          }}
          style={{
            borderColor:
              index === 3
                ? Color.Main
                : errors.last_email
                ? Color.red
                : Color.border,
          }}
          Heading="Address"
          control={control}
          name="address"
          rules={{
            required: '*Address is required',
          }}
          placeholder="Address"
        />
        {errors.address && <Validation title={errors.address.message} />}
        <CustomInput
          onFocus={() => {
            setIndex(4);
          }}
          style={{
            borderColor:
              index === 4
                ? Color.Main
                : errors.last_email
                ? Color.red
                : Color.border,
          }}
          Heading="Telephone"
          control={control}
          name="phone"
          rules={{
            required: '*Telephone is required',
          }}
          keyboardType="numeric"
          placeholder="Telephone"
        />
        {errors.phone && <Validation title={errors.phone.message} />}
        <CustomInput
          onFocus={() => {
            setIndex(5);
          }}
          style={{
            borderColor:
              index === 5
                ? Color.Main
                : errors.firstname
                ? Color.red
                : Color.border,
          }}
          Heading="Job Title"
          control={control}
          name="jobtitle"
          rules={{
            required: '*Job Title is required',
          }}
          placeholder="Job Title"
        />
        {errors.jobtitle && <Validation title={errors.jobtitle.message} />}
        <View style={{height: verticalScale(20)}} />
        {/* <CustomDropDown
          Heading={'Resides in an Estate*'}
          items={ResidesInEstate}
          value={residesInEstate}
          setValue={value => setResidesInEstate(value)}
        />
        {residesInEstate == 'YES' && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}>
            <CustomDropDown
              style={{flex: 0.45}}
              Heading={'Estate Location'}
              items={estate_locations}
              value={estateLocation}
              setValue={value => setEstateLocation(value)}
            />
            <CustomDropDown
              style={{flex: 0.45}}
              Heading={'Choose Estate'}
              items={choose_estates}
              value={chooseStateData}
              setValue={value => setChooseStateData(value)}
            />
          </View>
        )} */}

        {/* <CustomDropDown
          Heading={'State*'}
          items={states}
          value={state}
          setValue={value => {
            const id = states?.find(item => item.label === value)?.id;
            if (typeof id === 'number' || typeof id === 'string') {
              setState_id(id);
            }
            setState(value);
          }}
          defaultOption={{
            key: getInitialState?.id,
            value: getInitialState?.value,
          }}
        /> */}
         <CustomDropDown
         
            save="key"
            Heading={'State*'}
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
              setGovLocation_id(null);
              setGovLocation(null);
            }}
            defaultOption={{
              key: getInitialState?.id,
              value: getInitialState?.value,
            }}
          />
        {/* <CustomDropDown
          Heading={'State*'} getInitialLocalGrn
          items={State}
          value={state}
          setValue={value => setState(value)}
        /> */}
        {/* <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}> */}
        {/* <CustomDropDown
          Heading={'Local Government*'}
          items={local_government}
          value={localGovrnmnt}
          setValue={value => {
            const id = local_government?.find(
              item => item.label === value,
            )?.id;
            if (typeof id === 'number' || typeof id === 'string') {
              setGovLocation_id(id);
            }
            setGovLocation(value);
          }}
          defaultOption={{
            key: getInitialLocalGrn?.id,
            value: getInitialLocalGrn?.value,
          }}
        /> */}

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
              defaultOption={{
                key: getInitialLocalGrn?.id,
                value: getInitialLocalGrn?.value,
              }}
              />
              )}
 
        {/* {user_detail?.Role == 'corporate' && (
          <CustomDropDown
          Heading={'Job title'}
          items={City}
          value={jobTitle}
          setValue={value => setJobTitle(value)}
          defaultOption={{
            key: user_detail?.JobTitle,
            value: user_detail?.JobTitle,
          }}
          />
        )} */}
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
  )
}

export default CorporateAccSet

const styles = StyleSheet.create({})