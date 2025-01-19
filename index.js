import express from 'express';
import bodyParser from 'body-parser';
import { initializeDatabase, getDb } from './mongoC.js';  // Import getDb to access the db object

const port = 5000;
const app = express();

// CORS Middleware (good for local development)
app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});

// Body parsers for handling URL encoded and JSON data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Route to check if server is working
app.get('/', (req, res) => {
    res.send('Hello World, Aman express');
});

// Route to add a user to the database
app.post('/addUser', async (req, res) => {
    try {
        const db = getDb();  // Access the database only after it's initialized
        const collection = await db.collection("users");
        const newDocument = req.body;
        newDocument.date = new Date();
        
        const result = await collection.insertOne(newDocument);
        console.log("New user added:", req.body);
        
        // Send response with status 201 (Created) after successful insertion
        res.status(201).send(result);
    } catch (error) {
        console.error("Error adding user:", error);
        res.status(500).send({ error: 'Failed to add user' });
    }
});

// Route to get all users from the database
app.get('/getUsers', async (req, res) => {
    try {
        const db = getDb();  // Access the database only after it's initialized
        const collection = await db.collection("users");
        const results = await collection.find({}).toArray();
        
        // Send response with status 200 (OK) and the users
        res.status(200).send(results);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send({ error: 'Failed to fetch users' });
    }
});

// Ensure MongoDB is connected before starting the server
const startServer = async () => {
    try {
        // Initialize database connection
        await initializeDatabase();  // Ensure MongoDB connection before starting the server
        
        // Now that MongoDB is connected, start the Express server
        app.listen(port, '0.0.0.0', () => {
            console.log("Server is listening at " + port);
        });
    } catch (error) {
        console.error("MongoDB connection failed. Server not started.");
        process.exit(1); // Exit if MongoDB connection fails
    }
};

// Start the server after MongoDB connection is successful
startServer();
