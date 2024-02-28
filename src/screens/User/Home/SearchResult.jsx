import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Tabs, MaterialTabBar} from 'react-native-collapsible-tab-view';
import HeaderComp from '../../../components/Header/Header';
import {GlobalStyle} from '../../../Constants/GlobalStyle';
import {Color} from '../../../utils/Color';
import CustomButton from '../../../components/CustomButton';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import KeyValue from '../../../components/Cards/KeyValue';
import {Font} from '../../../utils/font';
import {
  getEmployeIncidentRep,
  getEmployePerformnce,
  updateEmployeeInFO,
} from '../../../redux/actions/UserActions';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import DoubleText from '../../../components/NewLoader/DoubleText';
import Share from 'react-native-share';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNPrint from 'react-native-print';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import Toast from 'react-native-simple-toast';

const {height} = Dimensions.get('window');

const Header = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {type, data, newType} = route.params;
  const get_employeepro_data = useSelector(state => state.get_employeepro_data);
  const search_detail_loader = useSelector(state => state.search_detail_loader);
  const incidenceReports = useSelector(state => state.get_employee_incidentrep);
  const employee_performances = useSelector(
    state => state.get_employee_performance,
  );

  // console.log('get_employeepro_data vvv', get_employeepro_data);
  const [age, setAge] = useState(null);

  const calculateAge = () => {
    if (get_employeepro_data?.DOB) {
      const birthDate = moment(get_employeepro_data?.DOB, 'YYYY-MM-DD');
      const today = moment();
      const age = today?.diff(birthDate, 'years');
      setAge(age?.toString());
    }
  };

  useEffect(() => {
    calculateAge();
  }, [get_employeepro_data?.DOB]);

  // console.log('get_employeepro_data?.Search_Date', get_employeepro_data?.Search_Date)

  const dateSep = moment(
    get_employeepro_data?.Search_Date,
    'YYYY-MM-DD HH:mm:ss',
  );
  const newSeparated = dateSep.format('DD/MM/YYYY');

  const changeDOB = moment(get_employeepro_data?.DOB, 'YYYY-MM-DD HH:mm:ss');
  const dobNew = changeDOB?.format('DD/MM/YYYY');

  const changeDHire = moment(
    get_employeepro_data?.Date_Hired,
    'YYYY-MM-DD HH:mm:ss',
  );
  const newchangeDHire = changeDHire?.format('DD/MM/YYYY');

  const changeDSepr = moment(
    get_employeepro_data?.Date_Seperated,
    'YYYY-MM-DD HH:mm:ss',
  );
  const newchangeDSepr = changeDSepr?.format('DD/MM/YYYY');

  useFocusEffect(
    useCallback(() => {
      navigation.getParent()?.setOptions({
        tabBarStyle: GlobalStyle.HideBar,
      });
      // calculateAge();
      // dispatch(getEmployeIncidentRep(userData?.id));
      dispatch(getEmployePerformnce(get_employeepro_data?.id));
      dispatch(getEmployeIncidentRep(get_employeepro_data?.id));
      dispatch(updateEmployeeInFO(get_employeepro_data?.id));
    }, []),
  );

  const handleNav = () => {
    if (employee_performances?.Score) {
      navigation.navigate('performanceHistory', {
        data: get_employeepro_data,
        type: type,
        // data: newType == 'new' ? data : data?.employee_performances[0],
      });
    } else if (type == 'search') {
      navigation.navigate('performanceHistory', {
        data: get_employeepro_data,
        type: type,
        // data: newType == 'new' ? data : data?.employee_performances[0],
      });
    } else {
      navigation.navigate('rating', {
        userData: get_employeepro_data,
      });
    }
  };
  const formatNumberForSecurity = elm => {
    if (elm) {
      const numberString = elm?.toString();
      // const firstFourDigits = numberString?.substring(0, 3);
      const lastTwoDigits = numberString?.substring(numberString?.length - 4);

      return `*******${lastTwoDigits}`;
    } else {
      return null;
    }
  };

  const formattedNumber = formatNumberForSecurity(get_employeepro_data?.bvn);
  const downloadePDF = async () => {
    try {
      let permissionResult;
  
      if (Platform.OS === 'android') {
        permissionResult = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
      } else if (Platform.OS === 'ios') {
        permissionResult = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
        // Replace 'PHOTO_LIBRARY' with the appropriate iOS permission based on your needs
      }
  
      if (permissionResult === RESULTS.GRANTED) {
        // Toast.show('Permission Granted');
        const results = await RNHTMLtoPDF.convert({
          html: `<!DOCTYPE html>
          <html>
            <head>
              <meta content="PDFix SDK 6.20.0" name="creator" />
              <meta content="www.pdfix.net" name="creator-url" />
              <meta charset="UTF-8" />
              <meta content="width=device-width, initial-scale=1" name="viewport" />
              <title></title>
          
              <!-- <link href="https://cdn.tailwindcss.com" rel="stylesheet"> -->
              <link rel="preconnect" href="https://fonts.googleapis.com" />
              <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
              <link
                href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Noto+Color+Emoji&family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
                rel="stylesheet"
              />
          
              <style>
                /* body {
                  width: 98vw;
                } */
          
                h1,
                h2,
                h3,
                h4 {
                  margin: 0;
                }
          
                td {
                  padding: 8px;
                  font-size: medium;
                }
          
                /* .logo {
                  width: 30%;
                }
          
                .profile-pic {
                  height: 300px;
                } */
          
                .sr-only {
                  position: absolute;
                  width: 1px;
                  height: 1px;
                  padding: 0;
                  margin: -1px;
                  overflow: hidden;
                  clip: rect(0, 0, 0, 0);
                  white-space: nowrap;
                  border-width: 0;
                }
          
                .not-sr-only {
                  position: static;
                  width: auto;
                  height: auto;
                  padding: 0;
                  margin: 0;
                  overflow: visible;
                  clip: auto;
                  white-space: normal;
                }
                .bg-fixed {
                  background-attachment: fixed;
                }
          
                .bg-local {
                  background-attachment: local;
                }
          
                .bg-scroll {
                  background-attachment: scroll;
                }
          
                .bg-transparent {
                  background-color: transparent;
                }
          
                .bg-black {
                  background-color: #000;
                }
          
                .bg-white {
                  background-color: #fff;
                }
          
                .bg-gray-100 {
                  background-color: #f7fafc;
                }
          
                .bg-gray-200 {
                  background-color: #edf2f7;
                }
          
                .bg-gray-300 {
                  background-color: #e2e8f0;
                }
          
                .bg-gray-400 {
                  background-color: #cbd5e0;
                }
          
                .bg-gray-500 {
                  background-color: #a0aec0;
                }
          
                .bg-gray-600 {
                  background-color: #718096;
                }
          
                .bg-gray-700 {
                  background-color: #4a5568;
                }
          
                .bg-gray-800 {
                  background-color: #2d3748;
                }
          
                .bg-gray-900 {
                  background-color: #1a202c;
                }
          
                .bg-red-100 {
                  background-color: #fff5f5;
                }
          
                .bg-red-200 {
                  background-color: #fed7d7;
                }
          
                .bg-red-300 {
                  background-color: #feb2b2;
                }
          
                .bg-red-400 {
                  background-color: #fc8181;
                }
          
                .bg-red-500 {
                  background-color: #f56565;
                }
          
                .bg-red-600 {
                  background-color: #e53e3e;
                }
          
                .bg-red-700 {
                  background-color: #c53030;
                }
          
                .bg-red-800 {
                  background-color: #9b2c2c;
                }
          
                .bg-red-900 {
                  background-color: #742a2a;
                }
          
                .bg-orange-100 {
                  background-color: #fffaf0;
                }
          
                .bg-orange-200 {
                  background-color: #feebc8;
                }
          
                .bg-orange-300 {
                  background-color: #fbd38d;
                }
          
                .bg-orange-400 {
                  background-color: #f6ad55;
                }
          
                .bg-orange-500 {
                  background-color: #ed8936;
                }
          
                .bg-orange-600 {
                  background-color: #dd6b20;
                }
          
                .bg-orange-700 {
                  background-color: #c05621;
                }
          
                .bg-orange-800 {
                  background-color: #9c4221;
                }
          
                .bg-orange-900 {
                  background-color: #7b341e;
                }
          
                .bg-yellow-100 {
                  background-color: #fffff0;
                }
          
                .bg-yellow-200 {
                  background-color: #fefcbf;
                }
          
                .bg-yellow-300 {
                  background-color: #faf089;
                }
          
                .bg-yellow-400 {
                  background-color: #f6e05e;
                }
          
                .bg-yellow-500 {
                  background-color: #ecc94b;
                }
          
                .bg-yellow-600 {
                  background-color: #d69e2e;
                }
          
                .bg-yellow-700 {
                  background-color: #b7791f;
                }
          
                .bg-yellow-800 {
                  background-color: #975a16;
                }
          
                .bg-yellow-900 {
                  background-color: #744210;
                }
          
                .bg-green-100 {
                  background-color: #f0fff4;
                }
          
                .bg-green-200 {
                  background-color: #c6f6d5;
                }
          
                .bg-green-300 {
                  background-color: #9ae6b4;
                }
          
                .bg-green-400 {
                  background-color: #68d391;
                }
          
                .bg-green-500 {
                  background-color: #48bb78;
                }
          
                .bg-green-600 {
                  background-color: #38a169;
                }
          
                .bg-green-700 {
                  background-color: #2f855a;
                }
          
                .bg-green-800 {
                  background-color: #276749;
                }
          
                .bg-green-900 {
                  background-color: #22543d;
                }
          
                .bg-teal-100 {
                  background-color: #e6fffa;
                }
          
                .bg-teal-200 {
                  background-color: #b2f5ea;
                }
          
                .bg-teal-300 {
                  background-color: #81e6d9;
                }
          
                .bg-teal-400 {
                  background-color: #4fd1c5;
                }
          
                .bg-teal-500 {
                  background-color: #38b2ac;
                }
          
                .bg-teal-600 {
                  background-color: #319795;
                }
          
                .bg-teal-700 {
                  background-color: #2c7a7b;
                }
          
                .bg-teal-800 {
                  background-color: #285e61;
                }
          
                .bg-teal-900 {
                  background-color: #234e52;
                }
          
                .bg-blue-100 {
                  background-color: #ebf8ff;
                }
          
                .bg-blue-200 {
                  background-color: #bee3f8;
                }
          
                .bg-blue-300 {
                  background-color: #90cdf4;
                }
          
                .bg-blue-400 {
                  background-color: #63b3ed;
                }
          
                .bg-blue-500 {
                  background-color: #4299e1;
                }
          
                .bg-blue-600 {
                  background-color: #3182ce;
                }
          
                .bg-blue-700 {
                  background-color: #2b6cb0;
                }
          
                .bg-blue-800 {
                  background-color: #2c5282;
                }
          
                .bg-blue-900 {
                  background-color: #2a4365;
                }
          
                .bg-indigo-100 {
                  background-color: #ebf4ff;
                }
          
                .bg-indigo-200 {
                  background-color: #c3dafe;
                }
          
                .bg-indigo-300 {
                  background-color: #a3bffa;
                }
          
                .bg-indigo-400 {
                  background-color: #7f9cf5;
                }
          
                .bg-indigo-500 {
                  background-color: #667eea;
                }
          
                .bg-indigo-600 {
                  background-color: #5a67d8;
                }
          
                .bg-indigo-700 {
                  background-color: #4c51bf;
                }
          
                .bg-indigo-800 {
                  background-color: #434190;
                }
          
                .bg-indigo-900 {
                  background-color: #3c366b;
                }
          
                .bg-purple-100 {
                  background-color: #faf5ff;
                }
          
                .bg-purple-200 {
                  background-color: #e9d8fd;
                }
          
                .bg-purple-300 {
                  background-color: #d6bcfa;
                }
          
                .bg-purple-400 {
                  background-color: #b794f4;
                }
          
                .bg-purple-500 {
                  background-color: #9f7aea;
                }
          
                .bg-purple-600 {
                  background-color: #805ad5;
                }
          
                .bg-purple-700 {
                  background-color: #6b46c1;
                }
          
                .bg-purple-800 {
                  background-color: #553c9a;
                }
          
                .bg-purple-900 {
                  background-color: #44337a;
                }
          
                .bg-pink-100 {
                  background-color: #fff5f7;
                }
          
                .bg-pink-200 {
                  background-color: #fed7e2;
                }
          
                .bg-pink-300 {
                  background-color: #fbb6ce;
                }
          
                .bg-pink-400 {
                  background-color: #f687b3;
                }
          
                .bg-pink-500 {
                  background-color: #ed64a6;
                }
          
                .bg-pink-600 {
                  background-color: #d53f8c;
                }
          
                .bg-pink-700 {
                  background-color: #b83280;
                }
          
                .bg-pink-800 {
                  background-color: #97266d;
                }
          
                .bg-pink-900 {
                  background-color: #702459;
                }
                .bg-bottom {
                  background-position: bottom;
                }
          
                .bg-center {
                  background-position: center;
                }
          
                .bg-left {
                  background-position: left;
                }
          
                .bg-left-bottom {
                  background-position: left bottom;
                }
          
                .bg-left-top {
                  background-position: left top;
                }
          
                .bg-right {
                  background-position: right;
                }
          
                .bg-right-bottom {
                  background-position: right bottom;
                }
          
                .bg-right-top {
                  background-position: right top;
                }
          
                .bg-top {
                  background-position: top;
                }
          
                .bg-repeat {
                  background-repeat: repeat;
                }
          
                .bg-no-repeat {
                  background-repeat: no-repeat;
                }
          
                .bg-repeat-x {
                  background-repeat: repeat-x;
                }
          
                .bg-repeat-y {
                  background-repeat: repeat-y;
                }
          
                .bg-repeat-round {
                  background-repeat: round;
                }
          
                .bg-repeat-space {
                  background-repeat: space;
                }
          
                .bg-auto {
                  background-size: auto;
                }
          
                .bg-cover {
                  background-size: cover;
                }
          
                .bg-contain {
                  background-size: contain;
                }
          
                .border-collapse {
                  border-collapse: collapse;
                }
          
                .border-separate {
                  border-collapse: separate;
                }
          
                .border-transparent {
                  border-color: transparent;
                }
          
                .border-black {
                  border-color: #000;
                }
          
                .border-white {
                  border-color: #fff;
                }
          
                .border-gray-100 {
                  border-color: #f7fafc;
                }
          
                .border-gray-200 {
                  border-color: #edf2f7;
                }
          
                .border-gray-300 {
                  border-color: #e2e8f0;
                }
          
                .border-gray-400 {
                  border-color: #cbd5e0;
                }
          
                .border-gray-500 {
                  border-color: #a0aec0;
                }
          
                .border-gray-600 {
                  border-color: #718096;
                }
          
                .border-gray-700 {
                  border-color: #4a5568;
                }
          
                .border-gray-800 {
                  border-color: #2d3748;
                }
          
                .border-gray-900 {
                  border-color: #1a202c;
                }
          
                .border-red-100 {
                  border-color: #fff5f5;
                }
          
                .border-red-200 {
                  border-color: #fed7d7;
                }
          
                .border-red-300 {
                  border-color: #feb2b2;
                }
          
                .border-red-400 {
                  border-color: #fc8181;
                }
          
                .border-red-500 {
                  border-color: #f56565;
                }
          
                .border-red-600 {
                  border-color: #e53e3e;
                }
          
                .border-red-700 {
                  border-color: #c53030;
                }
          
                .border-red-800 {
                  border-color: #9b2c2c;
                }
          
                .border-red-900 {
                  border-color: #742a2a;
                }
          
                .border-orange-100 {
                  border-color: #fffaf0;
                }
          
                .border-orange-200 {
                  border-color: #feebc8;
                }
          
                .border-orange-300 {
                  border-color: #fbd38d;
                }
          
                .border-orange-400 {
                  border-color: #f6ad55;
                }
          
                .border-orange-500 {
                  border-color: #ed8936;
                }
          
                .border-orange-600 {
                  border-color: #dd6b20;
                }
          
                .border-orange-700 {
                  border-color: #c05621;
                }
          
                .border-orange-800 {
                  border-color: #9c4221;
                }
          
                .border-orange-900 {
                  border-color: #7b341e;
                }
          
                .border-yellow-100 {
                  border-color: #fffff0;
                }
          
                .border-yellow-200 {
                  border-color: #fefcbf;
                }
          
                .border-yellow-300 {
                  border-color: #faf089;
                }
          
                .border-yellow-400 {
                  border-color: #f6e05e;
                }
          
                .border-yellow-500 {
                  border-color: #ecc94b;
                }
          
                .border-yellow-600 {
                  border-color: #d69e2e;
                }
          
                .border-yellow-700 {
                  border-color: #b7791f;
                }
          
                .border-yellow-800 {
                  border-color: #975a16;
                }
          
                .border-yellow-900 {
                  border-color: #744210;
                }
          
                .border-green-100 {
                  border-color: #f0fff4;
                }
          
                .border-green-200 {
                  border-color: #c6f6d5;
                }
          
                .border-green-300 {
                  border-color: #9ae6b4;
                }
          
                .border-green-400 {
                  border-color: #68d391;
                }
          
                .border-green-500 {
                  border-color: #48bb78;
                }
          
                .border-green-600 {
                  border-color: #38a169;
                }
          
                .border-green-700 {
                  border-color: #2f855a;
                }
          
                .border-green-800 {
                  border-color: #276749;
                }
          
                .border-green-900 {
                  border-color: #22543d;
                }
          
                .border-teal-100 {
                  border-color: #e6fffa;
                }
          
                .border-teal-200 {
                  border-color: #b2f5ea;
                }
          
                .border-teal-300 {
                  border-color: #81e6d9;
                }
          
                .border-teal-400 {
                  border-color: #4fd1c5;
                }
          
                .border-teal-500 {
                  border-color: #38b2ac;
                }
          
                .border-teal-600 {
                  border-color: #319795;
                }
          
                .border-teal-700 {
                  border-color: #2c7a7b;
                }
          
                .border-teal-800 {
                  border-color: #285e61;
                }
          
                .border-teal-900 {
                  border-color: #234e52;
                }
          
                .border-blue-100 {
                  border-color: #ebf8ff;
                }
          
                .border-blue-200 {
                  border-color: #bee3f8;
                }
          
                .border-blue-300 {
                  border-color: #90cdf4;
                }
          
                .border-blue-400 {
                  border-color: #63b3ed;
                }
          
                .border-blue-500 {
                  border-color: #4299e1;
                }
          
                .border-blue-600 {
                  border-color: #3182ce;
                }
          
                .border-blue-700 {
                  border-color: #2b6cb0;
                }
          
                .border-blue-800 {
                  border-color: #2c5282;
                }
          
                .border-blue-900 {
                  border-color: #2a4365;
                }
          
                .border-indigo-100 {
                  border-color: #ebf4ff;
                }
          
                .border-indigo-200 {
                  border-color: #c3dafe;
                }
          
                .border-indigo-300 {
                  border-color: #a3bffa;
                }
          
                .border-indigo-400 {
                  border-color: #7f9cf5;
                }
          
                .border-indigo-500 {
                  border-color: #667eea;
                }
          
                .border-indigo-600 {
                  border-color: #5a67d8;
                }
          
                .border-indigo-700 {
                  border-color: #4c51bf;
                }
          
                .border-indigo-800 {
                  border-color: #434190;
                }
          
                .border-indigo-900 {
                  border-color: #3c366b;
                }
          
                .border-purple-100 {
                  border-color: #faf5ff;
                }
          
                .border-purple-200 {
                  border-color: #e9d8fd;
                }
          
                .border-purple-300 {
                  border-color: #d6bcfa;
                }
          
                .border-purple-400 {
                  border-color: #b794f4;
                }
          
                .border-purple-500 {
                  border-color: #9f7aea;
                }
          
                .border-purple-600 {
                  border-color: #805ad5;
                }
          
                .border-purple-700 {
                  border-color: #6b46c1;
                }
          
                .border-purple-800 {
                  border-color: #553c9a;
                }
          
                .border-purple-900 {
                  border-color: #44337a;
                }
          
                .border-pink-100 {
                  border-color: #fff5f7;
                }
          
                .border-pink-200 {
                  border-color: #fed7e2;
                }
          
                .border-pink-300 {
                  border-color: #fbb6ce;
                }
          
                .border-pink-400 {
                  border-color: #f687b3;
                }
          
                .border-pink-500 {
                  border-color: #ed64a6;
                }
          
                .border-pink-600 {
                  border-color: #d53f8c;
                }
          
                .border-pink-700 {
                  border-color: #b83280;
                }
          
                .border-pink-800 {
                  border-color: #97266d;
                }
          
                .border-pink-900 {
                  border-color: #702459;
                }
                .rounded-none {
                  border-radius: 0;
                }
          
                .rounded-sm {
                  border-radius: 0.125rem;
                }
          
                .rounded {
                  border-radius: 0.25rem;
                }
          
                .rounded-lg {
                  border-radius: 0.5rem;
                }
          
                .rounded-full {
                  border-radius: 9999px;
                }
          
                .rounded-t-none {
                  border-top-left-radius: 0;
                  border-top-right-radius: 0;
                }
          
                .rounded-r-none {
                  border-top-right-radius: 0;
                  border-bottom-right-radius: 0;
                }
          
                .rounded-b-none {
                  border-bottom-right-radius: 0;
                  border-bottom-left-radius: 0;
                }
          
                .rounded-l-none {
                  border-top-left-radius: 0;
                  border-bottom-left-radius: 0;
                }
          
                .rounded-t-sm {
                  border-top-left-radius: 0.125rem;
                  border-top-right-radius: 0.125rem;
                }
          
                .rounded-r-sm {
                  border-top-right-radius: 0.125rem;
                  border-bottom-right-radius: 0.125rem;
                }
          
                .rounded-b-sm {
                  border-bottom-right-radius: 0.125rem;
                  border-bottom-left-radius: 0.125rem;
                }
          
                .rounded-l-sm {
                  border-top-left-radius: 0.125rem;
                  border-bottom-left-radius: 0.125rem;
                }
          
                .rounded-t {
                  border-top-left-radius: 0.25rem;
                  border-top-right-radius: 0.25rem;
                }
          
                .rounded-r {
                  border-top-right-radius: 0.25rem;
                  border-bottom-right-radius: 0.25rem;
                }
          
                .rounded-b {
                  border-bottom-right-radius: 0.25rem;
                  border-bottom-left-radius: 0.25rem;
                }
          
                .rounded-l {
                  border-top-left-radius: 0.25rem;
                  border-bottom-left-radius: 0.25rem;
                }
          
                .rounded-t-lg {
                  border-top-left-radius: 0.5rem;
                  border-top-right-radius: 0.5rem;
                }
          
                .rounded-r-lg {
                  border-top-right-radius: 0.5rem;
                  border-bottom-right-radius: 0.5rem;
                }
          
                .rounded-b-lg {
                  border-bottom-right-radius: 0.5rem;
                  border-bottom-left-radius: 0.5rem;
                }
          
                .rounded-l-lg {
                  border-top-left-radius: 0.5rem;
                  border-bottom-left-radius: 0.5rem;
                }
          
                .rounded-t-full {
                  border-top-left-radius: 9999px;
                  border-top-right-radius: 9999px;
                }
          
                .rounded-r-full {
                  border-top-right-radius: 9999px;
                  border-bottom-right-radius: 9999px;
                }
          
                .rounded-b-full {
                  border-bottom-right-radius: 9999px;
                  border-bottom-left-radius: 9999px;
                }
          
                .rounded-l-full {
                  border-top-left-radius: 9999px;
                  border-bottom-left-radius: 9999px;
                }
          
                .rounded-tl-none {
                  border-top-left-radius: 0;
                }
          
                .rounded-tr-none {
                  border-top-right-radius: 0;
                }
          
                .rounded-br-none {
                  border-bottom-right-radius: 0;
                }
          
                .rounded-bl-none {
                  border-bottom-left-radius: 0;
                }
          
                .rounded-tl-sm {
                  border-top-left-radius: 0.125rem;
                }
          
                .rounded-tr-sm {
                  border-top-right-radius: 0.125rem;
                }
          
                .rounded-br-sm {
                  border-bottom-right-radius: 0.125rem;
                }
          
                .rounded-bl-sm {
                  border-bottom-left-radius: 0.125rem;
                }
          
                .rounded-tl {
                  border-top-left-radius: 0.25rem;
                }
          
                .rounded-tr {
                  border-top-right-radius: 0.25rem;
                }
          
                .rounded-br {
                  border-bottom-right-radius: 0.25rem;
                }
          
                .rounded-bl {
                  border-bottom-left-radius: 0.25rem;
                }
          
                .rounded-tl-lg {
                  border-top-left-radius: 0.5rem;
                }
          
                .rounded-tr-lg {
                  border-top-right-radius: 0.5rem;
                }
          
                .rounded-br-lg {
                  border-bottom-right-radius: 0.5rem;
                }
          
                .rounded-bl-lg {
                  border-bottom-left-radius: 0.5rem;
                }
          
                .rounded-tl-full {
                  border-top-left-radius: 9999px;
                }
          
                .rounded-tr-full {
                  border-top-right-radius: 9999px;
                }
          
                .rounded-br-full {
                  border-bottom-right-radius: 9999px;
                }
          
                .rounded-bl-full {
                  border-bottom-left-radius: 9999px;
                }
          
                .border-solid {
                  border-style: solid;
                }
          
                .border-dashed {
                  border-style: dashed;
                }
          
                .border-dotted {
                  border-style: dotted;
                }
          
                .border-double {
                  border-style: double;
                }
          
                .border-none {
                  border-style: none;
                }
          
                .border-0 {
                  border-width: 0;
                }
          
                .border-2 {
                  border-width: 2px;
                }
          
                .border-4 {
                  border-width: 4px;
                }
          
                .border-8 {
                  border-width: 8px;
                }
          
                .border {
                  border-width: 1px;
                }
          
                .border-t-0 {
                  border-top-width: 0;
                }
          
                .border-r-0 {
                  border-right-width: 0;
                }
          
                .border-b-0 {
                  border-bottom-width: 0;
                }
          
                .border-l-0 {
                  border-left-width: 0;
                }
          
                .border-t-2 {
                  border-top-width: 2px;
                }
          
                .border-r-2 {
                  border-right-width: 2px;
                }
          
                .border-b-2 {
                  border-bottom-width: 2px;
                }
          
                .border-l-2 {
                  border-left-width: 2px;
                }
          
                .border-t-4 {
                  border-top-width: 4px;
                }
          
                .border-r-4 {
                  border-right-width: 4px;
                }
          
                .border-b-4 {
                  border-bottom-width: 4px;
                }
          
                .border-l-4 {
                  border-left-width: 4px;
                }
          
                .border-t-8 {
                  border-top-width: 8px;
                }
          
                .border-r-8 {
                  border-right-width: 8px;
                }
          
                .border-b-8 {
                  border-bottom-width: 8px;
                }
          
                .border-l-8 {
                  border-left-width: 8px;
                }
          
                .border-t {
                  border-top-width: 1px;
                }
          
                .border-r {
                  border-right-width: 1px;
                }
          
                .border-b {
                  border-bottom-width: 1px;
                }
          
                .border-l {
                  border-left-width: 1px;
                }
          
                .cursor-auto {
                  cursor: auto;
                }
          
                .cursor-default {
                  cursor: default;
                }
          
                .cursor-pointer {
                  cursor: pointer;
                }
          
                .cursor-wait {
                  cursor: wait;
                }
          
                .cursor-text {
                  cursor: text;
                }
          
                .cursor-move {
                  cursor: move;
                }
          
                .cursor-not-allowed {
                  cursor: not-allowed;
                }
          
                .block {
                  display: block;
                }
          
                .inline-block {
                  display: inline-block;
                }
          
                .inline {
                  display: inline;
                }
          
                .flex {
                  display: -webkit-box;
                  display: flex;
                }
          
                .inline-flex {
                  display: -webkit-inline-box;
                  display: inline-flex;
                }
          
                .table {
                  display: table;
                }
          
                .table-row {
                  display: table-row;
                }
          
                .table-cell {
                  display: table-cell;
                }
          
                .hidden {
                  display: none;
                }
          
                .flex-row {
                  -webkit-box-orient: horizontal;
                  -webkit-box-direction: normal;
                  flex-direction: row;
                }
          
                .flex-row-reverse {
                  -webkit-box-orient: horizontal;
                  -webkit-box-direction: reverse;
                  flex-direction: row-reverse;
                }
          
                .flex-col {
                  -webkit-box-orient: vertical;
                  -webkit-box-direction: normal;
                  flex-direction: column;
                }
          
                .flex-col-reverse {
                  -webkit-box-orient: vertical;
                  -webkit-box-direction: reverse;
                  flex-direction: column-reverse;
                }
          
                .flex-wrap {
                  flex-wrap: wrap;
                }
          
                .flex-wrap-reverse {
                  flex-wrap: wrap-reverse;
                }
          
                .flex-no-wrap {
                  flex-wrap: nowrap;
                }
          
                .items-start {
                  -webkit-box-align: start;
                  align-items: flex-start;
                }
          
                .items-end {
                  -webkit-box-align: end;
                  align-items: flex-end;
                }
          
                .items-center {
                  -webkit-box-align: center;
                  align-items: center;
                }
          
                .items-baseline {
                  -webkit-box-align: baseline;
                  align-items: baseline;
                }
          
                .items-stretch {
                  -webkit-box-align: stretch;
                  align-items: stretch;
                }
          
                .self-auto {
                  align-self: auto;
                }
          
                .self-start {
                  align-self: flex-start;
                }
          
                .self-end {
                  align-self: flex-end;
                }
          
                .self-center {
                  align-self: center;
                }
          
                .self-stretch {
                  align-self: stretch;
                }
          
                .justify-start {
                  -webkit-box-pack: start;
                  justify-content: flex-start;
                }
          
                .justify-end {
                  -webkit-box-pack: end;
                  justify-content: flex-end;
                }
          
                .justify-center {
                  -webkit-box-pack: center;
                  justify-content: center;
                }
          
                .justify-between {
                  -webkit-box-pack: justify;
                  justify-content: space-between;
                }
          
                .justify-around {
                  justify-content: space-around;
                }
          
                .content-center {
                  align-content: center;
                }
          
                .content-start {
                  align-content: flex-start;
                }
          
                .content-end {
                  align-content: flex-end;
                }
          
                .content-between {
                  align-content: space-between;
                }
          
                .content-around {
                  align-content: space-around;
                }
          
                .flex-1 {
                  -webkit-box-flex: 1;
                  flex: 1 1 0%;
                }
          
                .flex-auto {
                  -webkit-box-flex: 1;
                  flex: 1 1 auto;
                }
          
                .flex-initial {
                  -webkit-box-flex: 0;
                  flex: 0 1 auto;
                }
          
                .flex-none {
                  -webkit-box-flex: 0;
                  flex: none;
                }
          
                .flex-grow-0 {
                  -webkit-box-flex: 0;
                  flex-grow: 0;
                }
          
                .flex-grow {
                  -webkit-box-flex: 1;
                  flex-grow: 1;
                }
          
                .flex-shrink-0 {
                  flex-shrink: 0;
                }
          
                .flex-shrink {
                  flex-shrink: 1;
                }
          
                .order-1 {
                  -webkit-box-ordinal-group: 2;
                  order: 1;
                }
          
                .order-2 {
                  -webkit-box-ordinal-group: 3;
                  order: 2;
                }
          
                .order-3 {
                  -webkit-box-ordinal-group: 4;
                  order: 3;
                }
          
                .order-4 {
                  -webkit-box-ordinal-group: 5;
                  order: 4;
                }
          
                .order-5 {
                  -webkit-box-ordinal-group: 6;
                  order: 5;
                }
          
                .order-6 {
                  -webkit-box-ordinal-group: 7;
                  order: 6;
                }
          
                .order-7 {
                  -webkit-box-ordinal-group: 8;
                  order: 7;
                }
          
                .order-8 {
                  -webkit-box-ordinal-group: 9;
                  order: 8;
                }
          
                .order-9 {
                  -webkit-box-ordinal-group: 10;
                  order: 9;
                }
          
                .order-10 {
                  -webkit-box-ordinal-group: 11;
                  order: 10;
                }
          
                .order-11 {
                  -webkit-box-ordinal-group: 12;
                  order: 11;
                }
          
                .order-12 {
                  -webkit-box-ordinal-group: 13;
                  order: 12;
                }
          
                .order-first {
                  -webkit-box-ordinal-group: -9998;
                  order: -9999;
                }
          
                .order-last {
                  -webkit-box-ordinal-group: 10000;
                  order: 9999;
                }
          
                .order-none {
                  -webkit-box-ordinal-group: 1;
                  order: 0;
                }
          
                .float-right {
                  float: right;
                }
          
                .float-left {
                  float: left;
                }
          
                .float-none {
                  float: none;
                }
          
                .clearfix:after {
                  content: "";
                  display: table;
                  clear: both;
                }
          
                .font-sans {
                  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
                    "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
                    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
                }
          
                .font-serif {
                  font-family: Georgia, Cambria, "Times New Roman", Times, serif;
                }
          
                .font-mono {
                  font-family: Menlo, Monaco, Consolas, "Liberation Mono", "Courier New",
                    monospace;
                }
          
                .font-hairline {
                  font-weight: 100;
                }
          
                .font-thin {
                  font-weight: 200;
                }
          
                .font-light {
                  font-weight: 300;
                }
          
                .font-normal {
                  font-weight: 400;
                }
          
                .font-medium {
                  font-weight: 500;
                }
          
                .font-semibold {
                  font-weight: 600;
                }
          
                .font-bold {
                  font-weight: 700;
                }
          
                .font-extrabold {
                  font-weight: 800;
                }
          
                .font-black {
                  font-weight: 900;
                }
          
                .h-0 {
                  height: 0;
                }
          
                .h-1 {
                  height: 0.25rem;
                }
          
                .h-2 {
                  height: 0.5rem;
                }
          
                .h-3 {
                  height: 0.75rem;
                }
          
                .h-4 {
                  height: 1rem;
                }
          
                .h-5 {
                  height: 1.25rem;
                }
          
                .h-6 {
                  height: 1.5rem;
                }
          
                .h-8 {
                  height: 2rem;
                }
          
                .h-10 {
                  height: 2.5rem;
                }
          
                .h-12 {
                  height: 3rem;
                }
          
                .h-16 {
                  height: 4rem;
                }
          
                .h-20 {
                  height: 5rem;
                }
          
                .h-24 {
                  height: 6rem;
                }
          
                .h-32 {
                  height: 8rem;
                }
          
                .h-40 {
                  height: 10rem;
                }
          
                .h-48 {
                  height: 12rem;
                }
          
                .h-56 {
                  height: 14rem;
                }
          
                .h-64 {
                  height: 16rem;
                }
          
                .h-auto {
                  height: auto;
                }
          
                .h-px {
                  height: 1px;
                }
          
                .h-full {
                  height: 100%;
                }
          
                .h-screen {
                  height: 100vh;
                }
          
                .leading-none {
                  line-height: 1;
                }
          
                .leading-tight {
                  line-height: 1.25;
                }
          
                .leading-snug {
                  line-height: 1.375;
                }
          
                .leading-normal {
                  line-height: 1.5;
                }
          
                .leading-relaxed {
                  line-height: 1.625;
                }
          
                .leading-loose {
                  line-height: 2;
                }
          
                .list-inside {
                  list-style-position: inside;
                }
          
                .list-outside {
                  list-style-position: outside;
                }
          
                .list-none {
                  list-style-type: none;
                }
          
                .list-disc {
                  list-style-type: disc;
                }
          
                .list-decimal {
                  list-style-type: decimal;
                }
          
                .m-0 {
                  margin: 0;
                }
          
                .m-1 {
                  margin: 0.25rem;
                }
          
                .m-2 {
                  margin: 0.5rem;
                }
          
                .m-3 {
                  margin: 0.75rem;
                }
          
                .m-4 {
                  margin: 1rem;
                }
          
                .m-5 {
                  margin: 1.25rem;
                }
          
                .m-6 {
                  margin: 1.5rem;
                }
          
                .m-8 {
                  margin: 2rem;
                }
          
                .m-10 {
                  margin: 2.5rem;
                }
          
                .m-12 {
                  margin: 3rem;
                }
          
                .m-16 {
                  margin: 4rem;
                }
          
                .m-20 {
                  margin: 5rem;
                }
          
                .m-24 {
                  margin: 6rem;
                }
          
                .m-32 {
                  margin: 8rem;
                }
          
                .m-40 {
                  margin: 10rem;
                }
          
                .m-48 {
                  margin: 12rem;
                }
          
                .m-56 {
                  margin: 14rem;
                }
          
                .m-64 {
                  margin: 16rem;
                }
          
                .m-auto {
                  margin: auto;
                }
          
                .m-px {
                  margin: 1px;
                }
          
                .-m-1 {
                  margin: -0.25rem;
                }
          
                .-m-2 {
                  margin: -0.5rem;
                }
          
                .-m-3 {
                  margin: -0.75rem;
                }
          
                .-m-4 {
                  margin: -1rem;
                }
          
                .-m-5 {
                  margin: -1.25rem;
                }
          
                .-m-6 {
                  margin: -1.5rem;
                }
          
                .-m-8 {
                  margin: -2rem;
                }
          
                .-m-10 {
                  margin: -2.5rem;
                }
          
                .-m-12 {
                  margin: -3rem;
                }
          
                .-m-16 {
                  margin: -4rem;
                }
          
                .-m-20 {
                  margin: -5rem;
                }
          
                .-m-24 {
                  margin: -6rem;
                }
          
                .-m-32 {
                  margin: -8rem;
                }
          
                .-m-40 {
                  margin: -10rem;
                }
          
                .-m-48 {
                  margin: -12rem;
                }
          
                .-m-56 {
                  margin: -14rem;
                }
          
                .-m-64 {
                  margin: -16rem;
                }
          
                .-m-px {
                  margin: -1px;
                }
          
                .my-0 {
                  margin-top: 0;
                  margin-bottom: 0;
                }
          
                .mx-0 {
                  margin-left: 0;
                  margin-right: 0;
                }
          
                .my-1 {
                  margin-top: 0.25rem;
                  margin-bottom: 0.25rem;
                }
          
                .mx-1 {
                  margin-left: 0.25rem;
                  margin-right: 0.25rem;
                }
          
                .my-2 {
                  margin-top: 0.5rem;
                  margin-bottom: 0.5rem;
                }
          
                .mx-2 {
                  margin-left: 0.5rem;
                  margin-right: 0.5rem;
                }
          
                .my-3 {
                  margin-top: 0.75rem;
                  margin-bottom: 0.75rem;
                }
          
                .mx-3 {
                  margin-left: 0.75rem;
                  margin-right: 0.75rem;
                }
          
                .my-4 {
                  margin-top: 1rem;
                  margin-bottom: 1rem;
                }
          
                .mx-4 {
                  margin-left: 1rem;
                  margin-right: 1rem;
                }
          
                .my-5 {
                  margin-top: 1.25rem;
                  margin-bottom: 1.25rem;
                }
          
                .mx-5 {
                  margin-left: 1.25rem;
                  margin-right: 1.25rem;
                }
          
                .my-6 {
                  margin-top: 1.5rem;
                  margin-bottom: 1.5rem;
                }
          
                .mx-6 {
                  margin-left: 1.5rem;
                  margin-right: 1.5rem;
                }
          
                .my-8 {
                  margin-top: 2rem;
                  margin-bottom: 2rem;
                }
          
                .mx-8 {
                  margin-left: 2rem;
                  margin-right: 2rem;
                }
          
                .my-10 {
                  margin-top: 2.5rem;
                  margin-bottom: 2.5rem;
                }
          
                .mx-10 {
                  margin-left: 2.5rem;
                  margin-right: 2.5rem;
                }
          
                .my-12 {
                  margin-top: 3rem;
                  margin-bottom: 3rem;
                }
          
                .mx-12 {
                  margin-left: 3rem;
                  margin-right: 3rem;
                }
          
                .my-16 {
                  margin-top: 4rem;
                  margin-bottom: 4rem;
                }
          
                .mx-16 {
                  margin-left: 4rem;
                  margin-right: 4rem;
                }
          
                .my-20 {
                  margin-top: 5rem;
                  margin-bottom: 5rem;
                }
          
                .mx-20 {
                  margin-left: 5rem;
                  margin-right: 5rem;
                }
          
                .my-24 {
                  margin-top: 6rem;
                  margin-bottom: 6rem;
                }
          
                .mx-24 {
                  margin-left: 6rem;
                  margin-right: 6rem;
                }
          
                .my-32 {
                  margin-top: 8rem;
                  margin-bottom: 8rem;
                }
          
                .mx-32 {
                  margin-left: 8rem;
                  margin-right: 8rem;
                }
          
                .my-40 {
                  margin-top: 10rem;
                  margin-bottom: 10rem;
                }
          
                .mx-40 {
                  margin-left: 10rem;
                  margin-right: 10rem;
                }
          
                .my-48 {
                  margin-top: 12rem;
                  margin-bottom: 12rem;
                }
          
                .mx-48 {
                  margin-left: 12rem;
                  margin-right: 12rem;
                }
          
                .my-56 {
                  margin-top: 14rem;
                  margin-bottom: 14rem;
                }
          
                .mx-56 {
                  margin-left: 14rem;
                  margin-right: 14rem;
                }
          
                .my-64 {
                  margin-top: 16rem;
                  margin-bottom: 16rem;
                }
          
                .mx-64 {
                  margin-left: 16rem;
                  margin-right: 16rem;
                }
          
                .my-auto {
                  margin-top: auto;
                  margin-bottom: auto;
                }
          
                .mx-auto {
                  margin-left: auto;
                  margin-right: auto;
                }
          
                .my-px {
                  margin-top: 1px;
                  margin-bottom: 1px;
                }
          
                .mx-px {
                  margin-left: 1px;
                  margin-right: 1px;
                }
          
                .-my-1 {
                  margin-top: -0.25rem;
                  margin-bottom: -0.25rem;
                }
          
                .-mx-1 {
                  margin-left: -0.25rem;
                  margin-right: -0.25rem;
                }
          
                .-my-2 {
                  margin-top: -0.5rem;
                  margin-bottom: -0.5rem;
                }
          
                .-mx-2 {
                  margin-left: -0.5rem;
                  margin-right: -0.5rem;
                }
          
                .-my-3 {
                  margin-top: -0.75rem;
                  margin-bottom: -0.75rem;
                }
          
                .-mx-3 {
                  margin-left: -0.75rem;
                  margin-right: -0.75rem;
                }
          
                .-my-4 {
                  margin-top: -1rem;
                  margin-bottom: -1rem;
                }
          
                .-mx-4 {
                  margin-left: -1rem;
                  margin-right: -1rem;
                }
          
                .-my-5 {
                  margin-top: -1.25rem;
                  margin-bottom: -1.25rem;
                }
          
                .-mx-5 {
                  margin-left: -1.25rem;
                  margin-right: -1.25rem;
                }
          
                .-my-6 {
                  margin-top: -1.5rem;
                  margin-bottom: -1.5rem;
                }
          
                .-mx-6 {
                  margin-left: -1.5rem;
                  margin-right: -1.5rem;
                }
          
                .-my-8 {
                  margin-top: -2rem;
                  margin-bottom: -2rem;
                }
          
                .-mx-8 {
                  margin-left: -2rem;
                  margin-right: -2rem;
                }
          
                .-my-10 {
                  margin-top: -2.5rem;
                  margin-bottom: -2.5rem;
                }
          
                .-mx-10 {
                  margin-left: -2.5rem;
                  margin-right: -2.5rem;
                }
          
                .-my-12 {
                  margin-top: -3rem;
                  margin-bottom: -3rem;
                }
          
                .-mx-12 {
                  margin-left: -3rem;
                  margin-right: -3rem;
                }
          
                .-my-16 {
                  margin-top: -4rem;
                  margin-bottom: -4rem;
                }
          
                .-mx-16 {
                  margin-left: -4rem;
                  margin-right: -4rem;
                }
          
                .-my-20 {
                  margin-top: -5rem;
                  margin-bottom: -5rem;
                }
          
                .-mx-20 {
                  margin-left: -5rem;
                  margin-right: -5rem;
                }
          
                .-my-24 {
                  margin-top: -6rem;
                  margin-bottom: -6rem;
                }
          
                .-mx-24 {
                  margin-left: -6rem;
                  margin-right: -6rem;
                }
          
                .-my-32 {
                  margin-top: -8rem;
                  margin-bottom: -8rem;
                }
          
                .-mx-32 {
                  margin-left: -8rem;
                  margin-right: -8rem;
                }
          
                .-my-40 {
                  margin-top: -10rem;
                  margin-bottom: -10rem;
                }
          
                .-mx-40 {
                  margin-left: -10rem;
                  margin-right: -10rem;
                }
          
                .-my-48 {
                  margin-top: -12rem;
                  margin-bottom: -12rem;
                }
          
                .-mx-48 {
                  margin-left: -12rem;
                  margin-right: -12rem;
                }
          
                .-my-56 {
                  margin-top: -14rem;
                  margin-bottom: -14rem;
                }
          
                .-mx-56 {
                  margin-left: -14rem;
                  margin-right: -14rem;
                }
          
                .-my-64 {
                  margin-top: -16rem;
                  margin-bottom: -16rem;
                }
          
                .-mx-64 {
                  margin-left: -16rem;
                  margin-right: -16rem;
                }
          
                .-my-px {
                  margin-top: -1px;
                  margin-bottom: -1px;
                }
          
                .-mx-px {
                  margin-left: -1px;
                  margin-right: -1px;
                }
          
                .mt-0 {
                  margin-top: 0;
                }
          
                .mr-0 {
                  margin-right: 0;
                }
          
                .mb-0 {
                  margin-bottom: 0;
                }
          
                .ml-0 {
                  margin-left: 0;
                }
          
                .mt-1 {
                  margin-top: 0.25rem;
                }
          
                .mr-1 {
                  margin-right: 0.25rem;
                }
          
                .mb-1 {
                  margin-bottom: 0.25rem;
                }
          
                .ml-1 {
                  margin-left: 0.25rem;
                }
          
                .mt-2 {
                  margin-top: 0.5rem;
                }
          
                .mr-2 {
                  margin-right: 0.5rem;
                }
          
                .mb-2 {
                  margin-bottom: 0.5rem;
                }
          
                .ml-2 {
                  margin-left: 0.5rem;
                }
          
                .mt-3 {
                  margin-top: 0.75rem;
                }
          
                .mr-3 {
                  margin-right: 0.75rem;
                }
          
                .mb-3 {
                  margin-bottom: 0.75rem;
                }
          
                .ml-3 {
                  margin-left: 0.75rem;
                }
          
                .mt-4 {
                  margin-top: 1rem;
                }
          
                .mr-4 {
                  margin-right: 1rem;
                }
          
                .mb-4 {
                  margin-bottom: 1rem;
                }
          
                .ml-4 {
                  margin-left: 1rem;
                }
          
                .mt-5 {
                  margin-top: 1.25rem;
                }
          
                .mr-5 {
                  margin-right: 1.25rem;
                }
          
                .mb-5 {
                  margin-bottom: 1.25rem;
                }
          
                .ml-5 {
                  margin-left: 1.25rem;
                }
          
                .mt-6 {
                  margin-top: 1.5rem;
                }
          
                .mr-6 {
                  margin-right: 1.5rem;
                }
          
                .mb-6 {
                  margin-bottom: 1.5rem;
                }
          
                .ml-6 {
                  margin-left: 1.5rem;
                }
          
                .mt-8 {
                  margin-top: 2rem;
                }
          
                .mr-8 {
                  margin-right: 2rem;
                }
          
                .mb-8 {
                  margin-bottom: 2rem;
                }
          
                .ml-8 {
                  margin-left: 2rem;
                }
          
                .mt-10 {
                  margin-top: 2.5rem;
                }
          
                .mr-10 {
                  margin-right: 2.5rem;
                }
          
                .mb-10 {
                  margin-bottom: 2.5rem;
                }
          
                .ml-10 {
                  margin-left: 2.5rem;
                }
          
                .mt-12 {
                  margin-top: 3rem;
                }
          
                .mr-12 {
                  margin-right: 3rem;
                }
          
                .mb-12 {
                  margin-bottom: 3rem;
                }
          
                .ml-12 {
                  margin-left: 3rem;
                }
          
                .mt-16 {
                  margin-top: 4rem;
                }
          
                .mr-16 {
                  margin-right: 4rem;
                }
          
                .mb-16 {
                  margin-bottom: 4rem;
                }
          
                .ml-16 {
                  margin-left: 4rem;
                }
          
                .mt-20 {
                  margin-top: 5rem;
                }
          
                .mr-20 {
                  margin-right: 5rem;
                }
          
                .mb-20 {
                  margin-bottom: 5rem;
                }
          
                .ml-20 {
                  margin-left: 5rem;
                }
          
                .mt-24 {
                  margin-top: 6rem;
                }
          
                .mr-24 {
                  margin-right: 6rem;
                }
          
                .mb-24 {
                  margin-bottom: 6rem;
                }
          
                .ml-24 {
                  margin-left: 6rem;
                }
          
                .mt-32 {
                  margin-top: 8rem;
                }
          
                .mr-32 {
                  margin-right: 8rem;
                }
          
                .mb-32 {
                  margin-bottom: 8rem;
                }
          
                .ml-32 {
                  margin-left: 8rem;
                }
          
                .mt-40 {
                  margin-top: 10rem;
                }
          
                .mr-40 {
                  margin-right: 10rem;
                }
          
                .mb-40 {
                  margin-bottom: 10rem;
                }
          
                .ml-40 {
                  margin-left: 10rem;
                }
          
                .mt-48 {
                  margin-top: 12rem;
                }
          
                .mr-48 {
                  margin-right: 12rem;
                }
          
                .mb-48 {
                  margin-bottom: 12rem;
                }
          
                .ml-48 {
                  margin-left: 12rem;
                }
          
                .mt-56 {
                  margin-top: 14rem;
                }
          
                .mr-56 {
                  margin-right: 14rem;
                }
          
                .mb-56 {
                  margin-bottom: 14rem;
                }
          
                .ml-56 {
                  margin-left: 14rem;
                }
          
                .mt-64 {
                  margin-top: 16rem;
                }
          
                .mr-64 {
                  margin-right: 16rem;
                }
          
                .mb-64 {
                  margin-bottom: 16rem;
                }
          
                .ml-64 {
                  margin-left: 16rem;
                }
          
                .mt-auto {
                  margin-top: auto;
                }
          
                .mr-auto {
                  margin-right: auto;
                }
          
                .mb-auto {
                  margin-bottom: auto;
                }
          
                .ml-auto {
                  margin-left: auto;
                }
          
                .mt-px {
                  margin-top: 1px;
                }
          
                .mr-px {
                  margin-right: 1px;
                }
          
                .mb-px {
                  margin-bottom: 1px;
                }
          
                .ml-px {
                  margin-left: 1px;
                }
          
                .-mt-1 {
                  margin-top: -0.25rem;
                }
          
                .-mr-1 {
                  margin-right: -0.25rem;
                }
          
                .-mb-1 {
                  margin-bottom: -0.25rem;
                }
          
                .-ml-1 {
                  margin-left: -0.25rem;
                }
          
                .-mt-2 {
                  margin-top: -0.5rem;
                }
          
                .-mr-2 {
                  margin-right: -0.5rem;
                }
          
                .-mb-2 {
                  margin-bottom: -0.5rem;
                }
          
                .-ml-2 {
                  margin-left: -0.5rem;
                }
          
                .-mt-3 {
                  margin-top: -0.75rem;
                }
          
                .-mr-3 {
                  margin-right: -0.75rem;
                }
          
                .-mb-3 {
                  margin-bottom: -0.75rem;
                }
          
                .-ml-3 {
                  margin-left: -0.75rem;
                }
          
                .-mt-4 {
                  margin-top: -1rem;
                }
          
                .-mr-4 {
                  margin-right: -1rem;
                }
          
                .-mb-4 {
                  margin-bottom: -1rem;
                }
          
                .-ml-4 {
                  margin-left: -1rem;
                }
          
                .-mt-5 {
                  margin-top: -1.25rem;
                }
          
                .-mr-5 {
                  margin-right: -1.25rem;
                }
          
                .-mb-5 {
                  margin-bottom: -1.25rem;
                }
          
                .-ml-5 {
                  margin-left: -1.25rem;
                }
          
                .-mt-6 {
                  margin-top: -1.5rem;
                }
          
                .-mr-6 {
                  margin-right: -1.5rem;
                }
          
                .-mb-6 {
                  margin-bottom: -1.5rem;
                }
          
                .-ml-6 {
                  margin-left: -1.5rem;
                }
          
                .-mt-8 {
                  margin-top: -2rem;
                }
          
                .-mr-8 {
                  margin-right: -2rem;
                }
          
                .-mb-8 {
                  margin-bottom: -2rem;
                }
          
                .-ml-8 {
                  margin-left: -2rem;
                }
          
                .-mt-10 {
                  margin-top: -2.5rem;
                }
          
                .-mr-10 {
                  margin-right: -2.5rem;
                }
          
                .-mb-10 {
                  margin-bottom: -2.5rem;
                }
          
                .-ml-10 {
                  margin-left: -2.5rem;
                }
          
                .-mt-12 {
                  margin-top: -3rem;
                }
          
                .-mr-12 {
                  margin-right: -3rem;
                }
          
                .-mb-12 {
                  margin-bottom: -3rem;
                }
          
                .-ml-12 {
                  margin-left: -3rem;
                }
          
                .-mt-16 {
                  margin-top: -4rem;
                }
          
                .-mr-16 {
                  margin-right: -4rem;
                }
          
                .-mb-16 {
                  margin-bottom: -4rem;
                }
          
                .-ml-16 {
                  margin-left: -4rem;
                }
          
                .-mt-20 {
                  margin-top: -5rem;
                }
          
                .-mr-20 {
                  margin-right: -5rem;
                }
          
                .-mb-20 {
                  margin-bottom: -5rem;
                }
          
                .-ml-20 {
                  margin-left: -5rem;
                }
          
                .-mt-24 {
                  margin-top: -6rem;
                }
          
                .-mr-24 {
                  margin-right: -6rem;
                }
          
                .-mb-24 {
                  margin-bottom: -6rem;
                }
          
                .-ml-24 {
                  margin-left: -6rem;
                }
          
                .-mt-32 {
                  margin-top: -8rem;
                }
          
                .-mr-32 {
                  margin-right: -8rem;
                }
          
                .-mb-32 {
                  margin-bottom: -8rem;
                }
          
                .-ml-32 {
                  margin-left: -8rem;
                }
          
                .-mt-40 {
                  margin-top: -10rem;
                }
          
                .-mr-40 {
                  margin-right: -10rem;
                }
          
                .-mb-40 {
                  margin-bottom: -10rem;
                }
          
                .-ml-40 {
                  margin-left: -10rem;
                }
          
                .-mt-48 {
                  margin-top: -12rem;
                }
          
                .-mr-48 {
                  margin-right: -12rem;
                }
          
                .-mb-48 {
                  margin-bottom: -12rem;
                }
          
                .-ml-48 {
                  margin-left: -12rem;
                }
          
                .-mt-56 {
                  margin-top: -14rem;
                }
          
                .-mr-56 {
                  margin-right: -14rem;
                }
          
                .-mb-56 {
                  margin-bottom: -14rem;
                }
          
                .-ml-56 {
                  margin-left: -14rem;
                }
          
                .-mt-64 {
                  margin-top: -16rem;
                }
          
                .-mr-64 {
                  margin-right: -16rem;
                }
          
                .-mb-64 {
                  margin-bottom: -16rem;
                }
          
                .-ml-64 {
                  margin-left: -16rem;
                }
          
                .-mt-px {
                  margin-top: -1px;
                }
          
                .-mr-px {
                  margin-right: -1px;
                }
          
                .-mb-px {
                  margin-bottom: -1px;
                }
          
                .-ml-px {
                  margin-left: -1px;
                }
          
                .max-h-full {
                  max-height: 100%;
                }
          
                .max-h-screen {
                  max-height: 100vh;
                }
          
                .max-w-xs {
                  max-width: 20rem;
                }
          
                .max-w-sm {
                  max-width: 24rem;
                }
          
                .max-w-md {
                  max-width: 28rem;
                }
          
                .max-w-lg {
                  max-width: 32rem;
                }
          
                .max-w-xl {
                  max-width: 36rem;
                }
          
                .max-w-2xl {
                  max-width: 42rem;
                }
          
                .max-w-3xl {
                  max-width: 48rem;
                }
          
                .max-w-4xl {
                  max-width: 56rem;
                }
          
                .max-w-5xl {
                  max-width: 64rem;
                }
          
                .max-w-6xl {
                  max-width: 72rem;
                }
          
                .max-w-full {
                  max-width: 100%;
                }
          
                .min-h-0 {
                  min-height: 0;
                }
          
                .min-h-full {
                  min-height: 100%;
                }
          
                .min-h-screen {
                  min-height: 100vh;
                }
          
                .min-w-0 {
                  min-width: 0;
                }
          
                .min-w-full {
                  min-width: 100%;
                }
          
                .object-contain {
                  -o-object-fit: contain;
                  object-fit: contain;
                }
          
                .object-cover {
                  -o-object-fit: cover;
                  object-fit: cover;
                }
          
                .object-fill {
                  -o-object-fit: fill;
                  object-fit: fill;
                }
          
                .object-none {
                  -o-object-fit: none;
                  object-fit: none;
                }
          
                .object-scale-down {
                  -o-object-fit: scale-down;
                  object-fit: scale-down;
                }
          
                .object-bottom {
                  -o-object-position: bottom;
                  object-position: bottom;
                }
          
                .object-center {
                  -o-object-position: center;
                  object-position: center;
                }
          
                .object-left {
                  -o-object-position: left;
                  object-position: left;
                }
          
                .object-left-bottom {
                  -o-object-position: left bottom;
                  object-position: left bottom;
                }
          
                .object-left-top {
                  -o-object-position: left top;
                  object-position: left top;
                }
          
                .object-right {
                  -o-object-position: right;
                  object-position: right;
                }
          
                .object-right-bottom {
                  -o-object-position: right bottom;
                  object-position: right bottom;
                }
          
                .object-right-top {
                  -o-object-position: right top;
                  object-position: right top;
                }
          
                .object-top {
                  -o-object-position: top;
                  object-position: top;
                }
          
                .opacity-0 {
                  opacity: 0;
                }
          
                .opacity-25 {
                  opacity: 0.25;
                }
          
                .opacity-50 {
                  opacity: 0.5;
                }
          
                .opacity-75 {
                  opacity: 0.75;
                }
          
                .opacity-100 {
                  opacity: 1;
                }
          
                .hover\:opacity-0:hover {
                  opacity: 0;
                }
          
                .hover\:opacity-25:hover {
                  opacity: 0.25;
                }
          
                .hover\:opacity-50:hover {
                  opacity: 0.5;
                }
          
                .hover\:opacity-75:hover {
                  opacity: 0.75;
                }
          
                .hover\:opacity-100:hover {
                  opacity: 1;
                }
          
                .focus\:opacity-0:focus {
                  opacity: 0;
                }
          
                .focus\:opacity-25:focus {
                  opacity: 0.25;
                }
          
                .focus\:opacity-50:focus {
                  opacity: 0.5;
                }
          
                .focus\:opacity-75:focus {
                  opacity: 0.75;
                }
          
                .focus\:opacity-100:focus {
                  opacity: 1;
                }
          
                .outline-none {
                  outline: 0;
                }
          
                .focus\:outline-none:focus {
                  outline: 0;
                }
          
                .overflow-auto {
                  overflow: auto;
                }
          
                .overflow-hidden {
                  overflow: hidden;
                }
          
                .overflow-visible {
                  overflow: visible;
                }
          
                .overflow-scroll {
                  overflow: scroll;
                }
          
                .overflow-x-auto {
                  overflow-x: auto;
                }
          
                .overflow-y-auto {
                  overflow-y: auto;
                }
          
                .overflow-x-hidden {
                  overflow-x: hidden;
                }
          
                .overflow-y-hidden {
                  overflow-y: hidden;
                }
          
                .overflow-x-visible {
                  overflow-x: visible;
                }
          
                .overflow-y-visible {
                  overflow-y: visible;
                }
          
                .overflow-x-scroll {
                  overflow-x: scroll;
                }
          
                .overflow-y-scroll {
                  overflow-y: scroll;
                }
          
                .scrolling-touch {
                  -webkit-overflow-scrolling: touch;
                }
          
                .scrolling-auto {
                  -webkit-overflow-scrolling: auto;
                }
          
                .p-0 {
                  padding: 0;
                }
          
                .p-1 {
                  padding: 0.25rem;
                }
          
                .p-2 {
                  padding: 0.5rem;
                }
          
                .p-3 {
                  padding: 0.75rem;
                }
          
                .p-4 {
                  padding: 1rem;
                }
          
                .p-5 {
                  padding: 1.25rem;
                }
          
                .p-6 {
                  padding: 1.5rem;
                }
          
                .p-8 {
                  padding: 2rem;
                }
          
                .p-10 {
                  padding: 2.5rem;
                }
          
                .p-12 {
                  padding: 3rem;
                }
          
                .p-16 {
                  padding: 4rem;
                }
          
                .p-20 {
                  padding: 5rem;
                }
          
                .p-24 {
                  padding: 6rem;
                }
          
                .p-32 {
                  padding: 8rem;
                }
          
                .p-40 {
                  padding: 10rem;
                }
          
                .p-48 {
                  padding: 12rem;
                }
          
                .p-56 {
                  padding: 14rem;
                }
          
                .p-64 {
                  padding: 16rem;
                }
          
                .p-px {
                  padding: 1px;
                }
          
                .py-0 {
                  padding-top: 0;
                  padding-bottom: 0;
                }
          
                .px-0 {
                  padding-left: 0;
                  padding-right: 0;
                }
          
                .py-1 {
                  padding-top: 0.25rem;
                  padding-bottom: 0.25rem;
                }
          
                .px-1 {
                  padding-left: 0.25rem;
                  padding-right: 0.25rem;
                }
          
                .py-2 {
                  padding-top: 0.5rem;
                  padding-bottom: 0.5rem;
                }
          
                .px-2 {
                  padding-left: 0.5rem;
                  padding-right: 0.5rem;
                }
          
                .py-3 {
                  padding-top: 0.75rem;
                  padding-bottom: 0.75rem;
                }
          
                .px-3 {
                  padding-left: 0.75rem;
                  padding-right: 0.75rem;
                }
          
                .py-4 {
                  padding-top: 1rem;
                  padding-bottom: 1rem;
                }
          
                .px-4 {
                  padding-left: 1rem;
                  padding-right: 1rem;
                }
          
                .py-5 {
                  padding-top: 1.25rem;
                  padding-bottom: 1.25rem;
                }
          
                .px-5 {
                  padding-left: 1.25rem;
                  padding-right: 1.25rem;
                }
          
                .py-6 {
                  padding-top: 1.5rem;
                  padding-bottom: 1.5rem;
                }
          
                .px-6 {
                  padding-left: 1.5rem;
                  padding-right: 1.5rem;
                }
          
                .py-8 {
                  padding-top: 2rem;
                  padding-bottom: 2rem;
                }
          
                .px-8 {
                  padding-left: 2rem;
                  padding-right: 2rem;
                }
          
                .py-10 {
                  padding-top: 2.5rem;
                  padding-bottom: 2.5rem;
                }
          
                .px-10 {
                  padding-left: 2.5rem;
                  padding-right: 2.5rem;
                }
          
                .py-12 {
                  padding-top: 3rem;
                  padding-bottom: 3rem;
                }
          
                .px-12 {
                  padding-left: 3rem;
                  padding-right: 3rem;
                }
          
                .py-16 {
                  padding-top: 4rem;
                  padding-bottom: 4rem;
                }
          
                .px-16 {
                  padding-left: 4rem;
                  padding-right: 4rem;
                }
          
                .py-20 {
                  padding-top: 5rem;
                  padding-bottom: 5rem;
                }
          
                .px-20 {
                  padding-left: 5rem;
                  padding-right: 5rem;
                }
          
                .py-24 {
                  padding-top: 6rem;
                  padding-bottom: 6rem;
                }
          
                .px-24 {
                  padding-left: 6rem;
                  padding-right: 6rem;
                }
          
                .py-32 {
                  padding-top: 8rem;
                  padding-bottom: 8rem;
                }
          
                .px-32 {
                  padding-left: 8rem;
                  padding-right: 8rem;
                }
          
                .py-40 {
                  padding-top: 10rem;
                  padding-bottom: 10rem;
                }
          
                .px-40 {
                  padding-left: 10rem;
                  padding-right: 10rem;
                }
          
                .py-48 {
                  padding-top: 12rem;
                  padding-bottom: 12rem;
                }
          
                .px-48 {
                  padding-left: 12rem;
                  padding-right: 12rem;
                }
          
                .py-56 {
                  padding-top: 14rem;
                  padding-bottom: 14rem;
                }
          
                .px-56 {
                  padding-left: 14rem;
                  padding-right: 14rem;
                }
          
                .py-64 {
                  padding-top: 16rem;
                  padding-bottom: 16rem;
                }
          
                .px-64 {
                  padding-left: 16rem;
                  padding-right: 16rem;
                }
          
                .py-px {
                  padding-top: 1px;
                  padding-bottom: 1px;
                }
          
                .px-px {
                  padding-left: 1px;
                  padding-right: 1px;
                }
          
                .pt-0 {
                  padding-top: 0;
                }
          
                .pr-0 {
                  padding-right: 0;
                }
          
                .pb-0 {
                  padding-bottom: 0;
                }
          
                .pl-0 {
                  padding-left: 0;
                }
          
                .pt-1 {
                  padding-top: 0.25rem;
                }
          
                .pr-1 {
                  padding-right: 0.25rem;
                }
          
                .pb-1 {
                  padding-bottom: 0.25rem;
                }
          
                .pl-1 {
                  padding-left: 0.25rem;
                }
          
                .pt-2 {
                  padding-top: 0.5rem;
                }
          
                .pr-2 {
                  padding-right: 0.5rem;
                }
          
                .pb-2 {
                  padding-bottom: 0.5rem;
                }
          
                .pl-2 {
                  padding-left: 0.5rem;
                }
          
                .pt-3 {
                  padding-top: 0.75rem;
                }
          
                .pr-3 {
                  padding-right: 0.75rem;
                }
          
                .pb-3 {
                  padding-bottom: 0.75rem;
                }
          
                .pl-3 {
                  padding-left: 0.75rem;
                }
          
                .pt-4 {
                  padding-top: 1rem;
                }
          
                .pr-4 {
                  padding-right: 1rem;
                }
          
                .pb-4 {
                  padding-bottom: 1rem;
                }
          
                .pl-4 {
                  padding-left: 1rem;
                }
          
                .pt-5 {
                  padding-top: 1.25rem;
                }
          
                .pr-5 {
                  padding-right: 1.25rem;
                }
          
                .pb-5 {
                  padding-bottom: 1.25rem;
                }
          
                .pl-5 {
                  padding-left: 1.25rem;
                }
          
                .pt-6 {
                  padding-top: 1.5rem;
                }
          
                .pr-6 {
                  padding-right: 1.5rem;
                }
          
                .pb-6 {
                  padding-bottom: 1.5rem;
                }
          
                .pl-6 {
                  padding-left: 1.5rem;
                }
          
                .pt-8 {
                  padding-top: 2rem;
                }
          
                .pr-8 {
                  padding-right: 2rem;
                }
          
                .pb-8 {
                  padding-bottom: 2rem;
                }
          
                .pl-8 {
                  padding-left: 2rem;
                }
          
                .pt-10 {
                  padding-top: 2.5rem;
                }
          
                .pr-10 {
                  padding-right: 2.5rem;
                }
          
                .pb-10 {
                  padding-bottom: 2.5rem;
                }
          
                .pl-10 {
                  padding-left: 2.5rem;
                }
          
                .pt-12 {
                  padding-top: 3rem;
                }
          
                .pr-12 {
                  padding-right: 3rem;
                }
          
                .pb-12 {
                  padding-bottom: 3rem;
                }
          
                .pl-12 {
                  padding-left: 3rem;
                }
          
                .pt-16 {
                  padding-top: 4rem;
                }
          
                .pr-16 {
                  padding-right: 4rem;
                }
          
                .pb-16 {
                  padding-bottom: 4rem;
                }
          
                .pl-16 {
                  padding-left: 4rem;
                }
          
                .pt-20 {
                  padding-top: 5rem;
                }
          
                .pr-20 {
                  padding-right: 5rem;
                }
          
                .pb-20 {
                  padding-bottom: 5rem;
                }
          
                .pl-20 {
                  padding-left: 5rem;
                }
          
                .pt-24 {
                  padding-top: 6rem;
                }
          
                .pr-24 {
                  padding-right: 6rem;
                }
          
                .pb-24 {
                  padding-bottom: 6rem;
                }
          
                .pl-24 {
                  padding-left: 6rem;
                }
          
                .pt-32 {
                  padding-top: 8rem;
                }
          
                .pr-32 {
                  padding-right: 8rem;
                }
          
                .pb-32 {
                  padding-bottom: 8rem;
                }
          
                .pl-32 {
                  padding-left: 8rem;
                }
          
                .pt-40 {
                  padding-top: 10rem;
                }
          
                .pr-40 {
                  padding-right: 10rem;
                }
          
                .pb-40 {
                  padding-bottom: 10rem;
                }
          
                .pl-40 {
                  padding-left: 10rem;
                }
          
                .pt-48 {
                  padding-top: 12rem;
                }
          
                .pr-48 {
                  padding-right: 12rem;
                }
          
                .pb-48 {
                  padding-bottom: 12rem;
                }
          
                .pl-48 {
                  padding-left: 12rem;
                }
          
                .pt-56 {
                  padding-top: 14rem;
                }
          
                .pr-56 {
                  padding-right: 14rem;
                }
          
                .pb-56 {
                  padding-bottom: 14rem;
                }
          
                .pl-56 {
                  padding-left: 14rem;
                }
          
                .pt-64 {
                  padding-top: 16rem;
                }
          
                .pr-64 {
                  padding-right: 16rem;
                }
          
                .pb-64 {
                  padding-bottom: 16rem;
                }
          
                .pl-64 {
                  padding-left: 16rem;
                }
          
                .pt-px {
                  padding-top: 1px;
                }
          
                .pr-px {
                  padding-right: 1px;
                }
          
                .pb-px {
                  padding-bottom: 1px;
                }
          
                .pl-px {
                  padding-left: 1px;
                }
          
          
                .fill-current {
                  fill: currentColor;
                }
          
                .stroke-current {
                  stroke: currentColor;
                }
          
                .table-auto {
                  table-layout: auto;
                }
          
                .table-fixed {
                  table-layout: fixed;
                }
          
                .text-left {
                  text-align: left;
                }
          
                .text-center {
                  text-align: center;
                }
          
                .text-right {
                  text-align: right;
                }
          
                .text-justify {
                  text-align: justify;
                }
          
                .text-transparent {
                  color: transparent;
                }
          
                .text-black {
                  color: #000;
                }
          
                .text-white {
                  color: #fff;
                }
          
                .text-gray-100 {
                  color: #f7fafc;
                }
          
                .text-gray-200 {
                  color: #edf2f7;
                }
          
                .text-gray-300 {
                  color: #e2e8f0;
                }
          
                .text-gray-400 {
                  color: #cbd5e0;
                }
          
                .text-gray-500 {
                  color: #a0aec0;
                }
          
                .text-gray-600 {
                  color: #718096;
                }
          
                .text-gray-700 {
                  color: #828282;
                }
                .heading-text-gray-700 {
                  color: #212121;
                }
          
                .text-gray-800 {
                  color: #2d3748;
                }
          
                .text-gray-900 {
                  color: #1a202c;
                }
          
                .text-red-100 {
                  color: #fff5f5;
                }
          
                .text-red-200 {
                  color: #fed7d7;
                }
          
                .text-red-300 {
                  color: #feb2b2;
                }
          
                .text-red-400 {
                  color: #fc8181;
                }
          
                .text-red-500 {
                  color: #f56565;
                }
          
                .text-red-600 {
                  color: #e53e3e;
                }
          
                .text-red-700 {
                  color: #c53030;
                }
          
                .text-red-800 {
                  color: #9b2c2c;
                }
          
                .text-red-900 {
                  color: #742a2a;
                }
          
                .text-orange-100 {
                  color: #fffaf0;
                }
          
                .text-orange-200 {
                  color: #feebc8;
                }
          
                .text-orange-300 {
                  color: #fbd38d;
                }
          
                .text-orange-400 {
                  color: #f6ad55;
                }
          
                .text-orange-500 {
                  color: #ed8936;
                }
          
                .text-orange-600 {
                  color: #dd6b20;
                }
          
                .text-orange-700 {
                  color: #c05621;
                }
          
                .text-orange-800 {
                  color: #9c4221;
                }
          
                .text-orange-900 {
                  color: #7b341e;
                }
          
                .text-yellow-100 {
                  color: #fffff0;
                }
          
                .text-yellow-200 {
                  color: #fefcbf;
                }
          
                .text-yellow-300 {
                  color: #faf089;
                }
          
                .text-yellow-400 {
                  color: #f6e05e;
                }
          
                .text-yellow-500 {
                  color: #ecc94b;
                }
          
                .text-yellow-600 {
                  color: #d69e2e;
                }
          
                .text-yellow-700 {
                  color: #b7791f;
                }
          
                .text-yellow-800 {
                  color: #975a16;
                }
          
                .text-yellow-900 {
                  color: #744210;
                }
          
                .text-green-100 {
                  color: #f0fff4;
                }
          
                .text-green-200 {
                  color: #c6f6d5;
                }
          
                .text-green-300 {
                  color: #9ae6b4;
                }
          
                .text-green-400 {
                  color: #68d391;
                }
          
                .text-green-500 {
                  color: #48bb78;
                }
          
                .text-green-600 {
                  color: #38a169;
                }
          
                .text-green-700 {
                  color: #2f855a;
                }
          
                .text-green-800 {
                  color: #276749;
                }
          
                .text-green-900 {
                  color: #22543d;
                }
          
                .text-teal-100 {
                  color: #e6fffa;
                }
          
                .text-teal-200 {
                  color: #b2f5ea;
                }
          
                .text-teal-300 {
                  color: #81e6d9;
                }
          
                .text-teal-400 {
                  color: #4fd1c5;
                }
          
                .text-teal-500 {
                  color: #38b2ac;
                }
          
                .text-teal-600 {
                  color: #319795;
                }
          
                .text-teal-700 {
                  color: #2c7a7b;
                }
          
                .text-teal-800 {
                  color: #285e61;
                }
          
                .text-teal-900 {
                  color: #234e52;
                }
          
                .text-blue-100 {
                  color: #ebf8ff;
                }
          
                .text-blue-200 {
                  color: #bee3f8;
                }
          
                .text-blue-300 {
                  color: #90cdf4;
                }
          
                .text-blue-400 {
                  color: #63b3ed;
                }
          
                .text-blue-500 {
                  color: #4299e1;
                }
          
                .text-blue-600 {
                  color: #3182ce;
                }
          
                .text-blue-700 {
                  color: #2b6cb0;
                }
          
                .text-blue-800 {
                  color: #2c5282;
                }
          
                .text-blue-900 {
                  color: #2a4365;
                }
          
                .text-indigo-100 {
                  color: #ebf4ff;
                }
          
                .text-indigo-200 {
                  color: #c3dafe;
                }
          
                .text-indigo-300 {
                  color: #a3bffa;
                }
          
                .text-indigo-400 {
                  color: #7f9cf5;
                }
          
                .text-indigo-500 {
                  color: #667eea;
                }
          
                .text-indigo-600 {
                  color: #5a67d8;
                }
          
                .text-indigo-700 {
                  color: #4c51bf;
                }
          
                .text-indigo-800 {
                  color: #434190;
                }
          
                .text-indigo-900 {
                  color: #3c366b;
                }
          
                .text-purple-100 {
                  color: #faf5ff;
                }
          
                .text-purple-200 {
                  color: #e9d8fd;
                }
          
                .text-purple-300 {
                  color: #d6bcfa;
                }
          
                .text-purple-400 {
                  color: #b794f4;
                }
          
                .text-purple-500 {
                  color: #9f7aea;
                }
          
                .text-purple-600 {
                  color: #805ad5;
                }
          
                .text-purple-700 {
                  color: #6b46c1;
                }
          
                .text-purple-800 {
                  color: #553c9a;
                }
          
                .text-purple-900 {
                  color: #44337a;
                }
          
                .text-pink-100 {
                  color: #fff5f7;
                }
          
                .text-pink-200 {
                  color: #fed7e2;
                }
          
                .text-pink-300 {
                  color: #fbb6ce;
                }
          
                .text-pink-400 {
                  color: #f687b3;
                }
          
                .text-pink-500 {
                  color: #ed64a6;
                }
          
                .text-pink-600 {
                  color: #d53f8c;
                }
          
                .text-pink-700 {
                  color: #b83280;
                }
          
                .text-pink-800 {
                  color: #97266d;
                }
          
                .text-pink-900 {
                  color: #702459;
                }
          
                .text-xs {
                  font-size: 0.75rem;
                }
          
                .text-sm {
                  font-size: 0.875rem;
                }
          
                .text-base {
                  font-size: 1rem;
                }
          
                .text-lg {
                  font-size: 1.125rem;
                }
          
                .text-xl {
                  font-size: 1.25rem;
                }
          
                .text-2xl {
                  font-size: 1.5rem;
                }
          
                .text-3xl {
                  font-size: 1.875rem;
                }
          
                .text-4xl {
                  font-size: 2.25rem;
                }
          
                .text-5xl {
                  font-size: 3rem;
                }
          
                .text-6xl {
                  font-size: 4rem;
                }
          
                .italic {
                  font-style: italic;
                }
          
                .not-italic {
                  font-style: normal;
                }
          
                .uppercase {
                  text-transform: uppercase;
                }
          
                .lowercase {
                  text-transform: lowercase;
                }
          
                .capitalize {
                  text-transform: capitalize;
                }
          
                .normal-case {
                  text-transform: none;
                }
          
                .underline {
                  text-decoration: underline;
                }
          
                .line-through {
                  text-decoration: line-through;
                }
          
                .no-underline {
                  text-decoration: none;
                }
          
                .antialiased {
                  -webkit-font-smoothing: antialiased;
                  -moz-osx-font-smoothing: grayscale;
                }
          
                .subpixel-antialiased {
                  -webkit-font-smoothing: auto;
                  -moz-osx-font-smoothing: auto;
                }
          
                .tracking-tighter {
                  letter-spacing: -0.05em;
                }
          
                .tracking-tight {
                  letter-spacing: -0.025em;
                }
          
                .tracking-normal {
                  letter-spacing: 0;
                }
          
                .tracking-wide {
                  letter-spacing: 0.025em;
                }
          
                .tracking-wider {
                  letter-spacing: 0.05em;
                }
          
                .tracking-widest {
                  letter-spacing: 0.1em;
                }
          
                .select-none {
                  -webkit-user-select: none;
                  -moz-user-select: none;
                  -ms-user-select: none;
                  user-select: none;
                }
          
                .select-text {
                  -webkit-user-select: text;
                  -moz-user-select: text;
                  -ms-user-select: text;
                  user-select: text;
                }
          
                .select-all {
                  -webkit-user-select: all;
                  -moz-user-select: all;
                  -ms-user-select: all;
                  user-select: all;
                }
          
                .select-auto {
                  -webkit-user-select: auto;
                  -moz-user-select: auto;
                  -ms-user-select: auto;
                  user-select: auto;
                }
          
                .align-baseline {
                  vertical-align: baseline;
                }
          
                .align-top {
                  vertical-align: top;
                }
          
                .align-middle {
                  vertical-align: middle;
                }
          
                .align-bottom {
                  vertical-align: bottom;
                }
          
                .align-text-top {
                  vertical-align: text-top;
                }
          
                .align-text-bottom {
                  vertical-align: text-bottom;
                }
          
                .visible {
                  visibility: visible;
                }
          
                .invisible {
                  visibility: hidden;
                }
          
                .whitespace-normal {
                  white-space: normal;
                }
          
                .whitespace-no-wrap {
                  white-space: nowrap;
                }
          
                .whitespace-pre {
                  white-space: pre;
                }
          
                .whitespace-pre-line {
                  white-space: pre-line;
                }
          
                .whitespace-pre-wrap {
                  white-space: pre-wrap;
                }
          
                .break-normal {
                  overflow-wrap: normal;
                  word-break: normal;
                }
          
                .break-words {
                  overflow-wrap: break-word;
                }
          
                .break-all {
                  word-break: break-all;
                }
          
                .truncate {
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
          
                .w-0 {
                  width: 0;
                }
          
                .w-1 {
                  width: 0.25rem;
                }
          
                .w-2 {
                  width: 0.5rem;
                }
          
                .w-3 {
                  width: 0.75rem;
                }
          
                .w-4 {
                  width: 1rem;
                }
          
                .w-5 {
                  width: 1.25rem;
                }
          
                .w-6 {
                  width: 1.5rem;
                }
          
                .w-8 {
                  width: 2rem;
                }
          
                .w-10 {
                  width: 2.5rem;
                }
          
                .w-12 {
                  width: 3rem;
                }
          
                .w-16 {
                  width: 4rem;
                }
          
                .w-20 {
                  width: 5rem;
                }
          
                .w-24 {
                  width: 6rem;
                }
          
                .w-32 {
                  width: 8rem;
                }
          
                .w-40 {
                  width: 10rem;
                }
          
                .w-48 {
                  width: 12rem;
                }
          
                .w-56 {
                  width: 14rem;
                }
          
                .w-64 {
                  width: 16rem;
                }
          
                .w-auto {
                  width: auto;
                }
          
                .w-px {
                  width: 1px;
                }
          
                .w-1\/2 {
                  width: 50%;
                }
          
                .w-1\/3 {
                  width: 33.333333%;
                }
          
                .w-2\/3 {
                  width: 66.666667%;
                }
          
                .w-1\/4 {
                  width: 25%;
                }
          
                .w-2\/4 {
                  width: 50%;
                }
          
                .w-3\/4 {
                  width: 75%;
                }
          
                .w-1\/5 {
                  width: 20%;
                }
          
                .w-2\/5 {
                  width: 40%;
                }
          
                .w-3\/5 {
                  width: 60%;
                }
          
                .w-4\/5 {
                  width: 80%;
                }
          
                .w-1\/6 {
                  width: 16.666667%;
                }
          
                .w-2\/6 {
                  width: 33.333333%;
                }
          
                .w-3\/6 {
                  width: 50%;
                }
          
                .w-4\/6 {
                  width: 66.666667%;
                }
          
                .w-5\/6 {
                  width: 83.333333%;
                }
          
                .w-1\/12 {
                  width: 8.333333%;
                }
          
                .w-2\/12 {
                  width: 16.666667%;
                }
          
                .w-3\/12 {
                  width: 25%;
                }
          
                .w-4\/12 {
                  width: 33.333333%;
                }
          
                .w-5\/12 {
                  width: 41.666667%;
                }
          
                .w-6\/12 {
                  width: 50%;
                }
          
                .w-7\/12 {
                  width: 58.333333%;
                }
          
                .w-8\/12 {
                  width: 66.666667%;
                }
          
                .w-9\/12 {
                  width: 75%;
                }
          
                .w-10\/12 {
                  width: 83.333333%;
                }
          
                .w-11\/12 {
                  width: 91.666667%;
                }
          
                .w-full {
                  width: 100%;
                }
          
                .w-screen {
                  width: 100vw;
                }
          
                .z-0 {
                  z-index: 0;
                }
          
                .z-10 {
                  z-index: 10;
                }
          
                .z-20 {
                  z-index: 20;
                }
          
                .z-30 {
                  z-index: 30;
                }
          
                .z-40 {
                  z-index: 40;
                }
          
                .z-50 {
                  z-index: 50;
                }
          
                .z-auto {
                  z-index: auto;
                }
          
                progress {
                  width: 150px;
                  height: 12px;
                  border: 1px solid white;
                  border-radius: 100px;
                  overflow: hidden;
                }
                progress::-webkit-progress-bar {
                  background-color: #bdbdbd;
                }
                progress::-webkit-progress-value {
                  background-color: #4b2459;
                }
              </style>
          
              <!-- <script src="https://cdn.tailwindcss.com"></script> -->
            </head>
          
            <body
              class="m-0"
              style="font-family: system-ui, sans-serif; width: 90vw; margin: 0 auto;"
            >
              <div class="w-10/12 mx-auto">
                <img
                  src="https://sassolution.org/funeral/storage/app/public/logo.jpg"
                  class="my-6"
                  style="width: 50%"
                />
          
                <br />
          
                <div class="flex">
                  <img
                    src=${get_employeepro_data?.Image}
                   
                    width="30%"
                  />
          
                  <div class="ml-8">
                    <h1>${
                      get_employeepro_data?.First_Name +
                      ' ' +
                      get_employeepro_data?.Last_Name
                    }</h1>
                    <h2 style="color:#49255B;" class="font-medium text-xl">${
                      get_employeepro_data?.Occupation ?  get_employeepro_data?.Occupation : 'NILL'
                    }</h2>
          
                    <p class="text-lg font-medium mt-5" style="color:#828282;">
                      Overall Performance Score
                      <span class="font-semibold text-black"> ${
                        employee_performances?.Score
                          ? employee_performances?.Score
                          : '-'
                      }% </span>
                    </p>
          
                    <p class="text-lg font-medium m-0">Recruited By</p>
                    <p class="text-base mt-2" style="color:#212121;">${
                      get_employeepro_data?.agency?.AgencyName ? get_employeepro_data?.agency?.AgencyName : '-'
                    }</p>
                  </div>
                </div>
          
                <!-- About & Contact Info -->
                <table class="w-full mt-10">
                  <thead style=" color: #4a255b">
                    <th colspan="2" class="w-1/2">
                      <div
                        class="flex items-center text-lg"
                        style="border-bottom: 1px solid #4a255b; margin-right: 20px;"
                      >
                        <svg
                          enable-background="new 0 0 500 500"
                          id="Layer_1"
                          version="1.1"
                          viewBox="0 0 500 500"
                          xml:space="preserve"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          width="40"
                          height="40"
                          class="fill-current mr-3"
                        >
                          <g>
                            <g>
                              <path
                                d="M250,291.6c-52.8,0-95.8-43-95.8-95.8s43-95.8,95.8-95.8s95.8,43,95.8,95.8S302.8,291.6,250,291.6z M250,127.3    c-37.7,0-68.4,30.7-68.4,68.4s30.7,68.4,68.4,68.4s68.4-30.7,68.4-68.4S287.7,127.3,250,127.3z"
                              ></path>
                            </g>
                            <g>
                              <path
                                d="M386.9,401.1h-27.4c0-60.4-49.1-109.5-109.5-109.5s-109.5,49.1-109.5,109.5h-27.4c0-75.5,61.4-136.9,136.9-136.9    S386.9,325.6,386.9,401.1z"
                              ></path>
                            </g>
                          </g>
                        </svg>
                        About
                      </div>
                    </th>
                    <th colspan="2" class="w-1/2">
                      <div
                        class="flex items-center text-lg"
                        style="border-bottom: 1px solid #4a255b"
                      >
                        <svg
                          enable-background="new 0 0 500 500"
                          id="Layer_1"
                          version="1.1"
                          viewBox="0 0 500 500"
                          xml:space="preserve"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          width="40"
                          height="40"
                          class="fill-current mr-3"
                        >
                          <g>
                            <g>
                              <path
                                d="M250,291.6c-52.8,0-95.8-43-95.8-95.8s43-95.8,95.8-95.8s95.8,43,95.8,95.8S302.8,291.6,250,291.6z M250,127.3    c-37.7,0-68.4,30.7-68.4,68.4s30.7,68.4,68.4,68.4s68.4-30.7,68.4-68.4S287.7,127.3,250,127.3z"
                              ></path>
                            </g>
                            <g>
                              <path
                                d="M386.9,401.1h-27.4c0-60.4-49.1-109.5-109.5-109.5s-109.5,49.1-109.5,109.5h-27.4c0-75.5,61.4-136.9,136.9-136.9    S386.9,325.6,386.9,401.1z"
                              ></path>
                            </g>
                          </g>
                        </svg>
                        Contact Information
                      </div>
                    </th>
                  </thead>
                  <tbody>
                    <!-- Row #1 -->
                    <tr>
                      <td colspan="2" class="font-medium text-gray-600 py-2">
                        PERSONAL INFORMATION
                      </td>
                      <td class="font-medium heading-text-gray-700">Email:</td>
                      <td class="font-normal text-gray-700">${
                        get_employeepro_data?.Email
                          ? get_employeepro_data?.Email
                          : '-'
                      }</td>
                    </tr>
          
                    <!-- Row #2 -->
                    <tr>
                      <td class="font-medium heading-text-gray-700">Employee ID:</td>
                      <td class="font-normal text-gray-700">${
                        get_employeepro_data?.id ? get_employeepro_data?.id : '-'
                      }</td>
          
                      <td class="font-medium heading-text-gray-700">Cell Phone:</td>
                      <td class="font-normal text-gray-700">${
                        get_employeepro_data?.CellPhone
                          ? get_employeepro_data?.CellPhone
                          : '-'
                      }</td>
                    </tr>
          
                    <!-- Row #3 -->
                    <tr>
                      <td class="font-medium heading-text-gray-700">Search Date:</td>
                      <td class="font-normal text-gray-700">${
                        newSeparated ? newSeparated : '-'
                      }</td>
          
                      <td class="font-medium heading-text-gray-700">Telephone:</td>
                      <td class="font-normal text-gray-700">${
                        get_employeepro_data?.Telephone
                          ? get_employeepro_data?.Telephone
                          : '-'
                      }</td>
                    </tr>
          
                    <!-- Row #4 -->
                    <tr>
                      <td class="font-medium heading-text-gray-700">Identification No:</td>
                      <td class="font-normal text-gray-700">${
                        formattedNumber ? formattedNumber : '-'
                      }</td>
          
                      <td class="font-medium heading-text-gray-700">Address:</td>
                      <td class="font-normal text-gray-700">
                      ${
                        get_employeepro_data?.Address
                          ? get_employeepro_data?.Address
                          : '-'
                      }
                      </td>
                    </tr>
          
                    <!-- Row #5 -->
                    <tr>
                      <td class="font-medium heading-text-gray-700">First Name:</td>
                      <td class="font-normal text-gray-700">${
                        get_employeepro_data?.First_Name
                          ? get_employeepro_data?.First_Name
                          : '-'
                      }</td>
          
                      <td class="font-medium heading-text-gray-700">Phone Carrier:</td>
                      <td class="font-normal text-gray-700">${
                        get_employeepro_data?.PhoneCarrier
                          ? get_employeepro_data?.PhoneCarrier
                          : '-'
                      }</td>
                    </tr>
          
                    <!-- Row #6 -->
                    <tr>
                      <td class="font-medium heading-text-gray-700">Middle Name:</td>
                      <td class="font-normal text-gray-700">${
                        get_employeepro_data?.Middle_Name
                          ? get_employeepro_data?.Middle_Name
                          : '-'
                      }</td>
          
                      <td class="font-medium heading-text-gray-700">City:</td>
                      <td class="font-normal text-gray-700">${
                        get_employeepro_data?.City
                          ? get_employeepro_data?.City
                          : '-'
                      }</td>
                    </tr>
          
                    <!-- Row #7 -->
                    <tr>
                      <td class="font-medium heading-text-gray-700">Last Name:</td>
                      <td class="font-normal text-gray-700">${
                        get_employeepro_data?.Last_Name
                          ? get_employeepro_data?.Last_Name
                          : '-'
                      }</td>
          
                      <td class="font-medium heading-text-gray-700">State:</td>
                      <td class="font-normal text-gray-700">${
                        get_employeepro_data?.state?.state
                          ? get_employeepro_data?.state?.state
                          : '-'
                      }</td>
                    </tr>
          
                    <!-- Row #8 -->
                    <tr>
                      <td class="font-medium heading-text-gray-700">DOB:</td>
                      <td class="font-normal text-gray-700">${
                        get_employeepro_data?.DOB ? dobNew : '-'
                      }</td>
          
                      <td class="font-medium heading-text-gray-700">LGA:</td>
                      <td class="font-normal text-gray-700">${
                        get_employeepro_data?.LGA ? get_employeepro_data?.LGA : '-'
                      }</td>
                    </tr>
          
                    <!-- Row #9 -->
                    <tr>
                      <td class="font-medium heading-text-gray-700">Age:</td>
                      <td class="font-normal text-gray-700">${age}</td>
          
                      <td class="font-medium heading-text-gray-700">Nigerian:</td>
                      <td class="font-normal text-gray-700">${
                        get_employeepro_data?.Nigerian == 1 ? 'Yes' : 'No'
                      }</td>
                    </tr>
          
                    <!-- Row #10 -->
                    <tr>
                      <td class="font-medium heading-text-gray-700">Sex:</td>
                      <td class="font-normal text-gray-700">${
                        get_employeepro_data?.Sex ? get_employeepro_data?.Sex : '-'
                      }</td>
          
                      <td colspan-"2"></td>
                    </tr>    

                    <!-- Row #11 -->
                    <tr>
                      <td class="font-medium heading-text-gray-700">Maritial status:</td>
                      <td class="font-normal text-gray-700">${
                        get_employeepro_data?.Marita_Status
                          ? get_employeepro_data?.Marita_Status
                          : '-'
                      }</td>

                      <td colspan-"2"></td>
                    </tr>
                  </tbody>
                </table>
          
                ${"<br />".repeat(15)}




                <!-- Referee & Work History -->
                
                <table style="top:-20px" class="w-full">
                  <thead style="color: #4a255b">
                    <th colspan="2" class="w-1/2">
                      <div
                        class="flex items-center text-lg"
                        style="border-bottom: 1px solid #4a255b; margin-right: 20px"
                      >
                        <svg
                          enable-background="new 0 0 500 500"
                          id="Layer_1"
                          version="1.1"
                          viewBox="0 0 500 500"
                          xml:space="preserve"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          width="40"
                          height="40"
                          class="fill-current mr-3"
                        >
                          <g>
                            <g>
                              <path
                                d="M250,291.6c-52.8,0-95.8-43-95.8-95.8s43-95.8,95.8-95.8s95.8,43,95.8,95.8S302.8,291.6,250,291.6z M250,127.3    c-37.7,0-68.4,30.7-68.4,68.4s30.7,68.4,68.4,68.4s68.4-30.7,68.4-68.4S287.7,127.3,250,127.3z"
                              ></path>
                            </g>
                            <g>
                              <path
                                d="M386.9,401.1h-27.4c0-60.4-49.1-109.5-109.5-109.5s-109.5,49.1-109.5,109.5h-27.4c0-75.5,61.4-136.9,136.9-136.9    S386.9,325.6,386.9,401.1z"
                              ></path>
                            </g>
                          </g>
                        </svg>
                        Referee
                      </div>
                    </th>
                    <th colspan="2" class="w-1/2">
                      <div
                        class="flex items-center text-lg"
                        style="border-bottom: 1px solid #4a255b"
                      >
                        <svg
                          enable-background="new 0 0 500 500"
                          id="Layer_1"
                          version="1.1"
                          viewBox="0 0 500 500"
                          xml:space="preserve"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          width="40"
                          height="40"
                          class="fill-current mr-3"
                        >
                          <g>
                            <g>
                              <path
                                d="M250,291.6c-52.8,0-95.8-43-95.8-95.8s43-95.8,95.8-95.8s95.8,43,95.8,95.8S302.8,291.6,250,291.6z M250,127.3    c-37.7,0-68.4,30.7-68.4,68.4s30.7,68.4,68.4,68.4s68.4-30.7,68.4-68.4S287.7,127.3,250,127.3z"
                              ></path>
                            </g>
                            <g>
                              <path
                                d="M386.9,401.1h-27.4c0-60.4-49.1-109.5-109.5-109.5s-109.5,49.1-109.5,109.5h-27.4c0-75.5,61.4-136.9,136.9-136.9    S386.9,325.6,386.9,401.1z"
                              ></path>
                            </g>
                          </g>
                        </svg>
                        Work History
                      </div>
                    </th>
                  </thead>
                  <tbody>
                    <!-- Row #1 -->
                    <tr>
                      <td class="font-medium heading-text-gray-700">Guarantor Name:</td>
                      <td class="font-normal text-gray-700">${
                        get_employeepro_data?.RefereeName
                          ? get_employeepro_data?.RefereeName
                          : '-'
                      }</td>
          
                      <td class="font-medium heading-text-gray-700">Occupation:</td>
                      <td class="font-normal text-gray-700">${
                        get_employeepro_data?.Occupation
                          ? get_employeepro_data?.Occupation
                          : '-'
                      }</td>
                    </tr>
          
                    <!-- Row #2 -->
                    <tr>
                      <td class="font-medium heading-text-gray-700">Guarantor Contact Address:</td>
                      <td class="font-normal text-gray-700">
                      ${
                        get_employeepro_data?.RefereeContactAddress
                          ? get_employeepro_data?.RefereeContactAddress
                          : '-'
                      }
                      </td>
          
                      <td class="font-medium heading-text-gray-700">Recruitment Agency:</td>
                      <td class="font-normal text-gray-700">${
                        get_employeepro_data?.agency?.AgencyName ? get_employeepro_data?.agency?.AgencyName : '-'
                      }</td>
                    </tr>
          
                    <!-- Row #3 -->
                    <tr>
                    <td class="font-medium heading-text-gray-700">Guarantor Contact Phone:</td>
                    <td class="font-normal text-gray-700">${
                      get_employeepro_data?.RefereeContatctPhone
                        ? get_employeepro_data?.RefereeContatctPhone
                        : '-'
                    }</td>
          
                      <td class="font-medium heading-text-gray-700">Date Hired:</td>
                      <td class="font-normal text-gray-700">${
                        get_employeepro_data?.Date_Hired ? newchangeDHire : '-'
                      }</td>
                    </tr>
          
                    <!-- Row #4 -->
                    <tr>
                    <td class="font-medium heading-text-gray-700"></td>
                    <td class="font-normal text-gray-700"></td>
          
                      <td class="font-medium heading-text-gray-700">Date Seperated:</td>
                      <td class="font-normal text-gray-700">${
                        get_employeepro_data?.Date_Seperated ? newchangeDSepr : '-'
                      }</td>
                    </tr>
          
                    <!-- Row #5 -->
                    <tr>
                      <td class="font-medium heading-text-gray-700"></td>
                      <td class="font-normal text-gray-700"></td>
          
                      <td class="font-medium heading-text-gray-700">Length of Employment:</td>
                      <td class="font-normal text-gray-700">${
                        get_employeepro_data?.LengthofEmployment
                          ? get_employeepro_data?.LengthofEmployment
                          : '-'
                      }</td>
                    </tr>
          
                    <!-- Row #6 -->
                    <tr>
                      <td class="font-medium"></td>
                      <td class="font-normal text-gray-700"></td>
          
                      <td class="font-medium heading-text-gray-700">Conduct</td>
                      <td class="font-normal text-gray-700">${
                        get_employeepro_data?.Conduct
                          ? get_employeepro_data?.Conduct
                          : '-'
                      }</td>
                    </tr>
          
                    <!-- Row #7 -->
                    <tr>
                      <td class="font-medium"></td>
                      <td class="font-normal text-gray-700"></td>
          
                      <td class="font-medium heading-text-gray-700">Hire Again</td>
                      <td class="font-normal text-gray-700">${
                        get_employeepro_data?.Hire_Again
                          ? get_employeepro_data?.Hire_Again
                          : '-'
                      }</td>
                    </tr>
                  </tbody>
                </table>
          
                ${"<br />".repeat(39)}
          
                <!-- Overall Performance Score -->
                <h1 class="text-3xl text-gray-900">
                  Overall Performance Score &nbsp; ${
                    employee_performances?.Score
                      ? employee_performances?.Score
                      : '-'
                  }%
                </h1>
                <table class="w-full mt-10">
                  <thead class="text-indigo-800">
                    <th colspan="2" class="w-1/2">
                      <div class="flex items-center text-lg text-black">
                        Personal Attributes
                      </div>
                    </th>
                    <th colspan="2" class="w-1/2">
                      <div class="flex items-center text-lg text-black">
                        Professional Attributes
                      </div>
                    </th>
                  </thead>
                  <tbody>
                    <!-- Row #1 -->
                    <tr>
                      <td colspan="1" class="font-medium">Trustworthiness/Honesty</td>
                      <td colspan="1" class="font-normal text-gray-700 flex items-center">
                          <progress max="100" style="width: 110px; inline; margin-right: 2px;" value=${
                           employee_performances?.Trust
                             ? employee_performances?.Trust * 20
                             : 0 * 20
                          }></progress>
                        <p class="inline-block m-0">${
                          employee_performances?.Trust
                            ? employee_performances?.Trust
                            : 0
                        }</p>
                      </td>
          
                      <td colspan="1" class="font-medium">
                        Easily Understands Instructions
                      </td>
                      <td colspan="1" class="font-normal text-gray-700 flex items-center">
                          <progress max="100" style="width: 110px; display: inline; margin-right: 2px;" value=${
                           employee_performances?.Instructions
                             ? employee_performances?.Instructions * 20
                             : 0 * 20
                          }></progress>
                        <p class="inline-block m-0">${
                          employee_performances?.Instructions
                            ? employee_performances?.Instructions
                            : 0
                        }</p>
                      </td>
                    </tr>
          
                    <!-- Row #2 -->
                    <tr>
                      <td colspan="1" class="font-medium">
                        Obedient/Follows Instructions
                      </td>
                      <td colspan="1" class="font-normal text-gray-700 flex items-center">
                          <progress max="100" style="width: 110px; display: inline; margin-right: 2px;" value=${
                           employee_performances?.Obedience
                             ? employee_performances?.Obedience * 20
                             : 0 * 20
                          }></progress>
                        <p class="inline-block m-0">${
                          employee_performances?.Obedience
                            ? employee_performances?.Obedience
                            : 0
                        }</p>
                      </td>
          
                      <td colspan="1" class="font-medium">
                        Carefulness with Employers items
                      </td>
                      <td colspan="1" class="font-normal text-gray-700 flex items-center">
                          <progress max="100" style="width: 110px; display: inline; margin-right: 2px;" value=${
                           employee_performances?.Consciencious
                             ? employee_performances?.Consciencious * 20
                             : 0 * 20
                          }></progress>
                        <p class="inline-block m-0">${
                          employee_performances?.Consciencious
                            ? employee_performances?.Consciencious
                            : 0
                        }</p>
                      </td>
                    </tr>
          
                    <!-- Row #3 -->
                    <tr>
                      <td colspan="1" class="font-medium">Availability/Attendance</td>
                      <td colspan="1" class="font-normal text-gray-700 flex items-center">
                          <progress max="100" style="width: 110px; display: inline; margin-right: 2px;" value=${
                           employee_performances?.Availability
                             ? employee_performances?.Availability * 20
                             : 0 * 20
                          }></progress>
                        <p class="inline-block m-0">${
                          employee_performances?.Availability
                            ? employee_performances?.Availability
                            : 0
                        }</p>
                      </td>
          
                      <td colspan="1" class="font-medium">Problem Solving</td>
                      <td colspan="1" class="font-normal text-gray-700 flex items-center">
                          <progress max="100" style="width: 110px; display: inline; margin-right: 2px;" value=${
                           employee_performances?.Initiative
                             ? employee_performances?.Initiative * 20
                             : 0 * 20
                          }></progress>
                        <p class="inline-block m-0">${
                          employee_performances?.Initiative
                            ? employee_performances?.Initiative
                            : 0
                        }</p>
                      </td>
                    </tr>
          
                    <!-- Row #4 -->
                    <tr>
                      <td colspan="1" class="font-medium">Kind and Compassionate</td>
                      <td colspan="1" class="font-normal text-gray-700 flex items-center">
                          <progress max="100" style="width: 110px; display: inline; margin-right: 2px;" value=${
                           employee_performances?.Kindness
                             ? employee_performances?.Kindness * 20
                             : 0 * 20
                          }></progress>
                        <p class="inline-block m-0">${
                          employee_performances?.Kindness
                            ? employee_performances?.Kindness
                            : 0
                        }</p>
                      </td>
          
                      <td colspan="1" class="font-medium">Diligence during work</td>
                      <td colspan="1" class="font-normal text-gray-700 flex items-center">
                          <progress max="100" style="width: 110px; display: inline; margin-right: 2px;" value=${
                           employee_performances?.Dilgence
                             ? employee_performances?.Dilgence * 20
                             : 0 * 20
                          }></progress>
                        <p class="inline-block m-0">${
                          employee_performances?.Dilgence
                            ? employee_performances?.Dilgence
                            : 0
                        }</p>
                      </td>
                    </tr>
          
                    <!-- Row #5 -->
                    <tr>
                      <td colspan="1" class="font-medium">Safe Person to be Around</td>
                      <td colspan="1" class="font-normal text-gray-700 flex items-center">
                          <progress max="100" style="width: 110px; display: inline; margin-right: 2px;" value=${
                           employee_performances?.Safety
                             ? employee_performances?.Safety * 20
                             : 0 * 20
                          }></progress>
                        <p class="inline-block m-0">${
                          employee_performances?.Safety
                            ? employee_performances?.Safety
                            : 0
                        }</p>
                      </td>
          
                      <td colspan="1" class="font-medium">Hardworking</td>
                      <td colspan="1" class="font-normal text-gray-700 flex items-center">
                          <progress max="100" style="width: 110px; display: inline; margin-right: 2px;" value=${
                           employee_performances?.Work_Ethics
                             ? employee_performances?.Work_Ethics * 20
                             : 0 * 20
                          }></progress>
                        <p class="inline-block m-0">${
                          employee_performances?.Work_Ethics
                            ? employee_performances?.Work_Ethics
                            : 0
                        }</p>
                      </td>
                    </tr>
          
                    <!-- Row #6 -->
                    <tr>
                      <td colspan="1" class="font-medium">
                        Keeps Self and Surroundings Clean
                      </td>
                      <td colspan="1" class="font-normal text-gray-700 flex items-center">
                          <progress max="100" style="width: 110px; display: inline; margin-right: 2px;" value=${
                           employee_performances?.Clenliness
                             ? employee_performances?.Clenliness * 20
                             : 0 * 20
                          }></progress>
                        <p class="inline-block m-0">${
                          employee_performances?.Clenliness
                            ? employee_performances?.Clenliness
                            : 0
                        }</p>
                      </td>
          
                      <td colspan="1" class="font-medium">
                        Overall Work Quality Assessment
                      </td>
                      <td colspan="1" class="font-normal text-gray-700 flex items-center">
                          <progress max="100" style="width: 110px; display: inline; margin-right: 2px;" value=${
                           employee_performances?.Quality
                             ? employee_performances?.Quality * 20
                             : 0 * 20
                          }></progress>
                        <p class="inline-block m-0">${
                          employee_performances?.Quality
                            ? employee_performances?.Quality
                            : 0
                        }</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
          
                ${"<br />".repeat(2)}
          
                <h3 class="font-semibold m-0">Overall Assesment</h3>
                <p class="m-0">${
                  get_employeepro_data?.Assessment
                    ? get_employeepro_data?.Assessment
                    : '-'
                }</p>
          
                <br />
                <br />
          
                <!-- Incidence Report -->
                <h2 class="text-xl">Incidence Report</h2>
          
                <!-- One -->
                ${
                  incidenceReports?.length > 0
                    ? incidenceReports
                        ?.map((item, index) => {
                          // console.log('item', item)
                          const dateSep = moment(
                            item?.Date_Submitted,
                            'YYYY-MM-DD HH:mm:ss',
                          );
                          const date = dateSep.format('DD/MM/YYYY');
                          return ` <div
                      class="p-3 bg-gray-200 mt-6"
                      style="border: 1px solid ${
                        item?.rate == 'Good' ? '#4991E7' : '#EB5757'
                      }; border-radius: 10px; background-color:${
                            item?.rate == 'Good' ? '#F1F5F9' : '#F9F2F2'
                          }"
                    >
                      <div class="w-full !text-base">
                          <!-- Row #1 -->
                            <div style="width: 45%; padding: 10px 0;" class="inline-block font-medium text-base">
                              Reported Incidence:
                            </div>
                            <div style="width: 45%; padding: 10px 0;" class="inline-block font-normal text-gray-700 text-base">
                              ${item?.Incident ? item?.Incident : '-'}
                            </div>
              
                          <!-- Row #2 -->
                            <div style="width: 45%; padding: 10px 0;" class="inline-block font-medium text-base">
                              Date Submitted:
                            </div>
                            <div style="width: 45%; padding: 10px 0;" class="inline-block font-normal text-gray-700 text-base">
                            ${date}
                            </div>
              
                          <!-- Row #3 -->
                            <div style="width: 45%; padding: 10px 0;" class="inline-block font-medium text-base">
                              Employer Assessment:
                            </div>
                            <div style="width: 45%; padding: 10px 0;" class="inline-block font-normal text-gray-700 text-base">
                            ${item?.Comment}
                            </div>
              
                          <!-- Row #4 -->
                            <div style="width: 45%; padding: 10px 0;" class="inline-block font-medium text-base">
                              Resolution:
                            </div>
                            <div style="width: 45%; padding: 10px 0;" class="inline-block font-normal text-gray-700 text-base">
                            ${item?.Resolution}
                            </div>
              
                          <!-- Row #5 -->
                            <div style="width: 45%; padding: 10px 0;" class="inline-block font-medium text-base">
                              Action Taken:
                            </div>
                            <div style="width: 45%; padding: 10px 0;" class="inline-block font-normal text-gray-700 text-base">
                            ${item?.External_Action_Taken}
                            </div>
                      </div>
                    </div>
                    `;
                        })
                        .join('')
                    : ''
                }
               
          
                <!-- Two -->
             
          
                ${"<br />".repeat(2)}
          
                <p class="font-medium">
                  CheckMyPeople accepts no liability for the use of our services or for
                  the consequences of any action taken based on the information provided
                  through this platform.
                </p>
          
                <p class="font-medium">
                  Signed
                  <br />
                  CheckMyPeople
                </p>
              </div>
            </body>
          </html>
          `,
          fileName: 'Employee_detail',
          base64: true,
        });
  
        await RNPrint.print({ filePath: results.filePath });
      } else {
        Toast.show('Permission Not Granted');
      }
    } catch (error) {
      console.log('Error requesting storage permission:', error);
    }
  };
