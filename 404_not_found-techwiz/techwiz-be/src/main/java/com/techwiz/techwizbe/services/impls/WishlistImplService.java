package com.techwiz.techwizbe.services.impls;

import com.techwiz.techwizbe.command.WishlistCommand;
import com.techwiz.techwizbe.command.WishlistItemCommand;
import com.techwiz.techwizbe.configs.ResponseConfig;
import com.techwiz.techwizbe.dto.ResponseDto;
import com.techwiz.techwizbe.entities.modals.WishListEntity;
import com.techwiz.techwizbe.entities.modals.WishlistItemEntity;
import com.techwiz.techwizbe.repositories.UserRepository;
import com.techwiz.techwizbe.repositories.WishlistItemRepository;
import com.techwiz.techwizbe.repositories.WishlistRepository;
import com.techwiz.techwizbe.services.interfaces.IWishlistService;
import com.techwiz.techwizbe.utils.Helper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@RequiredArgsConstructor
public class WishlistImplService implements IWishlistService {
    private final WishlistRepository wishlistRepository;
    private final WishlistItemRepository wishlistItemRepository;
    private final UserRepository userRepository;

    @Override
    public ResponseDto<?> getWishlist(long userId, int pageNumber, int perPage, String sortField, String sortDir) {
        Pageable pageable = Helper.pageableQuery(pageNumber, perPage, sortField, sortDir);
        var data = wishlistRepository.findByUserId(userId, pageable);
        if (data.isEmpty()){
            return ResponseConfig.noContent("No wishlist of user has been found.");
        }
        long totalItems = data.getTotalElements();
        int totalPages = data.getTotalPages();
        return ResponseConfig.ok(data.getContent(), "Get wishlist of user successfully.", pageNumber, perPage, totalItems, totalPages, sortField, sortDir);
    }

    private ResponseDto<?> createWishlist(WishlistCommand wishlistCommand) {
        if (userRepository.findById(wishlistCommand.getUserId()).isEmpty()) {
            return ResponseConfig.conflict("User not exist.");
        }
        var wishlist = WishListEntity.builder()
                .userId(wishlistCommand.getUserId())
                .createdAt(new Date())
                .build();
        var savedWishlist = wishlistRepository.save(wishlist);
        for (WishlistItemCommand wishlistItemCommand: wishlistCommand.getWishlistItems()) {
            var wishlistItem = WishlistItemEntity.builder()
                    .wishlistId(savedWishlist.getId())
                    .productId(wishlistItemCommand.getProductId())
                    .createdAt(new Date())
                    .build();
            wishlistItemRepository.save(wishlistItem);
        }
        return ResponseConfig.created(null, "Create wishlist successfully.");
    }

    @Override
    public ResponseDto<?> addProductWishlist(WishlistCommand wishlistCommand) {
        if (wishlistRepository.getByUserId(wishlistCommand.getUserId()).isEmpty()) {
            return createWishlist(wishlistCommand);
        }
        var data = wishlistRepository.findByUserId(wishlistCommand.getUserId());
        if (data.isEmpty()) {
            return ResponseConfig.notFound("Wishlist not found.");
        }
        var wishlist = data.get();
        for (WishlistItemCommand wishlistItemCommand: wishlistCommand.getWishlistItems()) {
            var wishlistItemData = wishlistItemRepository.findByWishlistIdAndProductId(wishlist.getId(), wishlistItemCommand.getProductId());
            if (wishlistItemData.isPresent()) {
                return ResponseConfig.conflict("This product already in your wish list.");
            }
            var newWishlistItem = WishlistItemEntity.builder()
                    .wishlistId(wishlist.getId())
                    .productId(wishlistItemCommand.getProductId())
                    .createdAt(new Date())
                    .build();
            wishlistItemRepository.save(newWishlistItem);
        }
        return ResponseConfig.created(wishlist, "Add product to wishlist successfully.");
    }

    @Override
    public ResponseDto<?> deleteProductWishlist(WishlistCommand wishlistCommand) {
        var data = wishlistRepository.findByUserId(wishlistCommand.getUserId());
        if (data.isEmpty()) {
            return ResponseConfig.notFound("Wishlist not found.");
        }
        for (WishlistItemCommand wishlistItemCommand: wishlistCommand.getWishlistItems()) {
            var wistlistItemOptional = wishlistItemRepository.findByWishlistIdAndProductId(wishlistCommand.getUserId(), wishlistItemCommand.getProductId());
            if (wistlistItemOptional.isEmpty()){
                return ResponseConfig.notFound("Wishlist item not found.");
            }
            var wishlistItem = wistlistItemOptional.get();
            wishlistItemRepository.delete(wishlistItem);
        }
        return ResponseConfig.deleted("Delete product from wishlist successfully.");
    }
}
