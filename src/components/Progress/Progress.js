import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import * as ProgressBar from 'react-native-progress';
import { Color } from '../../utils/Color';

const Progress = props => {
  return (
    <ProgressBar.Bar
      style={[styles.barStyle, props.restyle]}
      progress={props.progress}
      width={null}
      borderWidth={1}
      color={Color.Main}
      height={8}
    />
  );
};

const styles = StyleSheet.create({
  barStyle: {
    marginTop: 20,
    alignSelf: 'center',
  },
});

export default Progress;
