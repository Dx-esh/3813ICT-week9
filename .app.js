import { MongoClient } from 'mongodb';

const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);

async function main() {
    try {
        //Connect to MongoDB
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db('mydb');

        //Drop products collection if it already exists
        const productsCollection = db.collection('products');

        try {
            await productsCollection.drop();
            console.log('Products collection dropped');

        } catch (error) {
            if (error.codeName === 'NamespaceNotFound') {
                console.log('Products collection does not exist yet');
            
            } else {
                throw error;
            }
        }

        //Create fresh products collection
        const products = await db.createCollection('products');
        console.log('Products collection created');

        //Link to four files
        const addProducts = require('./.add');
        const readProducts = require('./app/.read');
        const updateProduct = require('./app/.update');
        const removeProduct = require('./app/.remove');

        //Operation run sequence
        await addProducts(products);
        await readProducts(products);
        await updateProduct(products);
        await readProducts(products);
        await removeProduct(products);
        await readProducts(products);

    } catch (error) {
        console.error('Error:', error);

    } finally {
        await client.close();
    }
}

main();