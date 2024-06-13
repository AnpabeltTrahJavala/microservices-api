# Microservices API Project

## Overview

This project consists of a microservices architecture with three services:

1. **Product Service**: Provides RESTful API and GraphQL API for managing products.
2. **Order Service**: Provides RESTful API for managing orders.
3. **Main Service**: Consumes RESTful APIs from the Product and Order services and provides additional endpoints.

## Services

### Product Service

**Endpoints:**

- RESTful API:

  - `GET /products`: Retrieves the list of products.
  - `GET /products/:id`: Retrieves product details by ID.
  - `POST /products`: Adds a new product.
  - `PUT /products/:id`: Updates a product by ID.
  - `DELETE /products/:id`: Deletes a product by ID.

- GraphQL API:
  - Endpoint: `/graphql`
  - Queries:
    - `product(id: Int!): Product`
    - `products: [Product]`
  - Mutations:
    - `addProduct(name: String!, price: Float!): Product`
    - `updateProduct(id: Int!, name: String, price: Float): Product`
    - `deleteProduct(id: Int!): String`

### Order Service

**Endpoints:**

- `GET /orders`: Retrieves the list of orders.
- `GET /orders/:id`: Retrieves order details by ID.
- `POST /orders`: Adds a new order.
- `PUT /orders/:id`: Updates an order by ID.
- `DELETE /orders/:id`: Deletes an order by ID.

### Main Service

**Endpoints:**

- `GET /main/products`: Retrieve product data using the Product Service.
- `GET /main/orders`: Retrieve order data using the Order Service.
- `POST /main/purchase`: Create a new order by combining data from Product Service and Order Service.

## Setup

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

1. Clone the repository:

```
git clone <repository-url>
cd microservices-api
```

2. Install dependencies:

```
cd product-service
npm install
```

```
cd ../order-service
npm install
```

```
cd ../main-service
npm install
```

### Example GraphQL Queries and Mutations

## Query

```
query {
  products {
    id
    name
    price
  }
}

query {
  product(id: 1) {
    id
    name
    price
  }
}

```

## Mutations

```
mutation {
  addProduct(name: "Product 3", price: 300) {
    id
    name
    price
  }
}

mutation {
  updateProduct(id: 1, name: "Updated Product 1", price: 150) {
    id
    name
    price
  }
}

mutation {
  deleteProduct(id: 2)
}

```
