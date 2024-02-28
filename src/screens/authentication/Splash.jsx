import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Image,
  ScrollView,
} from 'react-native';
import React from 'react';
import {GlobalStyle} from '../../Constants/GlobalStyle';
import {Color} from '../../utils/Color';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';
import CustomButton from '../../components/CustomButton';
import {Font} from '../../utils/font';
import * as Anime from 'react-native-animatable';
import Entypo from 'react-native-vector-icons/Entypo';

const Splash = ({navigation}) => {
  return (
    <SafeAreaView style={GlobalStyle.container}>
      <StatusBar
        translucent
        backgroundColor={Color.Non}
        barStyle="dark-content"
      />
    <View style={{flex:0.65,}}>
    <Image
    resizeMode='cover'
          style={{width: '100%',height:'100%'}}
          source={require('../../assets/image/splash.png')}
        />


        <Anime.View
          style={[
            GlobalStyle.Shadow,
            {
              position: 'absolute',
              bottom: 5,
              width: '80%',
              alignSelf: 'center',
            },
          ]}
          iterationDelay={4000}
          duration={1500}
          animation={'fadeInDownBig'}>
          <View style={[GlobalStyle.Row, styles.Container]}>
            <View style={styles.ImageBox}>
              <Image
                style={[GlobalStyle.Image, {borderRadius: 360}]}
                source={require('../../assets/image/dp.jpg')}
              />
            </View>
            <View
              style={[
                GlobalStyle.Row,
                {
                  justifyContent: 'space-between',
                  width: '80%',
                },
              ]}>
              <View>
                <Text style={styles.title}>Dwight Schrute</Text>
                <View
                  style={[GlobalStyle.Row, {paddingLeft: moderateScale(10)}]}>
                  <Text style={styles.subTexts}>Age 25</Text>
                  <Entypo
                    name="dot-single"
                    color={Color.MidGrey}
                    size={scale(20)}
                  />
                  <Text style={styles.subTexts}>1274983943</Text>
                </View>
              </View>
              <View>
                <Text style={styles.title}>Score</Text>
                <Text style={styles.title}>80%</Text>
              </View>
            </View>
          </View>
        </Anime.View>


        <Anime.View
          style={[
            GlobalStyle.Shadow,
            {
              position: 'absolute',
              bottom: 10,
              width: '92%',
              alignSelf: 'center',
         
            },
          ]}
          iterationDelay={4200}
          duration={1700}
          animation={'fadeInDownBig'}>
          <View style={[GlobalStyle.Row, styles.Container,{     padding:3}]}>
            <View style={styles.ImageBox}>
              <Image
                style={[GlobalStyle.Image, {borderRadius: 100}]}
                source={require('../../assets/image/dp.jpg')}
              />
            </View>
            <View
              style={[
                GlobalStyle.Row,
                {
                  justifyContent: 'space-between',
                  width: '80%',
                },
              ]}>
              <View>
                <Text style={styles.title}>Dwight Schrute</Text>
                <View
                  style={[GlobalStyle.Row, {paddingLeft: moderateScale(10)}]}>
                  <Text style={styles.subTexts}>Age 25</Text>
                  <Entypo
                    name="dot-single"
                    color={Color.MidGrey}
                    size={22}
                  />
                  <Text style={styles.subTexts}>1274983943</Text>
                </View>
              </View>
              <View>
                <Text style={styles.title}>Score</Text>
                <Text style={{
                      color: Color.MidGrey,
                      alignSelf:'flex-end',
                      fontSize:12
                }}>80%</Text>
              </View>
            </View>
          </View>
        </Anime.View>
    </View>
    <View style={{flex:0.35}}>
 <View style={styles.MainContainer}>
          <Text style={{
               textAlign: 'center',
               color: '#22293B',
               fontSize: 20,
               fontFamily: Font.Inter500,
          }}>Check your staff</Text>
          <Text style={styles.Sub_Heading}>
            Look up people’s employment history before you hire them.
          </Text>
          <CustomButton
            title="Sign Up"
            Ripple={GlobalStyle.WhiteRipple}
            onPress={() => navigation.navigate('AccountType')}
          />
          <View style={{height: verticalScale(10)}} />
          <CustomButton
            title="Log In"
            textStyle={{color: Color.Main}}
            Ripple={GlobalStyle.PurpleRipple}
            ButtonStyle={GlobalStyle.ReverseBtn}
            onPress={() => navigation.navigate('Login')}
          />
        </View>
    </View>

 
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  MainContainer: {
    marginTop: '10%',
  },
  Sub_Heading: {
    textAlign: 'center',
    color: '#71788A',
    fontSize: 15,
    fontFamily: Font.Inter400,
    width: '85%',
    alignSelf: 'center',
    marginVertical: verticalScale(10),
  },
  ImageBox: {
    // borderRadius: 360,
    width: 50,
    height: 50,
    // aspectRatio: 1 / 1,
  },
  subTexts: {
    color: Color.MidGrey,
  },
  title: {
    color: Color.DarkBlue,
    paddingLeft: moderateScale(10),
  },
  Container: {
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 100,
    borderColor: Color.border,
    backgroundColor: Color.White,
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateVerticalScale(10),
  },
});

export default Splash;
