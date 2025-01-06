export async function GET(request: Request) {
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
}

export async function POST(request: Request) {
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
}
