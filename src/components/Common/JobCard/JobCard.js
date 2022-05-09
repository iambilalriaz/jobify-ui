import React from 'react';
import { Card } from 'react-bootstrap';
import './index.css';
const JobCard = ({
  companyName = 'BR Productions',
  position = 'Senior Software Engineer',
  type = 'full-time',
  skills = 'javascript, reactjs, nodejs, expressjs, mongodb, sass',
  salary = 200000,
  city = 'Lahore',
  country = 'Paksitan',
  date = '09 May, 2021',
  isFeatured = true,
}) => {
  return (
    <Card className='job-card'>
      <Card.Header className='job-card-header'>
        <div>{position}</div>
        {isFeatured && <div className='featured-text'>Featured</div>}
      </Card.Header>
      <Card.Body className='job-card-body'>
        <div className='d-flex justify-content-apart'>
          <div className='job-info'>
            <div>Company Name</div>
            <div>{companyName}</div>
          </div>
          <div className='job-info'>
            <div>Salary</div>
            <div>{salary}</div>
          </div>
        </div>
        <div className='d-flex justify-content-apart'>
          <div className='job-info'>
            <div>Type</div>
            <div>{type}</div>
          </div>
          <div className='job-info'>
            <div>Location</div>
            <div>
              {city}, {country}
            </div>
          </div>
        </div>
        <div className='d-flex justify-content-apart'>
          <div className='job-info'>
            <div>Skills</div>
            <div>{skills}</div>
          </div>
          <div className='job-info'>
            <div>Date Posted</div>
            <div>{date}</div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default JobCard;
