import { validate } from 'email-validator';
import React, { useEffect, useState, useTransition } from 'react';
import { Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import './index.css';
import {
  getCities,
  getCountries,
  getErrorMessage,
  getSuccessMessage,
  getCategories,
} from '../../../utils/helpers/index';
import { getJobInfo, postJob, updateJob } from '../../../utils/api';
const JobForm = () => {
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [didPostBtnClick, setDidPostBtnClick] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);
  const [cities, setCities] = useState([]);
  const [jobDetails, setJobDetails] = useState({
    title: '',
    type: '',
    salary: null,
    description: '',
    skills: '',
    country: '',
    category: '',
    city: '',
    companyName: '',
    companyWebsite: '',
    companyLogo: null,
    companyRepEmail: '',
    companyRepName: '',
    externalLink: '',
    expiresIn: 3,
  });

  const setValue = ({ key, value }) => {
    setJobDetails({
      ...jobDetails,
      [key]: value,
    });
  };

  const navigate = useNavigate();

  const handleEnterPress = (e) => {
    if (e?.key === 'Enter') {
    }
  };
  const onJobSave = (actionType) => {
    setDidPostBtnClick(true);
    const {
      title,
      type,
      salary,
      description,
      skills,
      country,
      companyName,
      companyLogo,
      companyWebsite,
      companyRepEmail,
      companyRepName,
    } = jobDetails;

    if (
      title &&
      type &&
      salary >= 0 &&
      description &&
      skills &&
      country &&
      companyName &&
      companyWebsite &&
      validate(companyRepEmail) &&
      companyRepName
    ) {
      const formData = new FormData();

      const request = JSON.stringify({ ...jobDetails, isFeatured });
      formData.append('job', request);
      if (companyLogo) {
        formData.append('companyLogo', companyLogo);
      }

      if (actionType === 'post') {
        postJob(formData)
          .then((response) => {
            toast.success(getSuccessMessage(response));
            setDidPostBtnClick(false);
            navigate('/jobs');
          })
          .catch((error) => toast.error(getErrorMessage(error)));
      } else if (actionType === 'update') {
        updateJob(formData, searchParams.get('job'))
          .then((response) => {
            toast.success(getSuccessMessage(response));
            setDidPostBtnClick(false);
            navigate('/jobs');
          })
          .catch((error) => toast.error(getErrorMessage(error)));
      }
    }
  };
  useEffect(() => {
    const jobId = searchParams.get('job');
    if (jobId) {
      getJobInfo(jobId)
        .then(({ data }) => {
          setJobDetails({
            title: data?.title,
            type: data?.type,
            salary: data?.salary,
            description: data?.description,
            skills: data?.skills,
            country: data?.country,
            category: data?.category,
            city: data?.city || '',
            companyName: data?.company_name,
            companyWebsite: data?.company_website,
            companyLogo: null,
            companyRepEmail: data?.company_rep_email,
            companyRepName: data?.company_rep_name,
            externalLink: data?.external_link,
          });
          setIsFeatured(data?.is_featured);
        })
        .catch((error) => toast.error(getErrorMessage(error)));
    }
  }, [searchParams]);
  return (
    <div className='job-form-layout'>
      <Card className='auth-card job-form-card'>
        <Card.Header className='auth-card-header'>POST A JOB</Card.Header>
        <Card.Body className='auth-card-body'>
          <Container>
            <Row>
              <Col sm='4'>
                <Form.Group className='mb-3' controlId='formBasicEmail'>
                  <Form.Label>Job Title</Form.Label>
                  <Form.Control
                    className='text-input'
                    type='text'
                    placeholder='Enter title'
                    value={jobDetails?.title}
                    onChange={(e) =>
                      setValue({
                        key: 'title',
                        value: e?.target?.value,
                      })
                    }
                    onKeyDown={handleEnterPress}
                  />
                  {didPostBtnClick && !jobDetails?.title && (
                    <div className='auth-error'>Please enter job title</div>
                  )}
                </Form.Group>
              </Col>
              <Col sm='4'>
                <Form.Group className='mb-3' controlId='formBasicEmail'>
                  <Form.Label>Job Type</Form.Label>
                  <Form.Select
                    className='text-input'
                    value={jobDetails?.type}
                    onChange={(e) =>
                      setValue({
                        key: 'type',
                        value: e?.target?.value,
                      })
                    }
                    onKeyDown={handleEnterPress}
                  >
                    <option disabled value=''>
                      -- Select Type --
                    </option>
                    <option value='full-time'>Full Time</option>
                    <option value='part-time'>Part Time</option>
                    <option value='contract'>Contract</option>
                    <option value='remote'>Remote</option>
                  </Form.Select>
                  {didPostBtnClick && !jobDetails?.type && (
                    <div className='auth-error'>Please select job type</div>
                  )}
                </Form.Group>
              </Col>
              <Col sm='4'>
                <Form.Group className='mb-3' controlId='formBasicEmail'>
                  <Form.Label>Salary</Form.Label>
                  <Form.Control
                    className='text-input'
                    type='number'
                    min={0}
                    onWheel={(e) => e?.target?.blur()}
                    placeholder='Enter salary'
                    value={jobDetails?.salary}
                    onChange={(e) =>
                      setValue({
                        key: 'salary',
                        value: parseInt(Math.abs(e?.target?.value)),
                      })
                    }
                    onKeyDown={handleEnterPress}
                  />
                  {didPostBtnClick &&
                    (jobDetails?.salary === null ||
                      jobDetails?.salary === undefined) && (
                      <div className='auth-error'>
                        Please enter valid salary
                      </div>
                    )}
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col sm='6'>
                <Form.Group className='mb-3' controlId='formBasicEmail'>
                  <Form.Label>Job Description</Form.Label>
                  <Form.Control
                    className='text-input'
                    as='textarea'
                    rows='3'
                    type='text'
                    placeholder='Enter description'
                    value={jobDetails?.description}
                    onChange={(e) =>
                      setValue({
                        key: 'description',
                        value: e?.target?.value,
                      })
                    }
                    onKeyDown={handleEnterPress}
                  />
                  {didPostBtnClick && !jobDetails?.description && (
                    <div className='auth-error'>
                      Please enter job description
                    </div>
                  )}
                </Form.Group>
              </Col>
              <Col sm='6'>
                <Form.Group className='mb-3' controlId='formBasicEmail'>
                  <Form.Label>Skills</Form.Label>
                  <Form.Control
                    as='textarea'
                    rows='3'
                    className='text-input'
                    type='text'
                    placeholder='Enter comma separated skills'
                    value={jobDetails?.skills}
                    onChange={(e) =>
                      setValue({
                        key: 'skills',
                        value: e?.target?.value,
                      })
                    }
                    onKeyDown={handleEnterPress}
                  />
                  {didPostBtnClick && !jobDetails?.skills && (
                    <div className='auth-error'>Please enter skills</div>
                  )}
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col sm='4'>
                <Form.Group className='mb-3' controlId='formBasicEmail'>
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    className='text-input'
                    value={jobDetails?.category}
                    onChange={(e) => {
                      setValue({
                        key: 'category',
                        value: e?.target?.value,
                      });
                    }}
                  >
                    <option disabled value=''>
                      -- Select Category --
                    </option>
                    {getCategories()?.map((category) => (
                      <option value={category}>{category}</option>
                    ))}
                  </Form.Select>
                  {didPostBtnClick && !jobDetails?.category && (
                    <div className='auth-error'>Please select category</div>
                  )}
                </Form.Group>
              </Col>
              <Col sm='4'>
                <Form.Group className='mb-3' controlId='formBasicEmail'>
                  <Form.Label>Country</Form.Label>
                  <Form.Select
                    className='text-input'
                    value={jobDetails?.country}
                    onChange={(e) => {
                      setValue({
                        key: 'country',
                        value: e?.target?.value,
                      });
                      startTransition(() => {
                        getCities(e?.target?.value).then((cs) => {
                          setCities(cs);
                        });
                      });
                    }}
                  >
                    <option disabled value=''>
                      -- Select Country --
                    </option>
                    {getCountries()?.map((country) => (
                      <option value={country}>{country}</option>
                    ))}
                  </Form.Select>
                  {didPostBtnClick && !jobDetails?.country && (
                    <div className='auth-error'>Please enter country</div>
                  )}
                </Form.Group>
              </Col>
              <Col sm='4'>
                <Form.Group className='mb-3' controlId='formBasicEmail'>
                  <Form.Label>City</Form.Label>
                  <Form.Select
                    className='text-input'
                    value={jobDetails?.city}
                    disabled={isPending}
                    onChange={(e) =>
                      setValue({
                        key: 'city',
                        value: e?.target?.value,
                      })
                    }
                  >
                    {isPending ? (
                      <option selected>Fetching cities...</option>
                    ) : (
                      <>
                        <option disabled value=''>
                          -- City --
                        </option>
                        {cities?.map((city) => (
                          <option value={city}>{city}</option>
                        ))}
                      </>
                    )}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col sm='4'>
                <Form.Group className='mb-3' controlId='formBasicEmail'>
                  <Form.Label>Company Name</Form.Label>
                  <Form.Control
                    className='text-input'
                    type='text'
                    placeholder='Enter company name'
                    value={jobDetails?.companyName}
                    onChange={(e) =>
                      setValue({
                        key: 'companyName',
                        value: e?.target?.value,
                      })
                    }
                    onKeyDown={handleEnterPress}
                  />
                  {didPostBtnClick && !jobDetails?.companyName && (
                    <div className='auth-error'>Please enter company name</div>
                  )}
                </Form.Group>
              </Col>
              <Col sm='4'>
                <Form.Group className='mb-3' controlId='formBasicEmail'>
                  <Form.Label>Company Website</Form.Label>
                  <Form.Control
                    className='text-input'
                    type='text'
                    placeholder='Enter company website'
                    value={jobDetails?.companyWebsite}
                    onChange={(e) =>
                      setValue({
                        key: 'companyWebsite',
                        value: e?.target?.value,
                      })
                    }
                    onKeyDown={handleEnterPress}
                  />
                  {didPostBtnClick && !jobDetails?.companyWebsite && (
                    <div className='auth-error'>
                      Please enter company website
                    </div>
                  )}
                </Form.Group>
              </Col>
              <Col sm='4'>
                <Form.Group className='mb-3' controlId='formBasicEmail'>
                  <Form.Label>Company Logo</Form.Label>
                  <Form.Control
                    type='file'
                    className='text-input'
                    label={jobDetails?.companyLogo}
                    onChange={(e) =>
                      setValue({
                        key: 'companyLogo',
                        value: e?.target?.files?.[0],
                      })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col sm='4'>
                <Form.Group className='mb-3' controlId='formBasicEmail'>
                  <Form.Label>Company Representative Email</Form.Label>
                  <Form.Control
                    className='text-input'
                    type='email'
                    placeholder='Enter company representative email'
                    value={jobDetails?.companyRepEmail}
                    onChange={(e) =>
                      setValue({
                        key: 'companyRepEmail',
                        value: e?.target?.value,
                      })
                    }
                    onKeyDown={handleEnterPress}
                  />
                  {didPostBtnClick &&
                    !validate(jobDetails?.companyRepEmail) && (
                      <div className='auth-error'>
                        Please enter company representative email
                      </div>
                    )}
                </Form.Group>
              </Col>
              <Col sm='4'>
                <Form.Group className='mb-3' controlId='formBasicEmail'>
                  <Form.Label>Company Representative Name</Form.Label>
                  <Form.Control
                    className='text-input'
                    type='text'
                    placeholder='Enter company representative name'
                    value={jobDetails?.companyRepName}
                    onChange={(e) =>
                      setValue({
                        key: 'companyRepName',
                        value: e?.target?.value,
                      })
                    }
                    onKeyDown={handleEnterPress}
                  />
                  {didPostBtnClick && !jobDetails?.companyRepName && (
                    <div className='auth-error'>
                      Please enter company representative name
                    </div>
                  )}
                </Form.Group>
              </Col>
              <Col sm='4'>
                <Form.Group className='mb-3' controlId='formBasicEmail'>
                  <Form.Label>Job External Link</Form.Label>
                  <Form.Control
                    className='text-input'
                    type='text'
                    placeholder='Enter external link'
                    value={jobDetails?.externalLink}
                    onChange={(e) =>
                      setValue({
                        key: 'externalLink',
                        value: e?.target?.value,
                      })
                    }
                    onKeyDown={handleEnterPress}
                  />
                </Form.Group>
              </Col>
            </Row>
            {!searchParams.get('job') && (
              <Row>
                <Col sm='6'>
                  <Form.Group className='mb-3' controlId='formBasicEmail'>
                    <Form.Label>Expires in</Form.Label>
                    <Form.Select
                      className='text-input'
                      value={jobDetails?.expiresIn}
                      onChange={(e) => {
                        setValue({
                          key: 'expiresIn',
                          value: parseInt(e?.target?.value),
                        });
                      }}
                    >
                      <option disabled value=''>
                        -- Select Expiration Tenure --
                      </option>
                      <option value='3'>3 months</option>
                      <option value='6'>6 months</option>
                      <option value='12'>1 year</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col sm='6'></Col>
              </Row>
            )}
            <Row>
              <Col sm='6'>
                <Form.Group className='mb-3' controlId='frfe'>
                  <Form.Check
                    className='text-input'
                    label='Mark as featured'
                    checked={isFeatured}
                    onClick={() => {
                      setIsFeatured((prevChecked) => !prevChecked);
                    }}
                  />
                </Form.Group>
              </Col>
              <Col sm='6'></Col>
            </Row>
          </Container>

          {searchParams.get('job') ? (
            <div className='update-job-buttons'>
              <button
                className='custom-button'
                onClick={() => onJobSave('update')}
              >
                Update
              </button>
              <button
                className='custom-button'
                onClick={() => navigate('/jobs')}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button className='custom-button' onClick={() => onJobSave('post')}>
              Post
            </button>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default JobForm;
