const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv/config");

// Middleware example
// app.use("/posts", () => {
//     console.log("This is from middleware");
// });

// Middleware
app.use(bodyParser.json());
app.use(cors());
// Import Routes

const postsRoute = require("./routes/posts");
app.use("/posts", postsRoute);

const insurancePolicyRoute = require("./routes/insurancePolicies");
app.use("/insurancePolicies", insurancePolicyRoute);

// Routes
app.get("/", (req, res) => {
    res.send("You are on home");
});

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
