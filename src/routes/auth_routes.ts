import {Router} from 'express';
import {getAuth} from '../controllers/auth_controller'
const router: Router = Router();

router.route('/')
    .get(getAuth)

export default router;