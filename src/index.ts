/* istanbul ignore file */

import 'reflect-metadata';
import container from './config/dic';
import Server from './server';

const server = container.get<Server>(Server);

server.start();
