import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {GlobalStyle} from '../../Constants/GlobalStyle';
import {Font} from '../../utils/font';


const KeyValue = props => {
  return (
    <View style={[GlobalStyle.Row, GlobalStyle.RowContrainer]}>
      <Text style={GlobalStyle.key} numberOfLines={1}>
        {props.keys}:
      </Text>
      {props.newType ? (
        <View
          style={[
            GlobalStyle.Row,
            {
              backgroundColor: props.status ? '#E1FAEA' : '#FFE3E3',
              borderRadius: 100,
              paddingHorizontal: 7,
              paddingVertical: 5,
            },
          ]}>
          <View
            style={[
              styles.Dot,
              {
                backgroundColor:
                  props?.status == 'Pass' ? '#019939' : '#E12121',
              },
            ]}
          />
          <Text
            style={[
              styles.StatusText,
              {
                color: props?.status == 'Pass' ? '#016626' : '#961616',
              },
            ]}>
            {props?.status == 'Pass' ? 'Successful' : 'Failed'}
          </Text>
        </View>
      ) : (
        <Text style={[GlobalStyle.value, {width: '45%'}]} 
        // numberOfLines={1}
        >
          {props.value}
        </Text>
      )}
    </View>
  );
};

export default KeyValue;

const styles = StyleSheet.create({
  Dot: {
    width: 8,
    aspectRatio: 1 / 1,
    borderRadius: 100,
    marginRight: 3,
  },
  StatusText: {
    fontFamily: Font.Inter500,
    fontSize: 11,
  },
});
