const express = require('express');
const mongoose = require('mongoose');
const app = express();

const cors=require("cors")
// Middleware
app.use(express.json());
app.use(cors())
// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/fakestore', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Mongoose Schema and Model
const productSchema = new mongoose.Schema({
    id:Number,
    title:  String,
    price:  Number, 
    description:String,
    category:String, 
    image: String, 
    sold:Boolean, 
    dateOfSale:  Date 
});

const Product = mongoose.model('Product', productSchema);

// Routes


app.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.json({ message: error.message });
    }
});


app.get('/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.json({ message: 'Product not found' });
        res.json(product);
    } catch (error) {
        res.json({ message: error.message });
    }
});

// Start server
app.listen(5000, () => {
    console.log("server");
});