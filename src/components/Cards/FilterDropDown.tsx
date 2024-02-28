import React, {FC, useState} from 'react';
import {StyleSheet, Text, View, FlatList, Pressable} from 'react-native';
import {FilterFilter, SortFilter, StatusFilter} from '../../Constants/Data';
import {Color} from '../../utils/Color';
import {
  scale,
  moderateVerticalScale,
  moderateScale,
} from 'react-native-size-matters';
import {GlobalStyle} from '../../Constants/GlobalStyle';

interface FilterDropDownProps {
  data: any;
  one: boolean;
  two: boolean;
  three: boolean;
  onSort?: () => void;
  onFilter?: () => void;
  onStatusFilter?: () => void;
  get: any;
}

const FilterDropDown: FC<FilterDropDownProps> = ({
  one,
  two,
  three,
  onSort,
  onFilter,
  onStatusFilter,
  get,
}) => {
  const [getSort, setGetSort] = useState('');
  const [getFilter, setGetFilter] = useState('');
  const [getStatus, setGetStatus] = useState('');
  get([getSort, getFilter, getStatus]);
  return (
    <View
      style={[
        styles.Container,
        {marginLeft: one ? scale(10) : two ? '30%' : '54%'},
      ]}>
      {one && (
        <FlatList
          data={SortFilter}
          renderItem={({item, index}) => {
            return (
              <Pressable
                style={{overflow: 'hidden'}}
                android_ripple={GlobalStyle.PurpleRipple}
                // onPress={() => handleSort(item)}
                onPress={() => {
                  onSort();
                  setGetSort(item);
                }}
                key={index}>
                <Text style={styles.label}>{item.label}</Text>
              </Pressable>
            );
          }}
        />
      )}
      {two && (
        <FlatList
          data={FilterFilter}
          renderItem={({item, index}) => {
            return (
              <Pressable
                style={{overflow: 'hidden'}}
                android_ripple={GlobalStyle.PurpleRipple}
                // onPress={() => handleSort(item)}
                onPress={() => {
                  onFilter();
                  setGetFilter(item);
                }}
                key={index}>
                <Text style={styles.label}>{item.label}</Text>
              </Pressable>
            );
          }}
        />
      )}
      {three && (
        <FlatList
          data={StatusFilter}
          renderItem={({item, index}) => {
            return (
              <Pressable
                style={{overflow: 'hidden'}}
                android_ripple={GlobalStyle.PurpleRipple}
                // onPress={() => handleSort(item)}
                onPress={() => {
                  onStatusFilter();
                  setGetStatus(item);
                }}
                key={index}>
                <Text style={styles.label}>{item.label}</Text>
              </Pressable>
            );
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    color: Color.Black,
    fontSize: scale(16),
    paddingVertical: moderateVerticalScale(5),
  },
  Container: {
    width: '45%',
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateVerticalScale(20),
    borderRadius: scale(10),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
    position: 'absolute',
    top: '10%',
    backgroundColor: Color.White,
    zIndex: 99,
  },
});

export default FilterDropDown;
