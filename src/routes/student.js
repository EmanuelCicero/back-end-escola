import { Router } from 'express';
const router = new Router();
import alunoController from '../controllers/student'
import loginRequire from '../middlewares/loginRequire'

router.get('/', alunoController.index)
router.get('/:id', alunoController.show)
router.post('/', loginRequire, alunoController.store)
router.put('/:id', loginRequire, alunoController.update)
router.delete('/:id', loginRequire, alunoController.delete)

export default router;
