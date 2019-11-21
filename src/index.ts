import 'reflect-metadata';
import dotenv from 'dotenv';
import App from './app';
import { getConnectionManager, createConnection } from 'typeorm';
import { typeormConfig } from './config/config';
import { GlobalSettings } from './lib/GlobalSettings';

dotenv.config();

const port = parseInt(process.env.PORT || '3000', 10);
const host = process.env.HOST || 'localhost';
const protocol = process.env.PROTOCOL || 'http';

const dev = process.env.NODE_ENV !== 'production';
const prod = process.env.NODE_ENV === 'production';

export const globalSettings = new GlobalSettings({ appRoot: __dirname });

process.on('exit', () => {
  Promise.all(
    getConnectionManager().connections.map(c => {
      if (c) {
        return c.close();
      }
    })
  );

  console.info('Database connections has been closed.');
  console.info('App down.');
});

createConnection(typeormConfig[process.env.NODE_ENV || 'development'])
  .then(_ => {
    const app: App = new App(port);

    app.listen();
  })
  .catch(error => console.log('TypeORM connection error: ', error));
