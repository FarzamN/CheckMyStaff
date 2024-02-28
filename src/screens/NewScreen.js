import React, {FC, useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  ScrollView,
  Dimensions,
  Button,
  TouchableOpacity,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import {verticalScale} from 'react-native-size-matters';
import {moderateScale} from 'react-native-size-matters';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {moderateVerticalScale} from 'react-native-size-matters';
import {format} from 'date-fns';
import RNFS from 'react-native-fs';
import * as Progress from 'react-native-progress';
import AllIRComp from '../components/IncidentCompo/AllIRComp';
import { Color } from '../utils/Color';
import { GlobalStyle } from '../Constants/GlobalStyle';
import { Font } from '../utils/font';
import KeyValue from '../components/Cards/KeyValue';

const windowWidth = Dimensions.get('window').width;

const staticData = [
  {
    id: '1',
    Date_Submitted: '2023-01-01T12:00:00Z',
    vvv:'vvvv',
    dataType: 'about'
    // ... other fields for the first object
  },
  {
    id: '2',
    Date_Submitted: '2023-02-01T12:00:00Z',
      dataType: 'contact'
    // ... other fields for the second object
  },
  {
    id: '3',
    Date_Submitted: '2023-03-01T12:00:00Z',
    dataType: 'refree'
    // ... other fields for the third object
  },
  {
    id: '4',
    Date_Submitted: '2023-04-01T12:00:00Z',
    dataType: 'work'
    // ... other fields for the fourth object
  },
  // {
  //   id: '5',
  //   Date_Submitted: '2023-05-01T12:00:00Z',
  //   // ... other fields for the fifth object
  // },
];

const NewScreen = ({get_employeepro_data,type,    newchangeDSepr,
    age,
    formattedNumber,
    newchangeDHire,
    dobNew,
    newSeparated}) => {
    const itemsPerBox = 1; // Number of items per box
  const pageSize = 4; // Number of boxes per page
  const [currentPage, setCurrentPage] = useState(1);

  // Generate static data for 5 pages
  // const staticData = Array.from({ length: pageSize }).map((_, pageIndex) => {
  //   // Generate a unique ID for each item
  //   const id = `static-${pageIndex + 1}`;
  
  //   // Use your date logic here
  //   const dateSubmitted = new Date().toISOString();
  
  //   // Other fields that your data might have
  //   const otherField1 = `Field1-${pageIndex + 1}`;
  //   const otherField2 = `Field2-${pageIndex + 1}`;
  
  //   return {
  //     id,
  //     Date_Submitted: dateSubmitted,
  //     otherField1,
  //     otherField2,
  //     // ... add more fields as needed
  //   };
  // });

  const boxes = staticData.reduce((acc, item, index) => {
    const boxIndex = Math.floor(index / itemsPerBox);
    if (!acc[boxIndex]) {
      acc[boxIndex] = [];
    }
    acc[boxIndex].push(item);
    return acc;
  }, []);
  

  const handleNextPage = () => {
    if (currentPage < pageSize) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const scrollViewRef = useRef();

  const scrollToPage = (page) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: (page - 1) * Dimensions.get('window').width,
        animated: true,
      });
      setCurrentPage(page);
    }
  };

  return (
    <View style={{ flex: 1}}>
            <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  height: 60,
                  width: '100%',
                  alignItems: 'center',
                  // marginVertical: 15,
                  // backgroundColor:'red'
                }}
              >
             
                {/* <View
                  style={{
                    height: 70,
                    width: '90%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    // backgroundColor:'red',
                    // marginHorizontal:15
                    alignSelf:'center'
                  }}
                > */}
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                      // alignItems: 'center',
                      paddingHorizontal:16
                    }}
                  >
                    {Array.from({ length: pageSize })?.map((_, index) => (
                        <TouchableOpacity
                        activeOpacity={0.5}
                          key={index + '-box'}
                          onPress={() => scrollToPage(index + 1)}
                          style={{
                            height: 50,
                            width: 100,
                            // backgroundColor:'red',
                            // borderRadius: 100,
                            // backgroundColor:'red',
                            // backgroundColor:
                            //   currentPage === index + 1 ? '#f5f5f5' : 'white',
                            justifyContent: 'center',
                            alignItems: 'center',
                            // textAlign:'center',
                            margin: 2,
                            borderBottomWidth:1.2,
                            borderBlockColor:currentPage === index + 1 ? Color.Main : '#eff0f0',
                            bottom:2
                          }}
                        >
                          <Text 
                          style={{
                            fontFamily: Font.Inter500,
                            fontSize:14,
                            color: currentPage === index + 1 ? Color.Main : '#71788A'
                          }}
                          >{
                          index == 0 ?
                          'About':
                          index == 1 ?
                          'Contact Info':
                          index == 2 ?
                          'Refree':
                          'Work History'

                          
                          }</Text>
                          {/* <Text>{1 + index}</Text> */}
                        </TouchableOpacity>
                    ))}
                  </ScrollView>
                {/* </View> */}
               
              </View>


    <ScrollView
      nestedScrollEnabled
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      horizontal
      pagingEnabled
      ref={scrollViewRef}
      onMomentumScrollEnd={(event) => {
        const page =
          Math.ceil(
            event.nativeEvent.contentOffset.x / Dimensions.get('window').width,
          ) + 1;
        setCurrentPage(page);
      }}
    >
      {boxes.map((box, boxIndex) => {
        return (
          <View
            key={boxIndex}
            style={{
              width: Dimensions.get('window').width,
              height: '100%',
              paddingHorizontal: 10,
            }}
          >
            <ScrollView
            showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              style={{
                height: 480,
              }}
            >
              {box.map((item, itemIndex) => {
                return (
                  item?.dataType == 'about'?
                  <View key={itemIndex} style={GlobalStyle.Padding}  >
              <Text
                style={
                  {
                    fontSize: 15,
                    fontFamily: Font.Inter500,
                    textAlign: 'left', 
                    marginVertical: 20,
                    color:'#22293B',
                  }
                }>
                {type == 'detail' ? 'About employee' : 'Add employee'}
              </Text>
              <View
                style={[GlobalStyle.KeyValueContainer, {marginHorizontal: 0}]}>
                <KeyValue
                  keys="Employee ID"
                  value={get_employeepro_data?.id}
                />
                <KeyValue
                  keys="Identification No"
                  value={formattedNumber}
                />
                <KeyValue keys="Search Date" value={item?.vvv} />
                {/* <KeyValue keys="NIN.NO" value={get_employeepro_data?.NIN} /> */}
                <KeyValue
                  keys="First Name"
                  value={get_employeepro_data?.First_Name}
                />
                <KeyValue
                  keys="Middle Name"
                  value={get_employeepro_data?.Middle_Name}
                />
                <KeyValue
                  keys="Last Name"
                  value={get_employeepro_data?.Last_Name}
                />
                <KeyValue keys="DOB" value={dobNew} />
                <KeyValue keys="Age" value={age} />
                <KeyValue keys="Sex" value={get_employeepro_data?.Sex} />
                <KeyValue
                  keys="Marital status"
                  value={get_employeepro_data?.Marita_Status}
                />
              </View>
                   </View>
                   :
                   item?.dataType == 'contact' ?
                   <View key={itemIndex} style={GlobalStyle.Padding}>
              <Text
                 style={
                  {
                    fontSize: 15,
                    fontFamily: Font.Inter500,
                    textAlign: 'left', 
                    marginVertical: 20,
                    color:'#22293B',
                  }
                }>
                Employee’s Contact Info
              </Text>
              <View
                style={[GlobalStyle.KeyValueContainer, {marginHorizontal: 0}]}>
                <KeyValue keys="Email" value={get_employeepro_data?.Email} />
                <KeyValue
                  keys="Cell Phone"
                  value={get_employeepro_data?.CellPhone}
                />
                <KeyValue
                  keys="Telephone"
                  value={get_employeepro_data?.Telephone}
                />
                <KeyValue
                  keys="Address"
                  value={get_employeepro_data?.Address}
                />
                <KeyValue keys="Phone Carrier" value={get_employeepro_data?.PhoneCarrier} />
                <KeyValue keys="City" value={get_employeepro_data?.City} />
                <KeyValue keys="State" value={get_employeepro_data?.stateid} />
                <KeyValue keys="LGA" value={get_employeepro_data?.LGA} />
                <KeyValue
                  keys="Nigerian"
                  value={get_employeepro_data?.Nigerian == 1 ? 'Yes' : 'No'}
                />
                {/* <KeyValue
                  keys="Country"
                  value={get_employeepro_data?.CountryofOrigin}
                /> */}
                {/* <KeyValue
                  keys="Marital Status"
                  value={get_employeepro_data?.Marita_Status}
                /> */}
              </View>
            </View>
            : item?.dataType == 'refree' ?
            <View key={itemIndex} style={GlobalStyle.Padding}>
            <Text
              style={
                {
                  fontSize: 15,
                  fontFamily: Font.Inter500,
                  textAlign: 'left', 
                  marginVertical: 20,
                  color:'#22293B',
                }
              }>
              Refree’s info
            </Text>
            <View
              style={[GlobalStyle.KeyValueContainer, {marginHorizontal: 0}]}>
              <KeyValue
                keys="Guarantor's name"
                value={get_employeepro_data?.RefereeName}
              />
              <KeyValue
                keys="Address"
                value={get_employeepro_data?.RefereeContactAddress}
              />
              <KeyValue
                keys="Phone number"
                value={get_employeepro_data?.RefereeContatctPhone}
              />
            </View>
          </View>
          :
          <View key={itemIndex} style={GlobalStyle.Padding}>
          <Text
             style={
              {
                fontSize: 15,
                fontFamily: Font.Inter500,
                textAlign: 'left', 
                marginVertical: 20,
                color:'#22293B',
              }
            }>
            Employee’s work history
          </Text>
          <View
            style={[GlobalStyle.KeyValueContainer, {marginHorizontal: 0}]}>
            <KeyValue
              keys="Occupation"
              value={get_employeepro_data?.Occupation}
            />
            <KeyValue
              keys="Recruitment Agency"
              value={
                get_employeepro_data?.agency?.AgencyName
                  ? get_employeepro_data?.agency?.AgencyName
                  : 'Nil'
              }
            />
            <KeyValue
              keys="Date Hired"
              value={get_employeepro_data?.Date_Hired ? newchangeDHire : null}
            />
            <KeyValue
              keys="Date Seprated"
              value={get_employeepro_data?.Date_Seperated ? newchangeDSepr : null}
            />
            <KeyValue
              keys="Length of Employment"
              value={get_employeepro_data?.LengthofEmployment}
            />
            <KeyValue
              keys="Conduct"
              value={get_employeepro_data?.Conduct}
            />
            <KeyValue
              keys="Hire Again"
              value={get_employeepro_data?.Hire_Again}
            />
          </View>
        </View>
                );
              })}
          
            </ScrollView>
          </View>
        );
      })}
    </ScrollView>
    
    <View style={{ height: verticalScale(70) }} />
  </View>
  )
}

export default NewScreen

const styles = StyleSheet.create({})