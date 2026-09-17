import create from './create.js';

async function read(req, res) {
    try {
        const products = await create();
        const result = await products.find({}).toArray();

        res.json(result);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve products' });
    }
}

export default read;