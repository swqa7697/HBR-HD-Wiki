import dbConnect from '../_util/dbConnect';
import Enemy from '../_models/Enemy';
import { validateEnemyData } from '../_util/validation';

// GET /api/v1/enemy/[id] - Get enemy by enemyId
export const GET = async (
  req: Request,
  context: { params: Promise<{ id: string }> },
) => {
  try {
    await dbConnect();

    const enemyId = await context.params;

    if (!enemyId) {
      return new Response(JSON.stringify({ error: 'Enemy ID is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const enemy = await Enemy.findOne({ enemyId }).lean();

    if (!enemy) {
      return new Response(JSON.stringify({ error: 'Enemy not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        data: enemy,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  } catch (error) {
    console.error(`${req.method} ${req.url} Error:`, error);
    return new Response(
      JSON.stringify({
        error: 'Failed to fetch enemy data',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }
};

// PATCH /api/v1/enemy/[id] - Update enemy by enemyId
export const PATCH = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  try {
    await dbConnect();

    const { id: enemyId } = await params;

    if (!enemyId) {
      return new Response(JSON.stringify({ error: 'Enemy ID is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const body = await req.json();
    const updateData = { ...body };

    // Remove enemyId from update data to prevent changing the ID
    delete updateData.enemyId;

    if (Object.keys(updateData).length === 0) {
      return new Response(
        JSON.stringify({ error: 'No valid fields to update' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      );
    }

    // Validate update data using validation module
    const validationResult = validateEnemyData(updateData, true);

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

    const updatedEnemy = await Enemy.findOneAndUpdate({ enemyId }, updateData, {
      new: true,
      runValidators: true,
    }).lean();

    if (!updatedEnemy) {
      return new Response(JSON.stringify({ error: 'Enemy not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Enemy updated successfully',
        data: updatedEnemy,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  } catch (error) {
    console.error(`${req.method} ${req.url} Error:`, error);

    // Handle validation errors
    if (error instanceof Error && error.name === 'ValidationError') {
      return new Response(
        JSON.stringify({
          error: 'Database validation failed',
          details: error.message,
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      );
    }

    return new Response(
      JSON.stringify({
        error: 'Failed to update enemy',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }
};

// DELETE /api/v1/enemy/[id] - Delete enemy by enemyId
export const DELETE = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  try {
    await dbConnect();

    const { id: enemyId } = await params;

    if (!enemyId) {
      return new Response(JSON.stringify({ error: 'Enemy ID is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const deletedEnemy = await Enemy.findOneAndDelete({ enemyId }).lean();

    if (!deletedEnemy) {
      return new Response(JSON.stringify({ error: 'Enemy not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Enemy deleted successfully',
        data: {
          deletedEnemyId: deletedEnemy.enemyId,
          deletedEnemyName: deletedEnemy.enemyName,
        },
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  } catch (error) {
    console.error(`${req.method} ${req.url} Error:`, error);
    return new Response(
      JSON.stringify({
        error: 'Failed to delete enemy',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }
};
