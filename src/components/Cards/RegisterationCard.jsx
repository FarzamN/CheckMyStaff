import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import React from 'react';
import {GlobalStyle} from '../../Constants/GlobalStyle';
import Entypo from 'react-native-vector-icons/Entypo';
import {Color} from '../../utils/Color';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import {Font} from '../../utils/font';

const RegisterationCard = ({data, onPress, Search}) => {
  // console.log('data?.score', data);
  return (
    <Pressable
      android_ripple={Search ? GlobalStyle.PurpleRipple : null}
      onPress={onPress}
      style={[GlobalStyle.Row, styles.Container]}>
      <View style={styles.ImageBox}>
        {data?.Image ? (
          <Image
            style={[GlobalStyle.Image, {borderRadius: 360}]}
            source={{uri: data?.Image}}
          />
        ) : (
          <Image
            style={[GlobalStyle.Image, {borderRadius: 360}]}
            source={require('../../assets/image/dp.jpg')}
          />
        )}
      </View>
      <View
        style={[
          GlobalStyle.Row,
          {
            justifyContent: 'space-between',
            width: '85%',
          },
        ]}>
        <View>
          <Text style={styles.title2}>
            {data?.First_Name} {data?.Last_Name}
          </Text>
          <View style={[GlobalStyle.Row, {paddingLeft: moderateScale(10)}]}>
            <Text style={styles.subTexts}>
              Age {data?.Age ? data?.Age : null}
            </Text>
            <Entypo name="dot-single" color={Color.MidGrey} size={scale(20)} />
            <Text style={styles.subTexts}>{data?.bvn}</Text>
          </View>
        </View>
        <View>
          <Text style={styles.title2}>Score</Text>
          <Text
            style={[
              styles.title,
              {
                textAlign: 'right',
              },
            ]}>
            {data?.score ? data?.score + '%' : data?.performances?.length > 0 ? data?.performances[0]?.Score + '%' : '-'}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  ImageBox: {
    borderRadius: 360,
    width: 50,
    aspectRatio: 1 / 1,
  },
  subTexts: {
    color: Color.MidGrey,
  },
  title: {
    color: Color.MidGrey,
    paddingLeft: 10,
  },
  title2: {
    color: Color.Black,
    paddingLeft: 10,
    fontFamily: Font.Inter600,
  },
  Container: {
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderColor: Color.border,
    paddingVertical: 15,
    overflow: 'hidden',
  },
});

export default RegisterationCard;
