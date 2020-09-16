import { Express } from 'express';

import { getData, addPoint } from './mongo';
import { formatDate, formatTime, getLatLng } from './utils';

export const routes = (app: Express) => {
  app.get('/', (_, res) => {
    res.send('Welcome to Map Tracking API');
  });

  app.get('/data', async (req, res) => {
    const date = req.query.date ? req.query.date.toString(): '';

    res.json(await getData(date))
  });

  app.post('/add', async (req, res) => {
    const { date, time, latLng, type } = req.body;
    console.log(date, time, latLng, type);

    if (!date || !time || !latLng || !type ) {
      return res.send('Error: date, time, latLng are required');
    }

    const { lat, lng } = getLatLng(latLng);

    res.json(await addPoint(formatDate(date), formatTime(time), Number(lat), Number(lng), type))
  });
};
