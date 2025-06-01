import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IEnemy extends Document {
  enemyId: string; // Complete identifier name as ID. Check hbr.quest to get
  enemyName: string;
  hp: number;
  dp: number;
  border: number;
  devastationRate: number;
  maxDR: number;
  odRate: number;
  imageUrl?: string; // Cloudinary image URL
  resistances: {
    fire: number; // 火
    ice: number; // 冰
    thunder: number; // 雷
    light: number; // 光
    dark: number; // 暗
    null: number; // 无

    slash: number; // 斩
    stab: number; // 突
    strike: number; // 打

    stun: number; //晕
    confusion: number; //混乱
    imprison: number; //封印
  };
}

const EnemySchema: Schema<IEnemy> = new Schema({
  enemyId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  enemyName: {
    type: String,
    required: true,
    trim: true,
  },
  hp: {
    type: Number,
    required: true,
    min: 0,
  },
  dp: {
    type: Number,
    required: true,
    min: 0,
  },
  border: {
    type: Number,
    required: true,
    min: 0,
  },
  devastationRate: {
    type: Number,
    required: true,
    min: 1,
  },
  maxDR: {
    type: Number,
    required: true,
    min: 100,
  },
  odRate: {
    type: Number,
    default: 100,
    min: 0,
    max: 100,
  },
  imageUrl: {
    type: String,
    trim: true,
  },
  resistances: {
    fire: {
      type: Number,
      default: 0,
    },
    ice: {
      type: Number,
      default: 0,
    },
    thunder: {
      type: Number,
      default: 0,
    },
    light: {
      type: Number,
      default: 0,
    },
    dark: {
      type: Number,
      default: 0,
    },
    slash: {
      type: Number,
      default: 0,
    },
    stab: {
      type: Number,
      default: 0,
    },
    strike: {
      type: Number,
      default: 0,
    },
    null: {
      type: Number,
      default: 0,
    },
    stun: {
      type: Number,
      default: 0,
    },
    confusion: {
      type: Number,
      default: 0,
    },
    imprison: {
      type: Number,
      default: 0,
    },
  },
});

// Create index for custom enemyId field
EnemySchema.index({ enemyId: 1 });

const Enemy: Model<IEnemy> =
  mongoose.models.Enemy || mongoose.model<IEnemy>('Enemy', EnemySchema);

export default Enemy;
