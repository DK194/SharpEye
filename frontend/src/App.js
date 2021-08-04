import React, { Component } from 'react';
import './App.css';
import Particles from 'react-particles-js';
import particlesSettings from './config/particles_settings/particles_settings';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import SignInScreen from './screens/SignInScreen/SignInScreen';
import RegisterScreen from './screens/RegisterScreen/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';

class App extends Component {
  constructor() {
    super();
    this.state = {
      route: '',
      user: {
        id: '',
        name: '',
        email:'',
        entries: 0,
        joined: ''
      }
    }
  }

  onRouteChange = (route) => {
    this.setState({ route: route })
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  userCountUpdate = (count) => {
    this.setState(Object.assign(this.state.user, {
      entries: count
    }))
  }

  render() {
    return (
      <div className='App'>
        <Particles
          className='particles' 
          params={particlesSettings} 
        />
        {(() => {
          switch (this.state.route) {
            case 'signin':   return <SignInScreen
                                      onRouteChange={this.onRouteChange} 
                                      loadUser={this.loadUser} 
                                    />;
            case 'register': return <RegisterScreen
                                      onRouteChange={this.onRouteChange}  
                                      loadUser={this.loadUser}
                                    />;
            case 'profile':  return <ProfileScreen 
                                      onRouteChange={this.onRouteChange}
                                      userState={this.state.user}  
                                      userCountUpdate={this.userCountUpdate}
                                    />;
            default:         return <HomeScreen 
                                      onRouteChange={this.onRouteChange} 
                                    />;
          }
        })()}
      </div>
    );
  }
}

export default App;
