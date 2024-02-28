import React, {FC, useState} from 'react';
import {StyleSheet, Text, View, SafeAreaView, ScrollView} from 'react-native';
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
import {Font} from '../../../utils/font';
import {Color} from '../../../utils/Color';
import StarRating from 'react-native-star-rating';

// interface RatingProps {
//   navigation: any;
// }

const allData = {
  Trust: 0,
  Obedience: 0,
  Availability: 0,
  Kindness: 0,
  Safety: 0,
  Clenliness: 0,

  Instructions: 0,
  Consciencious: 0,
  Initiative: 0,
  Dilgence: 0,
  Work_Ethics: 0,
  Quality: 0,
};
const Rating = ({navigation, route}) => {
  const {userData} = route.params;
  const [allrating, setAllRating] = useState(allData);

  const totalNum = Object.values(allrating).every(e => e >= 1);

  console.log('totalNum', totalNum);

  const handleChange = (name, elm) => {
    setAllRating({...allrating, [name]: elm});
  };

  const handleOnSubmit = () => {
    if(totalNum){
      navigation.navigate('ratingFeedBack', {
        allrating: allrating,
        userData: userData,
      })
    }else{
      alert('Oops! Looks like you missed rating one or more items. Please make sure to rate all 12 items to continue. Thank you!')
    }
  };

  return (
    <SafeAreaView style={GlobalStyle.container}>
      <Header
        title="Rate Performance"
        step
        step_title="1/2"
        // isBtnTitleß
        // BtnTitle="save"
        percentage="50%"
        gapp
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[GlobalStyle.grey_container, GlobalStyle.Padding]}>
          <Text style={[GlobalStyle.BarText, styles.barTextMargin]}>
            Rate Personal attributes
          </Text>

          <View style={GlobalStyle.BarBox}>
            {/* {PersonalStarData.map((item, index) => {
              return <RatingCard key={index} data={item} />;
            })} */}
            {/* <View
              style={[
                GlobalStyle.BarBox,
                {
                  borderWidth: 0,
                },
              ]}>
              <View
                style={[GlobalStyle.Row, {justifyContent: 'space-between'}]}>
                <Text style={styles.Heading}>Trustworthiness/Honesty</Text>
                <Text style={styles.number}>5.0</Text>
              </View>
              <StarRating
                fullStarColor="#E2B93B"
                maxStars={5}
                halfStarEnabled
                rating={rating}
                selectedStar={setRating}
                containerStyle={styles.starContainer}
              />
            </View> */}
            <RatingCard
              heading={'Trustworthiness/Honesty'}
              number={'5.0'}
              rating={allrating?.Trust}
              selectedStar={elm => handleChange('Trust', elm)}
            />
            <RatingCard
              heading={'Obedient/Follows Instructions'}
              number={'5.0'}
              rating={allrating?.Obedience}
              selectedStar={elm => handleChange('Obedience', elm)}
            />
            <RatingCard
              heading={'Availability/Attendance'}
              number={'5.0'}
              rating={allrating?.Availability}
              selectedStar={elm => handleChange('Availability', elm)}
            />
            <RatingCard
              heading={'Kind and Compassionate'}
              number={'5.0'}
              rating={allrating?.Kindness}
              selectedStar={elm => handleChange('Kindness', elm)}
            />
            <RatingCard
              heading={'Safe Person to be Around'}
              number={'5.0'}
              rating={allrating?.Safety}
              selectedStar={elm => handleChange('Safety', elm)}
            />
            <RatingCard
              heading={'Keeps Self and Surroundings Clean'}
              number={'5.0'}
              rating={allrating?.Clenliness}
              selectedStar={elm => handleChange('Clenliness', elm)}
            />
          </View>

          <Text style={[GlobalStyle.BarText, styles.barTextMargin]}>
            Professional attributes
          </Text>

          <View style={GlobalStyle.BarBox}>
            {/* {ProStarData.map((item, index) => {
              return <RatingCard key={index} data={item} />;
            })} */}
            <RatingCard
              heading={'Easily Understands Instructions'}
              number={'5.0'}
              rating={allrating?.Instructions}
              selectedStar={elm => handleChange('Instructions', elm)}
            />
            <RatingCard
              heading={'Carefulness with Employers items'}
              number={'5.0'}
              rating={allrating?.Consciencious}
              selectedStar={elm => handleChange('Consciencious', elm)}
            />
            <RatingCard
              heading={'Problem Solving'}
              number={'5.0'}
              rating={allrating?.Initiative}
              selectedStar={elm => handleChange('Initiative', elm)}
            />
            <RatingCard
              heading={'Diligence during work'}
              number={'5.0'}
              rating={allrating?.Dilgence}
              selectedStar={elm => handleChange('Dilgence', elm)}
            />
            <RatingCard
              heading={'Hardworking'}
              number={'5.0'}
              rating={allrating?.Work_Ethics}
              selectedStar={elm => handleChange('Work_Ethics', elm)}
            />
            <RatingCard
              heading={'Overall Work Quality Assessment'}
              number={'5.0'}
              rating={allrating?.Quality}
              selectedStar={elm => handleChange('Quality', elm)}
            />
          </View>
        </View>
        <View style={{height: verticalScale(15)}} />
      </ScrollView>
      <View style={GlobalStyle.EndBtnBox}>
        <CustomButton
          onPress={() => handleOnSubmit()}
          Ripple={GlobalStyle.WhiteRipple}
          title="Next"
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
  Heading: {
    color: Color.MidGrey,
    fontFamily: Font.Inter400,
    fontSize: scale(15),
  },
  number: {
    color: Color.MidGrey,
    fontFamily: Font.Inter400,
    fontSize: scale(15),
  },
  starContainer: {
    paddingHorizontal: moderateScale(20),
    paddingTop: moderateVerticalScale(10),
  },
});
export default Rating;
