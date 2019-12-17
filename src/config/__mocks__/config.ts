export const APP_PORT = 3001;
export const DB_ENDPOINT = `${(global as any).__DBURI__}${process.env.JEST_WORKER_ID || ''}`;
