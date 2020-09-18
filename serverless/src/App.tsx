import React, { useEffect, useState } from 'react';
import DailyMapTracker, { IData } from '@peteplays/daily-map-tracker';
import { Stitch, AnonymousCredential, RemoteMongoClient } from 'mongodb-stitch-browser-sdk';

import { config } from './config';

const App = () => {
  const [data, setData] = useState<IData[]>([]);

  useEffect(() => {
    const client = Stitch.initializeDefaultAppClient(config.clientName);
    const mongodb = client.getServiceClient(
      RemoteMongoClient.factory,
      "mongodb-atlas"
    );
    const db = mongodb.db(config.db);

    const loginAndGetData = () => {
      client
        .auth
        .loginWithCredential(new AnonymousCredential())
        .then(getData)
        .catch(error => console.log({ error }));
    };

    const getData = async () => {
      const r = await db
        .collection(config.collection)
        .find({}, {
          sort: { date: 1 },
          limit: 1000,
        })
        .asArray();

      setData(r as IData[]);
    };

    loginAndGetData();
    // getData();
  }, [setData]);

  return !!data.length
    ? <DailyMapTracker dbData={data} />
    : <p className='loading'>Loading</p>;
};

export default App;
