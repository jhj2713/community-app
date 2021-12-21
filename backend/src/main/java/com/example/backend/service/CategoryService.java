package com.example.backend.service;

import com.example.backend.model.Category;
import com.example.backend.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Transactional
    public List<Category> loadCategory() {
        return categoryRepository.findAll();
    }

    @Transactional
    public Category saveCategory(Category category) {
        return categoryRepository.save(category);
    }

}
