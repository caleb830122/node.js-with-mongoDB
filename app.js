const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
var fs = require("fs");
var path = require("path");
require("dotenv/config");

// Middleware example
// app.use("/posts", () => {
//     console.log("This is from middleware");
// });

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("view engine", "ejs");
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

// Img uploading
var multer = require("multer");

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now());
    },
});

var upload = multer({ storage: storage });

var imgModel = require("./models/profilePic");

app.get("/img", (req, res) => {
    imgModel.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send("An error occurred", err);
        } else {
            res.render("imagesPage", { items: items });
        }
    });
});

app.post("/img", upload.single("image"), (req, res, next) => {
    var obj = {
        name: req.body.name,
        desc: req.body.desc,
        img: {
            data: fs.readFileSync(
                path.join(__dirname + "/uploads/" + req.file.filename)
            ),
            contentType: "image/png",
        },
    };
    imgModel.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        } else {
            // item.save();
            res.redirect("/");
        }
    });
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
