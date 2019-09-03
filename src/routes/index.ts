import express, { Router } from 'express';
import sample from './sample';
import account from './account';

const router: Router = express.Router();

router.use('/sample', sample);
router.use('/account', account);

// module.exports = router;
export default router;
