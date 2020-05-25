import { App } from './config/app'
import {DataBase} from './config/database'

const main = async () => {
    await new DataBase()
    const app = new App();
    await app.listen();
}

main();