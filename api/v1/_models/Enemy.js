import mongoose, { Schema } from 'mongoose';

const EnemySchema = new Schema({
  enemyId: {
    // Full identifier name as ID. Check hbr.quest to get
    type: String,
    required: true,
    index: true,
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
    // Cloudinary image URL
    type: String,
    trim: true,
  },
  resistances: {
    fire: {
      // 火
      type: Number,
      default: 0,
    },
    ice: {
      // 冰
      type: Number,
      default: 0,
    },
    thunder: {
      // 雷
      type: Number,
      default: 0,
    },
    light: {
      // 光
      type: Number,
      default: 0,
    },
    dark: {
      // 暗
      type: Number,
      default: 0,
    },
    null: {
      // 无
      type: Number,
      default: 0,
    },
    slash: {
      // 斩
      type: Number,
      default: 0,
    },
    stab: {
      // 突
      type: Number,
      default: 0,
    },
    strike: {
      // 打
      type: Number,
      default: 0,
    },
    stun: {
      // 晕
      type: Number,
      default: 0,
    },
    confusion: {
      // 混乱
      type: Number,
      default: 0,
    },
    imprison: {
      // 封印
      type: Number,
      default: 0,
    },
  },
});

const Enemy = mongoose.models.Enemy || mongoose.model('Enemy', EnemySchema);

export default Enemy;
