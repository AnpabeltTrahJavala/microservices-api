const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

let orders = [
  { id: 1, product_id: 1, quantity: 2 },
  { id: 2, product_id: 2, quantity: 1 },
];

app.get("/orders", (req, res) => {
  res.json(orders);
});

app.get("/orders/:id", (req, res) => {
  const order = orders.find((o) => o.id === parseInt(req.params.id));
  if (!order) return res.status(404).send("Order not found");
  res.json(order);
});

app.post("/orders", (req, res) => {
  const newOrder = {
    id: orders.length + 1,
    product_id: req.body.product_id,
    quantity: req.body.quantity,
  };
  orders.push(newOrder);
  res.status(201).json(newOrder);
});

app.put("/orders/:id", (req, res) => {
  const order = orders.find((o) => o.id === parseInt(req.params.id));
  if (!order) return res.status(404).send("Order not found");

  order.product_id = req.body.product_id;
  order.quantity = req.body.quantity;
  res.json(order);
});

app.delete("/orders/:id", (req, res) => {
  const orderIndex = orders.findIndex((o) => o.id === parseInt(req.params.id));
  if (orderIndex === -1) return res.status(404).send("Order not found");

  orders.splice(orderIndex, 1);
  res.status(201).json({
    message: "Successfully deleted order with ID: " + req.params.id,
  });
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Order service running on port ${PORT}`);
});
