import React from 'react';
import './Rank.css';

const Rank = ({ name, entries }) => {
  return(
    <div className='rank-container'>
      <div>
        <p>
          {`${name}, your current entry count is...`}
        </p>
        <h1>
          {entries}
        </h1>
      </div>
    </div>
  );
}

export default Rank;
