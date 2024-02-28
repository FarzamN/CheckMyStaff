import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';
import {Color} from '../utils/Color';
import {Font} from '../utils/font';
import {Platform, StyleSheet} from 'react-native';

export const GlobalStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  grey_container: {
    flex: 1,
    backgroundColor: Color.LightGrey,
  },
  Heading: {
    textAlign: 'center',
    color: Color.Black,
    fontSize: 18,
    fontFamily: Font.Inter500,
  },
  subHeading: {
    color: Color.MidGrey,
    fontSize: 12,
    fontFamily: Font.Inter400,
  },
  ReverseBtn: {
    backgroundColor: Color.white,
    borderColor: Color.Main,
  },
  ErrorBtn: {
    backgroundColor: 'rgba(255, 0, 0,0.07)',
    borderColor: Color.red,
    overflow:'hidden',
    
  },
  InputHeading: {
    color: Color.Grey,
    fontSize: 12,
    marginTop: 15,
    fontFamily: Font.Inter500,
  },
  Row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  Space_between: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  HideBar: {
    display: 'none',
  },
  showBar: {
    display: 'flex',
    backgroundColor: Color.white,
    height: Platform.OS == 'android' ? 60 : 80,
    borderTopColor: '#F4F4F5',
    paddingTop: Platform.OS == 'android' ? 0 : 20,
    position: 'absolute',
    bottom: 0,
  },

  ModalText: {
    fontSize: 16,
    textAlign: 'center',
    padding: 20,
    fontFamily: Font.Inter600,
    color: Color.Main,
  },
  ModalContainer: {
    justifyContent: 'flex-start',
    width: '95%',
    borderRadius: 10,
    backgroundColor: Color.white,
    alignSelf: 'center',
    marginTop: 15,
    paddingVertical: 15,
  },
  MainModal: {
    justifyContent: 'flex-start',
    margin: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  ModalLine: {
    width: '20%',
    height: 4,
    backgroundColor: Color.Grey,
    alignSelf: 'center',
    borderRadius: 10,
    marginVertical: 15,
  },
  SocialSignInButton: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Color.white,
    alignItems: 'center',
    marginTop: 20,
    paddingVertical: 12,
  },
  LottieView: {
    height: 150,
    alignSelf: 'center',
  },
  Image: {
    width: '100%',
    height: '100%',
  },
  noGap: {
    paddingHorizontal: 0,
  },
  Padding: {
    paddingHorizontal: 20,
  },
  PurpleRipple: {
    color: 'rgba(140, 81, 159, 0.5)',
    foreground: true,
    borderless: true,
  },
  WhiteRipple: {
    color: Color.White,
    borderless: true,
    foreground: true,
  },
  BlueRipple: {
    color: Color.DarkBlue,
    foreground: true,
    // borderless: true,
  },
  Space: {
    width: 20,
  },
  HomeCountHeading: {
    color: Color.DarkBlue,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  EndBtnBox: {
    backgroundColor: Color.White,
    paddingHorizontal: 1,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  Line: {
    backgroundColor: Color.DarkBlue,
    width: 80,
    height: 6,
    alignSelf: 'center',
    borderRadius: 100,
    marginVertical: 10,
  },
  parent: {
    borderWidth: 1,
    borderRadius: 100,
    height: 10,
    aspectRatio: 1 / 1,
  },
  child: {
    backgroundColor: Color.Main,
    borderRadius: 100,
    flex: 1,
    margin: 1,
    
  },
  PlusBox: {
    position: 'absolute',
    bottom: 10,
    right: 15,
    backgroundColor: '#CFD0D4',
    borderRadius: 360,
    width: 60,
    aspectRatio: 1 / 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  BigImage: {
    width: '100%',
    overflow: 'hidden',
  },
  anchorText: {
    color: Color.Main,
    textDecorationLine: 'underline',
    fontFamily: Font.Poppins600,
    fontSize: 14,
    marginTop: 8,
  },
  key: {
    color: Color.MidGrey,
    fontSize: 14,
    fontFamily: Font.Inter500,
    width: '55%',
  },
  value: {
    color: Color.Black,
    fontSize: 14,
    fontFamily: Font.Inter500,
  },
  RowContrainer: {
    paddingVertical: 10,
  },
  BarBox: {
    backgroundColor: Color.White,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Color.border,
  },
  BarText: {
    color: Color.Black,
    fontFamily: Font.Inter500,
    fontSize: 16,
  },
  DateBoX: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    height: 50,
    backgroundColor: Color.White,
    overflow: 'hidden',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Color.border,
    marginTop: 10,
  },
  ChooseText: {
    fontSize: 14,
    color: Color.MidGrey,
    fontFamily: Font.Inter500,
  },
  VerticalSpace: {
    height: 20,
  },
  KeyValueContainer: {
    backgroundColor: Color.White,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: Color.border,
    marginTop: 5,
    marginHorizontal: 20,
    borderRadius: 15,
  },
  Shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  RecBox: {
    justifyContent: 'space-between',
    marginTop: 15,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: Color.border,
    paddingVertical: 20,
    paddingHorizontal: 15,
    width: '100%',
  },
});
