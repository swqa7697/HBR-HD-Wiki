import mongoose from 'mongoose';

// Global cache to avoid duplicate connections
const cached = global.mongooseCache || {
  conn: null,
  promise: null,
};

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

async function dbConnect() {
  // Already connected
  if (cached.conn) {
    return cached.conn;
  }

  // If no promise exists, create new connection
  if (!cached.promise) {
    const MONGODB_URI = process.env.MONGODB_URI;

    const options = {
      bufferCommands: false,
    };

    if (!MONGODB_URI) {
      throw new Error('Please set MONGODB_URI in environment variables.');
    }

    cached.promise = mongoose
      .connect(MONGODB_URI, options)
      .then((mongooseInstance) => mongooseInstance);
  }

  try {
    cached.conn = await cached.promise;
    console.log('✅ MongoDB connected successfully');
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    console.error('❌ MongoDB connection failed:', error);
    throw error;
  }
}

export default dbConnect;