// console.log('get_employeepro_data', get_employeepro_data)


  return (
    <View style={{flex: 1}}>
      {/* {
        newType == 'modaal' ? null :
        <Loading isVisible={search_detail_loader} />
      } */}
      <HeaderComp
        title={type == 'detail' ? "Employee's detail" : 'Search Details '}
        // Download
        Download={type != 'detail'}
        onDownload={downloadePDF}
        gapp={type == 'detail'}
      />
      {search_detail_loader ? (
        <DoubleText height={height / 3.1} width={'100%'} />
      ) : (
        <View style={[GlobalStyle.BigImage, {height: height / 3.1}]}>
          <Image
            resizeMode="cover"
            style={GlobalStyle.Image}
            source={{uri: get_employeepro_data?.Image}}
          />
        </View>
      )}
      <View
        style={[
          GlobalStyle.Padding,
          {
            marginTop: 20,
          },
        ]}>
        {search_detail_loader ? (
          <>
            <DoubleText height={25} width={'50%'} />
            <DoubleText height={20} width={'20%'} marginTop={15} />
          </>
        ) : (
          <>
            <Text
              style={[GlobalStyle.Heading, {textAlign: 'left', fontSize: 22}]}>
              {get_employeepro_data?.First_Name}{' '}
              {get_employeepro_data?.Last_Name}
            </Text>
            <Text
              style={[
                GlobalStyle.subHeading,
                {textAlign: 'left', marginVertical: 8},
              ]}>
             {get_employeepro_data?.Occupation ? get_employeepro_data?.Occupation : 'Nil'}
            </Text>
          </>
        )}
        {type == 'detail' ||
        (type == 'search' &&
          get_employeepro_data?.employee_performances?.length > 0) ? (
          <TouchableOpacity
            disabled={search_detail_loader}
            onPress={handleNav}
            // onPress={() =>
            //   navigation.navigate('performanceHistory', {
            //     data: get_employeepro_data,
            //     // data: newType == 'new' ? data : data?.employee_performances[0],
            //   })
            // }
          >
            {search_detail_loader ? (
              <DoubleText height={20} width={'50%'} marginTop={15} />
            ) : (
              <Text
                style={{
                  color: Color.Main,
                  textDecorationLine: 'underline',
                  fontFamily: Font.Inter500,
                  fontSize: 14,
                  marginTop: 8,
                }}>
                {type == 'search'
                  ? 'View Performance Record'
                  : employee_performances?.Score
                  ? 'View Performance Record'
                  : 'Add Performance'}
              </Text>
            )}
          </TouchableOpacity>
        ) : null}
      </View>
      <View
        style={{
          height: 80,
          flexDirection: 'row',
          // justifyContent: 'space-between',
          marginVertical: 25,
          borderTopWidth: 2,
          borderBottomWidth: 2,
          borderColor: '#eff0f0',
          // paddingHorizontal: moderateScale(15),
          width: '90%',
          paddingVertical: 10,
          alignSelf: 'center',
          paddingLeft: 2,
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            justifyContent: 'center',
            // paddingLeft: 20,
          }}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text
              style={{
                color: Color.MidGrey,
                fontSize: 14,
                fontFamily: Font.Inter500,
              }}>
              Performance Score
            </Text>
          </View>
          <View style={{flex: 1}}>
            {search_detail_loader ? (
              <DoubleText height={20} width={'40%'} />
            ) : (
              <Text
                style={{
                  color: Color.Black,
                  fontSize: 14,
                  fontFamily: Font.Inter600,
                  maxWidth: '90%',
                }}>
                {employee_performances?.Score
                  ? employee_performances?.Score
                  : '-'}
                %
              </Text>
            )}
          </View>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            justifyContent: 'center',
          }}>
          <View style={{flex: 1, justifyContent: 'center', paddingLeft: 4}}>
            <Text
              style={{
                color: Color.MidGrey,
                fontSize: 14,
                fontFamily: Font.Inter500,
              }}>
              Recruitment agency:
            </Text>
          </View>
          <View style={{flex: 1, paddingLeft: 4}}>
            {search_detail_loader ? (
              <DoubleText height={20} width={'100%'} />
            ) : (
              <Text
                numberOfLines={2}
                style={{
                  color: Color.Black,
                  fontSize: 12,
                  fontFamily: Font.Inter500,
                  // maxWidth: '90%',
                }}>
                {get_employeepro_data?.agency?.AgencyName
                  ? get_employeepro_data?.agency?.AgencyName
                  : 'Nil'}
              </Text>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

const SearchResult = ({route, navigation}) => {
  const dispatch = useDispatch();
  const {type, data} = route.params;
  const get_employeepro_data = useSelector(state => state.get_employeepro_data);
  const search_detail_loader = useSelector(state => state.search_detail_loader);
  const incidenceReports = useSelector(state => state.get_employee_incidentrep);
  const local_government = useSelector(state => state.local_government);
  const employee_performances = useSelector(
    state => state.get_employee_performance,
  );

  const HEADER_HEIGHT = 600;

  const [age, setAge] = useState(null);

  const getInitialLocalGrn = local_government?.find(
    item => item.value == get_employeepro_data?.LGA,
  );

  const calculateAge = () => {
    if (get_employeepro_data?.DOB) {
      const birthDate = moment(get_employeepro_data?.DOB, 'YYYY-MM-DD');
      const today = moment();
      const age = today?.diff(birthDate, 'years');
      setAge(age?.toString());
    }
  };

  useEffect(() => {
    calculateAge();
  }, [get_employeepro_data?.DOB]);

  // console.log('get_employeepro_data?.Search_Date', get_employeepro_data?.Search_Date)

  const dateSep = moment(
    get_employeepro_data?.Search_Date,
    'YYYY-MM-DD HH:mm:ss',
  );
  const newSeparated = dateSep.format('DD/MM/YYYY');

  const changeDOB = moment(get_employeepro_data?.DOB, 'YYYY-MM-DD HH:mm:ss');
  const dobNew = changeDOB?.format('DD/MM/YYYY');

  const changeDHire = moment(
    get_employeepro_data?.Date_Hired,
    'YYYY-MM-DD HH:mm:ss',
  );
  const newchangeDHire = changeDHire?.format('DD/MM/YYYY');

  const changeDSepr = moment(
    get_employeepro_data?.Date_Seperated,
    'YYYY-MM-DD HH:mm:ss',
  );
  const newchangeDSepr = changeDSepr?.format('DD/MM/YYYY');

  const formatNumberForSecurity = elm => {
    if (elm) {
      const numberString = elm?.toString();
      // const firstFourDigits = numberString?.substring(0, 3);
      const lastTwoDigits = numberString?.substring(numberString?.length - 4);

      return `*******${lastTwoDigits}`;
    } else {
      return null;
    }
  };

  const formattedNumber = formatNumberForSecurity(get_employeepro_data?.bvn);
  // 12:10:08


  const downloadePDF = async () => {
    try {
      let permissionResult;
  
      if (Platform.OS === 'android') {
        permissionResult = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
      } else if (Platform.OS === 'ios') {
        permissionResult = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
        // Replace 'PHOTO_LIBRARY' with the appropriate iOS permission based on your needs
      }
  
      if (permissionResult === RESULTS.GRANTED) {
        // Toast.show('Permission Granted');
        const results = await RNHTMLtoPDF.convert({
          html: `<!DOCTYPE html>
          <html>
            <head>
              <meta content="PDFix SDK 6.20.0" name="creator" />
              <meta content="www.pdfix.net" name="creator-url" />
              <meta charset="UTF-8" />
              <meta content="width=device-width, initial-scale=1" name="viewport" />
              <title></title>
          
              <!-- <link href="https://cdn.tailwindcss.com" rel="stylesheet"> -->
              <link rel="preconnect" href="https://fonts.googleapis.com" />
              <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
              <link
                href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Noto+Color+Emoji&family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
                rel="stylesheet"
              />
          
              <style>
                /* body {
                  width: 98vw;
                } */
          
                h1,
                h2,
                h3,
                h4 {
                  margin: 0;
                }
          
                td {
                  padding: 8px;
                  font-size: medium;
                }
          
                /* .logo {
                  width: 30%;
                }
          
                .profile-pic {
                  height: 300px;
                } */
          
                .sr-only {
                  position: absolute;
                  width: 1px;
                  height: 1px;
                  padding: 0;
                  margin: -1px;
                  overflow: hidden;
                  clip: rect(0, 0, 0, 0);
                  white-space: nowrap;
                  border-width: 0;
                }
          
                .not-sr-only {
                  position: static;
                  width: auto;
                  height: auto;
                  padding: 0;
                  margin: 0;
                  overflow: visible;
                  clip: auto;
                  white-space: normal;
                }
                .bg-fixed {
                  background-attachment: fixed;
                }
          
                .bg-local {
                  background-attachment: local;
                }
          
                .bg-scroll {
                  background-attachment: scroll;
                }
          
                .bg-transparent {
                  background-color: transparent;
                }
          
                .bg-black {
                  background-color: #000;
                }
          
                .bg-white {
                  background-color: #fff;
                }
          
                .bg-gray-100 {
                  background-color: #f7fafc;
                }
          
                .bg-gray-200 {
                  background-color: #edf2f7;
                }
          
                .bg-gray-300 {
                  background-color: #e2e8f0;
                }
          
                .bg-gray-400 {
                  background-color: #cbd5e0;
                }
          
                .bg-gray-500 {
                  background-color: #a0aec0;
                }
          
                .bg-gray-600 {
                  background-color: #718096;
                }
          
                .bg-gray-700 {
                  background-color: #4a5568;
                }
          
                .bg-gray-800 {
                  background-color: #2d3748;
                }
          
                .bg-gray-900 {
                  background-color: #1a202c;
                }
          
                .bg-red-100 {
                  background-color: #fff5f5;
                }
          
                .bg-red-200 {
                  background-color: #fed7d7;
                }
          
                .bg-red-300 {
                  background-color: #feb2b2;
                }
          
                .bg-red-400 {
                  background-color: #fc8181;
                }
          
                .bg-red-500 {
                  background-color: #f56565;
                }
          
                .bg-red-600 {
                  background-color: #e53e3e;
                }
          
                .bg-red-700 {
                  background-color: #c53030;
                }
          
                .bg-red-800 {
                  background-color: #9b2c2c;
                }
          
                .bg-red-900 {
                  background-color: #742a2a;
                }
          
                .bg-orange-100 {
                  background-color: #fffaf0;
                }
          
                .bg-orange-200 {
                  background-color: #feebc8;
                }
          
                .bg-orange-300 {
                  background-color: #fbd38d;
                }
          
                .bg-orange-400 {
                  background-color: #f6ad55;
                }
          
                .bg-orange-500 {
                  background-color: #ed8936;
                }
          
                .bg-orange-600 {
                  background-color: #dd6b20;
                }
          
                .bg-orange-700 {
                  background-color: #c05621;
                }
          
                .bg-orange-800 {
                  background-color: #9c4221;
                }
          
                .bg-orange-900 {
                  background-color: #7b341e;
                }
          
                .bg-yellow-100 {
                  background-color: #fffff0;
                }
          
                .bg-yellow-200 {
                  background-color: #fefcbf;
                }
          
                .bg-yellow-300 {
                  background-color: #faf089;
                }
          
                .bg-yellow-400 {
                  background-color: #f6e05e;
                }
          
                .bg-yellow-500 {
                  background-color: #ecc94b;
                }
          
                .bg-yellow-600 {
                  background-color: #d69e2e;
                }
          
                .bg-yellow-700 {
                  background-color: #b7791f;
                }
          
                .bg-yellow-800 {
                  background-color: #975a16;
                }
          
                .bg-yellow-900 {
                  background-color: #744210;
                }
          
                .bg-green-100 {
                  background-color: #f0fff4;
                }
          
                .bg-green-200 {
                  background-color: #c6f6d5;
                }
          
                .bg-green-300 {
                  background-color: #9ae6b4;
                }
          
                .bg-green-400 {
                  background-color: #68d391;
                }
          
                .bg-green-500 {
                  background-color: #48bb78;
                }
          
                .bg-green-600 {
                  background-color: #38a169;
                }
          
                .bg-green-700 {
                  background-color: #2f855a;
                }
          
                .bg-green-800 {
                  background-color: #276749;
                }
          
                .bg-green-900 {
                  background-color: #22543d;
                }
          
                .bg-teal-100 {
                  background-color: #e6fffa;
                }
          
                .bg-teal-200 {
                  background-color: #b2f5ea;
                }
          
                .bg-teal-300 {
                  background-color: #81e6d9;
                }
          
                .bg-teal-400 {
                  background-color: #4fd1c5;
                }
          
                .bg-teal-500 {
                  background-color: #38b2ac;
                }
          
                .bg-teal-600 {
                  background-color: #319795;
                }
          
                .bg-teal-700 {
                  background-color: #2c7a7b;
                }
          
                .bg-teal-800 {
                  background-color: #285e61;
                }
          
                .bg-teal-900 {
                  background-color: #234e52;
                }
          
                .bg-blue-100 {
                  background-color: #ebf8ff;
                }
          
                .bg-blue-200 {
                  background-color: #bee3f8;
                }
          
                .bg-blue-300 {
                  background-color: #90cdf4;
                }
          
                .bg-blue-400 {
                  background-color: #63b3ed;
                }
          
                .bg-blue-500 {
                  background-color: #4299e1;
                }
          
                .bg-blue-600 {
                  background-color: #3182ce;
                }
          
                .bg-blue-700 {
                  background-color: #2b6cb0;
                }
          
                .bg-blue-800 {
                  background-color: #2c5282;
                }
          
                .bg-blue-900 {
                  background-color: #2a4365;
                }
          
                .bg-indigo-100 {
                  background-color: #ebf4ff;
                }
          
                .bg-indigo-200 {
                  background-color: #c3dafe;
                }
          
                .bg-indigo-300 {
                  background-color: #a3bffa;
                }
          
                .bg-indigo-400 {
                  background-color: #7f9cf5;
                }
          
                .bg-indigo-500 {
                  background-color: #667eea;
                }
          
                .bg-indigo-600 {
                  background-color: #5a67d8;
                }
          
                .bg-indigo-700 {
                  background-color: #4c51bf;
                }
          
                .bg-indigo-800 {
                  background-color: #434190;
                }
          
                .bg-indigo-900 {
                  background-color: #3c366b;
                }
          
                .bg-purple-100 {
                  background-color: #faf5ff;
                }
          
                .bg-purple-200 {
                  background-color: #e9d8fd;
                }
          
                .bg-purple-300 {
                  background-color: #d6bcfa;
                }
          
                .bg-purple-400 {
                  background-color: #b794f4;
                }
          
                .bg-purple-500 {
                  background-color: #9f7aea;
                }
          
                .bg-purple-600 {
                  background-color: #805ad5;
                }
          
                .bg-purple-700 {
                  background-color: #6b46c1;
                }
          
                .bg-purple-800 {
                  background-color: #553c9a;
                }
          
                .bg-purple-900 {
                  background-color: #44337a;
                }
          
                .bg-pink-100 {
                  background-color: #fff5f7;
                }
          
                .bg-pink-200 {
                  background-color: #fed7e2;
                }
          
                .bg-pink-300 {
                  background-color: #fbb6ce;
                }
          
                .bg-pink-400 {
                  background-color: #f687b3;
                }
          
                .bg-pink-500 {
                  background-color: #ed64a6;
                }
          
                .bg-pink-600 {
                  background-color: #d53f8c;
                }
          
                .bg-pink-700 {
                  background-color: #b83280;
                }
          
                .bg-pink-800 {
                  background-color: #97266d;
                }
          
                .bg-pink-900 {
                  background-color: #702459;
                }
                .bg-bottom {
                  background-position: bottom;
                }
          
                .bg-center {
                  background-position: center;
                }
          
                .bg-left {
                  background-position: left;
                }
          
                .bg-left-bottom {
                  background-position: left bottom;
                }
          
                .bg-left-top {
                  background-position: left top;
                }
          
                .bg-right {
                  background-position: right;
                }
          
                .bg-right-bottom {
                  background-position: right bottom;
                }
          
                .bg-right-top {
                  background-position: right top;
                }
          
                .bg-top {
                  background-position: top;
                }
          
                .bg-repeat {
                  background-repeat: repeat;
                }
          
                .bg-no-repeat {
                  background-repeat: no-repeat;
                }
          
                .bg-repeat-x {
                  background-repeat: repeat-x;
                }
          
                .bg-repeat-y {
                  background-repeat: repeat-y;
                }
          
                .bg-repeat-round {
                  background-repeat: round;
                }
          
                .bg-repeat-space {
                  background-repeat: space;
                }
          
                .bg-auto {
                  background-size: auto;
                }
          
                .bg-cover {
                  background-size: cover;
                }
          
                .bg-contain {
                  background-size: contain;
                }
          
                .border-collapse {
                  border-collapse: collapse;
                }
          
                .border-separate {
                  border-collapse: separate;
                }
          
                .border-transparent {
                  border-color: transparent;
                }
          
                .border-black {
                  border-color: #000;
                }
          
                .border-white {
                  border-color: #fff;
                }
          
                .border-gray-100 {
                  border-color: #f7fafc;
                }
          
                .border-gray-200 {
                  border-color: #edf2f7;
                }
          
                .border-gray-300 {
                  border-color: #e2e8f0;
                }
          
                .border-gray-400 {
                  border-color: #cbd5e0;
                }
          
                .border-gray-500 {
                  border-color: #a0aec0;
                }
          
                .border-gray-600 {
                  border-color: #718096;
                }
          
                .border-gray-700 {
                  border-color: #4a5568;
                }
          
                .border-gray-800 {
                  border-color: #2d3748;
                }
          
                .border-gray-900 {
                  border-color: #1a202c;
                }
          
                .border-red-100 {
                  border-color: #fff5f5;
                }
          
                .border-red-200 {
                  border-color: #fed7d7;
                }
          
                .border-red-300 {
                  border-color: #feb2b2;
                }
          
                .border-red-400 {
                  border-color: #fc8181;
                }
          
                .border-red-500 {
                  border-color: #f56565;
                }
          
                .border-red-600 {
                  border-color: #e53e3e;
                }
          
                .border-red-700 {
                  border-color: #c53030;
                }
          
                .border-red-800 {
                  border-color: #9b2c2c;
                }
          
                .border-red-900 {
                  border-color: #742a2a;
                }
          
                .border-orange-100 {
                  border-color: #fffaf0;
                }
          
                .border-orange-200 {
                  border-color: #feebc8;
                }
          
                .border-orange-300 {
                  border-color: #fbd38d;
                }
          
                .border-orange-400 {
                  border-color: #f6ad55;
                }
          
                .border-orange-500 {
                  border-color: #ed8936;
                }
          
                .border-orange-600 {
                  border-color: #dd6b20;
                }
          
                .border-orange-700 {
                  border-color: #c05621;
                }
          
                .border-orange-800 {
                  border-color: #9c4221;
                }
          
                .border-orange-900 {
                  border-color: #7b341e;
                }
          
                .border-yellow-100 {
                  border-color: #fffff0;
                }
          
                .border-yellow-200 {
                  border-color: #fefcbf;
                }
          
                .border-yellow-300 {
                  border-color: #faf089;
                }
          
                .border-yellow-400 {
                  border-color: #f6e05e;
                }
          
                .border-yellow-500 {
                  border-color: #ecc94b;
                }
          
                .border-yellow-600 {
                  border-color: #d69e2e;
                }
          
                .border-yellow-700 {
                  border-color: #b7791f;
                }
          
                .border-yellow-800 {
                  border-color: #975a16;
                }
          
                .border-yellow-900 {
                  border-color: #744210;
                }
          
                .border-green-100 {
                  border-color: #f0fff4;
                }
          
                .border-green-200 {
                  border-color: #c6f6d5;
                }
          
                .border-green-300 {
                  border-color: #9ae6b4;
                }
          
                .border-green-400 {
                  border-color: #68d391;
                }
          
                .border-green-500 {
                  border-color: #48bb78;
                }
          
                .border-green-600 {
                  border-color: #38a169;
                }
          
                .border-green-700 {
                  border-color: #2f855a;
                }
          
                .border-green-800 {
                  border-color: #276749;
                }
          
                .border-green-900 {
                  border-color: #22543d;
                }
          
                .border-teal-100 {
                  border-color: #e6fffa;
                }
          
                .border-teal-200 {
                  border-color: #b2f5ea;
                }
          
                .border-teal-300 {
                  border-color: #81e6d9;
                }
          
                .border-teal-400 {
                  border-color: #4fd1c5;
                }
          
                .border-teal-500 {
                  border-color: #38b2ac;
                }
          
                .border-teal-600 {
                  border-color: #319795;
                }
          
                .border-teal-700 {
                  border-color: #2c7a7b;
                }
          
                .border-teal-800 {
                  border-color: #285e61;
                }
          
                .border-teal-900 {
                  border-color: #234e52;
                }
          
                .border-blue-100 {
                  border-color: #ebf8ff;
                }
          
                .border-blue-200 {
                  border-color: #bee3f8;
                }
          
                .border-blue-300 {
                  border-color: #90cdf4;
                }
          
                .border-blue-400 {
                  border-color: #63b3ed;
                }
          
                .border-blue-500 {
                  border-color: #4299e1;
                }
          
                .border-blue-600 {
                  border-color: #3182ce;
                }
          
                .border-blue-700 {
                  border-color: #2b6cb0;
                }
          
                .border-blue-800 {
                  border-color: #2c5282;
                }
          
                .border-blue-900 {
                  border-color: #2a4365;
                }
          
                .border-indigo-100 {
                  border-color: #ebf4ff;
                }
          
                .border-indigo-200 {
                  border-color: #c3dafe;
                }
          
                .border-indigo-300 {
                  border-color: #a3bffa;
                }
          
                .border-indigo-400 {
                  border-color: #7f9cf5;
                }
          
                .border-indigo-500 {
                  border-color: #667eea;
                }
          
                .border-indigo-600 {
                  border-color: #5a67d8;
                }
          
                .border-indigo-700 {
                  border-color: #4c51bf;
                }
          
                .border-indigo-800 {
                  border-color: #434190;
                }
          
                .border-indigo-900 {
                  border-color: #3c366b;
                }
          
                .border-purple-100 {
                  border-color: #faf5ff;
                }
          
                .border-purple-200 {
                  border-color: #e9d8fd;
                }
          
                .border-purple-300 {
                  border-color: #d6bcfa;
                }
          
                .border-purple-400 {
                  border-color: #b794f4;
                }
          
                .border-purple-500 {
                  border-color: #9f7aea;
                }
          
                .border-purple-600 {
                  border-color: #805ad5;
                }
          
                .border-purple-700 {
                  border-color: #6b46c1;
                }
          
                .border-purple-800 {
                  border-color: #553c9a;
                }
          
                .border-purple-900 {
                  border-color: #44337a;
                }
          
                .border-pink-100 {
                  border-color: #fff5f7;
                }
          
                .border-pink-200 {
                  border-color: #fed7e2;
                }
          
                .border-pink-300 {
                  border-color: #fbb6ce;
                }
          
                .border-pink-400 {
                  border-color: #f687b3;
                }
          
                .border-pink-500 {
                  border-color: #ed64a6;
                }
          
                .border-pink-600 {
                  border-color: #d53f8c;
                }
          
                .border-pink-700 {
                  border-color: #b83280;
                }
          
                .border-pink-800 {
                  border-color: #97266d;
                }
          
                .border-pink-900 {
                  border-color: #702459;
                }
                .rounded-none {
                  border-radius: 0;
                }
          
                .rounded-sm {
                  border-radius: 0.125rem;
                }
          
                .rounded {
                  border-radius: 0.25rem;
                }
          
                .rounded-lg {
                  border-radius: 0.5rem;
                }
          
                .rounded-full {
                  border-radius: 9999px;
                }
          
                .rounded-t-none {
                  border-top-left-radius: 0;
                  border-top-right-radius: 0;
                }
          
                .rounded-r-none {
                  border-top-right-radius: 0;
                  border-bottom-right-radius: 0;
                }
          
                .rounded-b-none {
                  border-bottom-right-radius: 0;
                  border-bottom-left-radius: 0;
                }
          
                .rounded-l-none {
                  border-top-left-radius: 0;
                  border-bottom-left-radius: 0;
                }
          
                .rounded-t-sm {
                  border-top-left-radius: 0.125rem;
                  border-top-right-radius: 0.125rem;
                }
          
                .rounded-r-sm {
                  border-top-right-radius: 0.125rem;
                  border-bottom-right-radius: 0.125rem;
                }
          
                .rounded-b-sm {
                  border-bottom-right-radius: 0.125rem;
                  border-bottom-left-radius: 0.125rem;
                }
          
                .rounded-l-sm {
                  border-top-left-radius: 0.125rem;
                  border-bottom-left-radius: 0.125rem;
                }
          
                .rounded-t {
                  border-top-left-radius: 0.25rem;
                  border-top-right-radius: 0.25rem;
                }
          
                .rounded-r {
                  border-top-right-radius: 0.25rem;
                  border-bottom-right-radius: 0.25rem;
                }
          
                .rounded-b {
                  border-bottom-right-radius: 0.25rem;
                  border-bottom-left-radius: 0.25rem;
                }
          
                .rounded-l {
                  border-top-left-radius: 0.25rem;
                  border-bottom-left-radius: 0.25rem;
                }
          
                .rounded-t-lg {
                  border-top-left-radius: 0.5rem;
                  border-top-right-radius: 0.5rem;
                }
          
                .rounded-r-lg {
                  border-top-right-radius: 0.5rem;
                  border-bottom-right-radius: 0.5rem;
                }
          
                .rounded-b-lg {
                  border-bottom-right-radius: 0.5rem;
                  border-bottom-left-radius: 0.5rem;
                }
          
                .rounded-l-lg {
                  border-top-left-radius: 0.5rem;
                  border-bottom-left-radius: 0.5rem;
                }
          
                .rounded-t-full {
                  border-top-left-radius: 9999px;
                  border-top-right-radius: 9999px;
                }
          
                .rounded-r-full {
                  border-top-right-radius: 9999px;
                  border-bottom-right-radius: 9999px;
                }
          
                .rounded-b-full {
                  border-bottom-right-radius: 9999px;
                  border-bottom-left-radius: 9999px;
                }
          
                .rounded-l-full {
                  border-top-left-radius: 9999px;
                  border-bottom-left-radius: 9999px;
                }
          
                .rounded-tl-none {
                  border-top-left-radius: 0;
                }
          
                .rounded-tr-none {
                  border-top-right-radius: 0;
                }
          
                .rounded-br-none {
                  border-bottom-right-radius: 0;
                }
          
                .rounded-bl-none {
                  border-bottom-left-radius: 0;
                }
          
                .rounded-tl-sm {
                  border-top-left-radius: 0.125rem;
                }
          
                .rounded-tr-sm {
                  border-top-right-radius: 0.125rem;
                }
          
                .rounded-br-sm {
                  border-bottom-right-radius: 0.125rem;
                }
          
                .rounded-bl-sm {
                  border-bottom-left-radius: 0.125rem;
                }
          
                .rounded-tl {
                  border-top-left-radius: 0.25rem;
                }
          
                .rounded-tr {
                  border-top-right-radius: 0.25rem;
                }
          
                .rounded-br {
                  border-bottom-right-radius: 0.25rem;
                }
          
                .rounded-bl {
                  border-bottom-left-radius: 0.25rem;
                }
          
                .rounded-tl-lg {
                  border-top-left-radius: 0.5rem;
                }
          
                .rounded-tr-lg {
                  border-top-right-radius: 0.5rem;
                }
          
                .rounded-br-lg {
                  border-bottom-right-radius: 0.5rem;
                }
          
                .rounded-bl-lg {
                  border-bottom-left-radius: 0.5rem;
                }
          
                .rounded-tl-full {
                  border-top-left-radius: 9999px;
                }
          
                .rounded-tr-full {
                  border-top-right-radius: 9999px;
                }
          
                .rounded-br-full {
                  border-bottom-right-radius: 9999px;
                }
          
                .rounded-bl-full {
                  border-bottom-left-radius: 9999px;
                }
          
                .border-solid {
                  border-style: solid;
                }
          
                .border-dashed {
                  border-style: dashed;
                }
          
                .border-dotted {
                  border-style: dotted;
                }
          
                .border-double {
                  border-style: double;
                }
          
                .border-none {
                  border-style: none;
                }
          
                .border-0 {
                  border-width: 0;
                }
          
                .border-2 {
                  border-width: 2px;
                }
          
                .border-4 {
                  border-width: 4px;
                }
          
                .border-8 {
                  border-width: 8px;
                }
          
                .border {
                  border-width: 1px;
                }
          
                .border-t-0 {
                  border-top-width: 0;
                }
          
                .border-r-0 {
                  border-right-width: 0;
                }
          
                .border-b-0 {
                  border-bottom-width: 0;
                }
          
                .border-l-0 {
                  border-left-width: 0;
                }
          
                .border-t-2 {
                  border-top-width: 2px;
                }
          
                .border-r-2 {
                  border-right-width: 2px;
                }
          
                .border-b-2 {
                  border-bottom-width: 2px;
                }
          
                .border-l-2 {
                  border-left-width: 2px;
                }
          
                .border-t-4 {
                  border-top-width: 4px;
                }
          
                .border-r-4 {
                  border-right-width: 4px;
                }
          
                .border-b-4 {
                  border-bottom-width: 4px;
                }
          
                .border-l-4 {
                  border-left-width: 4px;
                }
          
                .border-t-8 {
                  border-top-width: 8px;
                }
          
                .border-r-8 {
                  border-right-width: 8px;
                }
          
                .border-b-8 {
                  border-bottom-width: 8px;
                }
          
                .border-l-8 {
                  border-left-width: 8px;
                }
          
                .border-t {
                  border-top-width: 1px;
                }
          
                .border-r {
                  border-right-width: 1px;
                }
          
                .border-b {
                  border-bottom-width: 1px;
                }
          
                .border-l {
                  border-left-width: 1px;
                }
          
                .cursor-auto {
                  cursor: auto;
                }
          
                .cursor-default {
                  cursor: default;
                }
          
                .cursor-pointer {
                  cursor: pointer;
                }
          
                .cursor-wait {
                  cursor: wait;
                }
          
                .cursor-text {
                  cursor: text;
                }
          
                .cursor-move {
                  cursor: move;
                }
          
                .cursor-not-allowed {
                  cursor: not-allowed;
                }
          
                .block {
                  display: block;
                }
          
                .inline-block {
                  display: inline-block;
                }
          
                .inline {
                  display: inline;
                }
          
                .flex {
                  display: -webkit-box;
                  display: flex;
                }
          
                .inline-flex {
                  display: -webkit-inline-box;
                  display: inline-flex;
                }
          
                .table {
                  display: table;
                }
          
                .table-row {
                  display: table-row;
                }
          
                .table-cell {
                  display: table-cell;
                }
          
                .hidden {
                  display: none;
                }
          
                .flex-row {
                  -webkit-box-orient: horizontal;
                  -webkit-box-direction: normal;
                  flex-direction: row;
                }
          
                .flex-row-reverse {
                  -webkit-box-orient: horizontal;
                  -webkit-box-direction: reverse;
                  flex-direction: row-reverse;
                }
          
                .flex-col {
                  -webkit-box-orient: vertical;
                  -webkit-box-direction: normal;
                  flex-direction: column;
                }
          
                .flex-col-reverse {
                  -webkit-box-orient: vertical;
                  -webkit-box-direction: reverse;
                  flex-direction: column-reverse;
                }
          
                .flex-wrap {
                  flex-wrap: wrap;
                }
          
                .flex-wrap-reverse {
                  flex-wrap: wrap-reverse;
                }
          
                .flex-no-wrap {
                  flex-wrap: nowrap;
                }
          
                .items-start {
                  -webkit-box-align: start;
                  align-items: flex-start;
                }
          
                .items-end {
                  -webkit-box-align: end;
                  align-items: flex-end;
                }
          
                .items-center {
                  -webkit-box-align: center;
                  align-items: center;
                }
          
                .items-baseline {
                  -webkit-box-align: baseline;
                  align-items: baseline;
                }
          
                .items-stretch {
                  -webkit-box-align: stretch;
                  align-items: stretch;
                }
          
                .self-auto {
                  align-self: auto;
                }
          
                .self-start {
                  align-self: flex-start;
                }
          
                .self-end {
                  align-self: flex-end;
                }
          
                .self-center {
                  align-self: center;
                }
          
                .self-stretch {
                  align-self: stretch;
                }
          
                .justify-start {
                  -webkit-box-pack: start;
                  justify-content: flex-start;
                }
          
                .justify-end {
                  -webkit-box-pack: end;
                  justify-content: flex-end;
                }
          
                .justify-center {
                  -webkit-box-pack: center;
                  justify-content: center;
                }
          
                .justify-between {
                  -webkit-box-pack: justify;
                  justify-content: space-between;
                }
          
                .justify-around {
                  justify-content: space-around;
                }
          
                .content-center {
                  align-content: center;
                }
          
                .content-start {
                  align-content: flex-start;
                }
          
                .content-end {
                  align-content: flex-end;
                }
          
                .content-between {
                  align-content: space-between;
                }
          
                .content-around {
                  align-content: space-around;
                }
          
                .flex-1 {
                  -webkit-box-flex: 1;
                  flex: 1 1 0%;
                }
          
                .flex-auto {
                  -webkit-box-flex: 1;
                  flex: 1 1 auto;
                }
          
                .flex-initial {
                  -webkit-box-flex: 0;
                  flex: 0 1 auto;
                }
          
                .flex-none {
                  -webkit-box-flex: 0;
                  flex: none;
                }
          
                .flex-grow-0 {
                  -webkit-box-flex: 0;
                  flex-grow: 0;
                }
          
                .flex-grow {
                  -webkit-box-flex: 1;
                  flex-grow: 1;
                }
          
                .flex-shrink-0 {
                  flex-shrink: 0;
                }
          
                .flex-shrink {
                  flex-shrink: 1;
                }
          
                .order-1 {
                  -webkit-box-ordinal-group: 2;
                  order: 1;
                }
          
                .order-2 {
                  -webkit-box-ordinal-group: 3;
                  order: 2;
                }
          
                .order-3 {
                  -webkit-box-ordinal-group: 4;
                  order: 3;
                }
          
                .order-4 {
                  -webkit-box-ordinal-group: 5;
                  order: 4;
                }
          
                .order-5 {
                  -webkit-box-ordinal-group: 6;
                  order: 5;
                }
          
                .order-6 {
                  -webkit-box-ordinal-group: 7;
                  order: 6;
                }
          
                .order-7 {
                  -webkit-box-ordinal-group: 8;
                  order: 7;
                }
          
                .order-8 {
                  -webkit-box-ordinal-group: 9;
                  order: 8;
                }
          
                .order-9 {
                  -webkit-box-ordinal-group: 10;
                  order: 9;
                }
          
                .order-10 {
                  -webkit-box-ordinal-group: 11;
                  order: 10;
                }
          
                .order-11 {
                  -webkit-box-ordinal-group: 12;
                  order: 11;
                }
          
                .order-12 {
                  -webkit-box-ordinal-group: 13;
                  order: 12;
                }
          
                .order-first {
                  -webkit-box-ordinal-group: -9998;
                  order: -9999;
                }
          
                .order-last {
                  -webkit-box-ordinal-group: 10000;
                  order: 9999;
                }
          
                .order-none {
                  -webkit-box-ordinal-group: 1;
                  order: 0;
                }
          
                .float-right {
                  float: right;
                }
          
                .float-left {
                  float: left;
                }
          
                .float-none {
                  float: none;
                }
          
                .clearfix:after {
                  content: "";
                  display: table;
                  clear: both;
                }
          
                .font-sans {
                  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
                    "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
                    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
                }
          
                .font-serif {
                  font-family: Georgia, Cambria, "Times New Roman", Times, serif;
                }
          
                .font-mono {
                  font-family: Menlo, Monaco, Consolas, "Liberation Mono", "Courier New",
                    monospace;
                }
          
                .font-hairline {
                  font-weight: 100;
                }
          
                .font-thin {
                  font-weight: 200;
                }
          
                .font-light {
                  font-weight: 300;
                }
          
                .font-normal {
                  font-weight: 400;
                }
          
                .font-medium {
                  font-weight: 500;
                }
          
                .font-semibold {
                  font-weight: 600;
                }
          
                .font-bold {
                  font-weight: 700;
                }
          
                .font-extrabold {
                  font-weight: 800;
                }
          
                .font-black {
                  font-weight: 900;
                }
          
                .h-0 {
                  height: 0;
                }
          
                .h-1 {
                  height: 0.25rem;
                }
          
                .h-2 {
                  height: 0.5rem;
                }
          
                .h-3 {
                  height: 0.75rem;
                }
          
                .h-4 {
                  height: 1rem;
                }
          
                .h-5 {
                  height: 1.25rem;
                }
          
                .h-6 {
                  height: 1.5rem;
                }
          
                .h-8 {
                  height: 2rem;
                }
          
                .h-10 {
                  height: 2.5rem;
                }
          
                .h-12 {
                  height: 3rem;
                }
          
                .h-16 {
                  height: 4rem;
                }
          
                .h-20 {
                  height: 5rem;
                }
          
                .h-24 {
                  height: 6rem;
                }
          
                .h-32 {
                  height: 8rem;
                }
          
                .h-40 {
                  height: 10rem;
                }
          
                .h-48 {
                  height: 12rem;
                }
          
                .h-56 {
                  height: 14rem;
                }
          
                .h-64 {
                  height: 16rem;
                }
          
                .h-auto {
                  height: auto;
                }
          
                .h-px {
                  height: 1px;
                }
          
                .h-full {
                  height: 100%;
                }
          
                .h-screen {
                  height: 100vh;
                }
          
                .leading-none {
                  line-height: 1;
                }
          
                .leading-tight {
                  line-height: 1.25;
                }
          
                .leading-snug {
                  line-height: 1.375;
                }
          
                .leading-normal {
                  line-height: 1.5;
                }
          
                .leading-relaxed {
                  line-height: 1.625;
                }
          
                .leading-loose {
                  line-height: 2;
                }
          
                .list-inside {
                  list-style-position: inside;
                }
          
                .list-outside {
                  list-style-position: outside;
                }
          
                .list-none {
                  list-style-type: none;
                }
          
                .list-disc {
                  list-style-type: disc;
                }
          
                .list-decimal {
                  list-style-type: decimal;
                }
          
                .m-0 {
                  margin: 0;
                }
          
                .m-1 {
                  margin: 0.25rem;
                }
          
                .m-2 {
                  margin: 0.5rem;
                }
          
                .m-3 {
                  margin: 0.75rem;
                }
          
                .m-4 {
                  margin: 1rem;
                }
          
                .m-5 {
                  margin: 1.25rem;
                }
          
                .m-6 {
                  margin: 1.5rem;
                }
          
                .m-8 {
                  margin: 2rem;
                }
          
                .m-10 {
                  margin: 2.5rem;
                }
          
                .m-12 {
                  margin: 3rem;
                }
          
                .m-16 {
                  margin: 4rem;
                }
          
                .m-20 {
                  margin: 5rem;
                }
          
                .m-24 {
                  margin: 6rem;
                }
          
                .m-32 {
                  margin: 8rem;
                }
          
                .m-40 {
                  margin: 10rem;
                }
          
                .m-48 {
                  margin: 12rem;
                }
          
                .m-56 {
                  margin: 14rem;
                }
          
                .m-64 {
                  margin: 16rem;
                }
          
                .m-auto {
                  margin: auto;
                }
          
                .m-px {
                  margin: 1px;
                }
          
                .-m-1 {
                  margin: -0.25rem;
                }
          
                .-m-2 {
                  margin: -0.5rem;
                }
          
                .-m-3 {
                  margin: -0.75rem;
                }
          
                .-m-4 {
                  margin: -1rem;
                }
          
                .-m-5 {
                  margin: -1.25rem;
                }
          
                .-m-6 {
                  margin: -1.5rem;
                }
          
                .-m-8 {
                  margin: -2rem;
                }
          
                .-m-10 {
                  margin: -2.5rem;
                }
          
                .-m-12 {
                  margin: -3rem;
                }
          
                .-m-16 {
                  margin: -4rem;
                }
          
                .-m-20 {
                  margin: -5rem;
                }
          
                .-m-24 {
                  margin: -6rem;
                }
          
                .-m-32 {
                  margin: -8rem;
                }
          
                .-m-40 {
                  margin: -10rem;
                }
          
                .-m-48 {
                  margin: -12rem;
                }
          
                .-m-56 {
                  margin: -14rem;
                }
          
                .-m-64 {
                  margin: -16rem;
                }
          
                .-m-px {
                  margin: -1px;
                }
          
                .my-0 {
                  margin-top: 0;
                  margin-bottom: 0;
                }
          
                .mx-0 {
                  margin-left: 0;
                  margin-right: 0;
                }
          
                .my-1 {
                  margin-top: 0.25rem;
                  margin-bottom: 0.25rem;
                }
          
                .mx-1 {
                  margin-left: 0.25rem;
                  margin-right: 0.25rem;
                }
          
                .my-2 {
                  margin-top: 0.5rem;
                  margin-bottom: 0.5rem;
                }
          
                .mx-2 {
                  margin-left: 0.5rem;
                  margin-right: 0.5rem;
                }
          
                .my-3 {
                  margin-top: 0.75rem;
                  margin-bottom: 0.75rem;
                }
          
                .mx-3 {
                  margin-left: 0.75rem;
                  margin-right: 0.75rem;
                }
          
                .my-4 {
                  margin-top: 1rem;
                  margin-bottom: 1rem;
                }
          
                .mx-4 {
                  margin-left: 1rem;
                  margin-right: 1rem;
                }
          
                .my-5 {
                  margin-top: 1.25rem;
                  margin-bottom: 1.25rem;
                }
          
                .mx-5 {
                  margin-left: 1.25rem;
                  margin-right: 1.25rem;
                }
          
                .my-6 {
                  margin-top: 1.5rem;
                  margin-bottom: 1.5rem;
                }
          
                .mx-6 {
                  margin-left: 1.5rem;
                  margin-right: 1.5rem;
                }
          
                .my-8 {
                  margin-top: 2rem;
                  margin-bottom: 2rem;
                }
          
                .mx-8 {
                  margin-left: 2rem;
                  margin-right: 2rem;
                }
          
                .my-10 {
                  margin-top: 2.5rem;
                  margin-bottom: 2.5rem;
                }
          
                .mx-10 {
                  margin-left: 2.5rem;
                  margin-right: 2.5rem;
                }
          
                .my-12 {
                  margin-top: 3rem;
                  margin-bottom: 3rem;
                }
          
                .mx-12 {
                  margin-left: 3rem;
                  margin-right: 3rem;
                }
          
                .my-16 {
                  margin-top: 4rem;
                  margin-bottom: 4rem;
                }
          
                .mx-16 {
                  margin-left: 4rem;
                  margin-right: 4rem;
                }
          
                .my-20 {
                  margin-top: 5rem;
                  margin-bottom: 5rem;
                }
          
                .mx-20 {
                  margin-left: 5rem;
                  margin-right: 5rem;
                }
          
                .my-24 {
                  margin-top: 6rem;
                  margin-bottom: 6rem;
                }
          
                .mx-24 {
                  margin-left: 6rem;
                  margin-right: 6rem;
                }
          
                .my-32 {
                  margin-top: 8rem;
                  margin-bottom: 8rem;
                }
          
                .mx-32 {
                  margin-left: 8rem;
                  margin-right: 8rem;
                }
          
                .my-40 {
                  margin-top: 10rem;
                  margin-bottom: 10rem;
                }
          
                .mx-40 {
                  margin-left: 10rem;
                  margin-right: 10rem;
                }
          
                .my-48 {
                  margin-top: 12rem;
                  margin-bottom: 12rem;
                }
          
                .mx-48 {
                  margin-left: 12rem;
                  margin-right: 12rem;
                }
          
                .my-56 {
                  margin-top: 14rem;
                  margin-bottom: 14rem;
                }
          
                .mx-56 {
                  margin-left: 14rem;
                  margin-right: 14rem;
                }
          
                .my-64 {
                  margin-top: 16rem;
                  margin-bottom: 16rem;
                }
          
                .mx-64 {
                  margin-left: 16rem;
                  margin-right: 16rem;
                }
          
                .my-auto {
                  margin-top: auto;
                  margin-bottom: auto;
                }
          
                .mx-auto {
                  margin-left: auto;
                  margin-right: auto;
                }
          
                .my-px {
                  margin-top: 1px;
                  margin-bottom: 1px;
                }
          
                .mx-px {
                  margin-left: 1px;
                  margin-right: 1px;
                }
          
                .-my-1 {
                  margin-top: -0.25rem;
                  margin-bottom: -0.25rem;
                }
          
                .-mx-1 {
                  margin-left: -0.25rem;
                  margin-right: -0.25rem;
                }
          
                .-my-2 {
                  margin-top: -0.5rem;
                  margin-bottom: -0.5rem;
                }
          
                .-mx-2 {
                  margin-left: -0.5rem;
                  margin-right: -0.5rem;
                }
          
                .-my-3 {
                  margin-top: -0.75rem;
                  margin-bottom: -0.75rem;
                }
          
                .-mx-3 {
                  margin-left: -0.75rem;
                  margin-right: -0.75rem;
                }
          
                .-my-4 {
                  margin-top: -1rem;
                  margin-bottom: -1rem;
                }
          
                .-mx-4 {
                  margin-left: -1rem;
                  margin-right: -1rem;
                }
          
                .-my-5 {
                  margin-top: -1.25rem;
                  margin-bottom: -1.25rem;
                }
          
                .-mx-5 {
                  margin-left: -1.25rem;
                  margin-right: -1.25rem;
                }
          
                .-my-6 {
                  margin-top: -1.5rem;
                  margin-bottom: -1.5rem;
                }
          
                .-mx-6 {
                  margin-left: -1.5rem;
                  margin-right: -1.5rem;
                }
          
                .-my-8 {
                  margin-top: -2rem;
                  margin-bottom: -2rem;
                }
          
                .-mx-8 {
                  margin-left: -2rem;
                  margin-right: -2rem;
                }
          
                .-my-10 {
                  margin-top: -2.5rem;
                  margin-bottom: -2.5rem;
                }
          
                .-mx-10 {
                  margin-left: -2.5rem;
                  margin-right: -2.5rem;
                }
          
                .-my-12 {
                  margin-top: -3rem;
                  margin-bottom: -3rem;
                }
          
                .-mx-12 {
                  margin-left: -3rem;
                  margin-right: -3rem;
                }
          
                .-my-16 {
                  margin-top: -4rem;
                  margin-bottom: -4rem;
                }
          
                .-mx-16 {
                  margin-left: -4rem;
                  margin-right: -4rem;
                }
          
                .-my-20 {
                  margin-top: -5rem;
                  margin-bottom: -5rem;
                }
          
                .-mx-20 {
                  margin-left: -5rem;
                  margin-right: -5rem;
                }
          
                .-my-24 {
                  margin-top: -6rem;
                  margin-bottom: -6rem;
                }
          
                .-mx-24 {
                  margin-left: -6rem;
                  margin-right: -6rem;
                }
          
                .-my-32 {
                  margin-top: -8rem;
                  margin-bottom: -8rem;
                }
          
                .-mx-32 {
                  margin-left: -8rem;
                  margin-right: -8rem;
                }
          
                .-my-40 {
                  margin-top: -10rem;
                  margin-bottom: -10rem;
                }
          
                .-mx-40 {
                  margin-left: -10rem;
                  margin-right: -10rem;
                }
          
                .-my-48 {
                  margin-top: -12rem;
                  margin-bottom: -12rem;
                }
          
                .-mx-48 {
                  margin-left: -12rem;
                  margin-right: -12rem;
                }
          
                .-my-56 {
                  margin-top: -14rem;
                  margin-bottom: -14rem;
                }
          
                .-mx-56 {
                  margin-left: -14rem;
                  margin-right: -14rem;
                }
          
                .-my-64 {
                  margin-top: -16rem;
                  margin-bottom: -16rem;
                }
          
                .-mx-64 {
                  margin-left: -16rem;
                  margin-right: -16rem;
                }
          
                .-my-px {
                  margin-top: -1px;
                  margin-bottom: -1px;
                }
          
                .-mx-px {
                  margin-left: -1px;
                  margin-right: -1px;
                }
          
                .mt-0 {
                  margin-top: 0;
                }
          
                .mr-0 {
                  margin-right: 0;
                }
          
                .mb-0 {
                  margin-bottom: 0;
                }
          
                .ml-0 {
                  margin-left: 0;
                }
          
                .mt-1 {
                  margin-top: 0.25rem;
                }
          
                .mr-1 {
                  margin-right: 0.25rem;
                }
          
                .mb-1 {
                  margin-bottom: 0.25rem;
                }
          
                .ml-1 {
                  margin-left: 0.25rem;
                }
          
                .mt-2 {
                  margin-top: 0.5rem;
                }
          
                .mr-2 {
                  margin-right: 0.5rem;
                }
          
                .mb-2 {
                  margin-bottom: 0.5rem;
                }
          
                .ml-2 {
                  margin-left: 0.5rem;
                }
          
                .mt-3 {
                  margin-top: 0.75rem;
                }
          
                .mr-3 {
                  margin-right: 0.75rem;
                }
          
                .mb-3 {
                  margin-bottom: 0.75rem;
                }
          
                .ml-3 {
                  margin-left: 0.75rem;
                }
          
                .mt-4 {
                  margin-top: 1rem;
                }
          
                .mr-4 {
                  margin-right: 1rem;
                }
          
                .mb-4 {
                  margin-bottom: 1rem;
                }
          
                .ml-4 {
                  margin-left: 1rem;
                }
          
                .mt-5 {
                  margin-top: 1.25rem;
                }
          
                .mr-5 {
                  margin-right: 1.25rem;
                }
          
                .mb-5 {
                  margin-bottom: 1.25rem;
                }
          
                .ml-5 {
                  margin-left: 1.25rem;
                }
          
                .mt-6 {
                  margin-top: 1.5rem;
                }
          
                .mr-6 {
                  margin-right: 1.5rem;
                }
          
                .mb-6 {
                  margin-bottom: 1.5rem;
                }
          
                .ml-6 {
                  margin-left: 1.5rem;
                }
          
                .mt-8 {
                  margin-top: 2rem;
                }
          
                .mr-8 {
                  margin-right: 2rem;
                }
          
                .mb-8 {
                  margin-bottom: 2rem;
                }
          
                .ml-8 {
                  margin-left: 2rem;
                }
          
                .mt-10 {
                  margin-top: 2.5rem;
                }
          
                .mr-10 {
                  margin-right: 2.5rem;
                }
          
                .mb-10 {
                  margin-bottom: 2.5rem;
                }
          
                .ml-10 {
                  margin-left: 2.5rem;
                }
          
                .mt-12 {
                  margin-top: 3rem;
                }
          
                .mr-12 {
                  margin-right: 3rem;
                }
          
                .mb-12 {
                  margin-bottom: 3rem;
                }
          
                .ml-12 {
                  margin-left: 3rem;
                }
          
                .mt-16 {
                  margin-top: 4rem;
                }
          
                .mr-16 {
                  margin-right: 4rem;
                }
          
                .mb-16 {
                  margin-bottom: 4rem;
                }
          
                .ml-16 {
                  margin-left: 4rem;
                }
          
                .mt-20 {
                  margin-top: 5rem;
                }
          
                .mr-20 {
                  margin-right: 5rem;
                }
          
                .mb-20 {
                  margin-bottom: 5rem;
                }
          
                .ml-20 {
                  margin-left: 5rem;
                }
          
                .mt-24 {
                  margin-top: 6rem;
                }
          
                .mr-24 {
                  margin-right: 6rem;
                }
          
                .mb-24 {
                  margin-bottom: 6rem;
                }
          
                .ml-24 {
                  margin-left: 6rem;
                }
          
                .mt-32 {
                  margin-top: 8rem;
                }
          
                .mr-32 {
                  margin-right: 8rem;
                }
          
                .mb-32 {
                  margin-bottom: 8rem;
                }
          
                .ml-32 {
                  margin-left: 8rem;
                }
          
                .mt-40 {
                  margin-top: 10rem;
                }
          
                .mr-40 {
                  margin-right: 10rem;
                }
          
                .mb-40 {
                  margin-bottom: 10rem;
                }
          
                .ml-40 {
                  margin-left: 10rem;
                }
          
                .mt-48 {
                  margin-top: 12rem;
                }
          
                .mr-48 {
                  margin-right: 12rem;
                }
          
                .mb-48 {
                  margin-bottom: 12rem;
                }
          
                .ml-48 {
                  margin-left: 12rem;
                }
          
                .mt-56 {
                  margin-top: 14rem;
                }
          
                .mr-56 {
                  margin-right: 14rem;
                }
          
                .mb-56 {
                  margin-bottom: 14rem;
                }
          
                .ml-56 {
                  margin-left: 14rem;
                }
          
                .mt-64 {
                  margin-top: 16rem;
                }
          
                .mr-64 {
                  margin-right: 16rem;
                }
          
                .mb-64 {
                  margin-bottom: 16rem;
                }
          
                .ml-64 {
                  margin-left: 16rem;
                }
          
                .mt-auto {
                  margin-top: auto;
                }
          
                .mr-auto {
                  margin-right: auto;
                }
          
                .mb-auto {
                  margin-bottom: auto;
                }
          
                .ml-auto {
                  margin-left: auto;
                }
          
                .mt-px {
                  margin-top: 1px;
                }
          
                .mr-px {
                  margin-right: 1px;
                }
          
                .mb-px {
                  margin-bottom: 1px;
                }
          
                .ml-px {
                  margin-left: 1px;
                }
          
                .-mt-1 {
                  margin-top: -0.25rem;
                }
          
                .-mr-1 {
                  margin-right: -0.25rem;
                }
          
                .-mb-1 {
                  margin-bottom: -0.25rem;
                }
          
                .-ml-1 {
                  margin-left: -0.25rem;
                }
          
                .-mt-2 {
                  margin-top: -0.5rem;
                }
          
                .-mr-2 {
                  margin-right: -0.5rem;
                }
          
                .-mb-2 {
                  margin-bottom: -0.5rem;
                }
          
                .-ml-2 {
                  margin-left: -0.5rem;
                }
          
                .-mt-3 {
                  margin-top: -0.75rem;
                }
          
                .-mr-3 {
                  margin-right: -0.75rem;
                }
          
                .-mb-3 {
                  margin-bottom: -0.75rem;
                }
          
                .-ml-3 {
                  margin-left: -0.75rem;
                }
          
                .-mt-4 {
                  margin-top: -1rem;
                }
          
                .-mr-4 {
                  margin-right: -1rem;
                }
          
                .-mb-4 {
                  margin-bottom: -1rem;
                }
          
                .-ml-4 {
                  margin-left: -1rem;
                }
          
                .-mt-5 {
                  margin-top: -1.25rem;
                }
          
                .-mr-5 {
                  margin-right: -1.25rem;
                }
          
                .-mb-5 {
                  margin-bottom: -1.25rem;
                }
          
                .-ml-5 {
                  margin-left: -1.25rem;
                }
          
                .-mt-6 {
                  margin-top: -1.5rem;
                }
          
                .-mr-6 {
                  margin-right: -1.5rem;
                }
          
                .-mb-6 {
                  margin-bottom: -1.5rem;
                }
          
                .-ml-6 {
                  margin-left: -1.5rem;
                }
          
                .-mt-8 {
                  margin-top: -2rem;
                }
          
                .-mr-8 {
                  margin-right: -2rem;
                }
          
                .-mb-8 {
                  margin-bottom: -2rem;
                }
          
                .-ml-8 {
                  margin-left: -2rem;
                }
          
                .-mt-10 {
                  margin-top: -2.5rem;
                }
          
                .-mr-10 {
                  margin-right: -2.5rem;
                }
          
                .-mb-10 {
                  margin-bottom: -2.5rem;
                }
          
                .-ml-10 {
                  margin-left: -2.5rem;
                }
          
                .-mt-12 {
                  margin-top: -3rem;
                }
          
                .-mr-12 {
                  margin-right: -3rem;
                }
          
                .-mb-12 {
                  margin-bottom: -3rem;
                }
          
                .-ml-12 {
                  margin-left: -3rem;
                }
          
                .-mt-16 {
                  margin-top: -4rem;
                }
          
                .-mr-16 {
                  margin-right: -4rem;
                }
          
                .-mb-16 {
                  margin-bottom: -4rem;
                }
          
                .-ml-16 {
                  margin-left: -4rem;
                }
          
                .-mt-20 {
                  margin-top: -5rem;
                }
          
                .-mr-20 {
                  margin-right: -5rem;
                }
          
                .-mb-20 {
                  margin-bottom: -5rem;
                }
          
                .-ml-20 {
                  margin-left: -5rem;
                }
          
                .-mt-24 {
                  margin-top: -6rem;
                }
          
                .-mr-24 {
                  margin-right: -6rem;
                }
          
                .-mb-24 {
                  margin-bottom: -6rem;
                }
          
                .-ml-24 {
                  margin-left: -6rem;
                }
          
                .-mt-32 {
                  margin-top: -8rem;
                }
          
                .-mr-32 {
                  margin-right: -8rem;
                }
          
                .-mb-32 {
                  margin-bottom: -8rem;
                }
          
                .-ml-32 {
                  margin-left: -8rem;
                }
          
                .-mt-40 {
                  margin-top: -10rem;
                }
          
                .-mr-40 {
                  margin-right: -10rem;
                }
          
                .-mb-40 {
                  margin-bottom: -10rem;
                }
          
                .-ml-40 {
                  margin-left: -10rem;
                }
          
                .-mt-48 {
                  margin-top: -12rem;
                }
          
                .-mr-48 {
                  margin-right: -12rem;
                }
          
                .-mb-48 {
                  margin-bottom: -12rem;
                }
          
                .-ml-48 {
                  margin-left: -12rem;
                }
          
                .-mt-56 {
                  margin-top: -14rem;
                }
          
                .-mr-56 {
                  margin-right: -14rem;
                }
          
                .-mb-56 {
                  margin-bottom: -14rem;
                }
          
                .-ml-56 {
                  margin-left: -14rem;
                }
          
                .-mt-64 {
                  margin-top: -16rem;
                }
          
                .-mr-64 {
                  margin-right: -16rem;
                }
          
                .-mb-64 {
                  margin-bottom: -16rem;
                }
          
                .-ml-64 {
                  margin-left: -16rem;
                }
          
                .-mt-px {
                  margin-top: -1px;
                }
          
                .-mr-px {
                  margin-right: -1px;
                }
          
                .-mb-px {
                  margin-bottom: -1px;
                }
          
                .-ml-px {
                  margin-left: -1px;
                }
          
                .max-h-full {
                  max-height: 100%;
                }
          
                .max-h-screen {
                  max-height: 100vh;
                }
          
                .max-w-xs {
                  max-width: 20rem;
                }
          
                .max-w-sm {
                  max-width: 24rem;
                }
          
                .max-w-md {
                  max-width: 28rem;
                }
          
                .max-w-lg {
                  max-width: 32rem;
                }
          
                .max-w-xl {
                  max-width: 36rem;
                }
          
                .max-w-2xl {
                  max-width: 42rem;
                }
          
                .max-w-3xl {
                  max-width: 48rem;
                }
          
                .max-w-4xl {
                  max-width: 56rem;
                }
          
                .max-w-5xl {
                  max-width: 64rem;
                }
          
                .max-w-6xl {
                  max-width: 72rem;
                }
          
                .max-w-full {
                  max-width: 100%;
                }
          
                .min-h-0 {
                  min-height: 0;
                }
          
                .min-h-full {
                  min-height: 100%;
                }
          
                .min-h-screen {
                  min-height: 100vh;
                }
          
                .min-w-0 {
                  min-width: 0;
                }
          
                .min-w-full {
                  min-width: 100%;
                }
          
                .object-contain {
                  -o-object-fit: contain;
                  object-fit: contain;
                }
          
                .object-cover {
                  -o-object-fit: cover;
                  object-fit: cover;
                }
          
                .object-fill {
                  -o-object-fit: fill;
                  object-fit: fill;
                }
          
                .object-none {
                  -o-object-fit: none;
                  object-fit: none;
                }
          
                .object-scale-down {
                  -o-object-fit: scale-down;
                  object-fit: scale-down;
                }
          
                .object-bottom {
                  -o-object-position: bottom;
                  object-position: bottom;
                }
          
                .object-center {
                  -o-object-position: center;
                  object-position: center;
                }
          
                .object-left {
                  -o-object-position: left;
                  object-position: left;
                }
          
                .object-left-bottom {
                  -o-object-position: left bottom;
                  object-position: left bottom;
                }
          
                .object-left-top {
                  -o-object-position: left top;
                  object-position: left top;
                }
          
                .object-right {
                  -o-object-position: right;
                  object-position: right;
                }
          
                .object-right-bottom {
                  -o-object-position: right bottom;
                  object-position: right bottom;
                }
          
                .object-right-top {
                  -o-object-position: right top;
                  object-position: right top;
                }
          
                .object-top {
                  -o-object-position: top;
                  object-position: top;
                }
          
                .opacity-0 {
                  opacity: 0;
                }
          
                .opacity-25 {
                  opacity: 0.25;
                }
          
                .opacity-50 {
                  opacity: 0.5;
                }
          
                .opacity-75 {
                  opacity: 0.75;
                }
          
                .opacity-100 {
                  opacity: 1;
                }
          
                .hover\:opacity-0:hover {
                  opacity: 0;
                }
          
                .hover\:opacity-25:hover {
                  opacity: 0.25;
                }
          
                .hover\:opacity-50:hover {
                  opacity: 0.5;
                }
          
                .hover\:opacity-75:hover {
                  opacity: 0.75;
                }
          
                .hover\:opacity-100:hover {
                  opacity: 1;
                }
          
                .focus\:opacity-0:focus {
                  opacity: 0;
                }
          
                .focus\:opacity-25:focus {
                  opacity: 0.25;
                }
          
                .focus\:opacity-50:focus {
                  opacity: 0.5;
                }
          
                .focus\:opacity-75:focus {
                  opacity: 0.75;
                }
          
                .focus\:opacity-100:focus {
                  opacity: 1;
                }
          
                .outline-none {
                  outline: 0;
                }
          
                .focus\:outline-none:focus {
                  outline: 0;
                }
          
                .overflow-auto {
                  overflow: auto;
                }
          
                .overflow-hidden {
                  overflow: hidden;
                }
          
                .overflow-visible {
                  overflow: visible;
                }
          
                .overflow-scroll {
                  overflow: scroll;
                }
          
                .overflow-x-auto {
                  overflow-x: auto;
                }
          
                .overflow-y-auto {
                  overflow-y: auto;
                }
          
                .overflow-x-hidden {
                  overflow-x: hidden;
                }
          
                .overflow-y-hidden {
                  overflow-y: hidden;
                }
          
                .overflow-x-visible {
                  overflow-x: visible;
                }
          
                .overflow-y-visible {
                  overflow-y: visible;
                }
          
                .overflow-x-scroll {
                  overflow-x: scroll;
                }
          
                .overflow-y-scroll {
                  overflow-y: scroll;
                }
          
                .scrolling-touch {
                  -webkit-overflow-scrolling: touch;
                }
          
                .scrolling-auto {
                  -webkit-overflow-scrolling: auto;
                }
          
                .p-0 {
                  padding: 0;
                }
          
                .p-1 {
                  padding: 0.25rem;
                }
          
                .p-2 {
                  padding: 0.5rem;
                }
          
                .p-3 {
                  padding: 0.75rem;
                }
          
                .p-4 {
                  padding: 1rem;
                }
          
                .p-5 {
                  padding: 1.25rem;
                }
          
                .p-6 {
                  padding: 1.5rem;
                }
          
                .p-8 {
                  padding: 2rem;
                }
          
                .p-10 {
                  padding: 2.5rem;
                }
          
                .p-12 {
                  padding: 3rem;
                }
          
                .p-16 {
                  padding: 4rem;
                }
          
                .p-20 {
                  padding: 5rem;
                }
          
                .p-24 {
                  padding: 6rem;
                }
          
                .p-32 {
                  padding: 8rem;
                }
          
                .p-40 {
                  padding: 10rem;
                }
          
                .p-48 {
                  padding: 12rem;
                }
          
                .p-56 {
                  padding: 14rem;
                }
          
                .p-64 {
                  padding: 16rem;
                }
          
                .p-px {
                  padding: 1px;
                }
          
                .py-0 {
                  padding-top: 0;
                  padding-bottom: 0;
                }
          
                .px-0 {
                  padding-left: 0;
                  padding-right: 0;
                }
          
                .py-1 {
                  padding-top: 0.25rem;
                  padding-bottom: 0.25rem;
                }
          
                .px-1 {
                  padding-left: 0.25rem;
                  padding-right: 0.25rem;
                }
          
                .py-2 {
                  padding-top: 0.5rem;
                  padding-bottom: 0.5rem;
                }
          
                .px-2 {
                  padding-left: 0.5rem;
                  padding-right: 0.5rem;
                }
          
                .py-3 {
                  padding-top: 0.75rem;
                  padding-bottom: 0.75rem;
                }
          
                .px-3 {
                  padding-left: 0.75rem;
                  padding-right: 0.75rem;
                }
          
                .py-4 {
                  padding-top: 1rem;
                  padding-bottom: 1rem;
                }
          
                .px-4 {
                  padding-left: 1rem;
                  padding-right: 1rem;
                }
          
                .py-5 {
                  padding-top: 1.25rem;
                  padding-bottom: 1.25rem;
                }
          
                .px-5 {
                  padding-left: 1.25rem;
                  padding-right: 1.25rem;
                }
          
                .py-6 {
                  padding-top: 1.5rem;
                  padding-bottom: 1.5rem;
                }
          
                .px-6 {
                  padding-left: 1.5rem;
                  padding-right: 1.5rem;
                }
          
                .py-8 {
                  padding-top: 2rem;
                  padding-bottom: 2rem;
                }
          
                .px-8 {
                  padding-left: 2rem;
                  padding-right: 2rem;
                }
          
                .py-10 {
                  padding-top: 2.5rem;
                  padding-bottom: 2.5rem;
                }
          
                .px-10 {
                  padding-left: 2.5rem;
                  padding-right: 2.5rem;
                }
          
                .py-12 {
                  padding-top: 3rem;
                  padding-bottom: 3rem;
                }
          
                .px-12 {
                  padding-left: 3rem;
                  padding-right: 3rem;
                }
          
                .py-16 {
                  padding-top: 4rem;
                  padding-bottom: 4rem;
                }
          
                .px-16 {
                  padding-left: 4rem;
                  padding-right: 4rem;
                }
          
                .py-20 {
                  padding-top: 5rem;
                  padding-bottom: 5rem;
                }
          
                .px-20 {
                  padding-left: 5rem;
                  padding-right: 5rem;
                }
          
                .py-24 {
                  padding-top: 6rem;
                  padding-bottom: 6rem;
                }
          
                .px-24 {
                  padding-left: 6rem;
                  padding-right: 6rem;
                }
          
                .py-32 {
                  padding-top: 8rem;
                  padding-bottom: 8rem;
                }
          
                .px-32 {
                  padding-left: 8rem;
                  padding-right: 8rem;
                }
          
                .py-40 {
                  padding-top: 10rem;
                  padding-bottom: 10rem;
                }
          
                .px-40 {
                  padding-left: 10rem;
                  padding-right: 10rem;
                }
          
                .py-48 {
                  padding-top: 12rem;
                  padding-bottom: 12rem;
                }
          
                .px-48 {
                  padding-left: 12rem;
                  padding-right: 12rem;
                }
          
                .py-56 {
                  padding-top: 14rem;
                  padding-bottom: 14rem;
                }
          
                .px-56 {
                  padding-left: 14rem;
                  padding-right: 14rem;
                }
          
                .py-64 {
                  padding-top: 16rem;
                  padding-bottom: 16rem;
                }
          
                .px-64 {
                  padding-left: 16rem;
                  padding-right: 16rem;
                }
          
                .py-px {
                  padding-top: 1px;
                  padding-bottom: 1px;
                }
          
                .px-px {
                  padding-left: 1px;
                  padding-right: 1px;
                }
          
                .pt-0 {
                  padding-top: 0;
                }
          
                .pr-0 {
                  padding-right: 0;
                }
          
                .pb-0 {
                  padding-bottom: 0;
                }
          
                .pl-0 {
                  padding-left: 0;
                }
          
                .pt-1 {
                  padding-top: 0.25rem;
                }
          
                .pr-1 {
                  padding-right: 0.25rem;
                }
          
                .pb-1 {
                  padding-bottom: 0.25rem;
                }
          
                .pl-1 {
                  padding-left: 0.25rem;
                }
          
                .pt-2 {
                  padding-top: 0.5rem;
                }
          
                .pr-2 {
                  padding-right: 0.5rem;
                }
          
                .pb-2 {
                  padding-bottom: 0.5rem;
                }
          
                .pl-2 {
                  padding-left: 0.5rem;
                }
          
                .pt-3 {
                  padding-top: 0.75rem;
                }
          
                .pr-3 {
                  padding-right: 0.75rem;
                }
          
                .pb-3 {
                  padding-bottom: 0.75rem;
                }
          
                .pl-3 {
                  padding-left: 0.75rem;
                }
          
                .pt-4 {
                  padding-top: 1rem;
                }
          
                .pr-4 {
                  padding-right: 1rem;
                }
          
                .pb-4 {
                  padding-bottom: 1rem;
                }
          
                .pl-4 {
                  padding-left: 1rem;
                }
          
                .pt-5 {
                  padding-top: 1.25rem;
                }
          
                .pr-5 {
                  padding-right: 1.25rem;
                }
          
                .pb-5 {
                  padding-bottom: 1.25rem;
                }
          
                .pl-5 {
                  padding-left: 1.25rem;
                }
          
                .pt-6 {
                  padding-top: 1.5rem;
                }
          
                .pr-6 {
                  padding-right: 1.5rem;
                }
          
                .pb-6 {
                  padding-bottom: 1.5rem;
                }
          
                .pl-6 {
                  padding-left: 1.5rem;
                }
          
                .pt-8 {
                  padding-top: 2rem;
                }
          
                .pr-8 {
                  padding-right: 2rem;
                }
          
                .pb-8 {
                  padding-bottom: 2rem;
                }
          
                .pl-8 {
                  padding-left: 2rem;
                }
          
                .pt-10 {
                  padding-top: 2.5rem;
                }
          
                .pr-10 {
                  padding-right: 2.5rem;
                }
          
                .pb-10 {
                  padding-bottom: 2.5rem;
                }
          
                .pl-10 {
                  padding-left: 2.5rem;
                }
          
                .pt-12 {
                  padding-top: 3rem;
                }
          
                .pr-12 {
                  padding-right: 3rem;
                }
          
                .pb-12 {
                  padding-bottom: 3rem;
                }
          
                .pl-12 {
                  padding-left: 3rem;
                }
          
                .pt-16 {
                  padding-top: 4rem;
                }
          
                .pr-16 {
                  padding-right: 4rem;
                }
          
                .pb-16 {
                  padding-bottom: 4rem;
                }
          
                .pl-16 {
                  padding-left: 4rem;
                }
          
                .pt-20 {
                  padding-top: 5rem;
                }
          
                .pr-20 {
                  padding-right: 5rem;
                }
          
                .pb-20 {
                  padding-bottom: 5rem;
                }
          
                .pl-20 {
                  padding-left: 5rem;
                }
          
                .pt-24 {
                  padding-top: 6rem;
                }
          
                .pr-24 {
                  padding-right: 6rem;
                }
          
                .pb-24 {
                  padding-bottom: 6rem;
                }
          
                .pl-24 {
                  padding-left: 6rem;
                }
          
                .pt-32 {
                  padding-top: 8rem;
                }
          
                .pr-32 {
                  padding-right: 8rem;
                }
          
                .pb-32 {
                  padding-bottom: 8rem;
                }
          
                .pl-32 {
                  padding-left: 8rem;
                }
          
                .pt-40 {
                  padding-top: 10rem;
                }
          
                .pr-40 {
                  padding-right: 10rem;
                }
          
                .pb-40 {
                  padding-bottom: 10rem;
                }
          
                .pl-40 {
                  padding-left: 10rem;
                }
          
                .pt-48 {
                  padding-top: 12rem;
                }
          
                .pr-48 {
                  padding-right: 12rem;
                }
          
                .pb-48 {
                  padding-bottom: 12rem;
                }
          
                .pl-48 {
                  padding-left: 12rem;
                }
          
                .pt-56 {
                  padding-top: 14rem;
                }
          
                .pr-56 {
                  padding-right: 14rem;
                }
          
                .pb-56 {
                  padding-bottom: 14rem;
                }
          
                .pl-56 {
                  padding-left: 14rem;
                }
          
                .pt-64 {
                  padding-top: 16rem;
                }
          
                .pr-64 {
                  padding-right: 16rem;
                }
          
                .pb-64 {
                  padding-bottom: 16rem;
                }
          
                .pl-64 {
                  padding-left: 16rem;
                }
          
                .pt-px {
                  padding-top: 1px;
                }
          
                .pr-px {
                  padding-right: 1px;
                }
          
                .pb-px {
                  padding-bottom: 1px;
                }
          
                .pl-px {
                  padding-left: 1px;
                }
          
          
                .fill-current {
                  fill: currentColor;
                }
          
                .stroke-current {
                  stroke: currentColor;
                }
          
                .table-auto {
                  table-layout: auto;
                }
          
                .table-fixed {
                  table-layout: fixed;
                }
          
                .text-left {
                  text-align: left;
                }
          
                .text-center {
                  text-align: center;
                }
          
                .text-right {
                  text-align: right;
                }
          
                .text-justify {
                  text-align: justify;
                }
          
                .text-transparent {
                  color: transparent;
                }
          
                .text-black {
                  color: #000;
                }
          
                .text-white {
                  color: #fff;
                }
          
                .text-gray-100 {
                  color: #f7fafc;
                }
          
                .text-gray-200 {
                  color: #edf2f7;
                }
          
                .text-gray-300 {
                  color: #e2e8f0;
                }
          
                .text-gray-400 {
                  color: #cbd5e0;
                }
          
                .text-gray-500 {
                  color: #a0aec0;
                }
          
                .text-gray-600 {
                  color: #718096;
                }
          
                .text-gray-700 {
                  color: #828282;
                }
                .heading-text-gray-700 {
                  color: #212121;
                }
          
                .text-gray-800 {
                  color: #2d3748;
                }
          
                .text-gray-900 {
                  color: #1a202c;
                }
          
                .text-red-100 {
                  color: #fff5f5;
                }
          
                .text-red-200 {
                  color: #fed7d7;
                }
          
                .text-red-300 {
                  color: #feb2b2;
                }
          
                .text-red-400 {
                  color: #fc8181;
                }
          
                .text-red-500 {
                  color: #f56565;
                }
          
                .text-red-600 {
                  color: #e53e3e;
                }
          
                .text-red-700 {
                  color: #c53030;
                }
          
                .text-red-800 {
                  color: #9b2c2c;
                }
          
                .text-red-900 {
                  color: #742a2a;
                }
          
                .text-orange-100 {
                  color: #fffaf0;
                }
          
                .text-orange-200 {
                  color: #feebc8;
                }
          
                .text-orange-300 {
                  color: #fbd38d;
                }
          
                .text-orange-400 {
                  color: #f6ad55;
                }
          
                .text-orange-500 {
                  color: #ed8936;
                }
          
                .text-orange-600 {
                  color: #dd6b20;
                }
          
                .text-orange-700 {
                  color: #c05621;
                }
          
                .text-orange-800 {
                  color: #9c4221;
                }
          
                .text-orange-900 {
                  color: #7b341e;
                }
          
                .text-yellow-100 {
                  color: #fffff0;
                }
          
                .text-yellow-200 {
                  color: #fefcbf;
                }
          
                .text-yellow-300 {
                  color: #faf089;
                }
          
                .text-yellow-400 {
                  color: #f6e05e;
                }
          
                .text-yellow-500 {
                  color: #ecc94b;
                }
          
                .text-yellow-600 {
                  color: #d69e2e;
                }
          
                .text-yellow-700 {
                  color: #b7791f;
                }
          
                .text-yellow-800 {
                  color: #975a16;
                }
          
                .text-yellow-900 {
                  color: #744210;
                }
          
                .text-green-100 {
                  color: #f0fff4;
                }
          
                .text-green-200 {
                  color: #c6f6d5;
                }
          
                .text-green-300 {
                  color: #9ae6b4;
                }
          
                .text-green-400 {
                  color: #68d391;
                }
          
                .text-green-500 {
                  color: #48bb78;
                }
          
                .text-green-600 {
                  color: #38a169;
                }
          
                .text-green-700 {
                  color: #2f855a;
                }
          
                .text-green-800 {
                  color: #276749;
                }
          
                .text-green-900 {
                  color: #22543d;
                }
          
                .text-teal-100 {
                  color: #e6fffa;
                }
          
                .text-teal-200 {
                  color: #b2f5ea;
                }
          
                .text-teal-300 {
                  color: #81e6d9;
                }
          
                .text-teal-400 {
                  color: #4fd1c5;
                }
          
                .text-teal-500 {
                  color: #38b2ac;
                }
          
                .text-teal-600 {
                  color: #319795;
                }
          
                .text-teal-700 {
                  color: #2c7a7b;
                }
          
                .text-teal-800 {
                  color: #285e61;
                }
          
                .text-teal-900 {
                  color: #234e52;
                }
          
                .text-blue-100 {
                  color: #ebf8ff;
                }
          
                .text-blue-200 {
                  color: #bee3f8;
                }
          
                .text-blue-300 {
                  color: #90cdf4;
                }
          
                .text-blue-400 {
                  color: #63b3ed;
                }
          
                .text-blue-500 {
                  color: #4299e1;
                }
          
                .text-blue-600 {
                  color: #3182ce;
                }
          
                .text-blue-700 {
                  color: #2b6cb0;
                }
          
                .text-blue-800 {
                  color: #2c5282;
                }
          
                .text-blue-900 {
                  color: #2a4365;
                }
          
                .text-indigo-100 {
                  color: #ebf4ff;
                }
          
                .text-indigo-200 {
                  color: #c3dafe;
                }
          
                .text-indigo-300 {
                  color: #a3bffa;
                }
          
                .text-indigo-400 {
                  color: #7f9cf5;
                }
          
                .text-indigo-500 {
                  color: #667eea;
                }
          
                .text-indigo-600 {
                  color: #5a67d8;
                }
          
                .text-indigo-700 {
                  color: #4c51bf;
                }
          
                .text-indigo-800 {
                  color: #434190;
                }
          
                .text-indigo-900 {
                  color: #3c366b;
                }
          
                .text-purple-100 {
                  color: #faf5ff;
                }
          
                .text-purple-200 {
                  color: #e9d8fd;
                }
          
                .text-purple-300 {
                  color: #d6bcfa;
                }
          
                .text-purple-400 {
                  color: #b794f4;
                }
          
                .text-purple-500 {
                  color: #9f7aea;
                }
          
                .text-purple-600 {
                  color: #805ad5;
                }
          
                .text-purple-700 {
                  color: #6b46c1;
                }
          
                .text-purple-800 {
                  color: #553c9a;
                }
          
                .text-purple-900 {
                  color: #44337a;
                }
          
                .text-pink-100 {
                  color: #fff5f7;
                }
          
                .text-pink-200 {
                  color: #fed7e2;
                }
          
                .text-pink-300 {
                  color: #fbb6ce;
                }
          
                .text-pink-400 {
                  color: #f687b3;
                }
          
                .text-pink-500 {
                  color: #ed64a6;
                }
          
                .text-pink-600 {
                  color: #d53f8c;
                }
          
                .text-pink-700 {
                  color: #b83280;
                }
          
                .text-pink-800 {
                  color: #97266d;
                }
          
                .text-pink-900 {
                  color: #702459;
                }
          
                .text-xs {
                  font-size: 0.75rem;
                }
          
                .text-sm {
                  font-size: 0.875rem;
                }
          
                .text-base {
                  font-size: 1rem;
                }
          
                .text-lg {
                  font-size: 1.125rem;
                }
          
                .text-xl {
                  font-size: 1.25rem;
                }
          
                .text-2xl {
                  font-size: 1.5rem;
                }
          
                .text-3xl {
                  font-size: 1.875rem;
                }
          
                .text-4xl {
                  font-size: 2.25rem;
                }
          
                .text-5xl {
                  font-size: 3rem;
                }
          
                .text-6xl {
                  font-size: 4rem;
                }
          
                .italic {
                  font-style: italic;
                }
          
                .not-italic {
                  font-style: normal;
                }
          
                .uppercase {
                  text-transform: uppercase;
                }
          
                .lowercase {
                  text-transform: lowercase;
                }
          
                .capitalize {
                  text-transform: capitalize;
                }
          
                .normal-case {
                  text-transform: none;
                }
          
                .underline {
                  text-decoration: underline;
                }
          
                .line-through {
                  text-decoration: line-through;
                }
          
                .no-underline {
                  text-decoration: none;
                }
          
                .antialiased {
                  -webkit-font-smoothing: antialiased;
                  -moz-osx-font-smoothing: grayscale;
                }
          
                .subpixel-antialiased {
                  -webkit-font-smoothing: auto;
                  -moz-osx-font-smoothing: auto;
                }
          
                .tracking-tighter {
                  letter-spacing: -0.05em;
                }
          
                .tracking-tight {
                  letter-spacing: -0.025em;
                }
          
                .tracking-normal {
                  letter-spacing: 0;
                }
          
                .tracking-wide {
                  letter-spacing: 0.025em;
                }
          
                .tracking-wider {
                  letter-spacing: 0.05em;
                }
          
                .tracking-widest {
                  letter-spacing: 0.1em;
                }
          
                .select-none {
                  -webkit-user-select: none;
                  -moz-user-select: none;
                  -ms-user-select: none;
                  user-select: none;
                }
          
                .select-text {
                  -webkit-user-select: text;
                  -moz-user-select: text;
                  -ms-user-select: text;
                  user-select: text;
                }
          
                .select-all {
                  -webkit-user-select: all;
                  -moz-user-select: all;
                  -ms-user-select: all;
                  user-select: all;
                }
          
                .select-auto {
                  -webkit-user-select: auto;
                  -moz-user-select: auto;
                  -ms-user-select: auto;
                  user-select: auto;
                }
          
                .align-baseline {
                  vertical-align: baseline;
                }
          
                .align-top {
                  vertical-align: top;
                }
          
                .align-middle {
                  vertical-align: middle;
                }
          
                .align-bottom {
                  vertical-align: bottom;
                }
          
                .align-text-top {
                  vertical-align: text-top;
                }
          
                .align-text-bottom {
                  vertical-align: text-bottom;
                }
          
                .visible {
                  visibility: visible;
                }
          
                .invisible {
                  visibility: hidden;
                }
          
                .whitespace-normal {
                  white-space: normal;
                }
          
                .whitespace-no-wrap {
                  white-space: nowrap;
                }
          
                .whitespace-pre {
                  white-space: pre;
                }
          
                .whitespace-pre-line {
                  white-space: pre-line;
                }
          
                .whitespace-pre-wrap {
                  white-space: pre-wrap;
                }
          
                .break-normal {
                  overflow-wrap: normal;
                  word-break: normal;
                }
          
                .break-words {
                  overflow-wrap: break-word;
                }
          
                .break-all {
                  word-break: break-all;
                }
          
                .truncate {
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
          
                .w-0 {
                  width: 0;
                }
          
                .w-1 {
                  width: 0.25rem;
                }
          
                .w-2 {
                  width: 0.5rem;
                }
          
                .w-3 {
                  width: 0.75rem;
                }
          
                .w-4 {
                  width: 1rem;
                }
          
                .w-5 {
                  width: 1.25rem;
                }
          
                .w-6 {
                  width: 1.5rem;
                }
          
                .w-8 {
                  width: 2rem;
                }
          
                .w-10 {
                  width: 2.5rem;
                }
          
                .w-12 {
                  width: 3rem;
                }
          
                .w-16 {
                  width: 4rem;
                }
          
                .w-20 {
                  width: 5rem;
                }
          
                .w-24 {
                  width: 6rem;
                }
          
                .w-32 {
                  width: 8rem;
                }
          
                .w-40 {
                  width: 10rem;
                }
          
                .w-48 {
                  width: 12rem;
                }
          
                .w-56 {
                  width: 14rem;
                }
          
                .w-64 {
                  width: 16rem;
                }
          
                .w-auto {
                  width: auto;
                }
          
                .w-px {
                  width: 1px;
                }
          
                .w-1\/2 {
                  width: 50%;
                }
          
                .w-1\/3 {
                  width: 33.333333%;
                }
          
                .w-2\/3 {
                  width: 66.666667%;
                }
          
                .w-1\/4 {
                  width: 25%;
                }
          
                .w-2\/4 {
                  width: 50%;
                }
          
                .w-3\/4 {
                  width: 75%;
                }
          
                .w-1\/5 {
                  width: 20%;
                }
          
                .w-2\/5 {
                  width: 40%;
                }
          
                .w-3\/5 {
                  width: 60%;
                }
          
                .w-4\/5 {
                  width: 80%;
                }
          
                .w-1\/6 {
                  width: 16.666667%;
                }
          
                .w-2\/6 {
                  width: 33.333333%;
                }
          
                .w-3\/6 {
                  width: 50%;
                }
          
                .w-4\/6 {
                  width: 66.666667%;
                }
          
                .w-5\/6 {
                  width: 83.333333%;
                }
          
                .w-1\/12 {
                  width: 8.333333%;
                }
          
                .w-2\/12 {
                  width: 16.666667%;
                }
          
                .w-3\/12 {
                  width: 25%;
                }
          
                .w-4\/12 {
                  width: 33.333333%;
                }
          
                .w-5\/12 {
                  width: 41.666667%;
                }
          
                .w-6\/12 {
                  width: 50%;
                }
          
                .w-7\/12 {
                  width: 58.333333%;
                }
          
                .w-8\/12 {
                  width: 66.666667%;
                }
          
                .w-9\/12 {
                  width: 75%;
                }
          
                .w-10\/12 {
                  width: 83.333333%;
                }
          
                .w-11\/12 {
                  width: 91.666667%;
                }
          
                .w-full {
                  width: 100%;
                }
          
                .w-screen {
                  width: 100vw;
                }
          
                .z-0 {
                  z-index: 0;
                }
          
                .z-10 {
                  z-index: 10;
                }
          
                .z-20 {
                  z-index: 20;
                }
          
                .z-30 {
                  z-index: 30;
                }
          
                .z-40 {
                  z-index: 40;
                }
          
                .z-50 {
                  z-index: 50;
                }
          
                .z-auto {
                  z-index: auto;
                }
          
                progress {
                  width: 150px;
                  height: 12px;
                  border: 1px solid white;
                  border-radius: 100px;
                  overflow: hidden;
                }
                progress::-webkit-progress-bar {
                  background-color: #bdbdbd;
                }
                progress::-webkit-progress-value {
                  background-color: #4b2459;
                }
              </style>
          
              <!-- <script src="https://cdn.tailwindcss.com"></script> -->
            </head>
          
            <body
              class="m-0"
              style="font-family: system-ui, sans-serif; width: 90vw; margin: 0 auto;"
            >
              <div class="w-10/12 mx-auto">
                <img
                  src="https://sassolution.org/funeral/storage/app/public/logo.jpg"
                  class="my-6"
                  style="width: 50%"
                />
          
                <br />
          
                <div class="flex">
                  <img
                    src=${get_employeepro_data?.Image}
                   
                    width="30%"
                  />
          
                  <div class="ml-8">
                    <h1>${
                      get_employeepro_data?.First_Name +
                      ' ' +
                      get_employeepro_data?.Last_Name
                    }</h1>
                    <h2 style="color:#49255B;" class="font-medium text-xl">${
                      get_employeepro_data?.Occupation ?  get_employeepro_data?.Occupation : 'NILL'
                    }</h2>
          
                    <p class="text-lg font-medium mt-5" style="color:#828282;">
                      Overall Performance Score
                      <span class="font-semibold text-black"> ${
                        employee_performances?.Score
                          ? employee_performances?.Score
                          : '-'
                      }% </span>
                    </p>
          
                    <p class="text-lg font-medium m-0">Recruited By</p>
                    <p class="text-base mt-2" style="color:#212121;">${
                      get_employeepro_data?.agency?.AgencyName ? get_employeepro_data?.agency?.AgencyName : '-'
                    }</p>
                  </div>
                </div>
          
                <!-- About & Contact Info -->
                <table class="w-full mt-10">
                  <thead style=" color: #4a255b">
                    <th colspan="2" class="w-1/2">
                      <div
                        class="flex items-center text-lg"
                        style="border-bottom: 1px solid #4a255b; margin-right: 20px;"
                      >
                        <svg
                          enable-background="new 0 0 500 500"
                          id="Layer_1"
                          version="1.1"
                          viewBox="0 0 500 500"
                          xml:space="preserve"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          width="40"
                          height="40"
                          class="fill-current mr-3"
                        >
                          <g>
                            <g>
                              <path
                                d="M250,291.6c-52.8,0-95.8-43-95.8-95.8s43-95.8,95.8-95.8s95.8,43,95.8,95.8S302.8,291.6,250,291.6z M250,127.3    c-37.7,0-68.4,30.7-68.4,68.4s30.7,68.4,68.4,68.4s68.4-30.7,68.4-68.4S287.7,127.3,250,127.3z"
                              ></path>
                            </g>
                            <g>
                              <path
                                d="M386.9,401.1h-27.4c0-60.4-49.1-109.5-109.5-109.5s-109.5,49.1-109.5,109.5h-27.4c0-75.5,61.4-136.9,136.9-136.9    S386.9,325.6,386.9,401.1z"
                              ></path>
                            </g>
                          </g>
                        </svg>
                        About
                      </div>
                    </th>
                    <th colspan="2" class="w-1/2">
                      <div
                        class="flex items-center text-lg"
                        style="border-bottom: 1px solid #4a255b"
                      >
                        <svg
                          enable-background="new 0 0 500 500"
                          id="Layer_1"
                          version="1.1"
                          viewBox="0 0 500 500"
                          xml:space="preserve"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          width="40"
                          height="40"
                          class="fill-current mr-3"
                        >
                          <g>
                            <g>
                              <path
                                d="M250,291.6c-52.8,0-95.8-43-95.8-95.8s43-95.8,95.8-95.8s95.8,43,95.8,95.8S302.8,291.6,250,291.6z M250,127.3    c-37.7,0-68.4,30.7-68.4,68.4s30.7,68.4,68.4,68.4s68.4-30.7,68.4-68.4S287.7,127.3,250,127.3z"
                              ></path>
                            </g>
                            <g>
                              <path
                                d="M386.9,401.1h-27.4c0-60.4-49.1-109.5-109.5-109.5s-109.5,49.1-109.5,109.5h-27.4c0-75.5,61.4-136.9,136.9-136.9    S386.9,325.6,386.9,401.1z"
                              ></path>
                            </g>
                          </g>
                        </svg>
                        Contact Information
                      </div>
                    </th>
                  </thead>
                  <tbody>
                    <!-- Row #1 -->
                    <tr>
                      <td colspan="2" class="font-medium text-gray-600 py-2">
                        PERSONAL INFORMATION
                      </td>
                      <td class="font-medium heading-text-gray-700">Email:</td>
                      <td class="font-normal text-gray-700">${
                        get_employeepro_data?.Email
                          ? get_employeepro_data?.Email
                          : '-'
                      }</td>
                    </tr>
          
                    <!-- Row #2 -->
                    <tr>
                      <td class="font-medium heading-text-gray-700">Employee ID:</td>
                      <td class="font-normal text-gray-700">${
                        get_employeepro_data?.id ? get_employeepro_data?.id : '-'
                      }</td>
          
                      <td class="font-medium heading-text-gray-700">Cell Phone:</td>
                      <td class="font-normal text-gray-700">${
                        get_employeepro_data?.CellPhone
                          ? get_employeepro_data?.CellPhone
                          : '-'
                      }</td>
                    </tr>
          
                    <!-- Row #3 -->
                    <tr>
                      <td class="font-medium heading-text-gray-700">Search Date:</td>
                      <td class="font-normal text-gray-700">${
                        newSeparated ? newSeparated : '-'
                      }</td>
          
                      <td class="font-medium heading-text-gray-700">Telephone:</td>
                      <td class="font-normal text-gray-700">${
                        get_employeepro_data?.Telephone
                          ? get_employeepro_data?.Telephone
                          : '-'
                      }</td>
                    </tr>
          
                    <!-- Row #4 -->
                    <tr>
                      <td class="font-medium heading-text-gray-700">Identification No:</td>
                      <td class="font-normal text-gray-700">${
                        formattedNumber ? formattedNumber : '-'
                      }</td>
          
                      <td class="font-medium heading-text-gray-700">Address:</td>
                      <td class="font-normal text-gray-700">
                      ${
                        get_employeepro_data?.Address
                          ? get_employeepro_data?.Address
                          : '-'
                      }
                      </td>
                    </tr>
          
                    <!-- Row #5 -->
                    <tr>
                      <td class="font-medium heading-text-gray-700">First Name:</td>
                      <td class="font-normal text-gray-700">${
                        get_employeepro_data?.First_Name
                          ? get_employeepro_data?.First_Name
                          : '-'
                      }</td>
          
                      <td class="font-medium heading-text-gray-700">Phone Carrier:</td>
                      <td class="font-normal text-gray-700">${
                        get_employeepro_data?.PhoneCarrier
                          ? get_employeepro_data?.PhoneCarrier
                          : '-'
                      }</td>
                    </tr>
          
                    <!-- Row #6 -->
                    <tr>
                      <td class="font-medium heading-text-gray-700">Middle Name:</td>
                      <td class="font-normal text-gray-700">${
                        get_employeepro_data?.Middle_Name
                          ? get_employeepro_data?.Middle_Name
                          : '-'
                      }</td>
          
                      <td class="font-medium heading-text-gray-700">City:</td>
                      <td class="font-normal text-gray-700">${
                        get_employeepro_data?.City
                          ? get_employeepro_data?.City
                          : '-'
                      }</td>
                    </tr>
          
                    <!-- Row #7 -->
                    <tr>
                      <td class="font-medium heading-text-gray-700">Last Name:</td>
                      <td class="font-normal text-gray-700">${
                        get_employeepro_data?.Last_Name
                          ? get_employeepro_data?.Last_Name
                          : '-'
                      }</td>
          
                      <td class="font-medium heading-text-gray-700">State:</td>
                      <td class="font-normal text-gray-700">${
                        get_employeepro_data?.state?.state
                          ? get_employeepro_data?.state?.state
                          : '-'
                      }</td>
                    </tr>
          
                    <!-- Row #8 -->
                    <tr>
                      <td class="font-medium heading-text-gray-700">DOB:</td>
                      <td class="font-normal text-gray-700">${
                        get_employeepro_data?.DOB ? dobNew : '-'
                      }</td>
          
                      <td class="font-medium heading-text-gray-700">LGA:</td>
                      <td class="font-normal text-gray-700">${
                        get_employeepro_data?.LGA ? get_employeepro_data?.LGA : '-'
                      }</td>
                    </tr>
          
                    <!-- Row #9 -->
                    <tr>
                      <td class="font-medium heading-text-gray-700">Age:</td>
                      <td class="font-normal text-gray-700">${age}</td>
          
                      <td class="font-medium heading-text-gray-700">Nigerian:</td>
                      <td class="font-normal text-gray-700">${
                        get_employeepro_data?.Nigerian == 1 ? 'Yes' : 'No'
                      }</td>
                    </tr>
          
                    <!-- Row #10 -->
                    <tr>
                      <td class="font-medium heading-text-gray-700">Sex:</td>
                      <td class="font-normal text-gray-700">${
                        get_employeepro_data?.Sex ? get_employeepro_data?.Sex : '-'
                      }</td>
          
                      <td colspan-"2"></td>
                    </tr>    

                    <!-- Row #11 -->
                    <tr>
                      <td class="font-medium heading-text-gray-700">Maritial status:</td>
                      <td class="font-normal text-gray-700">${
                        get_employeepro_data?.Marita_Status
                          ? get_employeepro_data?.Marita_Status
                          : '-'
                      }</td>

                      <td colspan-"2"></td>
                    </tr>
                  </tbody>
                </table>
          
                ${"<br />".repeat(15)}




                <!-- Referee & Work History -->
                
                <table style="top:-20px" class="w-full">
                  <thead style="color: #4a255b">
                    <th colspan="2" class="w-1/2">
                      <div
                        class="flex items-center text-lg"
                        style="border-bottom: 1px solid #4a255b; margin-right: 20px"
                      >
                        <svg
                          enable-background="new 0 0 500 500"
                          id="Layer_1"
                          version="1.1"
                          viewBox="0 0 500 500"
                          xml:space="preserve"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          width="40"
                          height="40"
                          class="fill-current mr-3"
                        >
                          <g>
                            <g>
                              <path
                                d="M250,291.6c-52.8,0-95.8-43-95.8-95.8s43-95.8,95.8-95.8s95.8,43,95.8,95.8S302.8,291.6,250,291.6z M250,127.3    c-37.7,0-68.4,30.7-68.4,68.4s30.7,68.4,68.4,68.4s68.4-30.7,68.4-68.4S287.7,127.3,250,127.3z"
                              ></path>
                            </g>
                            <g>
                              <path
                                d="M386.9,401.1h-27.4c0-60.4-49.1-109.5-109.5-109.5s-109.5,49.1-109.5,109.5h-27.4c0-75.5,61.4-136.9,136.9-136.9    S386.9,325.6,386.9,401.1z"
                              ></path>
                            </g>
                          </g>
                        </svg>
                        Referee
                      </div>
                    </th>
                    <th colspan="2" class="w-1/2">
                      <div
                        class="flex items-center text-lg"
                        style="border-bottom: 1px solid #4a255b"
                      >
                        <svg
                          enable-background="new 0 0 500 500"
                          id="Layer_1"
                          version="1.1"
                          viewBox="0 0 500 500"
                          xml:space="preserve"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          width="40"
                          height="40"
                          class="fill-current mr-3"
                        >
                          <g>
                            <g>
                              <path
                                d="M250,291.6c-52.8,0-95.8-43-95.8-95.8s43-95.8,95.8-95.8s95.8,43,95.8,95.8S302.8,291.6,250,291.6z M250,127.3    c-37.7,0-68.4,30.7-68.4,68.4s30.7,68.4,68.4,68.4s68.4-30.7,68.4-68.4S287.7,127.3,250,127.3z"
                              ></path>
                            </g>
                            <g>
                              <path
                                d="M386.9,401.1h-27.4c0-60.4-49.1-109.5-109.5-109.5s-109.5,49.1-109.5,109.5h-27.4c0-75.5,61.4-136.9,136.9-136.9    S386.9,325.6,386.9,401.1z"
                              ></path>
                            </g>
                          </g>
                        </svg>
                        Work History
                      </div>
                    </th>
                  </thead>
                  <tbody>
                    <!-- Row #1 -->
                    <tr>
                      <td class="font-medium heading-text-gray-700">Guarantor Name:</td>
                      <td class="font-normal text-gray-700">${
                        get_employeepro_data?.RefereeName
                          ? get_employeepro_data?.RefereeName
                          : '-'
                      }</td>
          
                      <td class="font-medium heading-text-gray-700">Occupation:</td>
                      <td class="font-normal text-gray-700">${
                        get_employeepro_data?.Occupation
                          ? get_employeepro_data?.Occupation
                          : '-'
                      }</td>
                    </tr>
          
                    <!-- Row #2 -->
                    <tr>
                      <td class="font-medium heading-text-gray-700">Guarantor Contact Address:</td>
                      <td class="font-normal text-gray-700">
                      ${
                        get_employeepro_data?.RefereeContactAddress
                          ? get_employeepro_data?.RefereeContactAddress
                          : '-'
                      }
                      </td>
          
                      <td class="font-medium heading-text-gray-700">Recruitment Agency:</td>
                      <td class="font-normal text-gray-700">${
                        get_employeepro_data?.agency?.AgencyName ? get_employeepro_data?.agency?.AgencyName : '-'
                      }</td>
                    </tr>
          
                    <!-- Row #3 -->
                    <tr>
                    <td class="font-medium heading-text-gray-700">Guarantor Contact Phone:</td>
                    <td class="font-normal text-gray-700">${
                      get_employeepro_data?.RefereeContatctPhone
                        ? get_employeepro_data?.RefereeContatctPhone
                        : '-'
                    }</td>
          
                      <td class="font-medium heading-text-gray-700">Date Hired:</td>
                      <td class="font-normal text-gray-700">${
                        get_employeepro_data?.Date_Hired ? newchangeDHire : '-'
                      }</td>
                    </tr>
          
                    <!-- Row #4 -->
                    <tr>
                    <td class="font-medium heading-text-gray-700"></td>
                    <td class="font-normal text-gray-700"></td>
          
                      <td class="font-medium heading-text-gray-700">Date Seperated:</td>
                      <td class="font-normal text-gray-700">${
                        get_employeepro_data?.Date_Seperated ? newchangeDSepr : '-'
                      }</td>
                    </tr>
          
                    <!-- Row #5 -->
                    <tr>
                      <td class="font-medium heading-text-gray-700"></td>
                      <td class="font-normal text-gray-700"></td>
          
                      <td class="font-medium heading-text-gray-700">Length of Employment:</td>
                      <td class="font-normal text-gray-700">${
                        get_employeepro_data?.LengthofEmployment
                          ? get_employeepro_data?.LengthofEmployment
                          : '-'
                      }</td>
                    </tr>
          
                    <!-- Row #6 -->
                    <tr>
                      <td class="font-medium"></td>
                      <td class="font-normal text-gray-700"></td>
          
                      <td class="font-medium heading-text-gray-700">Conduct</td>
                      <td class="font-normal text-gray-700">${
                        get_employeepro_data?.Conduct
                          ? get_employeepro_data?.Conduct
                          : '-'
                      }</td>
                    </tr>
          
                    <!-- Row #7 -->
                    <tr>
                      <td class="font-medium"></td>
                      <td class="font-normal text-gray-700"></td>
          
                      <td class="font-medium heading-text-gray-700">Hire Again</td>
                      <td class="font-normal text-gray-700">${
                        get_employeepro_data?.Hire_Again == 1 ? 'Yes' : 'No'
                      }</td>
                    </tr>
                  </tbody>
                </table>
          
                ${"<br />".repeat(39)}
          
                <!-- Overall Performance Score -->
                <h1 class="text-3xl text-gray-900">
                  Overall Performance Score &nbsp; ${
                    employee_performances?.Score
                      ? employee_performances?.Score
                      : '-'
                  }%
                </h1>
                <table class="w-full mt-10">
                  <thead class="text-indigo-800">
                    <th colspan="2" class="w-1/2">
                      <div class="flex items-center text-lg text-black">
                        Personal Attributes
                      </div>
                    </th>
                    <th colspan="2" class="w-1/2">
                      <div class="flex items-center text-lg text-black">
                        Professional Attributes
                      </div>
                    </th>
                  </thead>
                  <tbody>
                    <!-- Row #1 -->
                    <tr>
                      <td colspan="1" class="font-medium">Trustworthiness/Honesty</td>
                      <td colspan="1" class="font-normal text-gray-700 flex items-center">
                          <progress max="100" style="width: 110px; inline; margin-right: 2px;" value=${
                           employee_performances?.Trust
                             ? employee_performances?.Trust * 20
                             : 0 * 20
                          }></progress>
                        <p class="inline-block m-0">${
                          employee_performances?.Trust
                            ? employee_performances?.Trust
                            : 0
                        }</p>
                      </td>
          
                      <td colspan="1" class="font-medium">
                        Easily Understands Instructions
                      </td>
                      <td colspan="1" class="font-normal text-gray-700 flex items-center">
                          <progress max="100" style="width: 110px; display: inline; margin-right: 2px;" value=${
                           employee_performances?.Instructions
                             ? employee_performances?.Instructions * 20
                             : 0 * 20
                          }></progress>
                        <p class="inline-block m-0">${
                          employee_performances?.Instructions
                            ? employee_performances?.Instructions
                            : 0
                        }</p>
                      </td>
                    </tr>
          
                    <!-- Row #2 -->
                    <tr>
                      <td colspan="1" class="font-medium">
                        Obedient/Follows Instructions
                      </td>
                      <td colspan="1" class="font-normal text-gray-700 flex items-center">
                          <progress max="100" style="width: 110px; display: inline; margin-right: 2px;" value=${
                           employee_performances?.Obedience
                             ? employee_performances?.Obedience * 20
                             : 0 * 20
                          }></progress>
                        <p class="inline-block m-0">${
                          employee_performances?.Obedience
                            ? employee_performances?.Obedience
                            : 0
                        }</p>
                      </td>
          
                      <td colspan="1" class="font-medium">
                        Carefulness with Employers items
                      </td>
                      <td colspan="1" class="font-normal text-gray-700 flex items-center">
                          <progress max="100" style="width: 110px; display: inline; margin-right: 2px;" value=${
                           employee_performances?.Consciencious
                             ? employee_performances?.Consciencious * 20
                             : 0 * 20
                          }></progress>
                        <p class="inline-block m-0">${
                          employee_performances?.Consciencious
                            ? employee_performances?.Consciencious
                            : 0
                        }</p>
                      </td>
                    </tr>
          
                    <!-- Row #3 -->
                    <tr>
                      <td colspan="1" class="font-medium">Availability/Attendance</td>
                      <td colspan="1" class="font-normal text-gray-700 flex items-center">
                          <progress max="100" style="width: 110px; display: inline; margin-right: 2px;" value=${
                           employee_performances?.Availability
                             ? employee_performances?.Availability * 20
                             : 0 * 20
                          }></progress>
                        <p class="inline-block m-0">${
                          employee_performances?.Availability
                            ? employee_performances?.Availability
                            : 0
                        }</p>
                      </td>
          
                      <td colspan="1" class="font-medium">Problem Solving</td>
                      <td colspan="1" class="font-normal text-gray-700 flex items-center">
                          <progress max="100" style="width: 110px; display: inline; margin-right: 2px;" value=${
                           employee_performances?.Initiative
                             ? employee_performances?.Initiative * 20
                             : 0 * 20
                          }></progress>
                        <p class="inline-block m-0">${
                          employee_performances?.Initiative
                            ? employee_performances?.Initiative
                            : 0
                        }</p>
                      </td>
                    </tr>
          
                    <!-- Row #4 -->
                    <tr>
                      <td colspan="1" class="font-medium">Kind and Compassionate</td>
                      <td colspan="1" class="font-normal text-gray-700 flex items-center">
                          <progress max="100" style="width: 110px; display: inline; margin-right: 2px;" value=${
                           employee_performances?.Kindness
                             ? employee_performances?.Kindness * 20
                             : 0 * 20
                          }></progress>
                        <p class="inline-block m-0">${
                          employee_performances?.Kindness
                            ? employee_performances?.Kindness
                            : 0
                        }</p>
                      </td>
          
                      <td colspan="1" class="font-medium">Diligence during work</td>
                      <td colspan="1" class="font-normal text-gray-700 flex items-center">
                          <progress max="100" style="width: 110px; display: inline; margin-right: 2px;" value=${
                           employee_performances?.Dilgence
                             ? employee_performances?.Dilgence * 20
                             : 0 * 20
                          }></progress>
                        <p class="inline-block m-0">${
                          employee_performances?.Dilgence
                            ? employee_performances?.Dilgence
                            : 0
                        }</p>
                      </td>
                    </tr>
          
                    <!-- Row #5 -->
                    <tr>
                      <td colspan="1" class="font-medium">Safe Person to be Around</td>
                      <td colspan="1" class="font-normal text-gray-700 flex items-center">
                          <progress max="100" style="width: 110px; display: inline; margin-right: 2px;" value=${
                           employee_performances?.Safety
                             ? employee_performances?.Safety * 20
                             : 0 * 20
                          }></progress>
                        <p class="inline-block m-0">${
                          employee_performances?.Safety
                            ? employee_performances?.Safety
                            : 0
                        }</p>
                      </td>
          
                      <td colspan="1" class="font-medium">Hardworking</td>
                      <td colspan="1" class="font-normal text-gray-700 flex items-center">
                          <progress max="100" style="width: 110px; display: inline; margin-right: 2px;" value=${
                           employee_performances?.Work_Ethics
                             ? employee_performances?.Work_Ethics * 20
                             : 0 * 20
                          }></progress>
                        <p class="inline-block m-0">${
                          employee_performances?.Work_Ethics
                            ? employee_performances?.Work_Ethics
                            : 0
                        }</p>
                      </td>
                    </tr>
          
                    <!-- Row #6 -->
                    <tr>
                      <td colspan="1" class="font-medium">
                        Keeps Self and Surroundings Clean
                      </td>
                      <td colspan="1" class="font-normal text-gray-700 flex items-center">
                          <progress max="100" style="width: 110px; display: inline; margin-right: 2px;" value=${
                           employee_performances?.Clenliness
                             ? employee_performances?.Clenliness * 20
                             : 0 * 20
                          }></progress>
                        <p class="inline-block m-0">${
                          employee_performances?.Clenliness
                            ? employee_performances?.Clenliness
                            : 0
                        }</p>
                      </td>
          
                      <td colspan="1" class="font-medium">
                        Overall Work Quality Assessment
                      </td>
                      <td colspan="1" class="font-normal text-gray-700 flex items-center">
                          <progress max="100" style="width: 110px; display: inline; margin-right: 2px;" value=${
                           employee_performances?.Quality
                             ? employee_performances?.Quality * 20
                             : 0 * 20
                          }></progress>
                        <p class="inline-block m-0">${
                          employee_performances?.Quality
                            ? employee_performances?.Quality
                            : 0
                        }</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
          
                ${"<br />".repeat(2)}
          
                <h3 class="font-semibold m-0">Overall Assesment</h3>
                <p class="m-0">${
                  get_employeepro_data?.Assessment
                    ? get_employeepro_data?.Assessment
                    : '-'
                }</p>
          
                <br />
                <br />
          
                <!-- Incidence Report -->
                <h2 class="text-xl">Incidence Report</h2>
          
                <!-- One -->
                ${
                  incidenceReports?.length > 0
                    ? incidenceReports
                        ?.map((item, index) => {
                          // console.log('item', item)
                          const dateSep = moment(
                            item?.Date_Submitted,
                            'YYYY-MM-DD HH:mm:ss',
                          );
                          const date = dateSep.format('DD/MM/YYYY');
                          return ` <div
                      class="p-3 bg-gray-200 mt-6"
                      style="border: 1px solid ${
                        item?.rate == 'Good' ? '#4991E7' : '#EB5757'
                      }; border-radius: 10px; background-color:${
                            item?.rate == 'Good' ? '#F1F5F9' : '#F9F2F2'
                          }"
                    >
                      <div class="w-full !text-base">
                          <!-- Row #1 -->
                            <div style="width: 45%; padding: 10px 0;" class="inline-block font-medium text-base">
                              Reported Incidence:
                            </div>
                            <div style="width: 45%; padding: 10px 0;" class="inline-block font-normal text-gray-700 text-base">
                              ${item?.Incident ? item?.Incident : '-'}
                            </div>
              
                          <!-- Row #2 -->
                            <div style="width: 45%; padding: 10px 0;" class="inline-block font-medium text-base">
                              Date Submitted:
                            </div>
                            <div style="width: 45%; padding: 10px 0;" class="inline-block font-normal text-gray-700 text-base">
                            ${date}
                            </div>
              
                          <!-- Row #3 -->
                            <div style="width: 45%; padding: 10px 0;" class="inline-block font-medium text-base">
                              Employer Assessment:
                            </div>
                            <div style="width: 45%; padding: 10px 0;" class="inline-block font-normal text-gray-700 text-base">
                            ${item?.Comment}
                            </div>
              
                          <!-- Row #4 -->
                            <div style="width: 45%; padding: 10px 0;" class="inline-block font-medium text-base">
                              Resolution:
                            </div>
                            <div style="width: 45%; padding: 10px 0;" class="inline-block font-normal text-gray-700 text-base">
                            ${item?.Resolution}
                            </div>
              
                          <!-- Row #5 -->
                            <div style="width: 45%; padding: 10px 0;" class="inline-block font-medium text-base">
                              Action Taken:
                            </div>
                            <div style="width: 45%; padding: 10px 0;" class="inline-block font-normal text-gray-700 text-base">
                            ${item?.External_Action_Taken}
                            </div>
                      </div>
                    </div>
                    `;
                        })
                        .join('')
                    : ''
                }
               
          
                <!-- Two -->
             
          
                ${"<br />".repeat(2)}
          
                <p class="font-medium">
                  CheckMyPeople accepts no liability for the use of our services or for
                  the consequences of any action taken based on the information provided
                  through this platform.
                </p>
          
                <p class="font-medium">
                  Signed
                  <br />
                  CheckMyPeople
                </p>
              </div>
            </body>
          </html>
          `,
          fileName: 'Employee_detail',
          base64: true,
        });
  
        await RNPrint.print({ filePath: results.filePath });
      } else {
        Toast.show('Permission Not Granted');
      }
    } catch (error) {
      console.log('Error requesting storage permission:', error);
    }
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        // height: 300,
        // width: 200,
        backgroundColor: Color.LightGrey,
      }}>
      {/* <ScrollView nestedScrollEnabled style={{height:'100%',width:'100%'}} scrollEnabled> */}
      <Tabs.Container
        // allowHeaderOverscroll
        headerHeight={HEADER_HEIGHT}
        pagerProps={'horizontal'}
        revealHeaderOnScroll
        renderTabBar={props => (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <MaterialTabBar
              {...props}
              scrollEnabled
              indicatorStyle={{backgroundColor: Color.Main}}
            />
          </ScrollView>
        )}
        renderHeader={Header}>
        <Tabs.Tab name="About" label="  About">
          <Tabs.ScrollView showsVerticalScrollIndicator={false}>
            <View style={GlobalStyle.Padding}>
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: Font.Inter500,
                  textAlign: 'left',
                  marginVertical: 20,
                  color: '#22293B',
                }}>
                {type == 'detail'
                  ? 'About employee'
                  : type == 'search'
                  ? 'About employee'
                  : 'Add employee'}
              </Text>
              <View
                style={[GlobalStyle.KeyValueContainer, {marginHorizontal: 0}]}>
                <KeyValue keys="Employee ID" value={get_employeepro_data?.id} />
                <KeyValue keys="Identification No" value={formattedNumber} />
                {/* <KeyValue keys="Search Date" value={newSeparated} /> */}
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
                <KeyValue
                  keys="DOB"
                  value={get_employeepro_data?.DOB ? dobNew : null}
                />
                <KeyValue
                  keys="Age"
                  value={get_employeepro_data?.DOB ? age : null}
                />
                <KeyValue keys="Sex" value={get_employeepro_data?.Sex} />
                <KeyValue
                  keys="Marital status"
                  value={get_employeepro_data?.Marita_Status}
                />
              </View>
            </View>
          </Tabs.ScrollView>
        </Tabs.Tab>

        <Tabs.Tab name="Contact info" label="    Contact Info">
          <Tabs.ScrollView showsVerticalScrollIndicator={false}>
            <View style={GlobalStyle.Padding}>
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: Font.Inter500,
                  textAlign: 'left',
                  marginVertical: 20,
                  color: '#22293B',
                }}>
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
                <KeyValue
                  keys="Phone Carrier"
                  value={get_employeepro_data?.PhoneCarrier}
                />
                <KeyValue keys="City" value={get_employeepro_data?.City} />
                <KeyValue
                  keys="State"
                  value={get_employeepro_data?.state?.state}
                />
                <KeyValue keys="LGA" value={getInitialLocalGrn?.value ? getInitialLocalGrn?.value : ''} />
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
          </Tabs.ScrollView>
        </Tabs.Tab>

        <Tabs.Tab name="Referee" label="    Referee">
          <Tabs.ScrollView showsVerticalScrollIndicator={false}>
            <View style={GlobalStyle.Padding}>
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: Font.Inter500,
                  textAlign: 'left',
                  marginVertical: 20,
                  color: '#22293B',
                }}>
                Referee’s info
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
                  value={get_employeepro_data?.RefereeContactPhone}
                />
              </View>
            </View>
          </Tabs.ScrollView>
        </Tabs.Tab>

        <Tabs.Tab name="Work History" label="    Work History">
          <Tabs.ScrollView showsVerticalScrollIndicator={false}>
            <View style={GlobalStyle.Padding}>
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: Font.Inter500,
                  textAlign: 'left',
                  marginVertical: 20,
                  color: '#22293B',
                }}>
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
                  value={
                    get_employeepro_data?.Date_Hired ? newchangeDHire : null
                  }
                />
                <KeyValue
                  keys="Date Seprated"
                  value={
                    get_employeepro_data?.Date_Seperated ? newchangeDSepr : null
                  }
                />
                <KeyValue
                  keys="Length of Employment"
                  value={get_employeepro_data?.length_of_Employment}
                />
                <KeyValue
                  keys="Conduct"
                  value={get_employeepro_data?.Conduct}
                />
                <KeyValue
                  keys="Hire Again"
                  value={get_employeepro_data?.Hire_Again  == 1 ? 'Yes' : 'No'}
                />
              </View>
            </View>
          </Tabs.ScrollView>
        </Tabs.Tab>
      </Tabs.Container>
      {/* </ScrollView> */}
      {type == 'detail' ? (
        <View style={GlobalStyle.EndBtnBox}>
          <CustomButton
            Ripple={GlobalStyle.PurpleRipple}
            textStyle={{color: Color.Main}}
            title="Report incidence"
            onPress={() =>
              navigation.navigate('incidentReport', {
                incidenceReports: get_employeepro_data?.incidences,
                userData: get_employeepro_data,
              })
            }
            ButtonStyle={[GlobalStyle.ReverseBtn, {flex: 0.45}]}
          />
          <CustomButton
            Ripple={GlobalStyle.WhiteRipple}
            title="Update report"
            onPress={() =>
              navigation.navigate('updatebasicinfo', {
                data: get_employeepro_data,
              })
            }
            ButtonStyle={{flex: 0.45}}
          />
        </View>
      ) : (
        <CustomButton
          onPress={downloadePDF}
          Ripple={GlobalStyle.PurpleRipple}
          title="Download Report"
          ButtonStyle={[GlobalStyle.ReverseBtn, {marginBottom: 10}]}
          textStyle={{color: Color.Main}}
        />
      )}
    </SafeAreaView>
  );
};

export default SearchResult;
