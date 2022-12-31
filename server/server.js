const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

mongoose
    .connect(
        "mongodb://rootuser:rootpass@localhost:27017/mongodb-project?&authSource=admin",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => console.log("Connected to DB"))
    .catch(console.error);

const bookRoute = require("./routes/bookRoute");
const userRoute = require("./routes/userRoute");


app.use("/", bookRoute);
app.use("/", userRoute);


app.listen(3001, () => console.log("Server started on port 3001"));
