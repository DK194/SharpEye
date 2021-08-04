import React from 'react';
import Logo from '../../components/Logo/Logo';
import Nav from '../../components/Nav/Nav';
import Meta from '../../components/Meta/Meta';
import './SignInScreen.css';

const initialState = {
  signInEmail: '',
  signInPassword: '',
  signInEmailError: '',
  signInPasswordError: '',
  signInError: ''
};

class SignInScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  onEmailChange = (event) => {
    this.setState({signInEmail: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value})
  }

  signInValidation = () => {
    let signInEmailError = '';
    let signInPasswordError = '';

    if (!this.state.signInEmail || !this.state.signInEmail.includes('@')) {
      signInEmailError = 'Please enter your email.';
    }

    if (!this.state.signInPassword) {
      signInPasswordError = 'Please enter your password.';
    }

    if (signInEmailError || signInPasswordError) {
      this.setState({ signInEmailError, signInPasswordError })
      return false;
    }
    return true;
  }

  signInFailure = (err) => {
    if (err === true) {
      this.setState({ 
        signInError: true, 
        signInEmailError: '',
        signInPasswordError: ''
      })
    }
  }

  onSubmitSignIn = () => {
    const isValid = this.signInValidation();

    if (isValid) {
      fetch('http://localhost:3000/signin', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: this.state.signInEmail,
          password: this.state.signInPassword
        })
      })
        .then(response => response.json())
        .then(user => {
          if (user.id) {
            this.props.loadUser(user)
            this.props.onRouteChange('profile')
          } else {
            this.signInFailure(true)
          }
        })
      this.setState({ initialState })
    }
  }

  render() {
    const { onRouteChange } = this.props;

    return(
      <div>
        <Meta title={'Sharp Eye | Login'} />
        <div className='nav-container'>
          <Logo />
          <Nav onRouteChange={onRouteChange} />
        </div>
        <div className='signin-container'>
          <div className='signin-form-wrapper'>
            <h1>Sign In</h1>
            {this.state.signInError === true ?
              <div className='form-submit-error'>
                Wrong email or password.
              </div> : null
            }
            <div>
              <div className='signin-form-group'>
                <label htmlFor='email'>Email:</label>
                <input 
                  type='email' 
                  name='email' 
                  id='email' 
                  onChange={this.onEmailChange}
                />
              </div>
              <div className='input-error'>{this.state.signInEmailError}</div>
              <div className='signin-form-group'>
                <label htmlFor='password'>Password:</label>
                <input 
                  type='password' 
                  name='password' 
                  id='password' 
                  onChange={this.onPasswordChange}
                />
              </div>
              <div className='input-error'>{this.state.signInPasswordError}</div>
              <button 
                type='submit' 
                className='btn' 
                onClick={this.onSubmitSignIn}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignInScreen;
