import { MongoClient } from "mongodb";
import dotenv from 'dotenv';
dotenv.config();

//const password = encodeURIComponent(process.env.MONGO_PASSWORD.trim());
const connectionString = `mongodb+srv://admin:${process.env.MONGO_PASSWORD}@nodecluster.msd2o.mongodb.net/admin?retryWrites=true&w=majority`; // cluster URL
const client = new MongoClient(connectionString);
let conn;

try {
  conn = await client.connect();
  console.log("Connection successful");
} catch (e) {
  console.error("Failed to connect to MongoDB Atlas:", e);
  process.exit(1);  // Exit if connection fails
}

if (conn) {
  try {
    let db = conn.db("devdb");
    // You can now interact with the database
  } catch (err) {
    console.error("Error accessing the database:", err);
  }
}

export default db;
