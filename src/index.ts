import dotenv from 'dotenv';
import App from './app';
import AccountController from './controllers/account.controller';
import SampleController from './controllers/sample.controller';
import StoreController from './controllers/store.controller';

dotenv.config();

const port = parseInt(process.env.PORT || '3000', 10);
const host = process.env.HOST || 'localhost';
const protocol = process.env.PROTOCOL || 'http';

const dev = process.env.NODE_ENV !== 'production';
const prod = process.env.NODE_ENV === 'production';

const app: App = new App(
    [new AccountController(), new SampleController(), new StoreController()],
    port,
);

app.listen();
