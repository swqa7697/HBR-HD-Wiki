import type { VercelRequest, VercelResponse } from '@vercel/node';

export const config = {
  runtime: 'nodejs',
};

export default function (request: VercelRequest, response: VercelResponse) {
  const method = request.method;

  switch (method) {
    case 'GET': {
      const { name = 'World' } = request.query;
      response.status(200).json({ message: `Hello ${name}!` });
      break;
    }
    default: {
      response.status(405).json({ message: `Method ${method} Not Allowed` });
      break;
    }
  }
}
