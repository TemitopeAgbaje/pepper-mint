import { MongoClient } from 'mongodb';

export async function getData(request: any, response: any) {
  let mongoClient: MongoClient;

  try {
    // Connect to the MongoDB Atlas cluster
    mongoClient = new MongoClient(process.env.MONGODB_URI as string);
    await mongoClient.connect();

    // Get a reference to the database and collection
    const database = mongoClient.db('peppermint');
    const collection = database.collection('users');

    // Perform a query to find documents
    const results = await collection.find({}).limit(5).toArray();

    // Send the results as the response
    response.setStatusCode(200);
    response.setBody(results);
  } catch (error) {
    // Handle any errors
    response.setStatusCode(500);
    response.setBody({ message: error.message });
  } finally {
    // Ensure the client is closed
    if (mongoClient) {
      await mongoClient.close();
    }
  }
}
