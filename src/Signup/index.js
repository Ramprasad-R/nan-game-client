import React, { Component } from 'react'
import Form from '../Form/index'

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
    this.setState({ email: "", password: "" });
  };

  render() {
    return (
      <div>
        <Form 
         text={"Signup"}
         handleSubmit={this.handleSubmit}
         handleChange={this.handleChange}
         values={this.state}
         />
      </div>
    )
  }
}

export default SignupFormContainer