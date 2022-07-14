// import mongoose from "mongoose"

// const connectDB = async () => {
//   if (mongoose.connection.readyState >= 1) {
//     return
//   }
//   mongoose
//     .connect(process.env.MONGODB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     })
//     .then((con) => console.log("connected to DB"))
// }

// export default connectDB

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error(
    'please define MONGODB_URI in the env.local file'
  );
}

let cached = global.mongoose;
if (!cached) { cached = global.mongoose = { conn: null, promise: null }; }

export default async function connectDB() {
  if (cached.conn) { return cached.conn; };

  if (!cached.promise) {
    const options = { bufferCommands: false, };

    cached.promise = mongoose.connect(MONGODB_URI, options)
      .then(mongoose => mongoose);
  }
  cached.conn = await cached.promise;
  console.log('connected to mdb')
  return cached.conn;
}

