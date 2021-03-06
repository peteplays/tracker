# Client

## Usage
`npm start` and `npm run dev` run on `http://localhost:3000` by default and will automatically rebuild on save.

`npm run dev` will load local envs to use the [Tracker API](https://github.com/peteplays/tracker/tree/master/api).

Reference: [config.ts](https://github.com/peteplays/tracker/blob/master/client/src/config.ts)

## Flow
Data is fetched from the Tracker API and displayed using [DailyMapTracker](https://www.npmjs.com/package/@peteplays/daily-map-tracker) npm package.

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
