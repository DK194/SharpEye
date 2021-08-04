import React from 'react';
import './FaceDetectionField.css';

const FaceDetectionField = ({ imageUrl, box }) => {
  return(
    <div className='face-detection-container'>
      <div className='img-wrapper'>
        <img id='input-image' src={imageUrl} alt=''/>
        { box.map((item, index) => (
            <div 
              className='bounding-box' 
              style={
                {
                  top: item.topRow, 
                  right: item.rightCol, 
                  bottom: item.bottomRow, 
                  left: item.leftCol
                }
              } 
              key={index}
            >
            </div>
        ))}
      </div>
    </div>
  );
}

export default FaceDetectionField;
