package com.techwiz.techwizbe.controllers;

import com.techwiz.techwizbe.command.TagCommand;
import com.techwiz.techwizbe.services.interfaces.ITagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/tags")
public class TagController {
    @Autowired
    private ITagService iTagService;

    @GetMapping("")
    public ResponseEntity<?> getListCategoryByParams(@RequestParam(value = "pageNumber") int pageNumber,
                                                     @RequestParam(value = "perPage") int perPage,
                                                     @RequestParam(value = "sortField", defaultValue = "updatedAt") String sortField,
                                                     @RequestParam(value = "sortDir", defaultValue = "desc") String sortDir,
                                                     @RequestParam(value = "keyword", required = false) String keyword,
                                                     @RequestParam(value = "enable", required = false) Optional<Boolean> enable) {
        if (enable.isPresent()) {
            var data = iTagService.getListTagByKeywordAndEnable(pageNumber, perPage, sortField, sortDir, keyword, enable.get());
            return new ResponseEntity<>(
                    data,
                    HttpStatusCode.valueOf(data.getCode())
            );
        }

        var data = iTagService.getListTagByKeyword(pageNumber, perPage, sortField, sortDir, keyword);
        return new ResponseEntity<>(
                data,
                HttpStatusCode.valueOf(data.getCode())
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> detailTag(@PathVariable("id") Long id) {
        var data = iTagService.detailTag(id);
        return new ResponseEntity<>(data,
                HttpStatusCode.valueOf(data.getCode())
        );
    }

    @PostMapping("")
    public ResponseEntity<?> createTag(@RequestBody TagCommand tagCommand){
        var data = iTagService.createTag(tagCommand);
        return new ResponseEntity<>(
                data,
                HttpStatusCode.valueOf(data.getCode())
        );
    }

    @PutMapping("")
    public ResponseEntity<?> updateTag(@RequestBody TagCommand tagCommand){
        var data = iTagService.updateTag(tagCommand);
        return new ResponseEntity<>(
                data,
                HttpStatusCode.valueOf(data.getCode())
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTag(@PathVariable("id") long id){
        var data = iTagService.deleteTag(id);
        return new ResponseEntity<>(
                data,
                HttpStatusCode.valueOf(data.getCode())
        );
    }
}
