const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

const productServiceURL = "http://localhost:3001/products";
const orderServiceURL = "http://localhost:3002/orders";

app.get("/main/products", async (req, res) => {
  try {
    const response = await axios.get(productServiceURL);
    res.json(response.data);
  } catch (error) {
    res.status(500).send("Error retrieving products");
  }
});

app.get("/main/orders", async (req, res) => {
  try {
    const response = await axios.get(orderServiceURL);
    res.json(response.data);
  } catch (error) {
    res.status(500).send("Error retrieving orders");
  }
});

app.post("/main/purchase", async (req, res) => {
  const { product_id, quantity } = req.body;
  try {
    // Check if the product exists
    const productResponse = await axios.get(`${productServiceURL}/${product_id}`);
    const product = productResponse.data;

    // Create a new order
    const orderResponse = await axios.post(orderServiceURL, { product_id, quantity });
    const newOrder = orderResponse.data;

    res.status(201).json({
      message: "Purchase successful",
      product,
      order: newOrder,
    });
  } catch (error) {
    res.status(500).send("Error making purchase");
  }
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Main service running on port ${PORT}`);
});
