import AsyncStorage from '@react-native-async-storage/async-storage';
import {BaseUrl} from '../../Constants/Urls';
import Toast from 'react-native-simple-toast';
import {
  ADD_EMPLOYEE_DETAIL,
  GET_DASHBOARD_DATA,
  GET_EMPLOYEEPRO_DATA,
  GET_EMPLOYEE_INCIDENTREP,
  GET_EMPLOYEE_PERFORMANCE,
  GET_LOGHISTORY_DATA,
  GET_NEW_DASHBOARD_DATA,
  GET_PAYMENTHISTORY_DATA,
  PAYMENTHISTORY_LOADER,
  SEARCH_DETAIL_LOADER,
  SEARCH_HISTORY_DATA,
  TOKEN,
  USER_DETAIL,
} from '../reducer/Holder';
import {get_agency} from './AuthActions';

export const identity_verified = (data, load, topUpModal, verify_success,error,msg) => {
  load(true);
  return async dispatch => {
    const TokenData = await AsyncStorage.getItem('token');
    const Token = JSON.parse(TokenData);
    try {
      let url = `${BaseUrl}identity-verified`;
      let theData = new FormData();

      theData.append('bvn', data.value);

      var myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${Token}`);

      const response = await fetch(url, {
        body: theData,
        method: 'POST',
        headers: myHeaders,
      });

      const responseData = await response.json();
      if (responseData?.status == 200) {
        dispatch({type: USER_DETAIL, payload: responseData.customer});
        await AsyncStorage.setItem(
          'user_detail',
          JSON.stringify(responseData.customer),
        );
        setTimeout(() => {
          load(false);
        }, 1000);
        setTimeout(() => {
          verify_success(true);
        }, 2000);
      } else if (
        responseData?.message ==
        'Your balance is insufficient for this verification!'
      ) {
        load(false);
        setTimeout(() => {
          topUpModal(true);
        }, 1000);
      } else {
       msg(responseData?.message);
        load(false);
        error(true);
      }
    } catch (error) {
      load(false);
      console.log(error);
    }
  };
};

export const add_member = (data, load, topUpModal, navigation,error,msg) => {
  load(true);
  return async dispatch => {
    const TokenData = await AsyncStorage.getItem('token');
    const Token = JSON.parse(TokenData);
    try {
      let url = `${BaseUrl}bvn-verification`;
      let theData = new FormData();

      theData.append('bvn', data.value);

      var myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${Token}`);

      const response = await fetch(url, {
        body: theData,
        method: 'POST',
        headers: myHeaders,
      });

      const responseData = await response.json();
      console.log('responseData vv', responseData);
      if (responseData?.status == 200) {
        navigation.navigate('addEmployeeInformation');
        dispatch({type: ADD_EMPLOYEE_DETAIL, payload: responseData});
        load(false);
      } else if (
        responseData?.message ==
        'Your balance is insufficient for this verification!'
      ) {
        setTimeout(() => {
          load(false);
        }, 0);
        setTimeout(() => {
          topUpModal(true);
        }, 1000);
      } else {
        msg(responseData?.message);
        load(false);
        error(true);
      }
    } catch (e) {
      load(false);
      console.log('catch error add_member', e);
    }
  };
};

