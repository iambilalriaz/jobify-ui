import React from 'react';
import './index.css';
import JobCard from '../../../Common/JobCard/JobCard';
const Featured = () => {
  return (
    <div className='featured'>
      {/* <div className='featured-section'> */}
      {[1, 2, 5]?.map(() => (
        <JobCard />
      ))}
      {/* </div> */}
    </div>
  );
};

export default Featured;
