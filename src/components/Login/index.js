import React, { useState } from "react";
import UserForm from "../UserForm";
import { useDispatch } from "react-redux";
import { login } from "../../actions/users";
function Login() {
  const dispatch = useDispatch();
  const [userLoginData, setUserLoginData] = useState({
    email: "",
    password: ""
  });
  const handleChange = event => {
    const { name, value } = event.target;
    setUserLoginData(previousValue => ({ ...previousValue, [name]: value }));
  };
  const handleSubmit = event => {
    event.preventDefault();
    console.log(
      "User login data",
      userLoginData.email,
      "pass",
      userLoginData.password
    );

    dispatch(login(userLoginData.email, userLoginData.password));
    setUserLoginData({ email: "", password: "" });
  };
  return (
    <div>
      <UserForm
        text={"Login"}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        values={userLoginData}
      />
    </div>
  );
}

export default Login;
