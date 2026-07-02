import { Router } from 'express';
import { refreshNcToken, signup, login } from '../services/auth.service.js';
import { validate } from '../middlewares/validate.middleware.js';
import { signupSchema, loginSchema } from '../schemas/auth.schema.js';

const router = Router();

router.get('/auth', async (_req, res) => {
  const key = await refreshNcToken();
  if (!key) {
    res.json({ msg: 'Could not save access-key' });
    return;
  }
  res.json({ msg: 'AccessKey Updated and saved', key });
});

router.post('/signup', validate(signupSchema), async (req, res) => {
  const { email, password } = req.body as { email: string; password: string };
  const user = await signup(email, password);
  if (!user) {
    res.status(500).json({ msg: 'User already exists! Try logging in instead.' });
    return;
  }
  res.json({ msg: 'user created!', email: user.email, password: user.password });
});

router.post('/login', validate(loginSchema), async (req, res) => {
  const { email, password } = req.body as { email: string; password: string };
  const result = await login(email, password);
  if (!result) {
    res.json({ status: 404, msg: 'User not found with email: ' + email });
    return;
  }
  if (result.tokenError) {
    res.json({ status: 500, msg: 'Internal Backend Error for NC Auth key' });
    return;
  }
  res.json({ status: 200, msg: 'User found with email: ' + result.email, secret: result.secret });
});

export default router;
