package com.bookflow.transaction.service;

import com.bookflow.transaction.entity.Inventory;
import com.bookflow.transaction.repository.InventoryRepository;
import org.springframework.stereotype.Service;

@Service
public class InventoryService {

    private final InventoryRepository inventoryRepository;

    public InventoryService(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    public Inventory getInventory(Long bookId) {
        return inventoryRepository.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Book not found"));
    }
}
