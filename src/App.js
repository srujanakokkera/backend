import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./App.css";

const ProductTable = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedMonth, setSelectedMonth] = useState('3'); // Default to March

    useEffect(() => {
        axios.get('http://localhost:5000/products')
            .then(response => {
                setProducts(response.data);
                setFilteredProducts(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the products!', error);
            });
    }, []);

    const handleCategoryChange = (event) =>{
        const category = event.target.value;
        setSelectedCategory(category);
        filterProducts(category, selectedMonth);
    };
        
        const handleMonthChange = (event) => {
            const month = event.target.value;
            setSelectedMonth(month);
            filterProducts(selectedCategory, month);
        };
    
        const filterProducts = (category, month) => {
            let filtered = products;

        if (category !== 'all') {
            filtered = filtered.filter(product => product.category === category);
        }

        filtered = filtered.filter(product => {
            const productMonth = new Date(product.dateOfSale).getMonth() + 1; // getMonth() returns 0-11
            return productMonth === parseInt(month, 10);
        });

        setFilteredProducts(filtered);
    };


    return (
        <div className="ProductTable">
            <div>
                <h1>Transition Record</h1>
                <div className='select'>
                <div>
                    <label htmlFor="categorySelect">Select Category: </label>
                    <select id="categorySelect" value={selectedCategory} onChange={handleCategoryChange}>
                        <option value="all">All</option>
                        <option value="men's clothing">Men's Clothing</option>
                        <option value="women's clothing">Women's Clothing</option>
                        <option value="electronics">Electronics</option>
                        <option value="jewelery">Jewellerry</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="monthSelect">Select Month: </label>
                    <select id="monthSelect" value={selectedMonth} onChange={handleMonthChange}>
                        <option value="1">January</option>
                        <option value="2">February</option>
                        <option value="3">March</option>
                        <option value="4">April</option>
                        <option value="5">May</option>
                        <option value="6">June</option>
                        <option value="7">July</option>
                        <option value="8">August</option>
                        <option value="9">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                    </select>
                </div>
                </div>
            </div>
            <table border={1}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Image</th>
                        <th>Sold</th>
                        <th>Date of Sale</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.title}</td>
                            <td>${item.price}</td>
                            <td>{item.description}</td>
                            <td>{item.category}</td>
                            <td><img src={item.image} alt={item.title} /></td>
                            <td>{item.sold ? 'Yes' : 'No'}</td>
                            <td>{new Date(item.dateOfSale).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductTable;