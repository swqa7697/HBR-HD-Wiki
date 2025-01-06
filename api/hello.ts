export const GET = (request: Request) => {
  const url = new URL(request.url);
  const name = url.searchParams.get('name') ?? 'World';
  return new Response(
    JSON.stringify({
      message: `Hello ${name}!`,
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
};
