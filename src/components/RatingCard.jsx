import React, {FC, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {GlobalStyle} from '../Constants/GlobalStyle';
import {Color} from '../utils/Color';
import {Font} from '../utils/font';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import StarRating from 'react-native-star-rating';

// interface RatingCardProps {
//   data: any;
// }
const RatingCard = props => {
  const [rating, setRating] = useState(0);
  return (
    <View
      style={[
        GlobalStyle.BarBox,
        {
          borderWidth: 0,
        },
      ]}>
      <View style={[GlobalStyle.Row, {justifyContent: 'space-between'}]}>
        <Text style={styles.Heading}>{props.heading}</Text>
        <Text style={styles.number}>{props.number}</Text>
      </View>
      <StarRating
        fullStarColor="#E2B93B"
        maxStars={5}
        // halfStarEnabled
        rating={props.rating}
        selectedStar={props.selectedStar}
        containerStyle={styles.starContainer}
      />
    </View>
  );
};
const styles = StyleSheet.create({
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
export default RatingCard;
