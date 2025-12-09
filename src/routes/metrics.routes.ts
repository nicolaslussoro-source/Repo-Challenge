import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth';
import { getUsers, getUser } from '../services/metrics.service';

const router = Router();

router.get('/user/:email', authenticate, async (req: Request, res: Response) => {
  const { email } = req.params;
  if (!email) return res.status(400).json({ error: 'email required' });
  const metrics = await getUser(email);
  return res.status(200).json(metrics);
});

router.get('/admin', authenticate, async (req: Request, res: Response) => {
  const users = await getUsers();
  return res.status(200).json(users);
});



export default router;
