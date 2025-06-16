import { Router } from 'express';
const router = new Router();
import userController from '../controllers/user'
import loginRequire from '../middlewares/loginRequire';

// Não existe em um cenario real
router.get('/', userController.index) 
// router.get('/:id', userController.show) 

// Existe
router.post('/', loginRequire,  userController.store)
router.put('/', loginRequire,  userController.update)
router.delete('/', loginRequire, userController.delete)

export default router; 
