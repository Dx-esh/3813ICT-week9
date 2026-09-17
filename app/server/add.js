import create from './create.js';

async function add(req, res) {
    try {
        const products = await create();
        const product = req.body;

        const existingProduct = await products.findOne({ id: product.id });

        if (existingProduct) {
            return res.status(409).json({ error: 'A product with this id already exists '});
        }

        const result = await products.insertOne(product);

        res.status(201).json({ message: 'Product added successfully', productId: result.insertedId });
    
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add product' });
    }
}

export default add;