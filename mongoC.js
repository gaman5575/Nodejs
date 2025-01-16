import { MongoClient } from "mongodb";
import dotenv from 'dotenv';
dotenv.config();

const connectionString = `mongodb+srv://admin:${process.env.MONGO_PASSWORD}@nodecluster.msd2o.mongodb.net/admin?retryWrites=true&w=majority`;
const client = new MongoClient(connectionString);

let db;  // Declare db here so it can be exported later

try {
  const conn = await client.connect();
  console.log("Connection successful");
  db = conn.db("devdb");  // Set db once the connection is successful
} catch (e) {
  console.error("Failed to connect to MongoDB Atlas:", e);
  process.exit(1);  // Exit if connection fails
}

export default db;  // Export db after it's defined
