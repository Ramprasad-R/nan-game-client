import React, { useState } from "react";
import UserForm from "../UserForm";
import { useDispatch } from "react-redux";
import { login } from "../../actions/users";
import { Link } from "react-router-dom";


function Login(props) {
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
    props.history.push("/gamerooms")
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
      <Link to="/"><p>Back to Home</p></Link>
    </div>
  );
}

export default Login;
