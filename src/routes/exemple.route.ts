import { Router } from 'express';

const exempleRoutes = Router();

exempleRoutes.get('/', (req, res) => {
  res.json({ ok: true });
});

export { exempleRoutes };
