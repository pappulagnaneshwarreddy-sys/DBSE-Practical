# FastAPI Gateway Example

This is the gateway example from the supplied Week 8 PDF.

Run after the Spring Boot service is running on port 8080:

```powershell
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

Gateway endpoint:

```text
POST http://localhost:8000/gateway/orders
```

Example JSON:

```json
{
  "userId": 501,
  "bookId": 101
}
```

The gateway forwards the request to:

```text
http://localhost:8080/orders
```

This gateway is optional for the first BookFlow verification. Test the Spring Boot service directly first.
