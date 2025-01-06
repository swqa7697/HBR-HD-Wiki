export const POST = async (req: Request) => {
  try {
    const { val = 'No Value' } = await req.json();
    return new Response(
      JSON.stringify({
        Val: val,
        Method: req.method,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        Message: 'Error parsing post request body',
        err,
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }
};
