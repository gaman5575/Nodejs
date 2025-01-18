import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const connectionString = `mongodb+srv://admin:${process.env.MONGO_PASSWORD}@nodecluster.2qwqq.mongodb.net/?retryWrites=true&w=majority&appName=nodecluster`;
const client = new MongoClient(connectionString);

let db;  // Declare db here so it can be exported later

// This function will attempt to connect to MongoDB and assign the db object
const connectToDatabase = async () => {
    try {
        const conn = await client.connect();
        console.log("MongoDB connection successful");
        db = conn.db("nodedb");  // Set db once the connection is successful
    } catch (error) {
        console.error("Failed to connect to MongoDB Atlas:", error);
        process.exit(1);  // Exit the process if the connection fails
    }
};

// Export the connectToDatabase function as a named export
export const initializeDatabase = connectToDatabase;

// Export the db object for use in other files (e.g., in your Express server)
export default db;
