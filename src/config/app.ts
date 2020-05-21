import express, { Application } from 'express'
import morgan from 'morgan'
import authRouter from '../routes/auth_routes'


export class App {
    app: Application;

    constructor(
        private port?: number | string
    ) {
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
    }

    private settings() {
        this.app.set('port', this.port || process.env.PORT || 4000);
        this.app.use(authRouter);
    }

    private middlewares() {
        this.app.use(morgan('dev'));
        this.app.use(express.json());
    }

    private routes() {

    }

    async listen(): Promise<void> {
        await this.app.listen(this.app.get('port'));
        console.log('Server on port', this.app.get('port'));
    }

}