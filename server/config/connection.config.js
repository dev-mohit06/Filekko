import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

let connection = null;

const getDatabaseURI = () => {
    const isDev = process.env.IS_DEV === "true";
    return isDev ? process.env.DEV_MONGO_URI : process.env.PROD_MONGO_URI;
};

const connectDB = async () => {
    if (connection) {
        console.log("Reusing existing database connection.");
        return connection;
    }

    const uri = getDatabaseURI();

    if (!uri) {
        console.error("❌ Database URI is not defined. Check your environment variables.");
        process.exit(1);
    }

    try {
        console.log("\nCreating a new database connection...");
        connection = await mongoose.connect(uri);

        mongoose.connection.on("error", (err) => {
            console.error("❌ MongoDB connection error:", err);
        });

        mongoose.connection.on("disconnected", () => {
            console.warn("⚠️ MongoDB connection disconnected.");
        });

        // Cleanup on process termination
        process.on("SIGINT", async () => {
            await mongoose.connection.close();
            console.log("🔌 MongoDB connection closed due to application termination.");
            process.exit(0);
        });

        return connection;
    } catch (error) {
        console.error("❌ Failed to connect to MongoDB:", error);
        throw error;
    }
}

export {
    connection,
    connectDB,
};