import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();  // Load environment variables from .env file for local development (optional)

const mongoPassword = process.env.MONGO_PASSWORD;

if (!mongoPassword) {
    console.error("MongoDB password is missing. Please set the MONGO_PASSWORD environment variable.");
    process.exit(1);  // Exit if password is not found
}

const connectionString = `mongodb+srv://admin:${mongoPassword}@nodecluster.2qwqq.mongodb.net/?retryWrites=true&w=majority&appName=nodecluster`;
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
        process.exit(1);  // Exit if the connection fails
    }
};

// Export the connectToDatabase function to initialize the database in the main server file
export const initializeDatabase = connectToDatabase;

// Export a getter function to access the db after initialization
export const getDb = () => db;
