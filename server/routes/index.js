const express = require('express');
const router = express.Router();

router.use(require('./usuario'));
router.use(require('./login'));

module.exports = router;