import React from 'react';
import {StyleSheet, Image, View, SafeAreaView, Text} from 'react-native';
import {GlobalStyle} from '../../../Constants/GlobalStyle';
import Header from '../../../components/Header/Header';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';
import {Color} from '../../../utils/Color';
import {Font} from '../../../utils/font';
import CustomButton from '../../../components/CustomButton';
import {useSelector} from 'react-redux';
import moment from 'moment';

const Profile = ({navigation}) => {
  const user_detail = useSelector(state => state.user_detail);
  // console.log('user_detail', user_detail);

  const dateSep = moment(user_detail?.Date_Added, 'YYYY-MM-DD HH:mm:ss');
  const newSeparated = dateSep.format('DD/MM/YYYY');
  return (
    <SafeAreaView style={GlobalStyle.grey_container}>
      <Header title="Profile" gapp />
      <View style={GlobalStyle.Padding}>
        <View style={[GlobalStyle.Row, {marginTop: verticalScale(20)}]}>
          <View
            style={{
              width: scale(80),
              height: scale(80),
              backgroundColor: 'white',
              borderRadius: 100,
              overflow: 'hidden',
            }}>
            <Image
              resizeMode="contain"
              style={{
                height: '100%',
                width: '100%',
              }}
              source={require('../../../assets/image/logo.png')}
            />
          </View>
          <View style={{marginLeft: scale(10)}}>
            <Text style={styles.name}>
              {user_detail?.First_Name} {user_detail?.Last_Name}{' '}
              {user_detail?.Middle_Name}
            </Text>
            <Text style={styles.email}>
              {user_detail?.Email
                ? user_detail?.Email
                : 'DwightSchrute@gmail.com'}
            </Text>
          </View>
        </View>
        <View style={[GlobalStyle.Row, styles.RowBox]}>
          <View>
            <Text style={styles.name}>Account Balance</Text>
            <Text style={styles.email}>
              {' '}
              {user_detail?.Account_Bal
                ? '₦‎' + user_detail?.Account_Bal
                : '✯✯✯✯✯'}
            </Text>
          </View>
          <CustomButton
            onPress={() => navigation.navigate('balance')}
            Ripple={GlobalStyle.WhiteRipple}
            title="Top Up"
            ButtonStyle={{width: '35%'}}
          />
        </View>
        <View style={styles.AboutBox}>
          <View style={[GlobalStyle.Row, {marginVertical: verticalScale(10)}]}>
            <Text style={styles.heading}>Membership number:</Text>
            <Text style={styles.SubText}>{user_detail?.CustomerID}</Text>
          </View>
          <View style={[GlobalStyle.Row, {marginVertical: verticalScale(10)}]}>
            <Text style={styles.heading}>Date Join</Text>
            <Text style={styles.SubText}>{newSeparated}</Text>
          </View>
          <View style={[GlobalStyle.Row, {marginVertical: verticalScale(10)}]}>
            <Text style={styles.heading}>Account Type</Text>
            <Text style={styles.SubText}>
              {user_detail?.Role == 'member' ? 'Individual' : 'Corporate'}
            </Text>
          </View>
          {
            user_detail?.Role == 'corporate' ?
            <>
            <View style={[GlobalStyle.Row, {marginVertical: verticalScale(10)}]}>
            <Text style={styles.heading}>Industry</Text>
            <Text style={styles.SubText}>
              {user_detail?.Industry}
            </Text>
          </View>

<View style={[GlobalStyle.Row, {marginVertical: verticalScale(10)}]}>
<Text style={styles.heading}>Company Name</Text>
<Text style={styles.SubText}>
  {user_detail?.CompanyName}
</Text>
</View>

<View style={[GlobalStyle.Row, {marginVertical: verticalScale(10)}]}>
<Text style={styles.heading}>CAC Registration</Text>
<Text style={styles.SubText}>
  {user_detail?.CACRegistration}
</Text>
</View>


            </>
          :
          null
          }
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  ImageBox: {
    width: scale(80),
    aspectRatio: 1 / 1,
    borderRadius: 100,
  },
  name: {
    color: Color.Black,
    fontFamily: Font.Poppins500,
    fontSize: scale(15),
    marginTop: verticalScale(10),
  },
  email: {
    color: Color.MidGrey,
    fontFamily: Font.Poppins500,
    fontSize: scale(14),
  },
  RowBox: {
    marginTop: verticalScale(20),
    justifyContent: 'space-between',
    backgroundColor: '#ECE5EF',
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateVerticalScale(10),
    borderRadius: scale(10),
  },
  AboutBox: {
    backgroundColor: Color.White,
    marginTop: verticalScale(20),
    padding: moderateScale(10),
    borderRadius: scale(10),
    borderWidth: scale(1),
    borderColor: '#F4F4F5',
  },
  heading: {
    color: Color.MidGrey,
    width: '45%',
    fontFamily: Font.Inter500,
  },
  SubText: {
    color: Color.Black,
    marginLeft: scale(15),
    fontFamily: Font.Inter500,
  },
});

export default Profile;
