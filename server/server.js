const mongoose = require("mongoose");
const app = require("./app");

require("dotenv").config();

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));