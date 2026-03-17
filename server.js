import express from 'express';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  console.error('MONGO_URI is not defined in the environment variables.');
  process.exit(1);
}

const client = new MongoClient(mongoUri);

app.get('/', async (_req, res) => {
  try {
    await client.connect();
    await client.db('admin').command({ ping: 1 });

    res.json({ message: 'Successfully connected to the database!' });
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    res.status(500).json({ message: 'Failed to connect to the database.' });
  } finally {
    await client.close().catch(() => {});
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

