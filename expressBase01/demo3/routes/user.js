const express = require('express');
const router = express.Router();

// router.get('/', (req, res) => {
//   res.render('user', { name: 'express + pug' });
// });

router.get('/:name', (req, res) => {
  res.render('user', { name: req.params.name });
});
module.exports = router;
