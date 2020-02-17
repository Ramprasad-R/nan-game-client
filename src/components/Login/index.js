import React, { useState } from "react";
import UserForm from "../UserForm";
function Login() {
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
    console.log("Form Submitted");
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
