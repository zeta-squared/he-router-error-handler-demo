import { Router, Request, Response } from 'hyper-express';

const routerTwo = new Router();

routerTwo.get('/routerTwo/error', (req: Request, res: Response) => {
  throw new Error('Manufactured error on router two');
});

export { routerTwo };
