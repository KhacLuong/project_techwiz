package com.techwiz.techwizbe.services.impls;

import com.techwiz.techwizbe.command.CategoryCommand;
import com.techwiz.techwizbe.configs.ResponseConfig;
import com.techwiz.techwizbe.dto.CategoryDto;
import com.techwiz.techwizbe.dto.CategoryWithCountProductDto;
import com.techwiz.techwizbe.dto.ResponseDto;
import com.techwiz.techwizbe.entities.modals.CategoryEntity;
import com.techwiz.techwizbe.repositories.CategoryRepository;
import com.techwiz.techwizbe.repositories.ProductRepository;
import com.techwiz.techwizbe.services.interfaces.ICategoryService;
import com.techwiz.techwizbe.utils.Helper;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Transactional
public class CategoryImplService implements ICategoryService {
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private ProductRepository productRepository;

    @Override
    public ResponseDto<?> getListCategoryByKeyword(int pageNumber, int perPage, String sortField, String sortDir, String keyword) {
        Pageable pageable = Helper.pageableQuery(pageNumber, perPage, sortField, sortDir);
        var data = categoryRepository.findByKeyword(Objects.requireNonNullElse(keyword, ""), pageable);
        long totalItems = data.getTotalElements();
        int totalPages = data.getTotalPages();
        return ResponseConfig.ok(data.getContent(), "Lấy danh sách thành công", pageNumber, perPage, totalItems, totalPages, sortField, sortDir);
    }

    @Override
    public ResponseDto<?> getListCategoryByKeywordAndParentId(int pageNumber, int perPage, String sortField, String sortDir, String keyword, long parentId) {
        Pageable pageable = Helper.pageableQuery(pageNumber, perPage, sortField, sortDir);
        var data = categoryRepository.findByKeywordAndParentId(Objects.requireNonNullElse(keyword, ""), parentId, pageable);
        long totalItems = data.getTotalElements();
        int totalPages = data.getTotalPages();
        return ResponseConfig.ok(data.getContent(), "Lấy danh sách thành công", pageNumber, perPage, totalItems, totalPages, sortField, sortDir);
    }

    @Override
    public ResponseDto<?> getListCategoryByKeywordAndEnable(int pageNumber, int perPage, String sortField, String sortDir, String keyword, boolean enable) {
        Pageable pageable = Helper.pageableQuery(pageNumber, perPage, sortField, sortDir);
        var data = categoryRepository.findByKeywordAndEnable(Objects.requireNonNullElse(keyword, ""), enable, pageable);
        long totalItems = data.getTotalElements();
        int totalPages = data.getTotalPages();
        return ResponseConfig.ok(data.getContent(), "Lấy danh sách thành công", pageNumber, perPage, totalItems, totalPages, sortField, sortDir);
    }

    @Override
    public ResponseDto<?> getListCategoryByKeywordAndParentIdAndEnable(int pageNumber, int perPage, String sortField, String sortDir, String keyword, long parentId, boolean enable) {
        Pageable pageable = Helper.pageableQuery(pageNumber, perPage, sortField, sortDir);
        var data = categoryRepository.findByKeywordAndParentIdAndEnable(Objects.requireNonNullElse(keyword, ""), parentId, enable, pageable);
        long totalItems = data.getTotalElements();
        int totalPages = data.getTotalPages();
        return ResponseConfig.ok(data.getContent(), "Lấy danh sách thành công", pageNumber, perPage, totalItems, totalPages, sortField, sortDir);
    }

    @Override
    public ResponseDto<?> createCategory(CategoryCommand categoryCommand) {
        CategoryEntity categoryEntity = new CategoryEntity();
        if (categoryCommand.getId() == categoryCommand.getParentId() && categoryCommand.getId() != 0) {
            return ResponseConfig.badRequest("id and parentId are not allowed to overlap");
        }
        if (checkExistCategoryName(categoryCommand.getCategoryName(), 0)) {
            return ResponseConfig.conflict("Category name already exists: " + categoryCommand.getCategoryName());
        }
        categoryEntity.setCategoryName(categoryCommand.getCategoryName());
        categoryEntity.setCategoryCode(Helper.handleRandomCode());
        categoryEntity.setCreatedAt(new Date());
        categoryEntity.setUpdatedAt(new Date());
        categoryEntity.setEnable(categoryCommand.isEnable());
        categoryEntity.setParentId(categoryCommand.getParentId());
        categoryEntity.setId(categoryCommand.getId());

        var data = categoryRepository.save(categoryEntity);
        return ResponseConfig.created(data, "Create category successfully");
    }

    @Override
    public ResponseDto<?> updateCategory(CategoryCommand categoryCommand) {
        Optional<CategoryEntity> optional = categoryRepository.findById(categoryCommand.getId());
        if (optional.isEmpty()) {
            return ResponseConfig.notFound("Can't find category have id = " + categoryCommand.getId());
        }
        if (categoryCommand.getId() == categoryCommand.getParentId()) {
            return ResponseConfig.badRequest("id and parentId are not allowed to overlap");
        }
        if (checkExistCategoryName(categoryCommand.getCategoryName(), categoryCommand.getId())) {
            return ResponseConfig.conflict("Category name already exists: " + categoryCommand.getCategoryName());
        }
        CategoryEntity categoryEntity = optional.get();
        categoryEntity.setCategoryName(categoryCommand.getCategoryName());
        categoryEntity.setUpdatedAt(new Date());
        categoryEntity.setParentId(categoryCommand.getParentId());
        categoryEntity.setEnable(categoryCommand.isEnable());

        var data = categoryRepository.save(categoryEntity);
        return ResponseConfig.created(data, "Update category successfully");
    }

