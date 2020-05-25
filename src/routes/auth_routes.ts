import {Router} from 'express';

import {signUp, signIn, profile} from '../controllers/auth_controller'
// const router: Router = Router();
class AuthRoutes{
    public router: Router;
    constructor(){
        this.router = Router()
        this.routes()
    }
    routes(){
        this.router.post('/signup', signUp)
        this.router.post('/signin', signIn)
        this.router.get('/profile', profile)
    }
}

const authRoutes = new AuthRoutes();
authRoutes.routes();
export default authRoutes.router