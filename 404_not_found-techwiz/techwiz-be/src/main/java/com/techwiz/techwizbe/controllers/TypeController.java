package com.techwiz.techwizbe.controllers;

import com.techwiz.techwizbe.command.TypeCommand;
import com.techwiz.techwizbe.services.interfaces.ITypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/types")
public class TypeController {
    @Autowired
    ITypeService iTypeService;
    @GetMapping("")
    public ResponseEntity<?> getListCategoryByParams(@RequestParam(value = "pageNumber") int pageNumber,
                                                     @RequestParam(value = "perPage") int perPage,
                                                     @RequestParam(value = "sortField", defaultValue = "updatedAt") String sortField,
                                                     @RequestParam(value = "sortDir", defaultValue = "desc") String sortDir,
                                                     @RequestParam(value = "keyword", required = false) String keyword,
                                                     @RequestParam(value = "enable", required = false) Optional<Boolean> enable) {
        if (enable.isPresent()) {
            var data = iTypeService.getListTypeByKeywordAndEnable(pageNumber, perPage, sortField, sortDir, keyword, enable.get());
            return new ResponseEntity<>(
                    data,
                    HttpStatusCode.valueOf(data.getCode())
            );
        }

        var data = iTypeService.getListTypeByKeyword(pageNumber, perPage, sortField, sortDir, keyword);
        return new ResponseEntity<>(
                data,
                HttpStatusCode.valueOf(data.getCode())
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> detailType(@PathVariable("id") long id) {
        var data = iTypeService.detailType(id);
        return new ResponseEntity<>(
                data,
                HttpStatusCode.valueOf(data.getCode()));
    }

    // Create Brand
    @PostMapping("")
    public ResponseEntity<?> createType(@RequestBody TypeCommand typeCommand) {
        var data = iTypeService.createType(typeCommand);
        return new ResponseEntity<>(
                data,
                HttpStatusCode.valueOf(data.getCode())
        );
    }

    @PutMapping("")
    public ResponseEntity<?> updateType(@RequestBody TypeCommand typeCommand) {
        var data = iTypeService.updateType(typeCommand);
        return new ResponseEntity<>(
                data,
                HttpStatusCode.valueOf(data.getCode())
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteType(@PathVariable("id") long id) {
        var data = iTypeService.deleteType(id);
        return new ResponseEntity<>(
                data,
                HttpStatusCode.valueOf(data.getCode())
        );
    }
    @GetMapping("/get-list-type-with-count-product")
    public ResponseEntity<?> getListTypeWithCountProduct() {
        var data = iTypeService.getListTypeAndCountProduct();
        return new ResponseEntity<>(
                data,
                HttpStatusCode.valueOf(data.getCode()));
    }
}
