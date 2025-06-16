import { Router } from 'express';
import logingRequire from '../middlewares/loginRequire'

import photoController from '../controllers/photo'

const router = new Router();

router.post('/', logingRequire, photoController.index)

export default router;
