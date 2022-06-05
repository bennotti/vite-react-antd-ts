import { rest } from 'msw';

export const defaultHandlers = [
    rest.get('https://localhost:9000*', (req, res, ctx) => {
      return res(ctx.status(400), ctx.json({}));
    }),
    rest.post('https://localhost:9000*', (req, res, ctx) => {
      return res(ctx.status(400), ctx.json({}));
    }),
    rest.patch('https://localhost:9000*', (req, res, ctx) => {
      res(ctx.status(400), ctx.json({}));
    }),
    rest.put('https://localhost:9000*', (req, res, ctx) => {
      res(ctx.status(400), ctx.json({}));
    }),
    rest.delete('https://localhost:9000*', (req, res, ctx) => {
      res(ctx.status(400), ctx.json({}));
    }),
];