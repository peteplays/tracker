# Serverless

## Usage
`npm start` run on `http://localhost:3000` by default and will automatically rebuild on save.

## Flow
Data is fetched from Mongo Atlas using Stitch and displayed using [DailyMapTracker](https://www.npmjs.com/package/@peteplays/daily-map-tracker) npm package.

## Data Structure `DailyMapTracker` Accepts
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
```


### Created using Create React App
App was created using `npx create-react-app my-app --template typescript`
