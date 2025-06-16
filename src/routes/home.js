import { Router } from 'express';
const router = new Router();
import homeController from '../controllers/home'

router.get('/', homeController.index)

export default router;
