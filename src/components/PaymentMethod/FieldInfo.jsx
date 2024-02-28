import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Color} from '../../utils/Color';
import {s} from 'react-native-size-matters';
import {styles} from './styles';

const FieldInfo = props => {
  return (
    <View
      style={[
        styles.fieldInfo_fieldContainer,
        props.picker && {flexDirection: 'row', justifyContent: 'space-between'},
        props.style,
      ]}>
      <View>
        <Text style={styles.title} allowFontScaling={false}>
          {props.title}
        </Text>
        <Text style={styles.text} allowFontScaling={false}>
          {props.text}
        </Text>
      </View>
      {props.picker && (
        <Icon
          name="expand-more"
          style={{alignSelf: 'flex-end'}}
          color={Color.Main}
          size={s(25)}
        />
      )}
    </View>
  );
};

export default FieldInfo;
