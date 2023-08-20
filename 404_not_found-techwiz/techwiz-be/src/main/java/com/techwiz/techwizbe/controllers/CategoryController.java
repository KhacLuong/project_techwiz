package com.techwiz.techwizbe.controllers;

import com.techwiz.techwizbe.command.CategoryCommand;
import com.techwiz.techwizbe.services.interfaces.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/categories")
public class CategoryController {
    @Autowired
    private ICategoryService iCategoryService;

    @GetMapping("")
    public ResponseEntity<?> getListCategoryByParams(@RequestParam(value = "pageNumber") int pageNumber,
                                                     @RequestParam(value = "perPage") int perPage,
                                                     @RequestParam(value = "sortField", defaultValue = "updatedAt") String sortField,
                                                     @RequestParam(value = "sortDir", defaultValue = "desc") String sortDir,
                                                     @RequestParam(value = "keyword", required = false) String keyword,
                                                     @RequestParam(value = "parentId", required = false) Optional<Long> parentId,
                                                     @RequestParam(value = "enable", required = false) Optional<Boolean> enable) {
        if (parentId.isPresent() && enable.isPresent()) {
            var data = iCategoryService.getListCategoryByKeywordAndParentIdAndEnable(pageNumber, perPage, sortField, sortDir, keyword, parentId.get(), enable.get());
            return new ResponseEntity<>(
                    data,
                    HttpStatusCode.valueOf(data.getCode())
            );
        } else if (enable.isPresent()) {
            var data = iCategoryService.getListCategoryByKeywordAndEnable(pageNumber, perPage, sortField, sortDir, keyword, enable.get());
            return new ResponseEntity<>(
                    data,
                    HttpStatusCode.valueOf(data.getCode())
            );
        } else if (parentId.isPresent()) {
            var data = iCategoryService.getListCategoryByKeywordAndParentId(pageNumber, perPage, sortField, sortDir, keyword, parentId.get());
            return new ResponseEntity<>(
                    data,
                    HttpStatusCode.valueOf(data.getCode())
            );
        }
        var data = iCategoryService.getListCategoryByKeyword(pageNumber, perPage, sortField, sortDir, keyword);
        return new ResponseEntity<>(
                data,
                HttpStatusCode.valueOf(data.getCode())
        );
    }

    @PostMapping("")
    public ResponseEntity<?> createCategory(@RequestBody CategoryCommand categoryCommand) {
        var data = iCategoryService.createCategory(categoryCommand);
        return new ResponseEntity<>(
                data,
                HttpStatusCode.valueOf(data.getCode())
        );
    }

    @PutMapping("")
    public ResponseEntity<?> updateCategory(@RequestBody CategoryCommand categoryCommand) {
        var data = iCategoryService.updateCategory(categoryCommand);
        return new ResponseEntity<>(
                data,
                HttpStatusCode.valueOf(data.getCode())
        );
    }

    @DeleteMapping("")
    public ResponseEntity<?> deleteCategory(@RequestParam("id") long id) {
        var data = iCategoryService.deleteCategory(id);
        return new ResponseEntity<>(
                data,
                HttpStatusCode.valueOf(data.getCode()));
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getCategoryById(@PathVariable(name = "id") long id) {
        var data = iCategoryService.detailCategory(id);
        return new ResponseEntity<>(
                data,
                HttpStatusCode.valueOf(data.getCode()));
    }

    @GetMapping("/get-list-category-with-children-and-count-product")
    public ResponseEntity<?> getListCategoryHaveWithChildrenAndCountProduct() {
        var data = iCategoryService.getListCategoryAndChildrenAndCountOfProduct();
        return new ResponseEntity<>(
                data,
                HttpStatusCode.valueOf(data.getCode()));
    }

}
