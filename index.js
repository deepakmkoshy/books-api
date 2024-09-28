

const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Read JSON files
const categories = JSON.parse(fs.readFileSync(path.join(__dirname, 'categories.json'), 'utf8'));
const books = JSON.parse(fs.readFileSync(path.join(__dirname, 'books.json'), 'utf8'));

// Root route
app.get('/', (req, res) => {
    res.json({ status: 'healthy', message: 'Server is running' });
});

// GET 


// GET all available categories
app.get('/api/categories', (req, res) => {
    res.json(categories);
});

// Route to get the total number of books for each category
// app.get('/api/books/count', (req, res) => {
//     const categoryCounts = categories.map(category => {
//         const categoryBooks = books.filter(book => book.categoryId === category.id);
//         return {
//             id: category.id,
//             category: category.category,
//             count: categoryBooks.length
//         };
//     });
    
//     res.json(categoryCounts);
// });

// GET all books according to the category
app.get('/api/books/:categoryId', (req, res) => {
    const categoryId = req.params.categoryId;
    const categoryBooks = books.filter(book => book.categoryId === categoryId);
    
    if (categoryBooks.length === 0) {
        return res.status(404).json({ message: 'No books found for this category' });
    }
    
    res.json(categoryBooks);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
