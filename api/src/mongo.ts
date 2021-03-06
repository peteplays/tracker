import { Stitch, AnonymousCredential, RemoteMongoClient } from 'mongodb-stitch-server-sdk'

import { config } from './config';

const client = Stitch.initializeDefaultAppClient(config.clientName);
const mongodb = client.getServiceClient(
  RemoteMongoClient.factory,
  "mongodb-atlas"
);
const db = mongodb.db(config.db);

export const getData = async (date?: string) => {
  const find = date ? { date }: {};

  try {
    login();

    const r = await db
      .collection(config.collection)
      .find(find, {
        sort: { date: 1 },
        limit: 1000,
      })
      .asArray();

    client.close();

    return r;
  } catch (error) {
    console.log({ error });
    client.close();
  }
};

// db.Track.updateOne(
//  { date: '2020-09-12' },
//  { $set: { "times.04:17:37": { "lat": 32.78661, "lng": -80.01241 } } },
//  { upsert: true }
// )
export const addPoint = async (date: string, time: string, lat: number, lng: number, type: string) => {
  try {
    login();

    const r = await db
      .collection(config.collection)
      .updateOne(
        { date },
        {
          $set: {
            type,
            [`times.${time}`]: { lat, lng }
          }
        },
        { upsert: true },
      );

    client.close();

    return r;
  } catch (error) {
    console.log({ error });
    client.close();
  }
};

export const login = () => {
  client
    .auth
    .loginWithCredential(new AnonymousCredential())
    // .then(getData)
    .catch(error => {error});
};


