import {BaseUrl} from '../../Constants/Urls';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Snackbar from 'react-native-snackbar';

import {
  STATE_VALUE,
  ESTATE,
  ESTATE_LOCATIONS,
  INCIDENCE_TYPES,
  LOCAL_GOVERNMENT,
  USER_DETAIL,
  OTP,
  TOKEN,
  AGENCY,
} from '../reducer/Holder';

export const register = (
  pastData,
  data,
  company_data,
  state,
  residesInEstate,
  estate,
  govLocation,
  title,
  estateLocation,
  accountType,
  setLoad,
  error,
  msg,
) => {
  return async dispatch => {
    setLoad(true);
    console.log('company_data', company_data);
    try {
      let url = `${BaseUrl}register`;
      let myData = new FormData();
      {
        company_data?.f_name &&
          myData.append('First_Name', company_data?.f_name);
      }
      {
        company_data?.l_name &&
          myData.append('Last_Name', company_data?.l_name);
      }
      {
        pastData?.city && myData.append('City', pastData.city);
      }
      {
        company_data?.email && myData.append('Email', company_data?.email);
      }
      {
        company_data?.number &&
          myData.append('Telephone', company_data?.number);
      }

      myData.append('Password', data.password);
      myData.append('Title', title);
      myData.append(
        'type',
        accountType == 'Corporate' ? 'corporate' : 'member',
      );
      {
        residesInEstate && myData.append('Estate_Resident', residesInEstate);
      }
      {
        state && myData.append('state_id', state);
      }
      {
        govLocation && myData.append('LocalGovernment', govLocation);
      }
      {
        pastData?.occupation &&
          myData.append('Occupation', pastData?.occupation);
      }
      {
        company_data?.companyName &&
          myData.append('CompanyName', company_data?.companyName);
      }
      {
        company_data?.CACNumber &&
          myData.append('CACRegistration', company_data?.CACNumber);
      }

      {
        estateLocation && myData.append('Estate_Location', estateLocation);
      }
      {
        estate && myData.append('EstateID', estate);
      }
      {
        company_data?.industry &&
          myData.append('Industry', company_data?.industry);
      }
      {
        pastData?.jobtitle && myData.append('JobTitle', pastData.jobtitle);
      }

      const response = await fetch(url, {
        body: myData,
        method: 'POST',
      });
      const responseData = await response.json();

      console.log('responseData -----', responseData);
      if (responseData?.status == 200) {
        setTimeout(() => {
          setLoad(false);
        }, 1000);
        dispatch({type: USER_DETAIL, payload: responseData?.customer});
        dispatch({
          type: TOKEN,
          payload: responseData?.customer?.plain_text_token,
        });
        await AsyncStorage.setItem(
          'user_detail',
          JSON.stringify(responseData.customer),
        );

        await AsyncStorage.setItem(
          'token',
          JSON.stringify(responseData?.customer?.plain_text_token),
        );
      } else if (responseData?.status == 422) {
        setLoad(false);
        Toast.show('The email has already been taken.');
      } else {
        setLoad(false);
        error(true);
        msg(responseData?.error);
      }
    } catch (error) {
      setLoad(false);
      console.log('catch error');
    }
  };
};

export const login_api = (data, load, error, msg) => {
  load(true);
  return async dispatch => {
    try {
      let url = `${BaseUrl}login`;
      let myData = new FormData();

      myData.append('email', data.email);
      myData.append('password', data.password);

      const response = await fetch(url, {
        body: myData,
        method: 'POST',
      });
      console.log('response', response);
      const responseData = await response.json();
      if (responseData?.status == 200) {
        await AsyncStorage.setItem(
          'token',
          JSON.stringify(responseData.customer.plain_text_token),
        );
        await AsyncStorage.setItem(
          'user_detail',
          JSON.stringify(responseData.customer),
        );

        console.log(
          'responseData.customer.plain_text_token',
          responseData.customer.plain_text_token,
        );
        dispatch({type: USER_DETAIL, payload: responseData.customer});
        dispatch({
          type: TOKEN,
          payload: responseData.customer.plain_text_token,
        });
        load(false);
      } else {
        load(false);
        error(true);
        msg(responseData.error);
      }
    } catch (error) {
      load(false);
      console.log('login catch error', error);
    }
  };
};

export const find_account = (data, navigation, load,error, msg) => {
  return async dispatch => {
    load(true);
    try {
      let url = `${BaseUrl}member/forgot/password`;
      let myData = new FormData();

      myData.append('email', data.email);

      const response = await fetch(url, {
        body: myData,
        method: 'POST',
      });
      const responseData = await response.json();
      console.log('responseData ==>', responseData)
      if (responseData?.status == 200) {
        load(false);
        dispatch({type: OTP, payload: responseData.otp});
        navigation.navigate('reset', {
          data: data,
        });
        console.log('working');
      } else {
        load(false); error(true);
        msg(responseData.error);
      }
    } catch (error) {
      load(false);
      console.log('login catch error', error);
    }
  };
};

