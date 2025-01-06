export const GET = async (request: Request) => {
  const url = new URL(request.url);
  const name = url.searchParams.get('name') ?? 'World';
  return new Response(
    JSON.stringify({
      Message: `Hello ${name}!`,
      Url: request.url,
      Method: request.method,
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
};

export const POST = async (request: Request) => {
  return new Response(
    JSON.stringify({
      Message: 'Hello World',
      Url: request.url,
      Method: request.method,
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
};
