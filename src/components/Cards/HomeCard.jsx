import {StyleSheet, Text, View, Pressable, Image} from 'react-native';
import React from 'react';
import {GlobalStyle} from '../../Constants/GlobalStyle';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';
import {Color} from '../../utils/Color';
import {Font} from '../../utils/font';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Octicons from 'react-native-vector-icons/Octicons';
import {useNavigation} from '@react-navigation/native';

const HomeCard = ({data}) => {
  const navigation = useNavigation();

  // const onNav = () => {
  //   if(data?.nav == )
  // }
  return (
    <Pressable
    disabled={data?.nav ? false : true}
      style={{overflow: 'hidden'}}
      onPress={() => navigation.navigate(data?.nav)}
      android_ripple={GlobalStyle.WhiteRipple}>
      <LinearGradient
        start={{x: 0.5, y: 0.2}}
        end={{x: 1, y: 1}}
        colors={data.color}
        style={styles.Container}>
        <View style={styles.ImageBox}>
          {data?.type == 'balance' ? (
            <FontAwesome6 name="naira-sign" color={Color.White} size={18} />
          ) : data?.type == 'total' ? (
            <Image
              source={require('../../assets/image/Icon.png')}
              style={{
                height: 19,
                width: 19,
              }}
            />
          ) : (
            <Octicons name="verified" color={Color.White} size={24} />
          )}
        </View>
        <View style={{justifyContent: 'flex-end', flex: 1}}>
          <Text allowFontScaling style={styles.Text}>
            {data.title}
          </Text>
          <Text style={styles.Text}>
            {data?.type == 'balance' ? 'N' + data.number : data.number}
          </Text>
        </View>
      </LinearGradient>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  Container: {
    // backgroundColor: 'red',
    width: 180,
    aspectRatio: 1 / 1,
    borderRadius: 15,
    paddingVertical: 20,
    paddingLeft: 20,
    marginRight: 10,
    marginTop: 15,
  },
  ImageBox: {
    width: 45,
    aspectRatio: 1 / 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Text: {
    color: Color.White,
    fontSize: 15,
    fontFamily: Font.Poppins500,
  },
});

export default HomeCard;
