package com.techwiz.techwizbe.controllers;

import com.techwiz.techwizbe.command.ProductCommand;
import com.techwiz.techwizbe.services.interfaces.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/products")
public class ProductController {
    @Autowired
    private IProductService iProductService;


    @GetMapping("/search_filter")
    public ResponseEntity<?> searchFilter(@RequestParam(value = "pageNumber") int pageNumber,
                                          @RequestParam(value = "perPage") int perPage,
                                          @RequestParam(value = "sortField", defaultValue = "createdAt") String sortField,
                                          @RequestParam(value = "sortDir", defaultValue = "desc") String sortDir,
                                          @RequestParam(value = "keyword", required = false) String keyword,
                                          @RequestParam(value = "colors", required = false) String colors,
                                          @RequestParam(value = "sizes", required = false) String sizes,
                                          @RequestParam(value = "categoryIds", required = false) String categoryIds,
                                          @RequestParam(value = "branchIds", required = false) String branchIds,
                                          @RequestParam(value = "typeIds", required = false) String typeIds,
                                          @RequestParam(value = "enable", required = false) Optional<Boolean> enable,
                                          @RequestParam(value = "hot", required = false) Optional<Boolean> hot,
                                          @RequestParam(value = "priceMax", required = false, defaultValue = "5000") double priceMax,
                                          @RequestParam(value = "priceMin", required = false, defaultValue = "0") double priceMin
                                          ) {
        var data = iProductService.searchFilterProductInfo( pageNumber,  perPage,  sortField,  sortDir,  keyword,   colors,  sizes,  categoryIds,  branchIds,  typeIds, enable.orElse(null), hot.orElse(null), priceMax, priceMin);
        return new ResponseEntity<>(
                data,
                HttpStatusCode.valueOf(data.getCode())
        );
    }

    @GetMapping("/getList_product_info")
    public ResponseEntity<?> getListProductInfo() {
        var data = iProductService.getListProductInfo();
        return new ResponseEntity<>(
                data,
                HttpStatusCode.valueOf(data.getCode())
        );
    }

    @PostMapping("")
    public ResponseEntity<?> create(@RequestBody ProductCommand product) {
        var data = iProductService.create(product);
        return new ResponseEntity<>(
                data,
                HttpStatusCode.valueOf(data.getCode())
        );
    }
    @PutMapping("")
    public ResponseEntity<?> update(@RequestBody ProductCommand product) {
        var data = iProductService.update(product);
        return new ResponseEntity<>(
                data,
                HttpStatusCode.valueOf(data.getCode())
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> detail(@PathVariable(name = "id") long id) {
        var data = iProductService.detail(id);
        return new ResponseEntity<>(
                data,
                HttpStatusCode.valueOf(data.getCode()));
    }
}
