import { Express } from 'express';

import { getData, addPoint } from './mongo';

export const routes = (app: Express) => {
  app.get('/', (_, res) => {
    res.send('Welcome to Map Tracking API');
  });

  app.get('/data', async (req, res) => {
    const date = req.query.date ? req.query.date.toString(): '';

    res.json(await getData(date))
  });

  app.post('/add', async (req, res) => {
    const { date, time, lat, lng } = req.body;

    if (!date || !time || !lat || !lng) {
      return res.send('Error: date, time, lat, lng are required');
    }

    res.json(await addPoint(String(date), String(time), Number(lat), Number(lng)))
  });
};
