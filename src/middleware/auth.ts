import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { envs } from '../config/env';


export function authenticate(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'] || '';
  const parts = (Array.isArray(authHeader) ? authHeader[0] : authHeader).split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).json({ error: 'missing token' });

  const token = parts[1];
  try {
    const JWT_SECRET = envs.JWT_SECRET!;
    const payload = jwt.verify(token, JWT_SECRET);
    req.body = payload;
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'invalid token' });
  }
}
