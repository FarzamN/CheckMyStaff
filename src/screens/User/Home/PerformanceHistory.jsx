import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';
import React, {useCallback} from 'react';
import {GlobalStyle} from '../../../Constants/GlobalStyle';
import Header from '../../../components/Header/Header';
import {Color} from '../../../utils/Color';
import {Font} from '../../../utils/font';
import {
  moderateVerticalScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';
import CustomButton from '../../../components/CustomButton';
import * as Progress from 'react-native-progress';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getEmployePerformnce} from '../../../redux/actions/UserActions';

const PerformanceHistory = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {data, type} = route.params;
  const employee_performances = useSelector(
    state => state.get_employee_performance,
  );

  console.log('employee_performances?.Score', employee_performances?.Score);
  const totalNumber = 60;
  const obtainedNumber = employee_performances?.Score
    ? employee_performances?.Score
    : 0;
  // const obtainedNumber = employee_performances?.Score;

  const percentage = ((41 / totalNumber) * 100).toFixed(2);

  const getId = data?.empid ? data?.empid : data?.id;

  useFocusEffect(
    useCallback(() => {
      dispatch(getEmployePerformnce(getId));
    }, []),
  );
  const {width} = Dimensions.get('screen');
  const w = width / 1.3;
  const unfilledColor = '#efe6f1';
  return (
    <SafeAreaView style={GlobalStyle.container}>
      <Header title="Performance history" gapp />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[GlobalStyle.grey_container, GlobalStyle.Padding]}>
          <View style={styles.Box}>
            <Text style={styles.Heading}>Overall Performance Score</Text>
            <Text style={styles.percentage}>
              {/* 80% */}
              {employee_performances?.Score
                ? employee_performances?.Score
                : '-'}
              %
            </Text>
          </View>
          <Text
            style={[
              styles.percentage,
              {fontSize: scale(14), marginTop: verticalScale(15)},
            ]}>
            {employee_performances?.Commentary
              ? `“${employee_performances?.Commentary}”`
              : null}
            {/* “He started work with us as a minder and has since progressed to
            become a Nanny. His work to date is very satisfactory.” */}
          </Text>
          <View style={styles.Line} />
          <Text style={styles.percentage}>Personal attributes</Text>
          <View style={GlobalStyle.BarBox}>
            <Text style={styles.Heading}>Trustworthiness/Honesty</Text>
            <View style={[GlobalStyle.Row, styles.RowBox]}>
              <Text style={styles.title}>
                {employee_performances?.Trust?.toFixed(1)}
              </Text>
              <Progress.Bar
                progress={
                  employee_performances?.Trust
                    ? employee_performances?.Trust / 5
                    : 0 / 5
                }
                unfilledColor={'#efe6f1'}
                width={w}
                height={9}
                animated
                borderColor={Color.border}
                borderWidth={1}
                borderRadius={100}
                color={Color.Main}
                indeterminate={false}
                indeterminateAnimationDuration={4000}
              />
            </View>
            <Text style={styles.Heading}>Obedient/Follows Instructions</Text>
            <View style={[GlobalStyle.Row, styles.RowBox]}>
              <Text style={styles.title}>
                {employee_performances?.Obedience?.toFixed(1)}
              </Text>
              <Progress.Bar
                progress={
                  employee_performances?.Obedience
                    ? employee_performances?.Obedience / 5
                    : 0 / 5
                }
                unfilledColor={'#efe6f1'}
                width={w}
                height={9}
                animated={true}
                borderColor={Color.border}
                borderWidth={1}
                borderRadius={100}
                fill="#00000000"
                color={Color.Main}
                indeterminate={false}
                indeterminateAnimationDuration={4000}
              />
              {/* <View style={styles.PropgressBox}>
                <View style={[styles.inner, {width: 100}]} />
              </View> */}
            </View>
            <Text style={styles.Heading}>Availability/Attendance</Text>
            <View style={[GlobalStyle.Row, styles.RowBox]}>
              <Text style={styles.title}>
                {employee_performances?.Availability?.toFixed(1)}
              </Text>
              <Progress.Bar
                progress={
                  employee_performances?.Availability
                    ? employee_performances?.Availability / 5
                    : 0 / 5
                }
                width={w}
                unfilledColor={'#efe6f1'}
                height={9}
                animated={true}
                borderColor={Color.border}
                borderWidth={1}
                borderRadius={100}
                fill="#00000000"
                color={Color.Main}
                indeterminate={false}
                indeterminateAnimationDuration={4000}
              />
              {/* <View style={styles.PropgressBox}>
                <View style={[styles.inner, {width: 100}]} />
              </View> */}
            </View>
            <Text style={styles.Heading}>Kind and Compassionate</Text>
            <View style={[GlobalStyle.Row, styles.RowBox]}>
              <Text style={styles.title}>
                {employee_performances?.Kindness?.toFixed(1)}
              </Text>
              <Progress.Bar
                progress={
                  employee_performances?.Kindness
                    ? employee_performances?.Kindness / 5
                    : 0 / 5
                }
                unfilledColor={'#efe6f1'}
                width={w}
                height={9}
                animated={true}
                borderColor={Color.border}
                borderWidth={1}
                borderRadius={100}
                fill="#00000000"
                color={Color.Main}
                indeterminate={false}
                indeterminateAnimationDuration={4000}
              />
              {/* <View style={styles.PropgressBox}>
                <View style={[styles.inner, {width: 100}]} />
              </View> */}
            </View>
            <Text style={styles.Heading}>Safe Person to be Around</Text>
            <View style={[GlobalStyle.Row, styles.RowBox]}>
              <Text style={styles.title}>
                {employee_performances?.Safety?.toFixed(1)}
              </Text>
              <Progress.Bar
                progress={
                  employee_performances?.Safety
                    ? employee_performances?.Safety / 5
                    : 0 / 5
                }
                unfilledColor={'#efe6f1'}
                width={w}
                height={9}
                animated={true}
                borderColor={Color.border}
                borderWidth={1}
                borderRadius={100}
                fill="#00000000"
                color={Color.Main}
                indeterminate={false}
                indeterminateAnimationDuration={4000}
              />
              {/* <View style={styles.PropgressBox}>
                <View style={[styles.inner, {width: 100}]} />
              </View> */}
            </View>
            <Text style={styles.Heading}>
              Keeps Self and Surroundings Clean
            </Text>
            <View style={[GlobalStyle.Row, styles.RowBox]}>
              <Text style={styles.title}>
                {employee_performances?.Clenliness?.toFixed(1)}
              </Text>
              <Progress.Bar
                progress={
                  employee_performances?.Clenliness
                    ? employee_performances?.Clenliness / 5
                    : 0 / 5
                }
                unfilledColor={'#efe6f1'}
                width={w}
                height={9}
                animated={true}
                borderColor={Color.border}
                borderWidth={1}
                borderRadius={100}
                fill="#00000000"
                color={Color.Main}
                indeterminate={false}
                indeterminateAnimationDuration={4000}
              />
              {/* <View style={styles.PropgressBox}>
                <View style={[styles.inner, {width: 100}]} />
              </View> */}
            </View>
          </View>

          <Text style={styles.percentage}>Professional attributes</Text>
          <View style={GlobalStyle.BarBox}>
            <Text style={styles.Heading}>Easily Understands Instructions</Text>
            <View style={[GlobalStyle.Row, styles.RowBox]}>
              <Text style={styles.title}>
                {employee_performances?.Instructions?.toFixed(1)}
              </Text>
              <Progress.Bar
                progress={
                  employee_performances?.Instructions
                    ? employee_performances?.Instructions / 5
                    : 0 / 5
                }
                width={w}
                unfilledColor={'#efe6f1'}
                height={9}
                animated={true}
                borderColor={Color.border}
                borderWidth={1}
                borderRadius={100}
                fill="#00000000"
                color={Color.Main}
                indeterminate={false}
                indeterminateAnimationDuration={4000}
              />
              {/* <View style={styles.PropgressBox}>
                <View style={[styles.inner, {width: 100}]} />
              </View> */}
            </View>
            <Text style={styles.Heading}>Carefulness with Employers items</Text>
            <View style={[GlobalStyle.Row, styles.RowBox]}>
              <Text style={styles.title}>
                {employee_performances?.Consciencious?.toFixed(1)}
              </Text>
              <Progress.Bar
                progress={
                  employee_performances?.Consciencious
                    ? employee_performances?.Consciencious / 5
                    : 0 / 5
                }
                width={w}
                unfilledColor={'#efe6f1'}
                height={9}
                animated={true}
                borderColor={Color.border}
                borderWidth={1}
                borderRadius={100}
                fill="#00000000"
                color={Color.Main}
                indeterminate={false}
                indeterminateAnimationDuration={4000}
              />
              {/* <View style={styles.PropgressBox}>
                <View style={[styles.inner, {width: 100}]} />
              </View> */}
            </View>
            <Text style={styles.Heading}>Problem Solving</Text>
            <View style={[GlobalStyle.Row, styles.RowBox]}>
              <Text style={styles.title}>
                {employee_performances?.Initiative?.toFixed(1)}
              </Text>
              <Progress.Bar
                progress={
                  employee_performances?.Initiative
                    ? employee_performances?.Initiative / 5
                    : 0 / 5
                }
                width={w}
                height={9}
                animated={true}
                unfilledColor={'#efe6f1'}
                borderColor={Color.border}
                borderWidth={1}
                borderRadius={100}
                fill="#00000000"
                color={Color.Main}
                indeterminate={false}
                indeterminateAnimationDuration={4000}
              />
              {/* <View style={styles.PropgressBox}>
                <View style={[styles.inner, {width: 100}]} />
              </View> */}
            </View>
            <Text style={styles.Heading}>Diligence during work</Text>
            <View style={[GlobalStyle.Row, styles.RowBox]}>
              <Text style={styles.title}>
                {employee_performances?.Dilgence?.toFixed(1)}
              </Text>
              <Progress.Bar
                progress={
                  employee_performances?.Dilgence
                    ? employee_performances?.Dilgence / 5
                    : 0 / 5
                }
                width={w}
                height={9}
                unfilledColor={'#efe6f1'}
                animated={true}
                borderColor={Color.border}
                borderWidth={1}
                borderRadius={100}
                fill="#00000000"
                color={Color.Main}
                indeterminate={false}
                indeterminateAnimationDuration={4000}
              />
              {/* <View style={styles.PropgressBox}>
                <View style={[styles.inner, {width: 100}]} />
              </View> */}
            </View>
            <Text style={styles.Heading}>Hardworking</Text>
            <View style={[GlobalStyle.Row, styles.RowBox]}>
              <Text style={styles.title}>
                {employee_performances?.Work_Ethics?.toFixed(1)}
              </Text>
              <Progress.Bar
                progress={
                  employee_performances?.Work_Ethics
                    ? employee_performances?.Work_Ethics / 5
                    : 0 / 5
                }
                width={w}
                height={9}
                animated={true}
                borderColor={Color.border}
                unfilledColor={'#efe6f1'}
                borderWidth={1}
                borderRadius={100}
                fill="#00000000"
                color={Color.Main}
                indeterminate={false}
                indeterminateAnimationDuration={4000}
              />
              {/* <View style={styles.PropgressBox}>
                <View style={[styles.inner, {width: 100}]} />
              </View> */}
            </View>
            <Text style={styles.Heading}>Overall Work Quality Assessment</Text>
            <View style={[GlobalStyle.Row, styles.RowBox]}>
              <Text style={styles.title}>
                {employee_performances?.Quality?.toFixed(1)}
              </Text>
              <Progress.Bar
                progress={
                  employee_performances?.Quality
                    ? employee_performances?.Quality / 5
                    : 0 / 5
                }
                width={w}
                height={9}
                unfilledColor={'#efe6f1'}
                animated={true}
                borderColor={Color.border}
                borderWidth={1}
                borderRadius={100}
                fill="#00000000"
                color={Color.Main}
                indeterminate={false}
                indeterminateAnimationDuration={4000}
              />
              {/* <View style={styles.PropgressBox}>
                <View style={[styles.inner, {width: 100}]} />
              </View> */}
            </View>
          </View>
          {/* <View style={GlobalStyle.BarBox}>
            {ProgressProfessional.map((item, index) => {
              return <Progressbar key={index} data={item} />;
            })}
          </View> */}
        </View>
        <View style={{height: verticalScale(20)}} />
      </ScrollView>
      {type != 'search' ? (
        <View style={GlobalStyle.EndBtnBox}>
          <CustomButton
            Ripple={GlobalStyle.PurpleRipple}
            textStyle={{color: Color.Main}}
            title="Close"
            onPress={() => navigation.goBack()}
            ButtonStyle={[GlobalStyle.ReverseBtn, {flex: 0.45}]}
          />
          <CustomButton
            Ripple={GlobalStyle.WhiteRipple}
            title="Add Rating"
            onPress={() =>
              navigation.navigate('rating', {
                userData: data?.empid ? employee_performances : data,
              })
            }
            ButtonStyle={{flex: 0.45}}
          />
        </View>
      ) : null}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  Box: {
    backgroundColor: Color.ThemeLightGreen,
    borderWidth: scale(1.5),
    borderColor: Color.ThemeDarkGreen,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(10),
    paddingVertical: moderateVerticalScale(15),
  },
  Heading: {
    color: Color.MidGrey,
    fontFamily: Font.Inter400,
    fontSize: scale(14),
  },
  percentage: {
    color: Color.Black,
    fontFamily: Font.Inter500,
    fontSize: scale(16.5),
  },
  Line: {
    backgroundColor: Color.border,
    height: verticalScale(2),
    marginVertical: verticalScale(15),
    borderRadius: 10,
  },
  title: {
    color: Color.Black,
    fontSize: scale(16),
    marginRight: scale(5),
  },
  PropgressBox: {
    borderRadius: 100,
    borderWidth: scale(1),
    borderColor: Color.border,
    height: verticalScale(9),
    width: '90%',
  },
  inner: {
    backgroundColor: Color.Main,
    height: '100%',
    borderRadius: 100,
  },
  // Heading: {
  //   color: Color.MidGrey,
  //   fontSize: scale(15),
  //   fontFamily: Font.Inter400,
  // },
  RowBox: {marginTop: verticalScale(8), marginBottom: verticalScale(12)},
});

export default PerformanceHistory;
