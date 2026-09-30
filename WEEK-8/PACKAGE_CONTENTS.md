# Project package contents

- `bookflow-transaction/` - complete Spring Boot implementation for the BookFlow transactional microservice.
- `docs/WEEK8_BookFlow_Library_System.pdf` - original supplied Week 8 PDF.
- `docs/database.sql` - database/sample-data commands from the BookFlow section.
- `gateway-example/` - FastAPI gateway example from the BookFlow section.

The Java implementation preserves the PDF's required architecture:
Controller -> Service -> Repository -> PostgreSQL
and implements the documented inventory, borrowing, validation, and out-of-stock behavior.
