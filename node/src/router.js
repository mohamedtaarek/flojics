import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import publishToQueue from './service';
import User from './module';

const router = Router();
router.get('/user', async (req, res) => {
  // console.log('GET:', req.body);
  const users = await User.findAll();
  res.status(200).send(users);
});
router.post(
  '/user',
  body('email').isEmail(),
  body('name').isLength({ min: 5 }),
  body('phone').isLength({ min: 8 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json(errors.array()[0].msg);
    }
    // const queueName = 'user-messages';
    const payload = req.body;
    await publishToQueue('user-messages', payload);
    res.status(200).send('message sent');
  },
);
export default router;
