export const config = {
  port: process.env.port || 5555,
  clientName: process.env.mongoAtlasClientName,
  db: process.env.db || 'Maps',
  collection: process.env.collection || 'Track',
};
