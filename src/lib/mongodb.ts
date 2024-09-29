import { MongoClient } from "mongodb";

if (!process.env.MONGO_DB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGO_DB_URI"');
}

const client = new MongoClient(process.env.MONGO_DB_URI, {
  appName: "prav-test-next-form",
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});
export default client;
