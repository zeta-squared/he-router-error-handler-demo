import { MiddlewareNext, Request, Response, Server } from 'hyper-express';
import { router } from './router';

const app = new Server();

app.set_error_handler((req: Request, res: Response, error: Error) => {
  return res.status(500).json({
    code: 500,
    message: error.message,
  });
});

app.use((req: Request, res: Response, next: MiddlewareNext) => {
  console.log('first server-wide middleware');
  next();
})

app.get('/hello/:name', async (req: Request, res: Response) => {
  const name: string = req.path_parameters.name;

  return res.status(200).json({
    hello: `${name}`,
  });
});

app.get('/error', async (req: Request, res: Response) => {
  throw new Error('Manufactured error test on server');
})

app.use(router);
app.use((req: Request, res: Response, next: MiddlewareNext) => {
  console.log('second server-wide middleware');
  next();
})

app.listen(5000);
