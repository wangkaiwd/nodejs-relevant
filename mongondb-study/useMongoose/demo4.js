const mongoose = require('mongoose');
mongoose.connect('mongodb:localhost/mongo_test', {useNewUrlParser: true});

const db = mongoose.connection;

db.once('open', () => {
  console.log('database has connect successful');
});

db.once('close', () => {
  console.log('database close');
});
db.on('error', (err) => {
  console.log(`database connection appear error ${err.measure}`);
});
