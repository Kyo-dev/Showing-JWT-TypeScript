import { App } from './config/app'

const main = async () => {
    const app = new App();
    await app.listen();
}

main();