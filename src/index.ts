/* istanbul ignore file */

import SERVICE_ID from './config/service_id';
import container from './config/dic';
import Server from './server';

const server = container.get<Server>(SERVICE_ID.SERVER);

server.start();
