import { ObjectId } from 'mongodb';
import create from './create.js';

async function update(req, res) {
    try {
        const products = await create();
        const id = req.params.id;
        const updatedProduct = req.body;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid MongoDB ObjectId' });
        }

        const duplicate = await products.findOne({
            id: updatedProduct.id,
            _id: { $ne: new ObjectId(id) }
        });

        if (duplicate) {
            return res.status(409).json({ error: 'A different product with this id already exists' });
        }

        delete updatedProduct._id;

        const result = await products.updateOne(
            { _id: new ObjectId(id) },
            { $set: updatedProduct }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json({ message: 'Product updated successfully' });
    
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update product' });
    }
}

export default update;