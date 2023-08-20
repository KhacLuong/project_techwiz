package com.techwiz.techwizbe.services.interfaces;

import com.techwiz.techwizbe.command.WishlistCommand;
import com.techwiz.techwizbe.dto.ResponseDto;

public interface IWishlistService {
    ResponseDto<?> getWishlist(long userId, int pageNumber, int perPage, String sortField, String sortDir);
    ResponseDto<?> addProductWishlist(WishlistCommand wishlistCommand);
    ResponseDto<?> deleteProductWishlist(WishlistCommand wishlistCommand);
}
