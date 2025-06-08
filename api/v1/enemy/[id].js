import dbConnect from '../_util/dbConnect.js';
import Enemy from '../_models/Enemy.js';
import { validateEnemyData } from '../_util/validation.js';

export const handler = async (req, res) => {
  const { id: enemyId } = req.query;

  switch (req.method) {
    // GET /api/v1/enemy/[id] - Get enemy by enemyId
    case 'GET':
      try {
        await dbConnect();

        if (!enemyId) {
          return res.status(400).json({ error: 'Enemy ID is required' });
        }

        const enemy = await Enemy.findOne({ enemyId }).lean();

        if (!enemy) {
          return res.status(404).json({ error: 'Enemy not found' });
        }

        res.status(200).json({
          success: true,
          data: enemy,
        });
      } catch (error) {
        console.error(`${req.method} ${req.url} Error:`, error);
        res.status(500).json({
          error: 'Failed to fetch enemy data',
          details: error instanceof Error ? error.message : 'Unknown error',
        });
      }

    // PATCH /api/v1/enemy/[id] - Update enemy by enemyId
    case 'PATCH':
      try {
        await dbConnect();

        if (!enemyId) {
          return res.status(400).json({ error: 'Enemy ID is required' });
        }

        const body = req.body;
        const updateData = { ...body };

        // Remove enemyId from update data to prevent changing the ID
        delete updateData.enemyId;

        if (Object.keys(updateData).length === 0) {
          return res.status(400).json({ error: 'No valid fields to update' });
        }

        // Validate update data using validation module
        const validationResult = validateEnemyData(updateData, true);

        if (!validationResult.isValid) {
          const errorResponse = {
            error:
              validationResult.errors[0] === 'Invalid fields detected'
                ? 'Invalid fields detected'
                : 'Validation failed',
          };

          if (
            validationResult.invalidFields &&
            validationResult.allowedFields
          ) {
            errorResponse.invalidFields = validationResult.invalidFields;
            errorResponse.allowedFields = validationResult.allowedFields;
          } else {
            errorResponse.validationErrors = validationResult.errors;
          }

          return res.status(400).json(errorResponse);
        }

        const updatedEnemy = await Enemy.findOneAndUpdate(
          { enemyId },
          updateData,
          {
            new: true,
            runValidators: true,
          },
        ).lean();

        if (!updatedEnemy) {
          return res.status(404).json({ error: 'Enemy not found' });
        }

        res.status(200).json({
          success: true,
          message: 'Enemy updated successfully',
          data: updatedEnemy,
        });
      } catch (error) {
        console.error(`${req.method} ${req.url} Error:`, error);

        // Handle validation errors
        if (error instanceof Error && error.name === 'ValidationError') {
          return res.status(400).json({
            error: 'Database validation failed',
            details: error.message,
          });
        }

        res.status(500).json({
          error: 'Failed to update enemy',
          details: error instanceof Error ? error.message : 'Unknown error',
        });
      }

    // DELETE /api/v1/enemy/[id] - Delete enemy by enemyId
    case 'DELETE':
      try {
        await dbConnect();

        if (!enemyId) {
          return res.status(400).json({ error: 'Enemy ID is required' });
        }

        const deletedEnemy = await Enemy.findOneAndDelete({ enemyId }).lean();

        if (!deletedEnemy) {
          return res.status(404).json({ error: 'Enemy not found' });
        }

        res.status(200).json({
          success: true,
          message: 'Enemy deleted successfully',
          data: {
            deletedEnemyId: deletedEnemy.enemyId,
            deletedEnemyName: deletedEnemy.enemyName,
          },
        });
      } catch (error) {
        console.error(`${req.method} ${req.url} Error:`, error);
        res.status(500).json({
          error: 'Failed to delete enemy',
          details: error instanceof Error ? error.message : 'Unknown error',
        });
      }

    // Unsupported methods
    default:
      res.setHeader('Allow', ['GET', 'PATCH', 'DELETE']);
      res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
};

export default handler;
