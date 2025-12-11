import { User } from './../interfaces/User.interface';
import { UserRequest } from '../interfaces/UserRequest.interface';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';
import { envs } from '../config/env';
import { UserResponse } from '../interfaces/UserResponse.interface';
import { actualizarLoginInfo, getLoginUser, getUserByEmail, getUserById, insertUser } from '../repository/auth.repository';
import { getUser } from './metrics.service';
import { UserResponseWithToken } from '../interfaces/UserResponseWithToken.interfce';

export async function login(userRequest: UserRequest): Promise<UserResponseWithToken | null> {
  const user = await getLoginUser(userRequest.email);

  if (!user) return null

  const match = await bcrypt.compare(userRequest.password, user.password_hash);
  if (!match) return null;

  await actualizarLoginInfo(user.id);

  const JWT_SECRET = envs.JWT_SECRET || 'dev-secret-change-me';
  const token = jwt.sign({ sub: user.id, email: userRequest.email }, JWT_SECRET, { expiresIn: '5h' }); // 5 horas para probar tranquilo luego dejar menor tiempo
  return {
    id:user.id,
    name: user.name,
    email: user.email,
    created_at: user.created_at,
    last_login: user.last_login,
    login_count:user.login_count,
    token:token,
  };
}

export async function register(userRequest: UserRequest): Promise<UserResponseWithToken> {
  const found = await getUser(userRequest.email);
  if (found) throw new Error('email already in use');

  const id = randomUUID();
  const passwordHash = await bcrypt.hash(userRequest.password, 8);
  await insertUser(id, userRequest.name, userRequest.email, passwordHash);

  const JWT_SECRET = envs.JWT_SECRET || 'dev-secret-change-me';
  const token = jwt.sign({ sub: id, email: userRequest.email }, JWT_SECRET, { expiresIn: '5h' }); // 5 horas para probar tranquilo luego dejar menor tiempo
  
  return { 
    id: id.toString(), 
    email: userRequest.email, 
    name: userRequest.name,
    created_at: new Date(),
    last_login: new Date(),
    login_count: 0,
    token: token,
   };
}

export async function getById(id: string): Promise<UserResponse | null> {
  const user = await getUserById(id);
  if (!user) return null;
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    created_at: user.created_at,
    last_login: user.last_login,
    login_count: user.login_count || 0
  };
}

export async function isEmailTaken(email:string): Promise<{isTaken:boolean}> {
  const userWithSameEmail = await getUserByEmail(email)
  return {isTaken:(!!userWithSameEmail)}
  
}

export async function getUserData(id: string): Promise<UserResponseWithToken | null> {
  const user = await getUserById(id);
  if (!user) return null;

  const JWT_SECRET = envs.JWT_SECRET || 'dev-secret-change-me';
  const token = jwt.sign({ sub: user.id, email: user.email }, JWT_SECRET, { expiresIn: '5h' });

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    created_at: user.created_at,
    last_login: user.last_login,
    login_count: user.login_count,
    token: token

  };
}