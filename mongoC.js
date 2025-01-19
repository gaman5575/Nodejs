import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();  // Load environment variables from .env file for local development (optional)

// Get MongoDB password from the environment variable (GitHub secret)
const mongoPassword = process.env.MONGO_PASSWORD;

// If you're working locally, .env should hold the password. If running in GitHub Actions, GitHub Secrets should provide it.
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
        process.exit(1);  // Exit the process if the connection fails
    }
};

// Export the connectToDatabase function as a named export
export const initializeDatabase = connectToDatabase;

// Export the db object for use in other files (e.g., in your Express server)
export default db;
