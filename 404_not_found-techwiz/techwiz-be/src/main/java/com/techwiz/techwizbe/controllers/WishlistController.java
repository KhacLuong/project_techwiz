package com.techwiz.techwizbe.controllers;

import com.techwiz.techwizbe.services.interfaces.IWishlistService;
import com.techwiz.techwizbe.command.WishlistCommand;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/wishlists")
@RequiredArgsConstructor
public class WishlistController {
    private final IWishlistService wishlistService;

    @GetMapping("/user")
    public ResponseEntity<?> getWishlistByUser(
            @RequestParam(value = "userId") long userId,
            @RequestParam(value = "pageNumber") int pageNumber,
            @RequestParam(value = "perPage") int perPage,
            @RequestParam(value = "sortField", defaultValue = "updatedAt") String sortField,
            @RequestParam(value = "sortDir", defaultValue = "desc") String sortDir) {
        var data = wishlistService.getWishlist(userId, pageNumber, perPage, sortField, sortDir);
        return new ResponseEntity<>(
                data,
                HttpStatusCode.valueOf(data.getCode())
        );
    }

    @PostMapping("/add")
    public ResponseEntity<?> addProduct(@RequestBody WishlistCommand wishlistCommand) {
        var data = wishlistService.addProductWishlist(wishlistCommand);
        return new ResponseEntity<>(
                data,
                HttpStatusCode.valueOf(data.getCode())
        );
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteProduct(@RequestBody WishlistCommand wishlistCommand) {
        var data = wishlistService.deleteProductWishlist(wishlistCommand);
        return new ResponseEntity<>(
                data,
                HttpStatusCode.valueOf(data.getCode())
        );
    }
}
