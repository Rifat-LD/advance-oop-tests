package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/items")
@CrossOrigin(origins = "*") 
public class ItemController {

    @Autowired
    private ItemRepository repo;

    @GetMapping
    public List<Item> getAll() { return repo.findAll(); }

    @GetMapping("/{id}")
    public Item getOne(@PathVariable Long id) { return repo.findById(id).orElse(null); }

    @PostMapping
    public Item create(@RequestBody Item item) { return repo.save(item); }

    @PutMapping("/{id}")
    public Item update(@PathVariable Long id, @RequestBody Item item) {
        item.setId(id);
        return repo.save(item);
    }

    @PatchMapping("/{id}")
    public Item patch(@PathVariable Long id, @RequestBody Item partial) {
        Item existing = repo.findById(id).orElse(null);
        if(existing != null) {
            if(partial.getName() != null) existing.setName(partial.getName());
            if(partial.getPrice() != null) existing.setPrice(partial.getPrice());
            return repo.save(existing);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { repo.deleteById(id); }
}