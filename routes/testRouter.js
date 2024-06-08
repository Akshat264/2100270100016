const express=require("express");
const bodyParser=require("body-parser");
require('dotenv').config();
const testRouter = express.Router();
const axios= require("axios");
const accessToken= process.env.ACCESS_TOKEN;
testRouter.get('/categories/:categoryname/products', async (req, res) => {
    try {
        // Extract query parameters
        const { categoryname } = req.params;
        const { n = 10, page = 1, sortby, order = 'asc' } = req.query;

        // Ensure 'n' is a number and limit it to 10 if it exceeds
        let limit = Math.min(parseInt(n, 10), 10);
        const pageNumber = parseInt(page, 10);

        // Fetch data from the external API
        const response = await axios.get(`http://20.244.56.144/test/companies/AMZ/categories/${categoryname}/products?top=10&minPrice=1&maxPrice=10000`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        const response1 = await axios.get(`http://20.244.56.144/test/companies/FLP/categories/${categoryname}/products?top=10&minPrice=1&maxPrice=10000`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        const response2 = await axios.get(`http://20.244.56.144/test/companies/SNP/categories/${categoryname}/products?top=10&minPrice=1&maxPrice=10000`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        const response3 = await axios.get(`http://20.244.56.144/test/companies/MYN/categories/${categoryname}/products?top=10&minPrice=1&maxPrice=10000`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        const response4 = await axios.get(`http://20.244.56.144/test/companies/AZO/categories/${categoryname}/products?top=10&minPrice=1&maxPrice=10000`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        let products=[...response.data,...response1.data,...response2.data,...response3.data,...response4.data];
        // Sort the products based on query parameters
        if (sortby) {
            products.sort((a, b) => {
                if (order === 'asc') {
                    return a[sortby] > b[sortby] ? 1 : -1;
                } else {
                    return a[sortby] < b[sortby] ? 1 : -1;
                }
            });
        }

        // Pagination logic
        const startIndex = (pageNumber - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedProducts = products.slice(startIndex, endIndex);

        // Generate unique identifiers for each product
        const responseProducts = paginatedProducts.map(product => ({
            ...product,
            id: `${categoryname}-${product.productName}-${Math.random().toString(36).substr(2, 9)}`
        }));

        // Respond with the paginated products
        res.json(responseProducts);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching data from external API');
    }
});
testRouter.get('/categories/:categoryname/products/:productid', async (req, res) => {
    const { categoryname, productid } = req.params;
    const response = await axios.get(`http://20.244.56.144/test/companies/AMZ/categories/${categoryname}/products?top=10&minPrice=1&maxPrice=10000`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        const response1 = await axios.get(`http://20.244.56.144/test/companies/FLP/categories/${categoryname}/products?top=10&minPrice=1&maxPrice=10000`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        const response2 = await axios.get(`http://20.244.56.144/test/companies/SNP/categories/${categoryname}/products?top=10&minPrice=1&maxPrice=10000`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        const response3 = await axios.get(`http://20.244.56.144/test/companies/MYN/categories/${categoryname}/products?top=10&minPrice=1&maxPrice=10000`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        const response4 = await axios.get(`http://20.244.56.144/test/companies/AZO/categories/${categoryname}/products?top=10&minPrice=1&maxPrice=10000`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        let products=[...response.data,...response1.data,...response2.data,...response3.data,...response4.data];
    
        if (products.hasOwnProperty(productid)) {
            const product = products[productid];
            res.json(product);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }

});
module.exports=testRouter;