import { MongoClient } from 'mongodb';

const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);

async function create() {
    try {
        //Connect to MongoDB
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db('mydb');
        return db.collection('products');

    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}

export default create;