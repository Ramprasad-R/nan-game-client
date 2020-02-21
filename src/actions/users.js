import axios from "axios";
// import user from "../reducers/user";

export const USER_CREATED = "USER_CREATED";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
function signUpSuccess() {
  return { type: USER_CREATED };
}

export function signUp(email, password) {
  return async function(dispatch, getState) {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/user`,
      {
        email: email,
        password: password
      }
    );

    if (response.status === 201) {
      dispatch(signUpSuccess());
    }
  };
}

function loginSuccess(email, token, id) {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      email: email,
      token: token,
      id: id
    }
  };
}

export function login(email, password, history) {
  return async function(dispatch, getState) {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/login`,
      {
        email,
        password
      }
    );
    console.log(`check for the userId`, response);
    dispatch(
      loginSuccess(response.data.email, response.data.token, response.data.id)
    );
    history.push("/gamerooms");
  };
}
