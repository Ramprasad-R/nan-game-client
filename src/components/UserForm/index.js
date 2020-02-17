import React from "react";

const UserForm = props => {
  //console.log(props);
  return (
    <div>
      {props.text}
      <form onSubmit={props.handleSubmit}>
        <label>Email:</label>
        <input
          onChange={props.handleChange}
          type="email"
          name="email"
          value={props.values.email}
        />
        <label>Password:</label>
        <input
          onChange={props.handleChange}
          type="password"
          name="password"
          value={props.values.password}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UserForm;
