import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// load env variables
dotenv.config();

//routes for the server
import routes from './routes/index.route.js';

// config files for the server
import config from './config/cors.config.js';
import { connectDB } from './config/connection.config.js'

// utilities files for the server
import errorHandler from './middleware/error.middleware.js';

// models
import './models/user.model.js';

// server
const server = express();

// static files
server.use(express.static('public'));

// set port, listen for requests
server.use(cors(config));

// parse requests of content-type - application/json and application/x-www-form-urlencoded
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use('/api',routes);

// error handler
server.use(errorHandler);

try {
    await connectDB();

    server.listen(process.env.DEV_PORT, process.env.DEV_HOST, () => {
        console.log(`✅ MongoDB connected successfully\n`);
        console.log(`Server is running on http://${process.env.DEV_HOST}:${process.env.DEV_PORT}`);
    });
} catch (error) {
    console.error("❌ Failed to connect to MongoDB");
    process.exit(1);
}