const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const Product = require('./models/product');
const { toUnicode } = require('punycode');

mongoose.connect('mongodb://localhost:27017/farmStand', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connect to mongoose")
    }).catch(err => {
        console.log("Fail connect to mongoose")
        console.log(err);
    })

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const categories = ['fruit', 'vegetable', 'dairy']


app.get('/products', async (req, res) => {
    const { category } = req.query;
    if(category) {
        const products = await Product.find({category: category})
        res.render('products/index', { products, category })
    }else {
        const products = await Product.find({})
        res.render('products/index', { products, category: 'All' })
    }
    
    //console.log(products)
    //res.send("All Product")
    
})


/////////////// New ////////////////
app.get('/products/new', (req, res) => {
    //res.send("Newm")
    res.render('products/new', { categories })
})

app.post('/products', async (req, res) => {
    const newPreoduct = new Product(req.body)
    await newPreoduct.save()
    console.log(req.body)
    //res.send("add success")
    res.redirect(`/products/${newPreoduct._id}`)
})


//////////// Search ID //////////////
app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    //console.log(product)
    //res.send('detail')
    res.render('products/show', { product })
})


////////////// Edit ///////////////
app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/edit', { product, categories })
})

app.put('/products/:id', async (req, res) => {
    //console.log(req.body)
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.redirect(`/products/${product._id}`)
})


/////////////// Delete ///////////////
app.delete('/products/:id', async (req, res) => {
    //res.send("Delete")
    const { id } = req.params;
    const deleteProduct = await Product.findByIdAndDelete(id);
    res.redirect('/products');
})


///////////// Filter //////////////




app.listen(3000, () => {
    console.log("Listen on Port 3000")
})