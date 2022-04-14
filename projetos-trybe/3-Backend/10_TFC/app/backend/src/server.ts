import { App } from './app';
import 'dotenv/config';

const PORT = process.env.PORT || 3001;

new App().start(PORT); // Acionando o método público da classe "App". Tal método "sobe" o servidor da API.
