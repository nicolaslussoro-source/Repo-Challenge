import { Router, Request, Response } from 'express';
import { login, register, getById, getUserData, isEmailTaken } from '../services/auth.service';
import { authenticate } from '../middleware/auth';
import { UserRequest } from '../interfaces/UserRequest.interface';

const router = Router();

router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'email and password are required' });

  try {
    const user = await login({ email, password } as UserRequest);
    if (!user) return res.status(401).json({ error: 'invalid credentials' });
    return res.json(user);
  } catch (err: any) {
    console.error('Login error', err);
    return res.status(500).json({ error: 'internal error' });
  }
});

router.post('/register', async (req: Request, res: Response) => {
  const { name, email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'email and password are required' });

  try {
    const user = await register({ name, email, password } as UserRequest);
    return res.status(201).json(user);
  } catch (err: any) {
    console.error('Register error', err);
    return res.status(400).json({ error: err.message || 'cannot register user' });
  }
});

router.get('/me', authenticate, async (req: Request, res: Response) => {
  const userId = req.body.sub;
  if (!userId) return res.status(401).json({ error: 'unauthorized' });
  const user = await getUserData(userId);
  if (!user) return res.status(404).json({ error: 'user not found' });
  return res.status(200).json(user);
});

router.post('/email', async (req: Request, res: Response) => {
  const email = req.body.email
  if (!email) return res.status(400).json({ error: 'expected email in body'});
  const isTaken = await isEmailTaken(email);
  return res.status(200).json(isTaken)
})

export default router;
