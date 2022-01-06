const express = require('express');
const router = express.Router();

router.use(require('./usuario'));
router.use(require('./login'));
router.use('/categoria', require('./categoria'));
router.use('/producto', require('./producto'));
router.use('/upload', require('./upload'));
router.use('/imagenes', require('./imagenes'));

module.exports = router;