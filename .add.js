async function addProducts(products) {
    const items = [
        {
            id: 1,
            name: 'Laptop',
            price: 1299.99,
            type: 'Electronics',
            description: '15 inch laptop computer',
            units: 10
        },
        {
            id: 2,
            name: 'Keyboard',
            price: 79.95,
            type: 'Electronics',
            description: 'Mechanical USB keyboard',
            units: 25
        },
        {
            id: 3,
            name: 'Desk Chair',
            price: 249.50,
            type: 'Furniture',
            description: 'Ergonomic office desk chair',
            units: 15
        }
    ];

    await products.insertMany(items);

    console.log('3 products added');
}

export default addProducts;