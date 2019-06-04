import express from 'express';

import getRules from './api/getRules';

const router = express.Router();

router.get('/getRules', getRules.get);

export default router;
