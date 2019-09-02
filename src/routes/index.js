const router = require('express').Router();

router.use('/sample', require('./sample'));
router.use('/account', require('./account'));

module.exports = router;
