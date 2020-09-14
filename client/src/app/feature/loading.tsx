import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { dbDataSelector, fetchDBData } from './dbData.slice';
import { Error } from '../shared';
import GMap from './gmap';

import './loading.scss';

const Loading = () => {
  const dispatch = useDispatch();
  const { loading, errorMessage, data } = useSelector(dbDataSelector);

  useEffect(() => {
    dispatch(fetchDBData());
  }, [dispatch])

  if (loading) return <p className='loading'>Loading</p>;
  if (errorMessage) return <Error message={errorMessage} />;
  if (!!data.length) return <GMap dbData={data} />;

  return <p className='loading'>Nothing to see here</p>
}

export default Loading;

