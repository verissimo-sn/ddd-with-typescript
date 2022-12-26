import { Router } from 'express';

import { exempleRoutes } from './exemple.route';

const router = Router();

router.use('/exemple', exempleRoutes);

export { router };
