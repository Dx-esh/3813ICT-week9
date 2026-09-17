import create from './create.js';

async function add(req, res) {
    try {
        const products = await create();
        const product = req.body;

        const existingProduct = await products.findOne({ id: product.id });

        if (existingProduct) {
            return res.status(409).json({ error: 'A product with this id already exists '});
        }

        if (!Number.isInteger(product.id) || typeof product.name !== 'string' || product.name.length > 50 
            || typeof product.description !== 'string' || product.description.length > 255 || typeof product.price !== 'number' ||
            !Number.isInteger(product.units) || product.units < 0) {
            return res.status(400).json({ error: 'Invalid product data' });
        }

        if (Math.round(product.price * 100) !== product.price * 100) {
            return res.status(400).json({ error: 'Price must have at most 2 decimal places' });
        }

        const result = await products.insertOne(product);

        res.status(201).json({ message: 'Product added successfully', productId: result.insertedId });
    
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add product' });
    }
}

export default add;