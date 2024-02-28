import React from 'react';
import {Platform, Pressable, StyleSheet, Text, View,Image} from 'react-native';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Color} from '../../utils/Color';
import {GlobalStyle} from '../../Constants/GlobalStyle';
import {Font} from '../../utils/font';
import Octicons from 'react-native-vector-icons/Octicons';

const Header = props => {
  const navigation = useNavigation();
  const drawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };
  return (
    <>
      <View style={[GlobalStyle.Row, styles.Container]}>
        {props.menu ? (
          <Pressable
            onPress={drawer}
            android_ripple={GlobalStyle.PurpleRipple}
            style={styles.Circle}>
              <View style={{
                height: 22,
                width:22,
                overflow:'hidden'
              }}>
                  <Image 
                  resizeMode='contain'
                  style={{
                    height:'100%',
                    width:'100%',
                  }}
                  source={require('../../assets/image/newmenu.png')}
                  />
              </View>
            {/* <Entypo name="menu" color={Color.Grey} size={scale(20)} /> */}
          </Pressable>
        ) : (
          <Pressable
            onPress={() => navigation.goBack()}
            android_ripple={GlobalStyle.PurpleRipple}
            style={styles.Circle}>
            <Entypo name="chevron-left" color={Color.Grey} size={25} />
          </Pressable>
        )}
        <View>
          {props.step && (
            <Text style={styles.Step}>Step {props.step_title}</Text>
          )}
          <Text style={styles.Text}>{props.title}</Text>
        </View>
        {props.isBtnTitle && (
          <Pressable onPress={props.onBtnPress}>
            <Text style={[styles.Text, styles.BtnText]}>{props.BtnTitle}</Text>
          </Pressable>
        )}

        {props.gapp && (
          <View style={[styles.Circle, {backgroundColor: Color.Non}]}>
            <Entypo name="chevron-left" color={Color.Non} size={25} />
          </View>
        )}
        {props.search && (
          <Pressable
            onPress={() => navigation.navigate('search')}
            android_ripple={GlobalStyle.PurpleRipple}
            style={styles.Circle}>
            <Feather name="search" color={'#575E6E'} size={Platform.OS == 'android' ? 21 : 21} />
          </Pressable>
        )}
        {props.esc && (
          <Pressable
            onPress={props.onEsc}
            android_ripple={GlobalStyle.PurpleRipple}
            style={[styles.Circle]}>
            <AntDesign
              name="exclamationcircleo"
              color={'#575E6E'}
              size={20}
            />
          </Pressable>
        )}
        {props.Download && (
          <Pressable
            onPress={props.onDownload}
            android_ripple={GlobalStyle.PurpleRipple}
            style={[styles.Circle]}>
            <Octicons name="download" color={Color.Grey} size={25} />
          </Pressable>
        )}
      </View>
      {props.step && (
        <View style={[styles.Progress, {width: props.percentage}]} />
      )}
      <View
        style={{borderBottomWidth: scale(1.5), borderBlockColor: '#F4F4F5'}}
      />
    </>
  );
};

const styles = StyleSheet.create({
  Container: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    justifyContent: 'space-between',

    backgroundColor: Color.white,
  },
  Circle: {
    borderRadius: 100,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    overflow: 'hidden',
    aspectRatio: 1 / 1,
    width: 50,
  },
  Text: {
    color: Color.DarkBlue,
    fontFamily: Font.Inter500,
    fontSize: 15,
  },
  Step: {
    color: Color.Main,
    textAlign: 'center',
  },
  Progress: {
    backgroundColor: Color.Main,
    height: 3,
  },
  BtnText: {
    color: Color.Main,
    textDecorationLine: 'underline',
    textTransform: 'capitalize',
  },
});
export default Header;
