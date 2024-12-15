import { Router, Request, Response } from 'hyper-express';

const routerTwo = new Router();

routerTwo.set_error_handler(async (req: Request, res: Response, error: Error) => {
  return res.status(401).json({
    code: 401,
    message: error.message,
  });
});

routerTwo.get('/routerTwo/error', (req: Request, res: Response) => {
  throw new Error('Manufactured error on router two');
});

export { routerTwo };
