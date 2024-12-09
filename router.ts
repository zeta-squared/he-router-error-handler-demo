import { Router, Request, Response } from 'hyper-express';
import { routerTwo } from './routerTwo';

const router = new Router();

router.set_error_handler((req: Request, res: Response, error: Error) => {
  return res.status(400).json({
    code: 400,
    message: error.message,
  });
});

router['get']('/router/test',
  async (req: Request, res: Response) => {
    console.log('route-specific middleware on router');
  },
  (req: Request, res: Response) => {
    console.log('/router/test handler');
    throw new Error('/router/test error');
  }
)

router.get('/router/error', async (req: Request, res: Response) => {
  throw new Error('Manufactured error test on route');
});

router.use(routerTwo);

export { router };
