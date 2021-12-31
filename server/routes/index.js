const express = require('express');
const router = express.Router();

router.use(require('./usuario'));
router.use(require('./login'));
router.use('/categoria', require('./categoria'));
router.use('/producto', require('./producto'))

module.exports = router;