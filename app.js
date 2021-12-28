const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
require("dotenv/config");

app.use(bodyParser.json());

// Import Routes
const postsRoute = require("./routes/posts");
app.use("/posts", postsRoute);

// Middleware example
// app.use("/posts", () => {
//     console.log("This is from middleware");
// });

// Routes
app.get("/", (req, res) => {
    res.send("You are on home");
});

// app.get("/posts", (req, res) => {
//     res.send("You are on post page");
// });

mongoose.connect(
    "mongodb://rootuser:rootpass@localhost:27017/post?authSource=admin",
    (err) => {
        if (!err) {
            console.log("MongoDB Connection Succeeded.");
        } else {
            console.log("Error in DB connection : " + err);
        }
    }
);

app.listen(8082);
