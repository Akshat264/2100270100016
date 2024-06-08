const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;
const testRouter= require("./routes/testRouter");
const products = [
    { name: 'Product1', rating: 4.5, price: 100, company: 'CompanyA', discount: 10, category: 'electronics' },
    { name: 'Product2', rating: 3.5, price: 200, company: 'CompanyB', discount: 5, category: 'electronics' },
    { name: 'Product3', rating: 4.0, price: 150, company: 'CompanyC', discount: 15, category: 'clothing' },
    { name: 'Product4', rating: 2.5, price: 250, company: 'CompanyD', discount: 20, category: 'clothing' },
    { name: 'Product5', rating: 5.0, price: 50, company: 'CompanyE', discount: 25, category: 'electronics' },
    // Add more sample products as needed
];

// Mount the testRouter on the /test path
app.use('/test', testRouter);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/test`);
});
