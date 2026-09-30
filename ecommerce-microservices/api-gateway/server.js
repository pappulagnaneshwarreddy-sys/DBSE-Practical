const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");
require("dotenv").config();

const app = express();
app.use(cors());

app.get("/health", (req, res) => {
    res.json({ service: "api-gateway", status: "UP" });
});

const proxy = (target) => createProxyMiddleware({
    target,
    changeOrigin: true
});

app.use("/users", proxy(process.env.USER_SERVICE_URL));
app.use("/products", proxy(process.env.PRODUCT_SERVICE_URL));
app.use("/inventory", proxy(process.env.INVENTORY_SERVICE_URL));
app.use("/orders", proxy(process.env.ORDER_SERVICE_URL));
app.use("/activities", proxy(process.env.ACTIVITY_SERVICE_URL));

app.listen(process.env.PORT, () => {
    console.log(`API Gateway running on ${process.env.PORT}`);
});
