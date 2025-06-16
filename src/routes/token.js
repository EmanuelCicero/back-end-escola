import { Router } from 'express';
const router = new Router();
import tokenController from '../controllers/token'

router.post('/', tokenController.store)

export default router;
