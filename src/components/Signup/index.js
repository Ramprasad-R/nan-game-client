import React, { Component } from "react";
import Form from "../UserForm/index";
import { connect } from "react-redux";
import { signUp } from "../../actions/users";


class SignupFormContainer extends Component {
  state = {
    email: "",
    password: ""
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.dispatch(signUp(this.state.email, this.state.password));
    this.setState({ email: "", password: "" });
  };

  render() {
    return (
      <div>
      {this.props.userCreated ? <h1>Account created</h1> : null}
        <Form
          text={"Signup"}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          values={this.state}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log("STATE IN MSTP", state);
  return {
    userCreated: state.user.userCreated
  };
};

export default connect(mapStateToProps)(SignupFormContainer);