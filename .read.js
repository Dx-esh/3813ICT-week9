async function readProducts(products) {
    const items = await products.find({}).toArray();

    console.log('\nProducts in collection:');

    items.forEach(item => {
        console.log(item);
    });
};

export default readProducts;