# Student Records REST API

Spring Boot + MongoDB + JWT + VS Code.

## Requirements

- Java 21
- Maven 3.9+
- MongoDB running on localhost:27017

## Run

From the project root:

```powershell
mvn clean compile
mvn spring-boot:run
```

The API runs on:

`http://localhost:8080`

## Endpoints

### Register
POST `/auth/register`

```json
{
  "username": "admin",
  "password": "admin123"
}
```

### Login
POST `/auth/login`

```json
{
  "username": "admin",
  "password": "admin123"
}
```

Copy the returned JWT and use it as a Bearer Token for `/students`.

### Students

- POST `/students`
- GET `/students`
- GET `/students/{id}`
- PUT `/students/{id}`
- DELETE `/students/{id}`

Example student:

```json
{
  "name": "Gnaneshwar",
  "age": 21,
  "course": "Computer Science",
  "email": "gnaneshwar@example.com"
}
```

## MongoDB

Database:

`student_records`

Collections:

- `users`
- `students`
