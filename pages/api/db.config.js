const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = "mongodb+srv://arif:0irjUF567EE336RM@cluster0.ehq4rqq.mongodb.net/";

let cacheClient = null;

async function dbConnect() {
  if (cacheClient) return cacheClient;
  try {
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    await client.connect();
    cacheClient = client;
    return client;
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
export default dbConnect;
