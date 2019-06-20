import { config } from 'dotenv';
import { MERN } from './Server';

config();

const server = new MERN();

server.start(5000);
