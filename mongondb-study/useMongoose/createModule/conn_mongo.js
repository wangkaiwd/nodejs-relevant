const mongoose = require('mongoose');
const db = mongoose.connection;
mongoose.connect('mongodb://localhost/mongo_test', {useNewUrlParser: true});

db.once('open', () => {
  console.log('database has connect successful');
});

db.on('error', (err) => {
  console.log('database connect error');
  console.error(err);
});
