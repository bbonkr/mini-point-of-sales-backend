import express, { Router } from 'express';
import sample from './sample';
const router: Router = express.Router();

router.use('/sample', sample);
router.use('/account', require('./account'));

// module.exports = router;
export default router;