export const send_employee = async (load, data, success, Data) => {
  console.log('data', data);
  load(true);
  const TokenData = await AsyncStorage.getItem('token');
  const Token = JSON.parse(TokenData);
  try {
    let url = `https://api.checkmypeople.logicsdrive.net/checkMyStaff/member/add-employee`;
    let theData = new FormData();

    theData.append('data', JSON.stringify(data));

    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${Token}`);

    const response = await fetch(url, {
      body: theData,
      method: 'POST',
      headers: myHeaders,
    });
    const responseData = await response.json();
    console.log('responseData.employee', responseData.employee);
    if (responseData?.status == 200) {
      Data(responseData.employee);
      setTimeout(() => {
        load(false);
      }, 1000);
      setTimeout(() => {
        success(true);
      }, 2000);
    } else {
      console.log(responseData?.message);
      setTimeout(() => {
        load(false);
      }, 1000);
    }
  } catch (e) {
    setTimeout(() => {
      load(false);
    }, 1000);
    console.log('catch error add_member', e);
  }
};

export const Employee_info = (load, id, navigation, setSuccess) => {
  return async dispatch => {
    try {
      console.log('id', id);
      load(true);
      const TokenData = await AsyncStorage.getItem('token');
      const Token = JSON.parse(TokenData);
      let url = `https://api.checkmypeople.logicsdrive.net/checkMyStaff/member/employee-detail`;
      let theData = new FormData();
      theData.append('employee_id', id);

      var myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${Token}`);

      const response = await fetch(url, {
        body: theData,
        method: 'POST',
        headers: myHeaders,
      });
      const responseData = await response.json();

      if (responseData?.status == 200) {
        dispatch({type: GET_EMPLOYEEPRO_DATA, payload: responseData?.employee});
        load(false);
        setSuccess(false);
        navigation.navigate('SearchResult', {
          type: 'detail',
          data: responseData?.employee,
          newType: 'modaal',
        });
      } else {
        console.log('else error');
        load(false);
      }
    } catch (e) {
      load(false);
      console.log('catch error Employee_info', e);
    }
  };
};

export const Upload_Basics = (
  data,
  status,
  BirthDay,
  gender,
  lga,
  city,
  nationality,
  prev_data,
  elm,
  occupation,
  Hired,
  Separated,
  conduct,
  yes,
  carrier,
  elmnt,
  image,
  stateId,
  load,
  navigation,
  agencyData,
  setSuccess,
  setNewData,
) => {
  return async dispatch => {
    try {
      console.log('lga', lga)
      // console.log(
      //   'object',
      //   BirthDay,
      //   agencyData?.id,
      //   nationality,
      //   data,
      //   status,
      //   image,
      //   gender,
      //   prev_data,
      //   carrier,
      //   conduct,
      //   yes,
      //   Separated,
      //   Hired,
      //   occupation,
      //   elmnt,
      // );
      const TokenData = await AsyncStorage.getItem('token');
      const Token = JSON.parse(TokenData);
      load(true);
      let url = `https://api.checkmypeople.logicsdrive.net/checkMyStaff/member/update-employee`;
      let theData = new FormData();

      theData.append('First_Name', data?.first_name);
      theData.append('Middle_Name', data?.middle_name);
      theData.append('Last_Name', data?.last_name);
      theData.append('Address', data?.address);

      theData.append('Marita_Status', status);

      theData.append('Nigerian', nationality == 'Yes' ? 1 : 0);
      // theData.append('Nigerian', nationality == 'Yes' ? true : false);
      {
        console.log('lga', lga)
        nationality == 'Yes' && theData.append('City', city);
        nationality == 'Yes' && theData.append('LGA', lga);
        nationality == 'Yes' && theData.append('stateid', stateId);
      }

      {
        image?.uri && theData.append('image', image);
      }
      theData.append('DOB', BirthDay);
      theData.append('Sex', gender);

      {
        agencyData?.id && theData.append('AgencyId', agencyData?.id);
      }

      theData.append('employee_id', prev_data?.id);

      theData.append('PhoneCarrier', carrier);
      theData.append('Conduct', conduct);
      theData.append('Hire_Again', yes == 'Yes' ? 1 : 0);
     {Separated && theData.append('Date_Seperated',String(Separated))}
    { Hired && theData.append('Date_Hired', Hired)}
      theData.append('Occupation', occupation);
      theData.append('Email', elm?.email);
      theData.append('CellPhone', elm?.phone ? elm?.phone : ' ');
      // theData.append('Assessment', elmnt?.description);
    theData.append('RefereeName', elm?.g_name ? elm?.g_name : ' ');
       theData.append('RefereeContactPhone', elm?.g_phone ? elm?.g_phone : ' ');
     theData.append('RefereeContactAddress', elm?.g_address ? elm?.g_address : ' ');

      console.log('two');

      var myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${Token}`);

      console.log('Token', Token);

      const response = await fetch(url, {
        body: theData,
        method: 'POST',
        headers: myHeaders,
      });

      console.log('response', response);

      const responseData = await response.json();

      console.log('responseData ===', responseData);

      if (responseData?.status == 200) {
        setTimeout(() => {
          setNewData(responseData?.employee);
        }, 500);
        setTimeout(() => {
          load(false);
        }, 1000);
        setTimeout(() => {
          setSuccess(true);
        }, 2000);
        // navigation.navigate('home');

        // ToastAndroid.show(`Updated successfully!`, ToastAndroid.LONG);
      } else {
        console.log('else error', responseData?.message);
        load(false);
      }
    } catch (e) {
      load(false);
      console.log('catch error Employee_info', e);
    }
  };
};

export const UploadBasicApi = async (
  data,
  status,
  BirthDay,
  gender,
  lga,
  city,
  nationality,
  prev_data,
  elm,
  occupation,
  Hired,
  Separated,
  conduct,
  yes,
  carrier,
  elmnt,
) => {
  try {
    console.log('data', data);
    const TokenData = await AsyncStorage.getItem('token');
    const Token = JSON.parse(TokenData);
    let url = `https://api.checkmypeople.logicsdrive.net/checkMyStaff/member/update-employee`;
    let theData = new FormData();

    // theData.append('First_Name', data.first_name);
  } catch (error) {
    console.log('error', error);
  }
};

