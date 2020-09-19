# API

## Usage
`npm start` and `npm run dev` run on `http://localhost:5555/` by default

`npm run dev` will automatically rebuild on save.

## End points
`/` returns welcome messages

`/data` returns data in `IData[]` structure

`/add` added data in _`Tasker`_ structure

## Data structure
```
interface IData {
  _id?: any;
  type?: string;
  date: string;
  times: {
    [time: string]: ICoordinates;
  };
};

interface ICoordinates {
  lat: number;
  lng: number;
}

interface Tasker {
  date: string;
  time: string;
  latLng: string;
  type: string;
}
```

## Tasker Data Example
```
{
  date: 3.15, | h.m
  time: 12-14-20, | m-d-yy
  latLng: 90.943049,-23.3435343, | lat,lng
  type: bike, | any
}
```
