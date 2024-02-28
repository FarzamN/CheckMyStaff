

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  StatusBar,
} from 'react-native';
import {
  scale,
  verticalScale,
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';
import {Font} from '../../utils/font';
import {Color} from '../../utils/Color';
import CustomButton from '../../components/CustomButton';
import {GlobalStyle} from '../../Constants/GlobalStyle';
import { useSelector } from 'react-redux';
import {WebView} from 'react-native-webview';

const Term = ({navigation}) => {
  const user_detail = useSelector(state => state.user_detail);

  const data = [
    { 
      id:0,
      heading:'',
      desc:'Please read these Terms and Conditions ("Terms", "Terms and Conditions") carefully before using the http://www.checkmypeople.com website and the reporting and search application (the "Service") provided by CheckMyPeople. Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who access or use the Service. By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.'
     },
    { 
      id:1,
      heading:'MY RESPONSIBILITIES',
      desc:'As user of the application, you take full responsibility for validating every National Identification Number (NIN) with National Identity Management Commission (NIMC) before using for searches or employee records. CheckMyPeople would have absolutely no responsibility for the entry of any unverified data. (NIN)'
     },
    { 
      id:2,
      heading:'SEARCHES',
      desc:'Some parts of the Service are billed on a need to search basis ("search fee(s)"). You will be billed in advance depending on how many searches you wish to conduct. All searchess are billed irrespective of outcome, and we do not offer refunds for No Record Found. We offer refunds only when we have exausted all avenues to resolve an issue with a customer.'
     },
    { 
      id:3,
      heading:'CONSENT',
      desc:'Use of our service explicitly requires that you get a signed consent from your staff before you put their work history and information on our platform. CheckMyPeople is absolved of all liabilities for data uploaded without consent form.'
     },
    { 
      id:4,
      heading:'CONTENT',
      desc:'Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for the accuracy and authenticity of data posted. The Content section is for members that allow users to create, edit, share, make content on their domestic staff. Our Service may contain links to third-party web sites or services that are not owned or controlled by CheckMyPeople \n \n CheckMyPeople has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that CheckMyPeople shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services.'
     },
    { 
      id:5,
      heading:'CHANGES',
      desc:'We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 (change this) days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.'
     },
    { 
      id:6,
      heading:'CONTACT US',
      desc:'Contact us If you have any questions about these Terms.'
     },
  ]
  return (
    <SafeAreaView style={user_detail?.user_id ? styles.mainView : GlobalStyle.container}>
      {
        user_detail?.user_id ?
        <>
      <StatusBar backgroundColor={Color.Main} barStyle="light-content" />
      <Text style={styles.accept}>Terms and Condition</Text>
      <View style={styles.updateBox}>
        <Text style={styles.UpdateText}>Updated at: 20-march-2020</Text>
      </View>
      <View style={styles.firstView}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Image
            resizeMode="contain"
            style={{alignSelf: 'center', marginTop: scale(20), width: '80%'}}
            source={require('../../assets/image/logo.png')}
          />
          {
            data?.map((item,index) => {
              return(
                <>
          <Text style={styles.lorem2}>
          {item?.heading}
          </Text>
          <Text style={styles.lorem}>
            {item?.desc}
          </Text>
                </>
              )
            })
          }
          <CustomButton
            Ripple={GlobalStyle.WhiteRipple}
            onPress={() => navigation.goBack()}
            title="Accept and Continue"
            textStyle={{fontFamily: Font.Poppins500, fontSize: scale(12)}}
            ButtonStyle={{marginBottom: 10, borderRadius: 10}}
          />
        </ScrollView>
      </View>
        </>
:
<WebView
      source={{uri: 'https://www.checkmypeople.com/terms'}}
      style={{flex: 1}}
    />
      }
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: Color.Main,
    justifyContent: 'center',
    alignItems: 'center',
  },
  accept: {
    textAlign: 'center',
    marginTop: scale(15),
    fontSize: scale(22),
    color: Color.White,
    fontFamily: Font.Inter500,
  },

  lorem: {
    textAlign: 'center',
    marginLeft: scale(30),
    marginRight: scale(30),
    marginTop: scale(10),
    color: Color.Black,
    fontSize: 12,
    fontFamily: Font.Inter500,
  },
  lorem2: {
    textAlign: 'center',
    marginLeft: scale(30),
    marginRight: scale(30),
    marginTop: scale(10),
    color: Color.Black,
    fontSize: 16,
    fontFamily: Font.Inter700,
    textTransform:'uppercase'
  },

  firstView: {
    width: '85%',
    height: '85%',
    backgroundColor: Color.White,
    borderRadius: scale(30),
  },
  UpdateText: {
    color: Color.White,
    fontFamily: Font.Inter500,
  },
  updateBox: {
    backgroundColor: '#242529',
    paddingVertical: moderateVerticalScale(5),
    paddingHorizontal: moderateScale(15),
    borderRadius: 100,
    marginBottom: verticalScale(10),
  },
});
export default Term;


// import React from 'react';
// import {SafeAreaView} from 'react-native';
// import {WebView} from 'react-native-webview';
// import {GlobalStyle} from '../../Constants/GlobalStyle';

// const Term = () => (
//   <SafeAreaView style={GlobalStyle.container}>
//     <WebView
//       source={{uri: 'https://www.checkmypeople.com/terms'}}
//       style={{flex: 1}}
//     />
//   </SafeAreaView>
// )
// export default Term;