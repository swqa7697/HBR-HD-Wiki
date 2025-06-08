export const GET = async (req) => {
  const url = new URL(req.url);
  const name = url.searchParams.get('name') ?? 'World';
  return new Response(
    JSON.stringify({
      Message: `Hello ${name}!`,
      Url: req.url,
      Method: req.method,
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
};

export const POST = async (req) => {
  return new Response(
    JSON.stringify({
      Message: 'Hello World',
      Url: req.url,
      Method: req.method,
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
};
