import * as mongoDB from 'mongodb'
import { MONGO_COLLECTIONS } from './constants'

// dbCollection is a map for easy retrieval and storage of db collection names
export const dbCollections = new Map<string, mongoDB.Collection>()

// Initialize Connection
export async function connectToDatabase() {
  const uri = process.env?.DB_CONN_STRING || ''
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(uri)

  await client.connect()

  const db: mongoDB.Db = client.db(process.env.DB_NAME)

  // Initialize the collection objects for interacting with the database
  for (const [key, value] of Object.entries(MONGO_COLLECTIONS)) {
    dbCollections.set(key, db.collection(value))
  }

  console.log(`Successfully connected to database: ${db.databaseName}.}`)
}
