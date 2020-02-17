import axios from "axios";

export const USER_CREATED = "USER_CREATED";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
function signUpSuccess() {
  return { type: USER_CREATED };
}

export function signUp(email, password) {
  return async function(dispatch, getState) {
    const response = await axios.post("http://localhost:4000/user", {
      email: email,
      password: password
    });

    if (response.status === 201) {
      dispatch(signUpSuccess());
    }
  };
}

function loginSuccess(email, token) {
  return {
    type: LOGIN_SUCCESS,
    payload: { 
      email: email,
      token: token
    }} 
  };

export function login(email, password) {
  return async function(dispatch, getState) {
    const response = await axios.post("http://localhost:4000/login", {
      email,
      password
    });

    dispatch(loginSuccess(response.data.email, response.data.token));
  };
}
