import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

// Connecting DataBase

async function connect() {

    const mongodb = await MongoMemoryServer.create();
    const getUri = mongodb.getUri();
    mongoose.set('strictQuery', true)//Valid Query Supported Help You TO Secure Your Web  example (username=jhon invalid) (username:john valid)
    const db = await mongoose.connect(getUri);
    console.log('DataBase Connected...')
    return db;

}

export default connect;
