import React, {forwardRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {Color} from '../utils/Color';
import {Font} from '../utils/font';

import {GlobalStyle} from '../Constants/GlobalStyle';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {SelectList} from 'react-native-dropdown-select-list';

const CustomDropDown = forwardRef((props, ref) => {
  return (
    <View style={props.style}>
      <Text style={GlobalStyle.InputHeading}>{props.Heading}</Text>
      <SelectList
      
        defaultOption={props.defaultOption}
        placeholder="Select"
        arrowicon={
          <Entypo name="chevron-down" size={scale(18)} color={Color.Black} />
        }
        closeicon={
          <AntDesign
            name="closecircleo"
            size={scale(18)}
            color={Color.border}
          />
        }
        searchicon={
          <Ionicons name="search" size={scale(18)} color={Color.border} />
        }
        // placeholder=''
        searchPlaceholder="Search"
        dropdownStyles={styles.dropdownStyles}
        dropdownItemStyles={styles.dropdownItemStyles}
        boxStyles={styles.boxStyles}
        dropdownTextStyles={styles.dropdownTextStyles}
        inputStyles={styles.inputStyles}
        search={false}
        data={props.items}
        setSelected={props.setValue}
        save={props.save}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  InputStyles: {
    width: '100%',
    height: '100%',
    color: Color.Black,
    fontFamily: Font.Inter500,
    fontSize: 14,
  },
  smallbox: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 5,
    width: '100%',
    paddingHorizontal: 15,
    height: 42,
    backgroundColor: Color.white,
    borderWidth: 1,
    borderColor: Color.border,
  },
  boxStyles: {
    height: 50,
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: Color.border,
    backgroundColor: Color.White,
  },
  inputStyles: {
    color: Color.Black,
    fontSize: 14,
    fontFamily: Font.Inter500,
  },
  dropdownTextStyles: {
    color: Color.Black,
  },
  dropdownItemStyles: {
    backgroundColor: Color.Non,
  },
  dropdownStyles: {
    backgroundColor: Color.Non,
    borderWidth: 1,
    borderColor: Color.Black,
  },
});
export default CustomDropDown;
