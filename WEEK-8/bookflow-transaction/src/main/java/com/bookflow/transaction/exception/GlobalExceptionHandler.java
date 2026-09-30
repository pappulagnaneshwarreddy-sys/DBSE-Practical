package com.bookflow.transaction.exception;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BookOutOfStockException.class)
    public org.springframework.http.ResponseEntity<Map<String, Object>> handleOutOfStock(
            BookOutOfStockException ex) {

        return org.springframework.http.ResponseEntity.status(HttpStatus.CONFLICT)
                .body(Map.of(
                        "status", 409,
                        "error", "OUT_OF_STOCK",
                        "message", ex.getMessage()));
    }
}