export const AddPerofrmanceApi = (
  data,
  allrating,
  userData,
  score,
  setLoader,
  navigation,
  ToastAndroid,
) => {
  return async dispatch => {
    try {
      setLoader(true);
      const TokenData = await AsyncStorage.getItem('token');
      const Token = JSON.parse(TokenData);
      let url = `https://api.checkmypeople.logicsdrive.net/checkMyStaff/member/employee/add-performance`;
      console.log('score =====', score);
      console.log('allrating', allrating);
      let myData = new FormData();

      myData.append('EmpID', userData?.empid ? userData?.empid : userData?.id);
      myData.append(
        'CustID',
        userData?.Custid ? userData?.Custid : userData?.Cust_id,
      );
      myData.append('Trust', allrating?.Trust);
      myData.append('Obedience', allrating?.Obedience);
      myData.append('Availability', allrating?.Availability);
      myData.append('Kindness', allrating?.Kindness);
      myData.append('Safety', allrating?.Safety);
      myData.append('Clenliness', allrating?.Clenliness);
      myData.append('Instructions', allrating?.Instructions);
      myData.append('Consciencious', allrating?.Consciencious);
      myData.append('Initiative', allrating?.Initiative);
      myData.append('Dilgence', allrating?.Dilgence);
      myData.append('Work_Ethics', allrating?.Work_Ethics);
      myData.append('Quality', allrating?.Quality);
      myData.append('Commentary', data?.details);
      myData.append('Score', score);

      var myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${Token}`);

      const response = await fetch(url, {
        body: myData,
        method: 'POST',
        headers: myHeaders,
      });
      const responseData = await response.json();
      console.log('responseData -----', responseData);
      if (responseData?.status == 200) {
        dispatch(getEmployePerformnce(userData?.empid));
        setTimeout(() => {
          setLoader(false);
          navigation.goBack();
          navigation.goBack();
          Toast.show('Rating performance submited successfully!');
        }, 2000);
        // navigation.goBack();
        // ToastAndroid.show(
        //   `Rating performance submited successfully!`,
        //   ToastAndroid.LONG,
        // );
      } else {
        setLoader(false);
        alert('else error');
      }
    } catch (error) {
      setLoader(false);
      console.log('error', error);
    }
  };
};

export const AddIncidentApi = (
  incidence,
  data,
  resolutions,
  action,
  mode,
  rate,
  file,
  userData,
  setLoader,
  ToastAndroid,
  navigation,
) => {
  return async dispatch => {
    try {
      setLoader(true);
      const TokenData = await AsyncStorage.getItem('token');
      const Token = JSON.parse(TokenData);
      let url = `https://api.checkmypeople.logicsdrive.net/checkMyStaff/member/employee/add-incidence-report`;
      let myData = new FormData();

      myData.append('EmpID', userData?.id);
      myData.append('Incident', incidence);
      myData.append('Comment', data?.assessment);
      myData.append('Feedback_Mode', mode);
      myData.append('Resolution', resolutions);
      myData.append('External_Action_Taken', action);
      myData.append('rate', rate);
      {
        file?.uri &&
          action != 'No Action' &&
          myData.append('ExternalReport', file);
      }

      var myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${Token}`);

      const response = await fetch(url, {
        body: myData,
        method: 'POST',
        headers: myHeaders,
      });
      const responseData = await response.json();

      if (responseData?.status == 200) {
        setLoader(false);
        navigation.goBack();
        // navigation.goBack();
        dispatch(getEmployeIncidentRep(userData?.id));
        Toast.show('Report incident added successfully!');
        // ToastAndroid.show(
        //   `Report incident added successfully!`,
        //   ToastAndroid.LONG,
        // );
      } else {
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
      console.log('error', error);
    }
  };
};

export const getEmployePerformnce = id => {
  return async dispatch => {
    try {
      console.log('idd', id);
      const TokenData = await AsyncStorage.getItem('token');
      const Token = JSON.parse(TokenData);
      let url = `https://api.checkmypeople.logicsdrive.net/checkMyStaff/member/employee/performances`;
      let myData = new FormData();

      myData.append('employee_id', id);

      var myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${Token}`);

      const response = await fetch(url, {
        body: myData,
        method: 'POST',
        headers: myHeaders,
      });
      const responseData = await response.json();

      if (responseData?.status == 200) {
        if (responseData?.employeePerformances?.length > 0) {
          const cnvrtData = responseData?.employeePerformances?.reverse();
          dispatch({
            type: GET_EMPLOYEE_PERFORMANCE,
            payload: cnvrtData[0],
          });
        } else {
          console.log('object');
        }
      } else {
        console.log('else error');
      }
    } catch (error) {
      console.log('error', error);
    }
  };
};

export const getEmployeIncidentRep = id => {
  return async dispatch => {
    try {
      console.log('id', id);
      const TokenData = await AsyncStorage.getItem('token');
      const Token = JSON.parse(TokenData);
      let url = `https://api.checkmypeople.logicsdrive.net/checkMyStaff/member/employee/incidence-reports`;
      let myData = new FormData();

      myData.append('employee_id', id);

      var myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${Token}`);

      const response = await fetch(url, {
        body: myData,
        method: 'POST',
        headers: myHeaders,
      });
      const responseData = await response.json();
      // console.log(
      //   'responseData incidenceReports',
      //   responseData?.incidenceReports,
      // );

      if (responseData?.status == 200) {
        dispatch({
          type: GET_EMPLOYEE_INCIDENTREP,
          payload: responseData?.incidenceReports,
        });
      } else {
        console.log('else error');
      }
    } catch (error) {
      console.log('error', error);
    }
  };
};

export const getDashboardData = (
  numb,
  sort_by,
  filter,
  setLoader,
  setRows,
  setLoader2,
  type,
) => {
  // console.log('numb sort_by ilter', numb,
  // sort_by,
  // filter)
  return async dispatch => {
    try {
      setLoader(true);
      setLoader2(true);
      const TokenData = await AsyncStorage.getItem('token');
      const Token = JSON.parse(TokenData);
      let url = `https://api.checkmypeople.logicsdrive.net/checkMyStaff/member/employees`;
      let myData = new FormData();

      myData.append('rows', numb);
      myData.append('sort_by', sort_by);
      myData.append('filter', filter);

      var myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${Token}`);

      console.log('getDashboardData Token', Token);

      const response = await fetch(url, {
        body: myData,
        method: 'POST',
        headers: myHeaders,
      });
      console.log('getDashboardData response', response);

      const responseData = await response.json();
      console.log('getDashboardData responseData', responseData);
      if (responseData?.status == 200) {
        setRows(numb);
        dispatch({
          type: GET_DASHBOARD_DATA,
          payload: responseData?.customers,
        });
        if (type == 'home') {
          dispatch({
            type: GET_NEW_DASHBOARD_DATA,
            payload: responseData?.customers,
          });
        }
        setLoader(false);
        setLoader2(false);
      } else {
        setLoader(false);
        setLoader2(false);
        console.log('else error');
      }
    } catch (error) {
      setLoader(false);
      setLoader2(false);
      console.log('getDashboardData error', error);
    }
  };
};

export const getMoreDashboardData = (id, numb, data) => {
  return async dispatch => {
    try {
      console.log('id', id);
      const TokenData = await AsyncStorage.getItem('token');
      const Token = JSON.parse(TokenData);
      let url = `https://api.checkmypeople.logicsdrive.net/checkMyStaff/member/employees?page=${numb}`;
      let myData = new FormData();

      myData.append('employee_id', id);

      var myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${Token}`);

      const response = await fetch(url, {
        body: myData,
        method: 'POST',
        headers: myHeaders,
      });
      const responseData = await response.json();

      if (responseData?.status == 200) {
        const newData = responseData?.customers?.data;
        const addData = data?.data;
        dispatch({
          type: GET_DASHBOARD_DATA,
          payload: [...addData, ...newData],
        });
      } else {
        console.log('else error');
      }
    } catch (error) {
      console.log('error', error);
    }
  };
};
export const addAgencyData = (
  data,
  stateId,
  city,
  setLoader,
  navigation,
  setData,
) => {
  return async dispatch => {
    try {
      setLoader(true);
      const TokenData = await AsyncStorage.getItem('token');
      const Token = JSON.parse(TokenData);
      let url = `https://api.checkmypeople.logicsdrive.net/checkMyStaff/member/add/agency`;
      let myData = new FormData();

      myData.append('cac', data?.cac);
      myData.append('agency_name', data?.name);
      myData.append('agency_address', data?.address);
      myData.append('agency_city', city);
      myData.append('state', stateId);
      myData.append('phone_number', data?.phone);
      myData.append('agency_email', data?.email);
      myData.append('website', data?.name);
      myData.append('agency_personal_contact', data?.contact);
      // myData.append('rating', data?.name);
      myData.append('assessment', data?.assesment);

      var myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${Token}`);

      const response = await fetch(url, {
        body: myData,
        method: 'POST',
        headers: myHeaders,
      });
      const responseData = await response.json();

      console.log('responseData', responseData);

      if (responseData?.cac) {
        dispatch(get_agency());
        setLoader(false);
        navigation.goBack();
        setData(responseData);
        Toast.show('Agency added!');
      } else {
        setLoader(false);
        console.log('else error');
      }
    } catch (error) {
      setLoader(false);
      console.log('error', error);
    }
  };
};
export const verificationHistoryApi = (sort_by, filter, status, setLoader) => {
  return async dispatch => {
    console.log('sort_by ===', sort_by, filter, status);
    try {
      setLoader(true);
      const TokenData = await AsyncStorage.getItem('token');
      const Token = JSON.parse(TokenData);
      let url = `https://api.checkmypeople.logicsdrive.net/checkMyStaff/member/verification-history`;
      let myData = new FormData();

      myData.append('sort_by', sort_by);
      myData.append('filter', filter);
      myData.append('status', status);

      var myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${Token}`);

      const response = await fetch(url, {
        body: myData,
        method: 'POST',
        headers: myHeaders,
      });
      const responseData = await response.json();

      console.log('responseData ==>', responseData);

      if (responseData?.status == 200) {
        dispatch({
          type: GET_LOGHISTORY_DATA,
          payload: responseData?.verifications,
        });
        setLoader(false);
      } else {
        setLoader(false);
        console.log('else error');
      }
    } catch (error) {
      setLoader(false);
      console.log('error', error);
    }
  };
};
export const getPaymentHistoryApi = type => {
  return async dispatch => {
    try {
      console.log('type', type)
      dispatch({
        type: PAYMENTHISTORY_LOADER,
        payload: true,
      });
      const TokenData = await AsyncStorage.getItem('token');
      const Token = JSON.parse(TokenData);
      let url = `https://api.checkmypeople.logicsdrive.net/checkMyStaff/member/payment-history`;
      let myData = new FormData();

      myData.append('sort_by', type);
console.log('Token', Token)
      var myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${Token}`);

      const response = await fetch(url, {
        body: myData,
        method: 'POST',
        headers: myHeaders,
      });
      const responseData = await response.json();

      if (responseData?.status == 200) {
        dispatch({
          type: GET_PAYMENTHISTORY_DATA,
          payload: responseData?.paymentHistory,
        });
        dispatch({
          type: PAYMENTHISTORY_LOADER,
          payload: false,
        });
      } else {
        console.log('else error');
        dispatch({
          type: PAYMENTHISTORY_LOADER,
          payload: false,
        });
      }
    } catch (error) {
      dispatch({
        type: PAYMENTHISTORY_LOADER,
        payload: false,
      });
      console.log('error', error);
    }
  };
};
export const personalDeailsApi = (
  elm,
  title,
  stateId,
  localGovrnmnt,
  jobTitle,
  setLoader,
  data,
) => {
  return async dispatch => {
    try {
      console.log('localGovrnmnt', localGovrnmnt)
      setLoader(true);
      const TokenData = await AsyncStorage.getItem('token');
      const Token = JSON.parse(TokenData);
      let url = `https://api.checkmypeople.logicsdrive.net/checkMyStaff/member/update/profile`;
      let myData = new FormData();

      myData.append('Title', title);
      myData.append('First_Name', elm?.firstname);
      myData.append('Last_Name', elm?.lastname);
      myData.append('Middle_Name', elm?.middlename);
      myData.append('Address', elm?.address);
      myData.append('Telephone', elm?.phone);
      myData.append('state_id', stateId);
      myData.append('LocalGovernment', localGovrnmnt);
      {
        jobTitle && myData.append('JobTitle', jobTitle);
      }
      myData.append('Password', 2132121);
      myData.append('Occupation', data?.Occupation);
      myData.append('NumEmployed', data?.NumEmployed);
      myData.append('PreferredContactMode', data?.PreferredContactMode);
      myData.append('Natureofcontact', data?.Natureofcontact);

      var myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${Token}`);

      const response = await fetch(url, {
        body: myData,
        method: 'POST',
        headers: myHeaders,
      });
      const responseData = await response.json();

      if (responseData?.status == 200) {
        dispatch(getUserDetailss());
        // dispatch({type: USER_DETAIL, payload: responseData.customer});
        // dispatch({
        //   type: TOKEN,
        //   payload: responseData.customer.plain_text_token,
        // });
        // await AsyncStorage.setItem(
        //   'user_detail',
        //   JSON.stringify(responseData.customer),
        // );

        setTimeout(() => {
          setLoader(false);
          Toast.show('Personal details updated successfully!');
        }, 2000);
      } else {
        console.log('else error');
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
      console.log('error', error);
    }
  };
};
export const workDeailsApi = (
  occipation,
  staff,
  hearAboutUs,
  contactMode,
  setLoader,
  elm,
) => {
  return async dispatch => {
    try {
      setLoader(true);
      const TokenData = await AsyncStorage.getItem('token');
      const Token = JSON.parse(TokenData);
      let url = `https://api.checkmypeople.logicsdrive.net/checkMyStaff/member/update/profile`;
      let myData = new FormData();

      myData.append('First_Name', elm?.First_Name);
      myData.append('Last_Name', elm?.Last_Name);
      myData.append('Middle_Name', elm?.Middle_Name);
      myData.append('Address', elm?.Address);
      myData.append('Telephone', elm?.Telephone);
      myData.append('Title', elm?.Title);
      myData.append('state_id', elm?.state_id);
      myData.append('LocalGovernment', elm?.LocalGovernment);

      // myData.append('Email');
      // myData.append('Telephone');
      myData.append('Occupation', occipation?.occupation);
      myData.append('NumEmployed', staff);
      myData.append('PreferredContactMode', contactMode);
      myData.append('Natureofcontact', hearAboutUs);
      myData.append('Password', 2132121);
      // myData.append('CompanyName');
      // myData.append('CACRegistration');
      // myData.append('Industry');
      // myData.append('JobTitle');

      var myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${Token}`);

      const response = await fetch(url, {
        body: myData,
        method: 'POST',
        headers: myHeaders,
      });
      const responseData = await response.json();

      console.log('=================>', responseData);

      if (responseData?.status == 200) {
        dispatch(getUserDetailss());
        // dispatch({type: USER_DETAIL, payload: responseData.customer});
        // dispatch({
        //   type: TOKEN,
        //   payload: responseData.customer.plain_text_token,
        // });
        // await AsyncStorage.setItem(
        //   'user_detail',
        //   JSON.stringify(responseData.customer),
        // );
        setTimeout(() => {
          setLoader(false);
          Toast.show('Work details updated successfully!');
        }, 2000);
      } else {
        console.log('else error');
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
      console.log('error', error);
    }
  };
};
export const searchByBVN = (bvn, setData, setLoader,setTopUpModal, setErrorMsg) => {
  return async dispatch => {
    try {
      setLoader(true);
      const TokenData = await AsyncStorage.getItem('token');
      const Token = JSON.parse(TokenData);
      let url = `https://api.checkmypeople.logicsdrive.net/checkMyStaff/search`;
      let myData = new FormData();

      myData.append('bvn', bvn);

      var myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${Token}`);

      const response = await fetch(url, {
        body: myData,
        method: 'POST',
        headers: myHeaders,
      });
      const responseData = await response.json();

      console.log('searchByBVN =================>', responseData);

      if (responseData?.status == 200) {
        if (responseData?.employee?.data?.length > 0) {
          setData(responseData?.employee);
          // setFullData(responseData?.employee)
          setLoader(false);
          setErrorMsg(null)
        } else {
          dispatch({type: SEARCH_HISTORY_DATA, payload: []});
          setData({});
          setErrorMsg(null)
          setLoader(false);
          // setErrorMsg('message')
          // setErrorMsg('No Record Found')
          // Toast.show('User not found');
        }
      } else {
        dispatch({type: SEARCH_HISTORY_DATA, payload: []});
        setData({});
        setTopUpModal(true)
        setLoader(false);
        setErrorMsg('vv')
        // Toast.show('Low account balance!');
        console.log('else error');
       
      }
    } catch (error) {
      setLoader(false);
      // Toast.show('Something went wrong!');
      console.log('searchByBVN error', error);
    }
  };
};
export const userSearchHistory = () => {
  return async dispatch => {
    try {
      const TokenData = await AsyncStorage.getItem('token');
      const Token = JSON.parse(TokenData);
      let url = `https://api.checkmypeople.logicsdrive.net/checkMyStaff/member/search-history`;
      // let url = `${BaseUrl}member/search-history`;

      var myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${Token}`);

      const response = await fetch(url, {
        method: 'POST',
        headers: myHeaders,
      });
      const responseData = await response.json();

      //  console.log('userSearchHistory =================>', responseData);

      if (responseData?.status == 200) {
        dispatch({
          type: SEARCH_HISTORY_DATA,
          payload: responseData?.search_history?.search_history,
        });
        // console.log('agya userSearchHistory =================>');
      } else {
        dispatch({type: SEARCH_HISTORY_DATA, payload: []});
        console.log('userSearchHistory else error');
      }
    } catch (error) {
      console.log('userSearchHistory error', error);
    }
  };
};
export const changePassword = async (data, setLoader, navigation, reset,error,msg,sError,Smsg) => {
  try {
    setLoader(true);
    const TokenData = await AsyncStorage.getItem('token');
    const Token = JSON.parse(TokenData);
    let url = `https://api.checkmypeople.logicsdrive.net/checkMyStaff/change/password`;
    // let url = `${BaseUrl}change/password`;
    let myData = new FormData();

    myData.append('current_password', data?.password);
    myData.append('password', data?.new_password);
    myData.append('password_confirmation', data?.c_password);

    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${Token}`);

    const response = await fetch(url, {
      method: 'POST',
      headers: myHeaders,
      body: myData,
    });
    const responseData = await response.json();
    console.log('changePassword responseData ===>', responseData);

    if (responseData?.status == 200) {
      reset();
      setLoader(false);
      Toast.show('Password change successfully!');
      navigation.goBack();
    } else if (responseData?.errors) {
      setLoader(false);
      Smsg('The password and current password must be different.');
      sError(true)
    } else {
      setLoader(false);
      error(true)
      msg(responseData?.error)
    }
  } catch (error) {
    setLoader(false);
    console.log('error', error);
  }
};
export const getUserDetailss = () => {
  return async dispatch => {
    try {
      const data = await AsyncStorage.getItem('user_detail');
      const userData = JSON.parse(data);
      const TokenData = await AsyncStorage.getItem('token');
      const Token = JSON.parse(TokenData);
      let url = `https://api.checkmypeople.logicsdrive.net/checkMyStaff/member/profile`;
      let myData = new FormData();
      console.log('userData?.id', userData?.id);
      myData.append('employee_id', userData?.id);
      // myData.append('Last_Name', userData?.Last_Name);
      // myData.append('Middle_Name', userData?.Middle_Name);
      // myData.append('Address', userData?.Address);
      // myData.append('Telephone', userData?.Telephone);
      // myData.append('Title', userData?.Title);
      // myData.append('state_id', userData?.state_id);
      // myData.append('LocalGovernment', userData?.LocalGovernment);

      // myData.append('Email');
      // myData.append('Telephone');
      // myData.append('Occupation', occipation?.occupation);
      // myData.append('NumEmployed', staff);
      // myData.append('PreferredContactMode', contactMode);
      // myData.append('Natureofcontact', hearAboutUs);
      // myData.append('Password', null);

      var myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${Token}`);

      const response = await fetch(url, {
        body: myData,
        method: 'POST',
        headers: myHeaders,
      });
      const responseData = await response.json();
      // console.log(
      //   'responseData incidenceReports',
      //   responseData?.incidenceReports,
      // );

      console.log('getUserDetailss responseData', responseData);
      if (responseData?.status == 200) {
        dispatch({type: USER_DETAIL, payload: responseData.customer});
        dispatch({
          type: TOKEN,
          payload: responseData.customer.plain_text_token,
        });
        await AsyncStorage.setItem(
          'user_detail',
          JSON.stringify(responseData.customer),
        );
        // dispatch({
        //   type: GET_EMPLOYEE_INCIDENTREP,
        //   payload: responseData?.incidenceReports,
        // });
      } else {
        console.log('else error');
      }
    } catch (error) {
      console.log('getUserDetailss error', error);
    }
  };
};
export const updateEmployeeInFO = id => {
  return async dispatch => {
    try {
      dispatch({type: SEARCH_DETAIL_LOADER, payload: true});
      const TokenData = await AsyncStorage.getItem('token');
      const Token = JSON.parse(TokenData);
      let url = `https://api.checkmypeople.logicsdrive.net/checkMyStaff/member/employee-detail`;
      let theData = new FormData();
      theData.append('employee_id', id);

      var myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${Token}`);

      const response = await fetch(url, {
        body: theData,
        method: 'POST',
        headers: myHeaders,
      });
      const responseData = await response.json();

      if (responseData?.status == 200) {
        dispatch({type: GET_EMPLOYEEPRO_DATA, payload: responseData?.employee});
        dispatch({type: SEARCH_DETAIL_LOADER, payload: false});
      } else {
        dispatch({type: SEARCH_DETAIL_LOADER, payload: false});
        console.log('else error');
      }
    } catch (error) {
      dispatch({type: SEARCH_DETAIL_LOADER, payload: false});
      console.log('error', error);
    }
  };
};

export const ExtraSearchByBVN = async (API, bvn, setData, setLoader, data) => {
  try {
    setLoader(true);
    const TokenData = await AsyncStorage.getItem('token');
    const Token = JSON.parse(TokenData);
    let url = API;
    let myData = new FormData();

    myData.append('bvn', bvn);

    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${Token}`);

    const response = await fetch(url, {
      body: myData,
      method: 'POST',
      headers: myHeaders,
    });
    const responseData = await response.json();

    console.log('laraib =================>');

    if (responseData?.status == 200) {
      if (responseData?.employee?.data?.length > 0) {
        setData(prev => ({
          ...prev,
          data: [...prev?.data, ...responseData?.employee?.data],
        }));
        setLoader(false);
      } else {
        setLoader(false);
        Toast.show('Not enough data');
      }
    } else {
      setLoader(false);
      Toast.show('Low account balance!');
      console.log('else error');
    }
  } catch (error) {
    setLoader(false);
    Toast.show('Something went wrong!');
    console.log('searchByBVN error', error);
  }
};
