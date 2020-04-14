import React, { Component } from 'react'
import { register } from './UserFunctions'


class Register extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      email: '',
      password: '',
      errors: {}
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit(e) {
    e.preventDefault()

    const newUser = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    }

    const errors = {}
    const emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    errors.email = !newUser.email.match(emailformat) ?
    "Invalid Email" : ""
    errors.password = newUser.password.length < 4 ?
    "Password should be more than 6 characters" : ""
    console.log(errors)
    register(newUser).then(res => {
if(res) {
            this.props.history.push(`/success`)
} else {
  this.props.history.push(`/registererror`)
}})
  }
  componentDidMount() {
      document.getElementsByTagName('body')[0].className = 'page-login-min layout-full page-dark';
  }


  render() {
    return (

      <div class="page">
          <div class="page-content">
              <div class="page-brand-info">
              <div class="brand">
                  <img class="brand-img" src="/images/logoblack.png" alt="..." /><br/>
                    <h2 class="brand-text font-size-30">Employee Competency Tracker</h2>
              </div>

              </div>

              <div class="page-login-main">

                  <h3 class="font-size-24 margin-2 bold">Register</h3>

                  <form onSubmit={this.onSubmit}>
                      <div class="form-group form-material floating" data-plugin="formMaterial">
                          <label htmlFor="username" for="inputUsername">Username</label>
                          <input type="text" class="form-control empty" required id="inputUsername" name="username" value={this.state.username} onChange={this.onChange} required/>

                      </div>
                      <div class="form-group form-material floating" data-plugin="formMaterial">
                          <label htmlFor="email" for="inputEmail">Email</label>
                          <input type="email" class="form-control empty" required id="inputEmail" name="email" value={this.state.email} onChange={this.onChange} required/>

                      </div>
                      <div class="form-group form-material floating" data-plugin="formMaterial">
                          <label htmlFor="password" for="inputPassword">Password</label>
                          <input type="password" minlength="4" required class="form-control empty" id="inputPassword" name="password" value={this.state.password} onChange={this.onChange} required/>

                      </div>

                      <button type="submit" class="btn btn-primary btn-block">Register</button>
                  </form>
                  <p>Have an account ? <a href="/login">Login</a></p>

              </div>

          </div>
      </div>

    )
  }
}

export default Register
