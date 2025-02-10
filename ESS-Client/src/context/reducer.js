import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  LOGOUT_USER,
  DISPLAY_PASS_ERROR,
  OPEN_SUB_OPTIONS,
  CLOSE_SUB_OPTIONS,
} from "./actions";

import { initialState } from "./appContext";

const reducer = (state, action) => {
  switch (action.type) {
    case DISPLAY_ALERT:
      return {
        ...state,
        showAlert: true,
        alert: {
          msg: action.payload.msg,
          type: action.payload.type,
        },
      };
    case CLEAR_ALERT:
      return {
        ...state,
        showAlert: false,
        alert: {
          msg: "",
          type: "",
        },
      };
    case SETUP_USER_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case SETUP_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        role: action.payload.role,
        jwtToken: action.payload.jwtToken,
        userId: action.payload.userId,
      };
    case SETUP_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        role: null,
        jwtToken: null,
        userId: null,
        team: null,
      };
    case LOGOUT_USER:
      return {
        ...state,
        role: null,
        jwtToken: null,
        userId: null,
        team: null,
      };
    case OPEN_SUB_OPTIONS:
      return {
        ...state,
        isSubOptionOpen: true,
      };
    case CLOSE_SUB_OPTIONS:
      return {
        ...state,
        isSubOptionOpen: false,
      };
    case DISPLAY_PASS_ERROR:
      return {
        ...state,
        showAlert: true,
        alert: {
          msg: action.payload.msg,
          type: action.payload.type,
        },
      };
    default:
      return state;
  }
};

export default reducer;
