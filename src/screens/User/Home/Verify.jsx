import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React, {useState, useCallback, useEffect} from 'react';
import Header from '../../../components/Header/Header';
import {GlobalStyle} from '../../../Constants/GlobalStyle';
import CheckBox from 'react-native-check-box';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';
import CustomInput from '../../../components/CustomInput';
import {Color} from '../../../utils/Color';
import {useForm} from 'react-hook-form';
import Validation from '../../../components/Validation';
import CustomButton from '../../../components/CustomButton';
import InfoModal from '../../../components/Modal/InfoModal';
import {useFocusEffect} from '@react-navigation/native';
import Error from '../../../components/Modal/Error';
import ErrorModal from '../../../components/Modal/ErrorModal';
import TopupModal from '../../../components/Modal/TopupModal';
import {useDispatch, useSelector} from 'react-redux';
import {
  add_member,
  identity_verified,
} from '../../../redux/actions/UserActions';
import Loading from '../../../components/Modal/Loading';
import {PAYMENT_COMPLETE} from '../../../redux/reducer/Holder';
import {Font} from '../../../utils/font';

const Verify = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {method} = route.params;
  const add = method == 'AddEmp';

  const [isError, setError] = useState(false);
  const [checkBox, setCheckBox] = useState(false);
  const [info, setInfo] = useState(false);
  const [load, setLoad] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [topUpModal, setTopUpModal] = useState(false);
  const [verify_success, setVerify_success] = useState(false);
  const [apiError, setApiError] = useState(false);
  const [msg, setMsg] = useState(false);

  const payment_complete = useSelector(state => state.payment_complete);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({mode: 'all'});

  const onSubmit = data => {
    if (!checkBox) {
      checkingCheck();
    } else if (!add) {
      dispatch(
        identity_verified(
          data,
          setLoad,
          setTopUpModal,
          setVerify_success,
          setApiError,
          setMsg,
        ),
      );
    } else {
      dispatch(
        add_member(
          data,
          setLoad,
          setTopUpModal,
          navigation,
          setApiError,
          setMsg,
        ),
      );
    }
  };
  useFocusEffect(
    useCallback(() => {
      navigation.getParent()?.setOptions({
        tabBarStyle: GlobalStyle.HideBar,
      });
    }, []),
  );

  const checkingCheck = () => {
    setError(true);
    setTimeout(() => {
      setError(false);
    }, 1500);
  };

  useEffect(() => {
    setError(false);
  }, []);
  return (
    <SafeAreaView style={GlobalStyle.container}>
      <Header esc onEsc={() => setInfo(true)} />
      <View
        style={[
          GlobalStyle.grey_container,
          GlobalStyle.Padding,
          {paddingVertical: moderateVerticalScale(15)},
        ]}>
        <Text
          style={[
            GlobalStyle.Heading,
            {textAlign: 'left', fontSize: scale(22)},
          ]}>
          {add ? 'Add Employee' : 'Verify BVN'}
        </Text>
        <Text
          style={[
            GlobalStyle.InputHeading,
            {
              marginTop: 14,
              color: '#71788A',
              fontFamily: Font.Inter400,
              fontSize: 13,
            },
          ]}>
          {add
            ? 'Please ensure you enter the correct BVN.'
            : 'Please ensure you enter the correct. BVN Charges are FINAL. Thank you'}
        </Text>
        <CustomInput
          defaultValue="54651333604"
          noHeading
          change
          placeholderTextColor="#000"
          style={{
            borderColor: apiError
              ? Color.red
              : errors.value
              ? Color.red
              : Color.Main,
            marginTop: verticalScale(20),
          }}
          keyboardType={'number-pad'}
          control={control}
          name={'value'}
          rules={{
            required: '*BVN is required',
          }}
          placeholder={'Enter BVN'}
        />
        {errors.value && <Validation title={errors.value.message} />}
        {apiError && <Validation title={msg} />}
        {/* <View style={[styles.GenerateBox, {marginVertical: 5, top: 5}]}>
          <Text
            style={{
              color: '#71788A',
              fontFamily: Font.Inter400,
              fontSize: 13,
            }}>

            To generate see your BVN, Dial 565*0 on any mobile network.
          </Text>
        </View> */}
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
        <CustomButton
          Ripple={GlobalStyle.WhiteRipple}
          onPress={handleSubmit(onSubmit)}
          title="Verify"
          ButtonStyle={{marginTop: verticalScale(15), width: '100%'}}
        />
        <View style={GlobalStyle.VerticalSpace} />
      </View>
      <InfoModal
        visible={info}
        onClose={() => setInfo(false)}
        value={'BVN'}
        sub={`The goal of the Bank Verification Number (BVN) is to uniquely verify the identity of each Bank’s customer for “Know your customer” (KYC) purposes. For persons without NIN, this is a great alternative for identity Verification.`}
      />
      <Error
        isVisible={errorModal}
        message="Verification Failed"
        onDismiss={() => {
          setTopUpModal(true);
          setErrorModal(false);
        }}
      />
      <ErrorModal
        isVisible={isError}
        message="Please read the term and condition"
      />
      <TopupModal
        visible={topUpModal}
        onClose={() => setTopUpModal(false)}
        onBtnPress={() => {
          setTopUpModal(false), 
          navigation.navigate('balance')
        }}
      />
      <TopupModal
        check
        visible={payment_complete}
        onClose={() => {
          dispatch({type: PAYMENT_COMPLETE, payload: false});
        }}
        onCheckPress={() => {
          dispatch({type: PAYMENT_COMPLETE, payload: false});
        }}
      />
      <TopupModal
        check
        visible={verify_success}
        onClose={() => setVerify_success(false)}
        onCheckPress={() => navigation.navigate('home')}
      />
      <Loading isVisible={load} />
    </SafeAreaView>
  );
};

export default Verify;

const styles = StyleSheet.create({
  GenerateBox: {
    backgroundColor: '#F8F4E7',
    padding: moderateScale(15),
    borderRadius: scale(10),
    marginTop: verticalScale(10),
  },
  GenerateText: {
    color: Color.MidGrey,
    fontSize: scale(14),
  },
  NinOnlyValue: {
    color: Color.Grey,
    fontSize: scale(13),
  },
});
