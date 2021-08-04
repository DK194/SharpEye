import React from 'react';
import Logo from '../../components/Logo/Logo';
import Nav from '../../components/Nav/Nav';
import Meta from '../../components/Meta/Meta';
import './RegisterScreen.css';

const initialState = {
  name: '',
  email: '',
  password: '',
  nameError: '',
  emailError: '',
  passwordError: '',
  registrationError: ''
};

class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  onNameChange = (event) => {
    this.setState({ name: event.target.value })
  }

  onEmailChange = (event) => {
    this.setState({ email: event.target.value })
  }

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value })
  }
  
  formValidation = () => {
    let nameError = '';
    let emailError = '';
    let passwordError = '';

    if (this.state.name.length < 3) {
      nameError = 'The name must be at least 3 characters long.';
    }

    if (this.state.email === null || !this.state.email.includes('@')) {
      emailError = 'Invalid email.';
    }

    if (this.state.password.length < 6) {
      passwordError = 'The password must be at least 6 characters long.';
    }

    if (nameError || emailError || passwordError) {
      this.setState({ nameError, emailError, passwordError })
      return false;
    }
    return true;
  }

  registrationFailure = (err) => {
    if (err === true) {
      this.setState({ 
        registrationError: true, 
        nameError: '', 
        emailError: '', 
        passwordError: '' 
      })
    }
  }

  onSubmitSignIn = () => {
    const isValid = this.formValidation();

    if (isValid) {
      fetch('http://localhost:3000/register', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          name: this.state.name,
          email: this.state.email,
          password: this.state.password
        })
      })
        .then(response => response.json())
        .then(user => {
          if (user.id) {
            this.props.loadUser(user)
            this.props.onRouteChange('profile')
          } else {
            this.registrationFailure(true)
          }
        })
      this.setState({ initialState })
    }
  }

  render() {
    const { onRouteChange } = this.props;

    return(
      <div>
        <Meta title={'Sharp Eye | Register'} />
        <div className='nav-container'>
          <Logo />
          <Nav onRouteChange={onRouteChange} />
        </div>
        <div className='register-container'>
          <div className='register-form-wrapper'>
            <h1>Register</h1>
            {this.state.registrationError === true ? 
              <div className='form-submit-error'>
                User with this email is already registered!
              </div> : null
            }
            <div>
              <div className='register-form-group'>
                <label htmlFor='name'>Name:</label>
                <input 
                  type='text' 
                  name='name' 
                  id='name' 
                  onChange={this.onNameChange}
                />
              </div>
              <div className='input-error'>{this.state.nameError}</div>
              <div className='register-form-group'>
                <label htmlFor='email'>Email:</label>
                <input 
                  type='email' 
                  name='email' 
                  id='email' 
                  onChange={this.onEmailChange}
                />
              </div>
              <div className='input-error'>{this.state.emailError}</div>
              <div className='register-form-group'>
                <label htmlFor='password'>Password:</label>
                <input 
                  type='password' 
                  name='password' 
                  id='password' 
                  onChange={this.onPasswordChange}
                />
              </div>
              <div className='input-error'>{this.state.passwordError}</div>
              <button 
                type='submit' 
                className='btn' 
                onClick={this.onSubmitSignIn}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterScreen;
