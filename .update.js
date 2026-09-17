async function updateProduct(products) {
    const result = await products.updateOne(
        { id: 1 },
        {
            $set: {
                price: 1199.99,
                units: 8
            }
        }
    );

    console.log(`Products updated: ${result.modifiedCount}`);
};

export default updateProduct;