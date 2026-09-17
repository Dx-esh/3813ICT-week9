async function removeProduct(products) {
    const result = await products.deleteOne({ id: 3 });

    console.log(`Products deleted: ${result.deletedCount}`);
}

export default removeProduct;