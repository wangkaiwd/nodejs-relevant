const express = require('express');
const app = express();
const router = express.Router();
const PORT = 8000;

router.get('/router1', (req, res) => {
  res.send('router1');
});
router.get('/router2', (req, res) => {
  res.send('router2');
});
app.use('/router', router);
app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
