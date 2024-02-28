import {StyleSheet, Text, View, Image, Platform} from 'react-native';
import React, {FC} from 'react';
import {scale, verticalScale} from 'react-native-size-matters';
import {Color} from '../../utils/Color';
import {Font} from '../../utils/font';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
interface EmptyListProps {
  Heading: string;
  SubHeading: string;
  image: object;
  marginTop: any;
  isImage: boolean;
}

const EmptyList: FC<EmptyListProps> = props => {
  return (
    <>
      <View style={[styles.Container, {marginTop: props.marginTop}]}>
        <View
          style={[
            styles.ImageBox,
            {backgroundColor: props.isImage ? '#F5F5F5' : '#575E6E'},
          ]}>
          {props.isImage ? (
            <Image
              source={require('../../assets/image/emptyRecords.png')}
              resizeMode="contain"
              style={{width: '70%', height: '70%'}}
            />
          ) : (
            <MaterialCommunityIcons
              color={Color.White}
              name="check-decagram-outline"
              size={scale(40)}
            />
          )}
        </View>
        <Text style={styles.Heading}>{props.Heading}</Text>
        <Text style={[styles.SubHeading,{
          marginTop: Platform.OS == 'android' ? 2 :4
        }]}>{props.SubHeading}</Text>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  Container: {
    alignItems: 'center',
  },

  ImageBox: {
    marginBottom: verticalScale(12),
    borderRadius: 100,
    width: scale(80),
    aspectRatio: 1 / 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Heading: {
    color: '#22293B',
    fontSize: 15,
    fontFamily: Font.Inter500,
  },
  SubHeading: {
    color: '#71788A',
    fontSize: 13,
    fontFamily: Font.Inter400,
  },
});

export default EmptyList;
