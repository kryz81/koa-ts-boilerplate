/* istanbul ignore file */

import { createConnection } from 'mongoose';

export const createConn = () =>
  createConnection(`${(global as any).__DBURI__}${process.env.JEST_WORKER_ID || ''}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
