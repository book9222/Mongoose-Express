const Product = require('./models/product');
const mongoose = require('mongoose');
const e = require('express');

mongoose.connect('mongodb://localhost:27017/farmStand', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connect to mongoose")
    }).catch(err => {
        console.log("Fail connect to mongoose")
        console.log(err);
    })


// const p = new Product({
//     name: 'Grape',
//     price: 5.99,
//     category: 'friut'
// })

// p.save().then(p => {
//     console.log(p)
// }).catch(e => {
//     console.log(e)
// })

const seedProducts = [
    {
        name: 'Fairy Eggplant',
        price: 1.00,
        category: 'vegetable'
    },
    {
        name: 'Organic Goddess Melon',
        price: 4.99,
        category: 'fruit'
    },
    {
        name: 'Organic Mini Seedless Watermelon',
        price: 3.99,
        category: 'fruit'
    },
    {
        name: 'Organic Celery',
        price: 1.50,
        category: 'vegetable'
    },
    {
        name: 'Chocolate Whole Milk',
        price: 2.69,
        category: 'dairy'
    },
]

Product.insertMany(seedProducts)
.then(res => {
    console.log(res)
}).catch(e => {
    console.log(e)
})