import { Router } from 'express';
import { registerAccount, loginAccount, fetchUsername } from '../controllers/accountController';

const router = Router();

router.post('/accounts', registerAccount);
router.post('/accounts/login', loginAccount);
router.get('/getUsername', fetchUsername);

export default router;
