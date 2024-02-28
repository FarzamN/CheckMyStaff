import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import React, {useState} from 'react';
import {GlobalStyle} from '../../Constants/GlobalStyle';
import {scale} from 'react-native-size-matters';
import {Color} from '../../utils/Color';
import {Font} from '../../utils/font';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import ImagePickerModal from '../Modal/ImagePickerModal';
import {ADD_PROFILE_IMAGE} from '../../redux/reducer/Holder';
import {useDispatch, useSelector} from 'react-redux';

const ProfileHeader = ({prev_data}) => {
  const dispatch = useDispatch();
  const image = useSelector(state => state.add_profile_image);
  const [picker, setPicker] = useState(false);

  const hidePicker = () => {
    setPicker(false);
  };

  const getPhoto = () => {
    let options = {
      storageOptions: {
        mediaType: 'photo',
        path: 'image',
        includeExtra: true,
      },
      selectionLimit: 1,
    };

    launchImageLibrary(options, res => {
      if (res.didCancel) {
        console.log('You have cancelled Image picker');
      } else if (res.error) {
        console.log('ImagePicker', res.error);
      } else {
        const ele = res.assets?.[0];
        dispatch({
          type: ADD_PROFILE_IMAGE,
          payload: {
            name: ele?.fileName,
            uri: ele?.uri,
            type: ele?.type,
          },
        });
        hidePicker();
      }
    });
  };

  const getCamera = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchCamera(options, res => {
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else {
        const ele = res.assets?.[0];
        dispatch({
          type: ADD_PROFILE_IMAGE,
          payload: {
            name: ele?.fileName,
            uri: ele?.uri,
            type: ele?.type,
          },
        });
        hidePicker();
      }
    });
  };

  const formatNumberForSecurity = elm => {
    if (elm) {
      const numberString = elm?.toString();
      // const firstFourDigits = numberString?.substring(0, 3);
      const lastTwoDigits = numberString?.substring(numberString?.length - 4);

      return `*******${lastTwoDigits}`;
    } else {
      return null;
    }
  };
  const formattedNumber = formatNumberForSecurity(prev_data.bvn);
  return (
    <>
      <View style={GlobalStyle.Row}>
        <Pressable disabled onPress={() => setPicker(true)} style={styles.ImageBox}>
          {image?.uri ? (
            <Image
              resizeMode="contain"
              style={GlobalStyle.Image}
              source={{uri: image?.uri}}
            />
          ) : prev_data?.Image ? (
            <Image
              resizeMode="contain"
              style={GlobalStyle.Image}
              source={{uri: prev_data?.Image}}
            />
          ) : (
            <Image
              resizeMode="contain"
              style={GlobalStyle.Image}
              source={require('../../assets/image/default.png')}
            />
          )}
        </Pressable>
        <View style={GlobalStyle.Padding}>
          <Text style={styles.heading}>Identification Number</Text>
          <Text style={styles.sub_heading}>{formattedNumber}</Text>
        </View>
      </View>
      <ImagePickerModal
        isVisible={picker}
        PressCamera={getCamera}
        PressPicture={getPhoto}
        onClose={hidePicker}
      />
    </>
  );
};
const styles = StyleSheet.create({
  ImageBox: {
    width: 80,
    aspectRatio: 1 / 1,
    borderRadius: 100,
    overflow: 'hidden',
  },
  heading: {
    // color: Color.MidGrey,
    fontSize: 12,
    // fontFamily: Font.Inter400,

    color: Color.Grey,
    fontFamily: Font.Inter500,
  },
  sub_heading: {
    color: Color.Black,
    fontSize: 14,
    fontFamily: Font.Inter500,
    marginTop:2
  },
});

export default ProfileHeader;
