# BookFlow Library System - Transactional Microservice

Spring Boot + Spring Data JPA + PostgreSQL + Postman.

## Requirements

- Java 17 or later (this project is configured for Java 21)
- Maven 3.9+
- PostgreSQL
- Postman
- VS Code / IntelliJ / Eclipse

## Project Structure

```text
bookflow-transaction/
├── pom.xml
├── src/main/java/com/bookflow/transaction/
│   ├── BookflowTransactionApplication.java
│   ├── controller/
│   │   ├── OrderController.java
│   │   └── InventoryController.java
│   ├── entity/
│   │   ├── Inventory.java
│   │   └── Order.java
│   ├── repository/
│   │   ├── InventoryRepository.java
│   │   └── OrderRepository.java
│   ├── service/
│   │   ├── InventoryService.java
│   │   └── OrderService.java
│   ├── dto/
│   │   └── OrderRequest.java
│   └── exception/
│       ├── BookOutOfStockException.java
│       └── GlobalExceptionHandler.java
└── src/main/resources/
    └── application.yml
```

## 1. Create Database

```sql
CREATE DATABASE bookflow;
```

Then connect to `bookflow`.

## 2. Insert Sample Inventory

```sql
INSERT INTO inventory (book_id, total_stock, available_stock)
VALUES
(101, 5, 5),
(102, 3, 3),
(103, 2, 0);

SELECT * FROM inventory;
```

## 3. Configure PostgreSQL

Edit:

`src/main/resources/application.yml`

If your PostgreSQL password is not `postgres`, replace it with your actual password.

## 4. Build

```powershell
mvn clean install
```

Expected:

```text
BUILD SUCCESS
```

## 5. Run

```powershell
mvn spring-boot:run
```

Expected server:

```text
Tomcat started on port 8080
Started BookflowTransactionApplication
```

## 6. Test GET Inventory

```text
GET http://localhost:8080/inventory/101
```

Expected:

```json
{
  "bookId": 101,
  "totalStock": 5,
  "availableStock": 5
}
```

## 7. Test Borrow

```text
POST http://localhost:8080/orders
Content-Type: application/json
```

Body:

```json
{
  "userId": 501,
  "bookId": 101
}
```

Expected:

```json
{
  "id": 1,
  "userId": 501,
  "bookId": 101,
  "status": "BORROWED"
}
```

## 8. Verify Stock Decreased

```text
GET http://localhost:8080/inventory/101
```

Expected:

```json
{
  "bookId": 101,
  "totalStock": 5,
  "availableStock": 4
}
```

## 9. Verify PostgreSQL

```sql
SELECT * FROM inventory;
SELECT * FROM orders;
```

Expected after one borrow:

```text
inventory:
101 | 5 | 4
102 | 3 | 3
103 | 2 | 0

orders:
1 | 501 | 101 | BORROWED
```

## 10. Out-of-Stock Test

```text
POST http://localhost:8080/orders
Content-Type: application/json
```

Body:

```json
{
  "userId": 502,
  "bookId": 103
}
```

Expected HTTP status:

```text
409 Conflict
```

Expected response:

```json
{
  "status": 409,
  "error": "OUT_OF_STOCK",
  "message": "Book 103 is out of stock"
}
```

## Faculty Verification Screenshots

Recommended screenshots:

1. `java -version` and `mvn -version`
2. PostgreSQL `bookflow` database
3. Complete VS Code project structure
4. `application.yml`
5. `mvn clean install` showing `BUILD SUCCESS`
6. Spring Boot console showing port 8080
7. Initial inventory table
8. Postman GET `/inventory/101`
9. Postman POST `/orders`
10. GET `/inventory/101` after borrowing, showing 4 available
11. PostgreSQL inventory and orders after borrowing
12. Postman out-of-stock test showing HTTP 409
