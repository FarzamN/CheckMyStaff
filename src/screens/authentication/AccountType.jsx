import React, {useState} from 'react';
import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {GlobalStyle} from '../../Constants/GlobalStyle';
import {StatusBar} from 'react-native';
import {Color} from '../../utils/Color';
import Header from '../../components/Header/Header';
import BannerHeading from '../../components/Header/BannerHeading';
import {account_type} from '../../Constants/Data';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import CustomButton from '../../components/CustomButton';
import ErrorModal from '../../components/Modal/ErrorModal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const AccountType = ({navigation}) => {
  const [accountType, setAccountType] = useState();
  const [select, setSelect] = useState(false);


  console.log('accountType', accountType)

  const onNext = () => {
    if (accountType) {
      navigation.navigate('CompanyDetails', {type: accountType});
    } else {
      setSelect(true);
      setTimeout(() => {
        setSelect(false);
      }, 2000);
    }
  };

  return (
    <SafeAreaView style={GlobalStyle.container}>
      <StatusBar
        translucent={false}
        barStyle="dark-content"
        backgroundColor={Color.white}
      />
      <Header
        step
        gapp
        percentage="25%"
        step_title="1/4"
        title="Choose account type"
      />
      <View style={GlobalStyle.grey_container}>
        <BannerHeading
          heading="Create an Account"
          sub_heading="Enter your details to create an account"
        />
        <View style={{flex: 1}}>
          {account_type.map((item, index) => {
            return (
              <Pressable
                key={index}
                android_ripple={GlobalStyle.PurpleRipple}
                style={[
                  styles.container,
                  {
                    backgroundColor:
                      accountType == item.title ? Color.mainLight : Color.White,
                    borderColor:
                      accountType == item.title ? Color.Main : '#fff',
                  },
                ]}
                onPress={() => setAccountType(item.title)}>
                <View style={GlobalStyle.Space_between}>
                  <Text
                    style={[
                      GlobalStyle.Heading,
                      {textAlign: 'left', fontSize: 16},
                    ]}>
                    {item.title}
                  </Text>
                  <MaterialCommunityIcons
                    name={
                      accountType == item.title
                        ? 'radiobox-marked'
                        : 'radiobox-blank'
                    }
                    color={accountType == item.title ? Color.Main : Color.Grey}
                    size={21}
                  />
                </View>
                <Text style={[GlobalStyle.InputHeading, {textAlign: 'left'}]}>
                  {item.desc}
                </Text>
              </Pressable>
            );
          })}
        </View>
        <View
          style={{
            backgroundColor: Color.White,
            paddingHorizontal: scale(1),
            paddingVertical: scale(15),
          }}>
          <CustomButton
            Ripple={GlobalStyle.WhiteRipple}
            title="Next"
            onPress={onNext}
          />
        </View>
      </View>
      <ErrorModal isVisible={select} message="Please select one" />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
    borderRadius: scale(10),
    padding: 13,
    marginTop: 10,
    borderWidth: 1,
    overflow: 'hidden',
  },
});

export default AccountType;
