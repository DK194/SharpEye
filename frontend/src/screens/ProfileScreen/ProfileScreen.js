import React from 'react';
import isUrlValid from 'url-validation';
import Logo from '../../components/Logo/Logo';
import NavProfile from '../../components/NavProfile/NavProfile';
import Rank from '../../components/Rank/Rank';
import FaceDetectionField from '../../components/FaceDetectionField/FaceDetectionField';
import Meta from '../../components/Meta/Meta';
import './ProfileScreen.css';

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      inputError: '',
      imageUrl: '',
      box: []
    }
  }

  calculateFaceLocation = (data, i) => {
    const clarifaiFace = data.outputs[0].data.regions[i].region_info.bounding_box;
    const image = document.getElementById('input-image');
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
      leftCol: clarifaiFace.left_col * width
    };
  }

  displayFaceBox = (box) => {
    this.setState({
      box: [...this.state.box, box]
    })
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value })
  }

  urlValidation = () => {
    let inputError = '';

    if (!isUrlValid(this.state.input)) {
      inputError = 'Please enter a valid URL.';
    }

    if (inputError) {
      this.setState({ inputError })
      return false;
    }

    return true;
  }

  onButtonSubmit = () => {
    this.setState({
      box: [], 
      imageUrl: this.state.input 
    })

    const isValid = this.urlValidation();

    if (isValid) {
      fetch('https://sharp-eye-api.herokuapp.com/imageurl', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: this.state.input 
        })
      })
        .then(response => response.json())
        .then(response => {
          if (response) {
            fetch('https://sharp-eye-api.herokuapp.com/image', {
              method: 'put',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                id: this.props.userState.id
              })
            })
              .then(response => response.json())
              .then(count => {
                this.props.userCountUpdate(count)
              })
              .catch(console.log)
          }
          for(let i = 0; i < response.outputs[0].data.regions.length; i++) {
            this.displayFaceBox(this.calculateFaceLocation(response, i))
          }
        })
        .catch(err => console.log(err))
      
      this.setState({ inputError: '' }) 
    }
  }

  render() {
    let { userState } = this.props;

    return (
      <div>
        <Meta title={'Sharp Eye | Profile'} />
        <div className='nav-container'>
          <Logo />
          <NavProfile onRouteChange={this.props.onRouteChange} />
        </div>
        <Rank name={userState.name} entries={userState.entries} />
        <div className='profile-container'>
          <div>
            <p className='profile-text'>
              {'In order to detect faces enter your link here.'}
            </p>
          </div>
          {this.state.inputError ? (
            <div className='url-submit-error'>
              {this.state.inputError}
            </div>
           ) : null
          }
          <div className='input-container'>
            <div className='input-wrapper'>
              <input type='text' onChange={this.onInputChange}/>
              <button onClick={this.onButtonSubmit}>Detect</button>
            </div>
          </div>
        </div>
        <FaceDetectionField box={this.state.box} imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default ProfileScreen;