    @Override
    public ResponseDto<?> deleteCategory(long id) {
        Optional<CategoryEntity> optional = categoryRepository.findById(id);
        if (optional.isPresent()) {
            categoryRepository.delete(optional.get());
            productRepository.deleteAllByCategoryId(id);

            return ResponseConfig.ok(null, "Delete category successfully");
        }
        return ResponseConfig.notFound("Can't find category have id = " + id);
    }

    @Override
    public ResponseDto<?> detailCategory(long id) {
        Optional<CategoryEntity> optional = categoryRepository.findById(id);
        if (optional.isPresent()) {
            CategoryEntity categoryEntity = optional.get();
            CategoryDto categoryDto = new CategoryDto();
            categoryDto.setId(categoryEntity.getId());
            categoryDto.setCategoryCode(categoryEntity.getCategoryCode());
            categoryDto.setCategoryName(categoryEntity.getCategoryName());
            categoryDto.setCreatedAt(categoryEntity.getCreatedAt());
            categoryDto.setUpdatedAt(categoryEntity.getUpdatedAt());
            categoryDto.setEnable(categoryEntity.isEnable());

            CategoryCommand categoryCommand = new CategoryCommand();
            if (categoryEntity.getParentId() != 0) {
                Optional<CategoryEntity> parentCategory = categoryRepository.findById(categoryEntity.getParentId());
                parentCategory.ifPresent(parent -> {
                    categoryCommand.setId(parent.getId());
                    categoryCommand.setCategoryName(parent.getCategoryName());
                    categoryCommand.setCategoryCode(parent.getCategoryCode());
                    categoryCommand.setParentId(parent.getParentId());
                    categoryCommand.setEnable(parent.isEnable());
                });
                categoryDto.setParentCategory(categoryCommand);
            }
            return ResponseConfig.ok(categoryDto, "Find category successfully");
        }
        return ResponseConfig.notFound("Can't find category have id = " + id);
    }

    @Override
    public ResponseDto<?> getListCategoryAndChildrenAndCountOfProduct() {
        Set<CategoryWithCountProductDto> result = new HashSet<>();
        List<CategoryEntity> listCategoryHaveNoParent = categoryRepository.findCategoryEntitiesByParentIdIsNullAndEnableIsTrue();
        for (CategoryEntity categoryEntity : listCategoryHaveNoParent) {
           CategoryWithCountProductDto categoryWithCountProduct = mapCategoryToCategoryWithProductCount(categoryEntity);
            result.add(categoryWithCountProduct);
        }
        return ResponseConfig.ok(result, "Get list category successfully");
    }
    private CategoryWithCountProductDto mapCategoryToCategoryWithProductCount(CategoryEntity category) {
        CategoryWithCountProductDto categoryWithProductCount = new CategoryWithCountProductDto();
        categoryWithProductCount.setId(category.getId());
        categoryWithProductCount.setCategoryCode(category.getCategoryCode());
        categoryWithProductCount.setCategoryName(category.getCategoryName());
        categoryWithProductCount.setEnable(category.isEnable());

        int countProduct = countProductsForParentAndChildren(category.getId());

        categoryWithProductCount.setCountProduct(countProduct);

        List<CategoryEntity> children = categoryRepository.findCategoryEntitiesByParentId(category.getId());
        List<CategoryWithCountProductDto> childCategories = new ArrayList<>();
        for (CategoryEntity child : children) {
            CategoryWithCountProductDto childCategoryWithProductCount = mapCategoryToCategoryWithProductCount(child);
            childCategories.add(childCategoryWithProductCount);
        }
        categoryWithProductCount.setListChildrenCategory(childCategories);
        return categoryWithProductCount;
    }

    public int countProductsForParentAndChildren(long categoryId) {
        CategoryEntity category = categoryRepository.findById(categoryId).orElse(null);
        if (category == null) {
            return 0;
        }

        int productsInCategory = productRepository.countProductsByCategoryId(categoryId);
        int productsInChildCategories = 0;

        List<CategoryEntity> childCategories = categoryRepository.findCategoryEntitiesByParentId(categoryId);
        if (!childCategories.isEmpty()) {
            List<Long> childIds = childCategories.stream()
                    .map(CategoryEntity::getId)
                    .toList();
            productsInChildCategories = productRepository.countProductsByCategoryIds(childIds);
        }
        return productsInCategory + productsInChildCategories;
    }
    private boolean checkExistCategoryName(String categoryName, long id) {
        List<CategoryEntity> categoryEntityList = categoryRepository.findAllByNameAndIdNot(categoryName, id);
        return categoryEntityList != null && !categoryEntityList.isEmpty();
    }
}
