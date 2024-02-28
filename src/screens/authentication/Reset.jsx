import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {GlobalStyle} from '../../Constants/GlobalStyle';
import {Color} from '../../utils/Color';
import Header from '../../components/Header/Header';
import CustomButton from '../../components/CustomButton';
import CustomLotti from '../../components/Modal/CustomLotti';
import Error from '../../components/Modal/Error';
import {Font} from '../../utils/font';
import {useDispatch, useSelector} from 'react-redux';
import {find_account} from '../../redux/actions/AuthActions';
import Loading from '../../components/Modal/Loading';

const formatNumberForSecurity = number => {
  const numberString = number.toString();
  const firstFourDigits = numberString.substring(0, 3);
  const lastTwoDigits = numberString.substring(numberString.length - 3);

  return `${firstFourDigits} xxxx xxx ${lastTwoDigits}`;
};

const Reset = ({navigation, route}) => {
  const {data} = route.params;
  const dispatch = useDispatch();
  const otp = useSelector(state => state.otp);
  console.log(otp);
  const CELL_COUNT = 6;
  const [time, setTime] = useState(10);
  const [otpResent, setOtpResent] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useEffect(() => {
    const timer = time > 0 && setInterval(() => setTime(time - 1), 1000);
    return () => clearInterval(timer);
  }, [time]);

  const WaitOTP = () => {
    setOtpResent(true);
    setTimeout(() => {
      setOtpResent(false);
    }, 2300);
  };

  const emailFromPreviousScreen = data.email;

  const formattedNumber = formatNumberForSecurity(emailFromPreviousScreen);

  const onSubmit = () => {
    if (value == otp) {
      navigation.navigate('change_password');
    } else {
      setErrorModal(true);
      setTimeout(() => {
        setErrorModal(false);
      }, 2000);
    }
  };
  const ResendOTP = () => {
    dispatch(find_account(data, navigation, setLoading));
  };
  
 
  return (
    <SafeAreaView style={GlobalStyle.container}>
      <StatusBar
        translucent={false}
        backgroundColor={Color.white}
        barStyle="dark-content"
      />
      <Header title="Reset Your Password" gapp />
      <View style={styles.ImageBox}>
        <Image
          resizeMode="contain"
          source={require('../../assets/image/phone.png')}
          style={{width: '50%', height: '50%'}}
        />
      </View>
      <View style={styles.MainBox}>
        <Text style={[GlobalStyle.Heading, {fontSize: 15, color: '#22293b'}]}>
          Verification
        </Text>
        <Text style={[GlobalStyle.Heading, {fontSize: 14, color: '#71788A'}]}>
          Please enter the six digit code we texted to your email address{' '}
          {formattedNumber}
          {`\n`}
          == {otp} ==
        </Text>
        <CodeField
          ref={ref}
          {...props}
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({index, symbol, isFocused}) => (
            <View
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            >
            <Text
            style={styles.otptext}
              onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
            </View>
          )}
        />
      </View>
      <CustomButton
        Ripple={GlobalStyle.WhiteRipple}
        onPress={onSubmit}
        title="Verify"
      />
      {time === 0 ? (
        <TouchableOpacity onPress={ResendOTP} style={styles.MainContainer}>
          <Text
            // onPress={() => navigation.navigate('Reset')}
            style={{
              textAlign: 'center',
              color: Color.Grey,
              fontSize: 14,
              // marginTop: 15,
              fontFamily: Font.Inter500,
              // marginTop: verticalScale(6),
            }}>
            Resend OTP
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={WaitOTP} style={styles.MainContainer}>
          <Text style={styles.Text}> You can Reset Your OTP in {time}</Text>
        </TouchableOpacity>
      )}

      <CustomLotti
        isVisible={otpResent}
        source={require('../../assets/lotti/otp.json')}
        Title="Your OPT has already been sent"
      />
      <Error isVisible={errorModal} message="Your OTP is not correct" />
      <Loading isVisible={loading} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    marginTop: '5%',
  },
  MainBox: {
    marginTop: '8%',
    paddingHorizontal: moderateScale(18),
  },
  codeFieldRoot: {marginVertical: '12%'},
  cell: {
    width: '15%',
    height: scale(60),
 
    borderBottomWidth: scale(1.5),
    borderColor: Color.border,
    // textAlign: 'center',
  
    // textAlignVertical: 'center',

    justifyContent:'center',
    alignItems:'center'
  },
  otptext:{
    color: Color.Black,
    fontFamily: Font.Gilroy400,
    fontSize: scale(24),
  },
  focusCell: {
    borderColor: Color.Main,
  },
  OptBox: {
    width: '70%',
    marginTop: 0,
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: scale(10),
    justifyContent: 'center',
    marginBottom: verticalScale(10),
  },
  Text: {
    color: Color.Black,
    textAlign: 'center',
    fontFamily: Font.Gilroy500,
  },
  ImageBox: {
    width: 50,
    marginTop: '10%',
    borderRadius: 100,
    aspectRatio: 1 / 1,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
  },
});

export default Reset;