export const change_password = async (data, navigation, load,error, msg) => {
  load(true);
  try {
    console.log('data', data);
    let url = `${BaseUrl}member/update/password`;
    let myData = new FormData();

    myData.append('password', data.password);
    myData.append('password_confirmation', data.ConfirmPassword);

    const response = await fetch(url, {
      method: 'post',
      body: myData,
    });
    console.log(response);
    load(false);
    // navigation.navigate('Login');
    const responseData = await response.json();
    console.log('responseData ====>', responseData);
    // if (responseData?.status == 200) {
    //   // navigation.navigate('Login');
    //   console.log('first');
    //   load(false);
    // } else {
    //   load(false);
    // }
  } catch (error) {
    load(false);
    console.log(error);
  }
};

export const get_state = () => {
  return async dispatch => {
    try {
      let url = `${BaseUrl}states`;

      const response = await fetch(url);

      const responseData = await response.json();
      if (responseData?.status == 200) {
        const transformedData = [];
        for (const key in responseData?.states) {
          transformedData.push({
            id: key,
            label: responseData?.states[key],
            value: responseData?.states[key],
          });
        }
        dispatch({type: STATE_VALUE, payload: transformedData});
      } else {
        Toast.show(responseData.error);
      }
    } catch (error) {
      console.log('login catch error', error);
    }
  };
};

export const get_local_government = () => {
  return async dispatch => {
    try {
      let url = `${BaseUrl}local-government-areas`;

      const response = await fetch(url);

      const responseData = await response.json();
      if (responseData?.status == 200) {
        const newData = responseData?.localGovtAreas?.map((item, index) => ({
          id: item?.id,
          state_id: item?.state_id,
          label: item?.area,
          value: item?.area,
        }));
        // const transformedData = [];
        // for (const key in responseData?.localGovtAreas) {
        //   transformedData.push({
        //     id: key,
        //     label: responseData?.localGovtAreas[key],
        //     value: responseData?.localGovtAreas[key],
        //   });
        // }
        dispatch({
          type: LOCAL_GOVERNMENT,
          payload: newData,
        });
      } else {
        Toast.show(responseData.error);
      }
    } catch (error) {
      console.log('login catch error', error);
    }
  };
};

export const get_estate_locations = () => {
  return async dispatch => {
    try {
      let url = `${BaseUrl}estate-locations`;

      const response = await fetch(url);

      const responseData = await response.json();
      if (responseData?.status == 200) {
        const transformedData = [];
        for (const key in responseData?.estateLocations) {
          transformedData.push({
            id: key,
            label: responseData?.estateLocations[key],
            value: responseData?.estateLocations[key],
          });
        }
        dispatch({
          type: ESTATE_LOCATIONS,
          payload: transformedData,
        });
      } else {
        Toast.show(responseData.error);
      }
    } catch (error) {
      console.log('login catch error', error);
    }
  };
};

export const get_estates = () => {
  return async dispatch => {
    try {
      let url = `${BaseUrl}estates`;

      const response = await fetch(url);

      const responseData = await response.json();
      if (responseData?.status == 200) {
        const transformedData = [];
        for (const key in responseData?.estates) {
          transformedData.push({
            id: key,
            label: responseData?.estates[key],
            value: responseData?.estates[key],
          });
        }
        dispatch({
          type: ESTATE,
          payload: transformedData,
        });
      } else {
        Toast.show(responseData.error);
      }
    } catch (error) {
      console.log('login catch error', error);
    }
  };
};

export const get_incidence_types = () => {
  return async dispatch => {
    try {
      let url = `${BaseUrl}incidence-types`;

      const response = await fetch(url);

      const responseData = await response.json();
      if (responseData?.status == 200) {
        const transformedData = [];
        for (const key in responseData?.incidenceTypes) {
          transformedData.push({
            id: key,
            label: responseData?.incidenceTypes[key],
            value: responseData?.incidenceTypes[key],
          });
        }
        dispatch({
          type: INCIDENCE_TYPES,
          payload: transformedData,
        });
      } else {
        Toast.show(responseData.error);
      }
    } catch (error) {
      console.log('login catch error', error);
    }
  };
};

export const get_agency = () => {
  return async dispatch => {
    try {
      let url = `${BaseUrl}agencies`;

      const response = await fetch(url);
      const responseData = await response.json();
      if (responseData?.status == 200) {
        const agencyStaticData = [
          {id: 95, AgencyName: 'Word Of Mouth'},
          {id: 96, AgencyName: 'Family'},
          {id: 97, AgencyName: 'Private Referral'},
        ];
        dispatch({
          type: AGENCY,
          payload: [...agencyStaticData, ...responseData.agencies],
        });
      } else {
        Toast.show(responseData.error);
      }
    } catch (error) {
      console.log('login catch error', error);
    }
  };
};

export const checkEmailAddress = async (
  accountType,
  data,
  title,
  navigation,
  setLoader,
  error,
  msg
) => {
  try {
    setLoader(true);
    let url = `${BaseUrl}has-account`;
    const myData = new FormData();
console.log('data?.email', data?.email)
    myData.append('email', data?.email);

    const response = await fetch(url, {
      method: 'post',
      body: myData,
    });
    const responseData = await response.json();
    console.log('responseData', responseData)
    if (responseData?.status == 200) {
      setLoader(false);
      error(true);
      msg(responseData.message);
    } else {
      setLoader(false);
      navigation.navigate('WorkDetails', {
        type: accountType,
        company_data: data,
        title: title,
      });
    }
  } catch (error) {
    setLoader(false);
    console.log('error', error);
  }
};
