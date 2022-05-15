import React, { useEffect, useState, useTransition } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCategoryFilter,
  setCityFilter,
  setCountryFilter,
  setFilteredJobs,
  setKeywordFilter,
  setTypeFilter,
} from '../../../../redux/action-creators';
import {
  getCategories,
  getCities,
  getCountries,
} from '../../../../utils/helpers';
import './index.css';
const Header = () => {
  const [cities, setCities] = useState([]);
  const [isPending, startTransition] = useTransition();

  const {
    jobs,
    keywordFilter,
    typeFilter,
    categoryFilter,
    countryFilter,
    cityFilter,
  } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      !keywordFilter &&
      !countryFilter &&
      !categoryFilter &&
      !cityFilter &&
      !typeFilter.fullTime &&
      !typeFilter.partTime &&
      !typeFilter.remote &&
      !typeFilter.contract
    ) {
      dispatch(setFilteredJobs(jobs));
    } else {
      const typesArray = [];
      if (typeFilter.fullTime) typesArray.push('full-time');
      else typesArray.filter((type) => type !== 'full-time');
      if (typeFilter.partTime) typesArray.push('part-time');
      else typesArray.filter((type) => type !== 'part-time');
      if (typeFilter.remote) typesArray.push('remote');
      else typesArray.filter((type) => type !== 'remote');
      if (typeFilter.contract) typesArray.push('contract');
      else typesArray.filter((type) => type !== 'contract');

      const filter = jobs?.filter((job) => {
        return (
          (keywordFilter
            ? job?.title?.toLowerCase().startsWith(keywordFilter.toLowerCase())
            : true) &&
          (typesArray?.length > 0 ? typesArray?.includes(job?.type) : true) &&
          (countryFilter ? job?.country === countryFilter : true) &&
          (cityFilter ? job?.city === cityFilter : true) &&
          (categoryFilter ? job.category === categoryFilter : true)
        );
      });
      dispatch(setFilteredJobs(filter));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    cityFilter,
    countryFilter,
    jobs,
    keywordFilter,
    categoryFilter,
    typeFilter.contarct,
    typeFilter.contract,
    typeFilter.fullTime,
    typeFilter.partTime,
    typeFilter.remote,
  ]);
  return (
    <div className='header'>
      <div>Filter by:</div>
      <div className='job-filters'>
        <Form.Group>
          <Form.Control
            placeholder='Enter Keywords...'
            value={keywordFilter}
            onChange={(e) => dispatch(setKeywordFilter(e?.target?.value))}
          />
        </Form.Group>
        <Form.Group className='d-flex'>
          <Form.Check
            checked={typeFilter?.fullTime}
            label='Full Time'
            onClick={() =>
              dispatch(
                setTypeFilter({
                  ...typeFilter,
                  fullTime: !typeFilter?.fullTime,
                })
              )
            }
          />
          <Form.Check
            checked={typeFilter?.partTime}
            label='Part Time'
            onClick={() =>
              dispatch(
                setTypeFilter({
                  ...typeFilter,
                  partTime: !typeFilter?.partTime,
                })
              )
            }
          />
          <Form.Check
            checked={typeFilter?.contract}
            label='Contract'
            onClick={() =>
              dispatch(
                setTypeFilter({
                  ...typeFilter,
                  contract: !typeFilter?.contract,
                })
              )
            }
          />
          <Form.Check
            checked={typeFilter?.remote}
            label='Remote'
            onClick={() =>
              dispatch(
                setTypeFilter({
                  ...typeFilter,
                  remote: !typeFilter?.remote,
                })
              )
            }
          />
        </Form.Group>
        <Form.Group>
          <Form.Select
            value={categoryFilter}
            onChange={(e) => {
              dispatch(setCategoryFilter(e?.target?.value));
            }}
          >
            <option value=''>Any Category</option>
            {getCategories()?.map((category) => (
              <option value={category}>{category}</option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Select
            value={countryFilter}
            onChange={(e) => {
              dispatch(setCountryFilter(e?.target?.value));
              startTransition(() => {
                getCities(e?.target?.value).then((cs) => {
                  setCities(cs);
                });
              });
            }}
          >
            <option value=''>Any Country</option>
            {getCountries()?.map((country) => (
              <option value={country}>{country}</option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Select
            disabled={isPending}
            value={cityFilter}
            onChange={(e) => {
              dispatch(setCityFilter(e?.target?.value));
            }}
          >
            {isPending ? (
              <option selected>Fetching cities...</option>
            ) : (
              <>
                <option value=''>Any City</option>
                {cities?.map((city) => (
                  <option value={city}>{city}</option>
                ))}
              </>
            )}
          </Form.Select>
        </Form.Group>
      </div>
    </div>
  );
};

export default Header;
