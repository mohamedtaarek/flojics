import { Router } from 'express';
import { body, validationResult } from 'express-validator';

const router = Router();

router.get('/', (req, res) => {
  res.status(200).send('hello world!');
});
router.post(
  '/',
  body('email').isEmail(),
  body('name').isLength({ min: 5 }),
  body('phone').isLength({ min: 8 }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json(errors.array()[0].msg);
    }
    res.status(200).json(req.body);
  },
);
export default router;
