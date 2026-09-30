# E-Commerce Microservices Project

Services:
- API Gateway: 4000
- User Service: 4001
- Product Service: 4002
- Inventory Service: 4003
- Order Service: 4004
- Activity Service: 4005
- MongoDB: mongodb://127.0.0.1:27017/ecommerce_db

## Requirements
- Node.js
- MongoDB running on localhost:27017
- Postman

## Install and run

Open one terminal for each service.

For every service:
```powershell
cd <service-folder>
npm install
npm start
```

Start in this order:
1. user-service
2. product-service
3. inventory-service
4. activity-service
5. order-service
6. api-gateway

Expected ports:
4001, 4002, 4003, 4005, 4004, 4000

## Postman
Import `postman/ECommerce-Microservices.postman_collection.json`.

The collection uses `baseUrl = http://localhost:4000`.
For direct service testing, use the service ports shown above.

## MongoDB Compass
Connect to:
mongodb://127.0.0.1:27017

Database:
ecommerce_db

Collections will be created automatically when data is inserted:
- users
- products
- inventories
- orders
- activities
