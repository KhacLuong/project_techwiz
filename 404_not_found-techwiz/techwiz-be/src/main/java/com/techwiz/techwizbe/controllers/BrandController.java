package com.techwiz.techwizbe.controllers;

import com.techwiz.techwizbe.command.BrandCommand;
import com.techwiz.techwizbe.services.interfaces.IBrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/brands")
public class BrandController {
    @Autowired
    private IBrandService iBrandService;

    @GetMapping("")
    public ResponseEntity<?> getListCategoryByParams(@RequestParam(value = "pageNumber") int pageNumber,
                                                     @RequestParam(value = "perPage") int perPage,
                                                     @RequestParam(value = "sortField", defaultValue = "updatedAt") String sortField,
                                                     @RequestParam(value = "sortDir", defaultValue = "desc") String sortDir,
                                                     @RequestParam(value = "keyword", required = false) String keyword,
                                                     @RequestParam(value = "enable", required = false) Optional<Boolean> enable) {
        if (enable.isPresent()) {
            var data = iBrandService.getListBrandByKeywordAndEnable(pageNumber, perPage, sortField, sortDir, keyword, enable.get());
            return new ResponseEntity<>(
                    data,
                    HttpStatusCode.valueOf(data.getCode())
            );
        }

        var data = iBrandService.getListBrandByKeyword(pageNumber, perPage, sortField, sortDir, keyword);
        return new ResponseEntity<>(
                data,
                HttpStatusCode.valueOf(data.getCode())
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> detailBrand(@PathVariable("id") Long id) {
        var data = iBrandService.detailBrand(id);
        return new ResponseEntity<>(
                data,
                HttpStatusCode.valueOf(data.getCode()));
    }

    // Create Brand
    @PostMapping("")
    public ResponseEntity<?> createBrand(@RequestBody BrandCommand brandCommand) {
        var data = iBrandService.createBranch(brandCommand);
        return new ResponseEntity<>(
                data,
                HttpStatusCode.valueOf(data.getCode())
        );
    }

    @PutMapping("")
    public ResponseEntity<?> updateBrand(@RequestBody BrandCommand brandCommand) {
        var data = iBrandService.updateBrand(brandCommand);
        return new ResponseEntity<>(
                data,
                HttpStatusCode.valueOf(data.getCode())
        );
    }

    @DeleteMapping("")
    public ResponseEntity<?> deleteBrand(@RequestParam("id") long id) {
        var data = iBrandService.deleteBrand(id);
        return new ResponseEntity<>(
                data,
                HttpStatusCode.valueOf(data.getCode())
        );
    }

    @GetMapping("/get-list-brand-with-count-product")
    public ResponseEntity<?> getListBrandWithCountProduct() {
        var data = iBrandService.getListBrandAndCountProduct();
        return new ResponseEntity<>(
                data,
                HttpStatusCode.valueOf(data.getCode()));
    }
}
