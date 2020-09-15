const dev = {
  env: 'dev',
  api: {
    URL: 'http://localhost:5555',
  },
};

const prod = {
  env: 'prod',
  api: {
    URL: 'https://map-tracker-api.herokuapp.com'
  },
};

const getStage = () => {
  switch (process.env.REACT_APP_STAGE) {
    case 'dev':
      return dev;
    default:
      return prod;
  }
}

export default {
  ...getStage(),
};
