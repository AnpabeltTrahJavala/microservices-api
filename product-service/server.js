const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

const app = express();
app.use(bodyParser.json());

// Mock data
let products = [
  { id: 1, name: "Product 1", price: 100 },
  { id: 2, name: "Product 2", price: 200 },
];

// RESTful API endpoints
app.get("/products", (req, res) => {
  res.json(products);
});

app.get("/products/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).send("Product not found");
  res.json(product);
});

app.post("/products", (req, res) => {
  const newProduct = {
    id: products.length + 1,
    name: req.body.name,
    price: req.body.price,
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.put("/products/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).send("Product not found");

  product.name = req.body.name;
  product.price = req.body.price;
  res.json(product);
});

app.delete("/products/:id", (req, res) => {
  const productIndex = products.findIndex((p) => p.id === parseInt(req.params.id));
  if (productIndex === -1) return res.status(404).send("Product not found");

  products.splice(productIndex, 1);
  res.status(201).json({
    message: "Successfully deleted product with ID: " + req.params.id,
  });
});

// GraphQL schema
const schema = buildSchema(`
  type Product {
    id: Int
    name: String
    price: Float
  }

  type Query {
    product(id: Int!): Product
    products: [Product]
  }

  type Mutation {
    addProduct(name: String!, price: Float!): Product
    updateProduct(id: Int!, name: String, price: Float): Product
    deleteProduct(id: Int!): String
  }
`);

// GraphQL resolvers
const root = {
  product: ({ id }) => products.find((p) => p.id === id),
  products: () => products,
  addProduct: ({ name, price }) => {
    const newProduct = { id: products.length + 1, name, price };
    products.push(newProduct);
    return newProduct;
  },
  updateProduct: ({ id, name, price }) => {
    const product = products.find((p) => p.id === id);
    if (!product) throw new Error("Product not found");

    if (name) product.name = name;
    if (price) product.price = price;
    return product;
  },
  deleteProduct: ({ id }) => {
    const productIndex = products.findIndex((p) => p.id === id);
    if (productIndex === -1) throw new Error("Product not found");

    products.splice(productIndex, 1);
    return "Product deleted";
  },
};

// GraphQL endpoint
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Product service running on port ${PORT}`);
});
