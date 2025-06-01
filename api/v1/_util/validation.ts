// Validation utilities for Enemy endpoints

interface ValidationResult {
  isValid: boolean;
  errors: string[];
  invalidFields?: string[];
  allowedFields?: string[];
}

type EnemyData = Record<string, unknown>;

/**
 * Validate enemy data for create or update operations
 * @param data - The data object to validate
 * @param isUpdate - Whether this is an update operation (false for create)
 * @returns ValidationResult object with validation status and errors
 */
export function validateEnemyData(
  data: EnemyData,
  isUpdate: boolean = false,
): ValidationResult {
  const errors: string[] = [];

  // Field whitelist validation
  const allowedFields = [
    'enemyId', // Only allowed for create operations
    'enemyName',
    'hp',
    'dp',
    'border',
    'devastationRate',
    'maxDR',
    'odRate',
    'imageUrl', // Cloudinary image URL
    'resistances',
  ];

  // For update operations, enemyId should not be allowed
  const validFields = isUpdate
    ? allowedFields.filter((field) => field !== 'enemyId')
    : allowedFields;

  const invalidFields = Object.keys(data).filter(
    (field) => !validFields.includes(field),
  );

  if (invalidFields.length > 0) {
    return {
      isValid: false,
      errors: ['Invalid fields detected'],
      invalidFields,
      allowedFields: validFields,
    };
  }

  // Required fields validation (only for create operations)
  if (!isUpdate) {
    const requiredFields = [
      'enemyId',
      'enemyName',
      'hp',
      'dp',
      'border',
      'devastationRate',
      'maxDR',
    ];
    const missingFields = requiredFields.filter(
      (field) =>
        data[field] === undefined || data[field] === null || data[field] === '',
    );

    if (missingFields.length > 0) {
      errors.push(`Missing required fields: ${missingFields.join(', ')}`);
    }
  }

  // Type and value validation

  // Validate enemyId (only for create operations)
  if (!isUpdate && data.enemyId !== undefined) {
    if (typeof data.enemyId !== 'string' || data.enemyId.trim().length === 0) {
      errors.push('enemyId must be a non-empty string');
    }
  }

  // Validate enemyName
  if (data.enemyName !== undefined) {
    if (
      typeof data.enemyName !== 'string' ||
      data.enemyName.trim().length === 0
    ) {
      errors.push('enemyName must be a non-empty string');
    }
  }

  // Validate imageUrl
  if (data.imageUrl !== undefined) {
    if (typeof data.imageUrl !== 'string') {
      errors.push('imageUrl must be a string');
    } else if (data.imageUrl.trim().length > 0) {
      // Only validate URL format if not empty
      try {
        new URL(data.imageUrl);
        // Additional validation for Cloudinary URLs (optional)
        if (
          !data.imageUrl.includes('cloudinary.com') &&
          !data.imageUrl.includes('res.cloudinary.com')
        ) {
          errors.push('imageUrl should be a valid Cloudinary URL');
        }
      } catch {
        errors.push('imageUrl must be a valid URL');
      }
    }
  }

  // Validate numeric fields
  const numericFields = [
    'hp',
    'dp',
    'border',
    'devastationRate',
    'maxDR',
    'odRate',
  ];
  numericFields.forEach((field) => {
    if (data[field] !== undefined) {
      if (typeof data[field] !== 'number' || data[field] < 0) {
        errors.push(`${field} must be a non-negative number`);
      }
    }
  });

  // Special validation for specific fields
  if (
    data.devastationRate !== undefined &&
    typeof data.devastationRate === 'number' &&
    data.devastationRate < 1
  ) {
    errors.push('devastationRate must be at least 1');
  }

  if (
    data.maxDR !== undefined &&
    typeof data.maxDR === 'number' &&
    data.maxDR < 100
  ) {
    errors.push('maxDR must be at least 100');
  }

  if (
    data.odRate !== undefined &&
    typeof data.odRate === 'number' &&
    (data.odRate < 0 || data.odRate > 100)
  ) {
    errors.push('odRate must be between 0 and 100');
  }

  // Validate resistances object
  if (data.resistances !== undefined) {
    if (typeof data.resistances !== 'object' || data.resistances === null) {
      errors.push('resistances must be an object');
    } else {
      const validResistanceKeys = [
        'fire',
        'ice',
        'thunder',
        'light',
        'dark',
        'slash',
        'stab',
        'strike',
        'null',
        'stun',
        'confusion',
        'imprison',
      ];

      const resistances = data.resistances as Record<string, unknown>;
      Object.keys(resistances).forEach((key) => {
        if (!validResistanceKeys.includes(key)) {
          errors.push(`Invalid resistance type: ${key}`);
        } else if (typeof resistances[key] !== 'number') {
          errors.push(`resistance.${key} must be a number`);
        }
      });
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
