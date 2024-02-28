import React from 'react';
import {View} from 'react-native';
import {GlobalStyle} from '../../Constants/GlobalStyle';
import {styles} from './styles';

const Card = ({style, children}) => {
  return (
    <View style={[styles.read_card, style, GlobalStyle.Shadow]}>
      {children}
    </View>
  );
};

export default Card;
