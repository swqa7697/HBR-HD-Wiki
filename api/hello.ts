import type { VercelRequest, VercelResponse } from '@vercel/node';

export async function handler(req: VercelRequest, res: VercelResponse) {
  const method = req.method;

  switch (method) {
    case 'GET': {
      const { name = 'World' } = req.query;
      res.status(200).json({ message: `Hello ${name}!` });
      break;
    }
    default: {
      res.status(405).json({ message: `Method ${method} Not Allowed` });
      break;
    }
  }
}
