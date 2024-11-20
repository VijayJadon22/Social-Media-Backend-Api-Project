import mongoose from "mongoose";

export const connectWithMongoDb = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Server connected to MongoDb via mongoose");
    } catch (error) {
        console.error("Error: ", error);
    }
}