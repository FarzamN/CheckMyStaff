import React, {FC, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  FlatList,
  TextInput,
  Alert,
} from 'react-native';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

import {GlobalStyle} from '../../../Constants/GlobalStyle';
import Header from '../../../components/Header/Header';
import CustomButton from '../../../components/CustomButton';
import {Color} from '../../../utils/Color';
import {Font} from '../../../utils/font';
import {AgencyData} from '../../../Constants/Data';
import {useDispatch, useSelector} from 'react-redux';

// interface AgencyProps {
//   navigation: any;
// }

// interface AgencyItem {
//   id: string;
//   name: string;
// }

const agencyStaticData = [
  {id: 95, AgencyName: 'Word Of Mouth'},
  {d: 96, AgencyName: 'Family'},
  { Id: 97, AgencyName: 'Private Referral'}
]

const Agency = ({navigation, route}) => {
  const {SetAgencyData} = route.params;
  const dispatch = useDispatch();
  const agency_data = useSelector(state => state.agency_data);

  const [index, setIndex] = useState(10);
  const [select, setSelect] = useState({});
  const [value, setValue] = useState('');

  const [data, setData] = useState({});

  const FilteredData = agency_data?.filter(item =>
    item?.AgencyName?.toLowerCase()?.includes(value?.toLowerCase()),
  );

  const ToggleCheck = item => {
    setSelect(item);
    setData(item);
    SetAgencyData(item);
  };
  const Add = () => {
    navigation.navigate('addagency', {
      data: data,
      setData: setSelect,
    });
  };
  const handleInput = text => {
    setValue(text);
  };

  const doneAgency = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView style={GlobalStyle.container}>
      <Header
        gapp={!select?.id}
        title="Agency"
        BtnTitle="Done"
        isBtnTitle={select?.id}
        onBtnPress={doneAgency}
      />
      <View
        style={[
          GlobalStyle.grey_container,
          GlobalStyle.Padding,
          {paddingTop: moderateVerticalScale(20)},
        ]}>
        <View
          style={[
            styles.InputBox,
            {borderColor: index === 1 ? Color.Main : Color.border},
          ]}>
          <TextInput
            onFocus={() => setIndex(1)}
            placeholderTextColor={Color.border}
            style={styles.Input}
            placeholder="Search Agency"
            value={value}
            onChangeText={text => handleInput(text)}
          />
          {value && (
            <Pressable
              onPress={() => setValue('')}
              android_ripple={GlobalStyle.PurpleRipple}>
              <Entypo name="cross" color={Color.Black} size={scale(18)} />
            </Pressable>
          )}
        </View>
        <Text style={GlobalStyle.InputHeading}>
          {FilteredData == null ? `Not available` : `Registered Agency`}
        </Text>
        {/* <FlatList
          showsVerticalScrollIndicator={false}
          data={agencyStaticData}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <Pressable
                android_ripple={GlobalStyle.PurpleRipple}
                onPress={() => ToggleCheck(item)}
                style={styles.Box}>
                <Text style={styles.Name}>{item?.AgencyName}</Text>
                <MaterialCommunityIcons
                  size={scale(22)}
                  name={
                    select?.id === item?.id
                      ? 'checkbox-marked'
                      : 'checkbox-blank-outline'
                  }
                  color={select?.id === item?.id ? Color.Main : Color.MidGrey}
                />
              </Pressable>
            );
          }}
        /> */}
        <FlatList
          showsVerticalScrollIndicator={false}
          data={FilteredData}
          ListEmptyComponent={() => {
            return (
              <Pressable
                onPress={Add}
                style={styles.AddBox}
                android_ripple={GlobalStyle.PurpleRipple}>
                <Text style={styles.AddText}>Add Samuel agency</Text>
              </Pressable>
            );
          }}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            console.log('item', item)
            return (
              <Pressable
                android_ripple={GlobalStyle.PurpleRipple}
                onPress={() => ToggleCheck(item)}
                style={styles.Box}>
                <Text style={styles.Name}>{item?.AgencyName}</Text>
                <MaterialCommunityIcons
                  size={scale(22)}
                  name={
                    select?.id === item?.id
                      ? 'checkbox-marked'
                      : 'checkbox-blank-outline'
                  }
                  color={select?.id === item?.id ? Color.Main : Color.MidGrey}
                />
              </Pressable>
            );
          }}
        />
        <View style={GlobalStyle.VerticalSpace} />
      </View>
      {!select?.id ? (
        <View style={GlobalStyle.EndBtnBox}>
          <CustomButton
            Ripple={GlobalStyle.WhiteRipple}
            title="Add Agency"
            onPress={Add}
          />
        </View>
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  InputBox: {
    backgroundColor: Color.White,
    height: verticalScale(40),
    borderWidth: scale(1),
    borderRadius: scale(10),
    paddingHorizontal: moderateScale(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  Input: {
    color: Color.Black,
    fontFamily: Font.Inter400,
    fontSize: scale(12),
    width: '90%',
  },
  Name: {
    color: Color.Black,
  },
  Box: {
    borderWidth: scale(1),
    borderColor: Color.border,
    height: verticalScale(42),
    borderRadius: scale(10),
    marginTop: verticalScale(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(10),
    backgroundColor: Color.White,
    overflow: 'hidden',
  },
  AddText: {
    color: Color.Black,
    fontFamily: Font.Inter400,
    fontSize: scale(14),
  },
  AddBox: {
    height: verticalScale(40),
    backgroundColor: Color.White,
    justifyContent: 'center',
    marginTop: verticalScale(10),
    paddingHorizontal: moderateScale(10),
    borderRadius: scale(10),
    overflow: 'hidden',
  },
});

export default Agency;
