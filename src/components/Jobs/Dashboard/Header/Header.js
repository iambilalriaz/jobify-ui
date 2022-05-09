import React from 'react';
import { Form } from 'react-bootstrap';
import './index.css';
const Header = () => {
  return (
    <div className='header'>
      <div>Filter by:</div>
      <div className='job-filters'>
        <Form.Group>
          <Form.Control placeholder='Enter Keywords...' />
        </Form.Group>
        <Form.Group className='d-flex'>
          <Form.Check type='radio' name='job-type' label='Full-Time' />
          <Form.Check type='radio' name='job-type' label='Part-Time' />
          <Form.Check type='radio' name='job-type' label='Remote' />
        </Form.Group>
        <Form.Group>
          <Form.Select>
            <option disabled selected>
              -- Country --
            </option>
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Select>
            <option disabled selected>
              -- City --
            </option>
          </Form.Select>
        </Form.Group>
      </div>
    </div>
  );
};

export default Header;
