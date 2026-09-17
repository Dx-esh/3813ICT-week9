import { ObjectId } from 'mongodb';
import create from './create.js';

async function remove(req, res) {
    try {
        const products = await create();
        const id = req.params.id;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid MongoDB ObjectId' });
        }

        const result = await products.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json({ message: 'Product deleted successflly' });
    
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete product' });
    }
}

export default remove;