import { Router } from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';

const router = Router();

const moduleRoutes = [
  // {
  //   path: '/users',
  //   route: UserRoutes,
  // },
  {
    path: '/',
    route: AuthRoutes,
  },
];

/* router.use('/users', UserRoutes);
router.use('/students', StudentRoutes); */

moduleRoutes.forEach((moduleRoute) =>
  router.use(moduleRoute.path, moduleRoute.route),
);

export default router;
