import moment from 'moment';
import React from 'react';
import { Container, Modal, Row, Col } from 'react-bootstrap';
import './JobDetails.css';
const JobDetails = ({ job, show, handleClose }) => {
  return (
    <Modal
      className='details-modal'
      centered
      show={show}
      onHide={handleClose}
      keyboard={false}
      size='lg'
    >
      <Modal.Header closeButton>
        <Modal.Title>{job?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col sm='6' className='details-modal-label'>
              Company
            </Col>
            <Col sm='6'>{job?.company_name}</Col>
          </Row>
          <Row>
            <Col sm='6' className='details-modal-label'>
              Company Website
            </Col>
            <Col sm='6'>{job?.company_website}</Col>
          </Row>
          {job?.external_link && (
            <Row>
              <Col sm='6' className='details-modal-label'>
                External Link
              </Col>
              <Col sm='6'>
                <a href={job?.external_link} target='_blank' rel='noreferrer'>
                  {job?.external_link}
                </a>
              </Col>
            </Row>
          )}
          <Row>
            <Col sm='6' className='details-modal-label'>
              Type
            </Col>
            <Col sm='6'>{job?.type}</Col>
          </Row>
          <Row>
            <Col sm='6' className='details-modal-label'>
              Category
            </Col>
            <Col sm='6'>{job?.category}</Col>
          </Row>
          <Row>
            <Col sm='6' className='details-modal-label'>
              Country
            </Col>
            <Col sm='6'>{job?.country}</Col>
          </Row>
          <Row>
            <Col sm='6' className='details-modal-label'>
              City
            </Col>
            <Col sm='6'>{job?.city || '-'}</Col>
          </Row>
          <Row>
            <Col sm='6' className='details-modal-label'>
              Skills
            </Col>
            <Col sm='6'>{job?.skills}</Col>
          </Row>
          <Row>
            <Col sm='6' className='details-modal-label'>
              Salary
            </Col>
            <Col sm='6'>{job?.salary}</Col>
          </Row>
          <Row>
            <Col sm='6' className='details-modal-label'>
              Company Representative Name
            </Col>
            <Col sm='6'>{job?.company_rep_name}</Col>
          </Row>
          <Row>
            <Col sm='6' className='details-modal-label'>
              Company Representative Email
            </Col>
            <Col sm='6'>{job?.company_rep_email}</Col>
          </Row>
          <Row>
            <Col sm='6' className='details-modal-label'>
              Description
            </Col>
            <Col sm='6'>{job?.description}</Col>
          </Row>
          <Row>
            <Col sm='6' className='details-modal-label'>
              Expires on
            </Col>
            <Col sm='6'>
              {moment().format('MMM DD, YYYY') === job?.expires_in
                ? 'Expired'
                : job?.expires_in}
            </Col>
          </Row>
          <Row>
            <Col sm='6' className='details-modal-label'>
              Status
            </Col>
            <Col sm='6'>{job?.is_approved ? 'Approved' : 'Pending'}</Col>
          </Row>
          <Row>
            <Col sm='6' className='details-modal-label'>
              Is Featured
            </Col>
            <Col sm='6'>{job?.is_featured ? 'Yes' : 'No'}</Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default JobDetails;
// company_name: String,
//     company_website: String,
//     external_link: String,
//     company_logo: String,
//     title: String,
//     position: String,
//     type: String,
//     category: String,
//     city: String,
//     country: String,
//     skills: String,
//     description: String,
//     salary: Number,
//     company_rep_email: String,
//     company_rep_name: String,
//     is_approved: Boolean,
//     is_featured: Boolean,
//     expires_in: String,
