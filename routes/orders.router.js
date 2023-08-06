import { Router } from 'express';

const ordersRouter = Router();

ordersRouter.get('/', (req, res) => {
  res.json([]);
});

export default ordersRouter;