import { rest } from 'msw';

import { API_HOST } from '@infrastructure/services/config';

const mockResponseProducts = Array(5).fill({
  code: 182295,
  name: 'ACME PRODUCT 02509',
  price: 22.99,
  sales_ranking: 2,
  stockout_rate: 0.401,
  wh_coverage: 0.25,
  size_stock: {
    S: 1,
    M: 2,
    L: 0,
    XL: 4,
    XXL: 0,
  },
});

const handlers = [
  rest.get(new URL('products', API_HOST).toString(), (req, res, ctx) =>
    res(ctx.status(200), ctx.json(mockResponseProducts))
  ),
];

export { handlers };
