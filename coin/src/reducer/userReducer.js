import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  GET_USERINFO,
} from "../action/types";

export default function (state = {}, action) {
  switch (action.type) {
    case REGISTER_USER:
      return { ...state, success: action.payload };
      break;
    case LOGIN_USER:
      return {
        ...state,
        loginSuccess: action.payload.loginSuccess,
        id: action.payload.userId,
      };
      break;
    case AUTH_USER:
      return {
        ...state,
        isAuth: action.payload.success,
        Id: action.payload.id,
      };
      break;
    case LOGOUT_USER:
      return { ...state, success: action.payload };
      break;
    default:
      return state;
  }
}
