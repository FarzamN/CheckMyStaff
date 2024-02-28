import {StyleSheet, Text, View, Pressable, Platform} from 'react-native';
import React, {FC, useState} from 'react';
import {GlobalStyle} from '../../Constants/GlobalStyle';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {Font} from '../../utils/font';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface ItemProps {
  ChangeColor: any;
  data: any;
  onPress: () => void;
  restyle: object;
}

const LogsFilterItems: FC<ItemProps> = ({
  ChangeColor,
  data,
  onPress,
  restyle,
}) => {
  return (
    <Pressable
      android_ripple={GlobalStyle.PurpleRipple}
      onPress={onPress}
      style={[
        GlobalStyle.Row,
        styles.Itemsbox,
        restyle,
        {borderColor: ChangeColor},
      ]}>
      {data.id == 2 && (
        <Ionicons
          name="filter"
          size={17}
          style={{top: 1}}
          color={ChangeColor}
        />
      )}
      <Text style={[styles.title, {color: ChangeColor}]}> {data.title} </Text>
      {data.id !== 2 && (
        <Entypo
          name="chevron-down"
          size={17}
          style={{top: 1}}
          color={ChangeColor}
        />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: Font.Inter400,
    fontSize: 13,
  },
  Itemsbox: {
    borderWidth: 1,
    height: 35,
    paddingHorizontal: 20,
    borderRadius: 100,
    marginHorizontal: Platform.OS == 'android' ? 5 : 15,
    overflow: 'hidden',
  },
});
export default LogsFilterItems;
