import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
  PORT: get('PORT').default('3000').asPortNumber(),
  DB_HOST: get('DB_HOST').default('127.0.0.1').asString(),
  DB_PORT: get('DB_PORT').default('3306').asPortNumber(),
  DB_USER: get('DB_USER').default('root').asString(),
  DB_PASSWORD: get('DB_PASSWORD').default('nico1234').asString(),
  DB_NAME: get('DB_NAME').default('challenge').asString(),
};