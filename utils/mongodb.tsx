import { MongoClient, Db } from 'mongodb';

// Connection URI
const {
    MONGO_DB_URI,
    MONGO_DB_URI_REPERTOIRE,
    MONGO_DB_URI_INDEXE,
    MONGO_DB_NAME,
    MONGO_DB_NAME_REPERTOIRE,
    MONGO_DB_NAME_INDEXE,
} = process.env;

// Singleton MongoClient
let cachedStudyClient: MongoClient | null = null;
let cachedStudyDb: Db | null = null;
let cachedRepertoireClient: MongoClient | null = null;
let cachedRepertoireDb: Db | null = null;
let cachedIndexeClient: MongoClient | null = null;
let cachedIndexeDb: Db | null = null;

export async function connectToDatabaseStudy() {
    if (cachedStudyClient && cachedStudyDb) {
        return { client: cachedStudyClient, db: cachedStudyDb };
    }

    const client = new MongoClient(MONGO_DB_URI || '');

    await client.connect();
    const db = client.db(MONGO_DB_NAME);

    cachedStudyClient = client;
    cachedStudyDb = db;

    return { client, db };
}

export async function connectToDatabaseRepertoire() {
    if (cachedRepertoireClient && cachedRepertoireDb) {
        return { client: cachedRepertoireClient, db: cachedRepertoireDb };
    }

    const client = new MongoClient(MONGO_DB_URI_REPERTOIRE || '');

    await client.connect();
    const db = client.db(MONGO_DB_NAME_REPERTOIRE);

    cachedRepertoireClient = client;
    cachedRepertoireDb = db;

    return { client, db };
}

export async function connectToDatabaseIndexe() {
    if (cachedIndexeClient && cachedIndexeDb) {
        return { client: cachedIndexeClient, db: cachedIndexeDb };
    }

    const client = new MongoClient(MONGO_DB_URI_INDEXE || '');

    await client.connect();
    const db = client.db(MONGO_DB_NAME_INDEXE);

    cachedIndexeClient = client;
    cachedIndexeDb = db;

    return { client, db };
}
