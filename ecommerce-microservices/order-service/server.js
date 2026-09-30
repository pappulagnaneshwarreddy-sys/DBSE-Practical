const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const routes = require("./routes/orderRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

app.get("/health", (req, res) => {
    res.json({ service: "order-service", status: "UP" });
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");
        app.listen(process.env.PORT, () =>
            console.log(`Order Service running on ${process.env.PORT}`)
        );
    })
    .catch(err => console.error("MongoDB error:", err.message));
