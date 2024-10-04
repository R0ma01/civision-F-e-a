import { MongoClient } from 'mongodb';
import { MongoDBPaths } from '@/components/enums/mongodb-paths-enum';

const { MONGO_DB_URI, MONGO_DB_NAME } = process.env;

let client;

async function connectToDatabase() {
    // AUTH only, otherwise this could lead to concurrency issues
    try {
        if (!client) {
            client = new MongoClient(MONGO_DB_URI);
            await client.connect();
        }
        return client
            .db(MONGO_DB_NAME)
            .collection(MongoDBPaths.COLLECTION_USERS);
    } catch (error) {
        console.error('Failed to connect to the database', error);
        throw new Error('Database connection failed');
    }
}

async function closeDatabase() {
    try {
        if (client) {
            await client.close();
            client = null;
        }
    } catch (error) {
        console.error('Failed to close the database connection', error);
    }
}

export { connectToDatabase, closeDatabase };
