import React from 'react';
import JobCard from '../../../Common/JobCard/JobCard';

const Jobs = () => {
  return (
    <div>
      <div className='featured-section'>
        {[1, 2, 5]?.map(() => (
          <JobCard />
        ))}
      </div>
    </div>
  );
};

export default Jobs;
