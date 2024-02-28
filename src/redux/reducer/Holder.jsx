export const USER_DETAIL = 'USER_DETAIL';
export const TOKEN = 'TOKEN';
export const OTP = 'OTP';
export const STATE_VALUE = 'STATE_VALUE';
export const LOCAL_GOVERNMENT = 'LOCAL_GOVERNMENT';
export const ESTATE_LOCATIONS = 'ESTATE_LOCATIONS';
export const ESTATE = 'ESTATE';
export const INCIDENCE_TYPES = 'INCIDENCE_TYPES';
export const AGENCY = 'AGENCY';
export const PAYMENT_COMPLETE = 'PAYMENT_COMPLETE';

export const ADD_EMPLOYEE_DETAIL = 'ADD_EMPLOYEE_DETAIL';
export const ADD_PROFILE_IMAGE = 'ADD_PROFILE_IMAGE';
export const GET_EMPLOYEE_PERFORMANCE = 'GET_EMPLOYEE_PERFORMANCE';
export const GET_EMPLOYEE_INCIDENTREP = 'GET_EMPLOYEE_INCIDENTREP';
export const GET_DASHBOARD_DATA = 'GET_DASHBOARD_DATA';
export const GET_LOGHISTORY_DATA = 'GET_LOGHISTORY_DATA';
export const GET_EMPLOYEEPRO_DATA = 'GET_EMPLOYEEPRO_DATA';
export const GET_PAYMENTHISTORY_DATA = 'GET_PAYMENTHISTORY_DATA';
export const SEARCH_HISTORY_DATA = 'SEARCH_HISTORY_DATA';

export const GET_NEW_DASHBOARD_DATA = 'GET_NEW_DASHBOARD_DATA';
export const SEARCH_DETAIL_LOADER = 'SEARCH_DETAIL_LOADER';
export const PAYMENTHISTORY_LOADER = 'PAYMENTHISTORY_LOADER';

export const DRAWER_COLOR = 'DRAWER_COLOR';
export const ACCOUNT_SET_INDEX = 'ACCOUNT_SET_INDEX';

const initialState = {
  user_detail: null,
  otp: null,
  token: null,
  account_set_index: 0,
  states: [],
  search_history_data: [],
  local_government: [],
  estate_locations: [],
  estates: [],
  agency_data: [],
  incidence_types: [],
  payment_complete: false,
  drawer_color: true,
  search_detail_loader: true,
  paymenthistory_loader: false,
  add_Employee_Detail: [],
  add_profile_image: null,
  get_employee_performance: {},
  get_employee_incidentrep: [],
  get_dashboard_data: [],
  get_new_dashboard_data: [],
  get_loghistory_data: {},
  get_employeepro_data: {},
  get_paymenthistory_data: {},
};

const holderReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_DETAIL:
      return {
        ...state,
        user_detail: action.payload,
      };

    case DRAWER_COLOR:
      return {
        ...state,
        drawer_color: action.payload,
      };
    case PAYMENTHISTORY_LOADER:
      return {
        ...state,
        paymenthistory_loader: action.payload,
      };
      case ACCOUNT_SET_INDEX:
        return {
          ...state,
          account_set_index: action.payload,
        };
    case SEARCH_DETAIL_LOADER:
      return {
        ...state,
        search_detail_loader: action.payload,
      };
    case GET_NEW_DASHBOARD_DATA:
      return {
        ...state,
        get_new_dashboard_data: action.payload,
      };
    case SEARCH_HISTORY_DATA:
      return {
        ...state,
        search_history_data: action.payload,
      };
    case GET_PAYMENTHISTORY_DATA:
      return {
        ...state,
        get_paymenthistory_data: action.payload,
      };
    case GET_EMPLOYEEPRO_DATA:
      return {
        ...state,
        get_employeepro_data: action.payload,
      };
    case GET_DASHBOARD_DATA:
      return {
        ...state,
        get_dashboard_data: action.payload,
      };
    case GET_LOGHISTORY_DATA:
      return {
        ...state,
        get_loghistory_data: action.payload,
      };
    case GET_EMPLOYEE_PERFORMANCE:
      return {
        ...state,
        get_employee_performance: action.payload,
      };
    case GET_EMPLOYEE_INCIDENTREP:
      return {
        ...state,
        get_employee_incidentrep: action.payload,
      };
    case OTP:
      return {
        ...state,
        otp: action.payload,
      };
    case TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case STATE_VALUE:
      return {
        ...state,
        state_value: action.payload,
      };
    case AGENCY:
      return {
        ...state,
        agency_data: action.payload,
      };
    case LOCAL_GOVERNMENT:
      return {
        ...state,
        local_government: action.payload,
      };
    case ESTATE_LOCATIONS:
      return {
        ...state,
        estate_locations: action.payload,
      };
    case ESTATE:
      return {
        ...state,
        estates: action.payload,
      };
    case INCIDENCE_TYPES:
      return {
        ...state,
        incidence_types: action.payload,
      };
    case PAYMENT_COMPLETE:
      return {
        ...state,
        payment_complete: action.payload,
      };
    case ADD_EMPLOYEE_DETAIL:
      return {
        ...state,
        add_Employee_Detail: action.payload,
      };
    case ADD_PROFILE_IMAGE:
      return {
        ...state,
        add_profile_image: action.payload,
      };
    default: {
      return state;
    }
  }
};

export default holderReducer;
