import React, {useCallback, useState} from 'react';
import {
  Image,
  View,
  SafeAreaView,
  Dimensions,
  Text,
  ScrollView,
} from 'react-native';
import {GlobalStyle} from '../../../Constants/GlobalStyle';
import Header from '../../../components/Header/Header';
import {useDispatch, useSelector} from 'react-redux';
import {scale, vs} from 'react-native-size-matters';
import KeyValue from '../../../components/Cards/KeyValue';
import CustomButton from '../../../components/CustomButton';
import {Color} from '../../../utils/Color';
import {Employee_info, send_employee} from '../../../redux/actions/UserActions';
import Loading from '../../../components/Modal/Loading';
import TopupModal from '../../../components/Modal/TopupModal';
import {Font} from '../../../utils/font';
import NewKeyValue from '../../../components/Cards/NewKeyValue';
import { useFocusEffect } from '@react-navigation/native';
import { SEARCH_DETAIL_LOADER } from '../../../redux/reducer/Holder';

const {height} = Dimensions.get('window');

const AddEmployeeInformation = ({navigation}) => {
  const dispatch = useDispatch();
  const Add_Employee_Detail = useSelector(state => state.add_Employee_Detail);
  const get_employeepro_data = useSelector(state => state.get_employeepro_data);

  const [load, setLoad] = useState(false);
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState('');

  // useFocusEffect(
  //   useCallback(() => {
  //     dispatch({type: SEARCH_DETAIL_LOADER, payload: true});
  //   },[])
  // )

  const detail = Add_Employee_Detail?.data;

  const onSubmit = () => {
    send_employee(setLoad, Add_Employee_Detail, setSuccess, setData);
  };
  const onUpdate = () => {
    console.log(data);
    dispatch(Employee_info(setLoad, data?.id, navigation, setSuccess));
  };

  return (
    <SafeAreaView style={GlobalStyle.container}>
      <Header title="Add Employee" gapp />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[GlobalStyle.BigImage, {height: height / 3.1}]}>
          <Image
            resizeMode="cover"
            style={GlobalStyle.Image}
            source={{uri: `data:image/png;base64,${detail?.base64Image}`}}
          />
        </View>
        <View style={[GlobalStyle.Padding, {backgroundColor: '#fafafa'}]}>
          <Text
            style={{
              textAlign: 'left',
              fontSize: 16,
              marginVertical: 10,
              fontFamily: Font.Inter500,
              color: '#22293B',
            }}>
            {/* {detail?.firstName} {detail?.lastName} */}
            Personal Information
          </Text>
          <View
            style={[
              GlobalStyle.KeyValueContainer,
              {marginHorizontal: 0, paddingVertical: 10},
            ]}>
            <NewKeyValue keys="BVN" value={detail?.bvn} />
            <NewKeyValue keys="NIN" value={detail?.nin} />
            <NewKeyValue keys="First Name" value={detail?.firstName} />
            <NewKeyValue keys="Middle Name" value={detail?.middleName} />
            <NewKeyValue keys="Last Name" value={detail?.lastName} />
            <NewKeyValue keys="Date Of Birth" value={detail?.dateOfBirth} />
            <NewKeyValue keys="Gender" value={detail?.gender} />

            {/* <KeyValue keys="email" value={detail?.email} />
            <KeyValue keys="enrollmentBank" value={detail?.enrollmentBank} />
            <KeyValue
              keys="enrollmentBranch"
              value={detail?.enrollmentBranch}
            />
            <KeyValue keys="levelOfAccount" value={detail?.levelOfAccount} />
            <KeyValue keys="lgaOfOrigin" value={detail?.lgaOfOrigin} />
            <KeyValue keys="lgaOfResidence" value={detail?.lgaOfResidence} />
            <KeyValue keys="maritalStatus" value={detail?.maritalStatus} />
            <KeyValue keys="nameOnCard" value={detail?.nameOnCard} />
            <KeyValue keys="nationality" value={detail?.nationality} />
            <KeyValue keys="phoneNumber1" value={detail?.phoneNumber1} />
            <KeyValue keys="phoneNumber2" value={detail?.phoneNumber2} />
            <KeyValue
              keys="registrationDate"
              value={detail?.registrationDate}
            />
            <KeyValue
              keys="residentialAddress"
              value={detail?.residentialAddress}
            />
            <KeyValue keys="stateOfOrigin" value={detail?.stateOfOrigin} />
            <KeyValue
              keys="stateOfResidence"
              value={detail?.stateOfResidence}
            />
            <KeyValue keys="title" value={detail?.title} />
            <KeyValue keys="watchListed" value={detail?.watchListed} /> */}
          </View>
        </View>
      <View style={{marginVertical:10}} />
      </ScrollView>
      <View
        style={{
          height: 90,
          borderTopWidth: 1,
          borderTopColor: '#dbdbdb',
          paddingHorizontal: 20,
          backgroundColor: Color.White,
          // paddingHorizontal: 1,
          // paddingVertical: 15,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <CustomButton
          Ripple={GlobalStyle.PurpleRipple}
          textStyle={{
            fontFamily: Font.Inter500,
            color: '#71788A',
            fontSize: 15,
          }}
          title="Back"
          onPress={() => navigation.goBack()}
          ButtonStyle={[
            GlobalStyle.ReverseBtn,
            {flex: 1, paddingVertical: 5, borderColor: '#eaeaec'},
          ]}
        />
        <View
          style={{
            height: 0,
            width: 20,
          }}
        />
        <CustomButton
          Ripple={GlobalStyle.WhiteRipple}
          title="Add Employee"
          onPress={onSubmit}
          ButtonStyle={{flex: 1, paddingVertical: 5}}
        />
      </View>
      <Loading isVisible={load} />
      <TopupModal
        neewStyle={{
          fontSize: 14,
          fontFamily: Font.Inter400,
          width: '90%',
          textAlign: 'center',
          color: '#71788A',
        }}
        check
        visible={success}
        subText="Your employee has been added successfully! Please ensure to update employee’s information."
        addEmp
        // onClose={() => navigation.navigate('home')}
        onClose={() => (
          setSuccess(false), navigation.goBack(), navigation.goBack()
        )}
        onBtnPress={onUpdate}
      />
    </SafeAreaView>
  );
};

export default AddEmployeeInformation;
