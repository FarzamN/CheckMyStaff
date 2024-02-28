import React, {FC, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TextInput,
  ToastAndroid,
} from 'react-native';
import Header from '../../../components/Header/Header';
import {GlobalStyle} from '../../../Constants/GlobalStyle';
import RatingCard from '../../../components/RatingCard';
import {PersonalStarData, ProStarData} from '../../../Constants/Data';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';
import CustomButton from '../../../components/CustomButton';
import {Controller, useForm} from 'react-hook-form';
import {Color} from '../../../utils/Color';
import {Font} from '../../../utils/font';
import {useDispatch} from 'react-redux';
import {AddPerofrmanceApi} from '../../../redux/actions/UserActions';

const RatingFeedBack = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {allrating, userData} = route.params;
  // console.log('userData', userData);
  const [loader, setLoader] = useState(false);

  const totalNum = eval(Object.values(allrating).join('+'));

  // console.log('totalNum', totalNum)

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({mode: 'all'});

  const onSubmit = data => {
    dispatch(
      AddPerofrmanceApi(
        data,
        allrating,
        userData,
        totalNum,
        setLoader,
        navigation,
        ToastAndroid,
      ),
    );
  };
  return (
    <SafeAreaView style={GlobalStyle.container}>
      <Header
        title="Rating Performance"
        step
        step_title="2/2"
        isBtnTitle
        BtnTitle="save"
        percentage="100%"
      />
      <View style={[GlobalStyle.grey_container, GlobalStyle.Padding]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={[GlobalStyle.BarText, styles.barTextMargin]}>
            Employer Assessment
          </Text>
          <View style={GlobalStyle.BarBox}>
            <Controller
              control={control}
              rules={{
                required: 'required',
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={styles.TextInput}
                  multiline={true}
                  placeholder="Explain here"
                  placeholderTextColor={Color.border}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="details"
            />
          </View>
        </ScrollView>
      </View>
      <View style={GlobalStyle.EndBtnBox}>
        <CustomButton
          onPress={handleSubmit(onSubmit)}
          Ripple={GlobalStyle.WhiteRipple}
          title="Save"
          disabled={loader}
          loader={loader}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  barTextMargin: {
    marginTop: verticalScale(15),
    marginBottom: verticalScale(9),
  },
  TextInput: {
    paddingHorizontal: moderateScale(25),
    width: '100%',
    fontSize: scale(13),
    fontFamily: Font.Inter400,
    height: verticalScale(150),
    textAlignVertical: 'top',
  },
});

export default RatingFeedBack;
