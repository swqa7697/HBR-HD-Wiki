import dbConnect from '../_util/dbConnect';
import Enemy from '../_models/Enemy';
import { validateEnemyData } from '../_util/validation';

// POST /api/v1/enemy/new - Create new enemy
export const POST = async (request: Request) => {
  try {
    await dbConnect();

    const body = await request.json();

    // Validate create data using validation module
    const validationResult = validateEnemyData(body, false); // isUpdate = false

    if (!validationResult.isValid) {
      const errorResponse: {
        error: string;
        invalidFields?: string[];
        allowedFields?: string[];
        validationErrors?: string[];
      } = {
        error:
          validationResult.errors[0] === 'Invalid fields detected'
            ? 'Invalid fields detected'
            : 'Validation failed',
      };

      if (validationResult.invalidFields && validationResult.allowedFields) {
        errorResponse.invalidFields = validationResult.invalidFields;
        errorResponse.allowedFields = validationResult.allowedFields;
      } else {
        errorResponse.validationErrors = validationResult.errors;
      }

      return new Response(JSON.stringify(errorResponse), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

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
        JSON.stringify({ error: 'Enemy ID already exists' }),
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
