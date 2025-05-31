import dbConnect from './_util/dbConnect';
import Enemy from './_models/Enemy';

// GET - Fetch all enemies or query by ID
export const GET = async (request: Request) => {
  try {
    await dbConnect();

    const url = new URL(request.url);
    const enemyId = url.searchParams.get('id');

    let enemies;
    if (enemies) {
      // Query specific enemy by enemyId
      enemies = await Enemy.findOne({ enemyId }).lean();
      if (!enemies) {
        return new Response(JSON.stringify({ error: 'Enemy not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    } else {
      // Get all enemies
      enemies = await Enemy.find({}).lean();
    }

    return new Response(
      JSON.stringify({
        success: true,
        data: enemies,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  } catch (error) {
    console.error(`${request.method} ${request.url} Error:`, error);
    return new Response(
      JSON.stringify({
        error: 'Failed to fetch enemy data',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }
};

// POST - Create new enemy
export const POST = async (request: Request) => {
  try {
    await dbConnect();

    const body = await request.json();
    const {
      enemyId,
      enemyName,
      hp,
      dp,
      border,
      devastationRate,
      maxDR,
      odRate,
      resistances,
    } = body;

    // Validate required fields
    if (
      !enemyId ||
      !enemyName ||
      hp === undefined ||
      dp === undefined ||
      border === undefined ||
      devastationRate === undefined ||
      maxDR === undefined
    ) {
      return new Response(
        JSON.stringify({
          error: 'Missing required fields',
          required: [
            'enemyId',
            'enemyName',
            'hp',
            'dp',
            'border',
            'devastationRate',
            'maxDR',
          ],
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      );
    }

    // Create new enemy
    const enemy = new Enemy({
      enemyId,
      enemyName,
      hp,
      dp,
      border,
      devastationRate,
      maxDR,
      odRate: odRate || 100,
      resistances: resistances || {
        fire: 0,
        ice: 0,
        thunder: 0,
        light: 0,
        dark: 0,
        slash: 0,
        stab: 0,
        strike: 0,
        null: 0,
        stun: 0,
        confusion: 0,
        imprison: 0,
      },
    });

    const savedEnemy = await enemy.save();

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Enemy created successfully',
        data: savedEnemy,
      }),
      {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  } catch (error) {
    console.error(`${request.method} ${request.url} Error:`, error);

    // Handle duplicate ID or name error
    if (error instanceof Error && error.message.includes('duplicate key')) {
      return new Response(
        JSON.stringify({ error: 'Enemy ID or name already exists' }),
        {
          status: 409,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }

    return new Response(
      JSON.stringify({
        error: 'Failed to create enemy',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }
};
