package com.techwiz.techwizbe.services.interfaces;

import com.techwiz.techwizbe.command.CategoryCommand;
import com.techwiz.techwizbe.dto.ResponseDto;

public interface ICategoryService {
    ResponseDto<?> getListCategoryByKeyword(int pageNumber, int perPage, String sortField, String sortDir, String keyword);

    ResponseDto<?> getListCategoryByKeywordAndParentId(int pageNumber, int perPage, String sortField, String sortDir, String keyword, long parentId);

    ResponseDto<?> getListCategoryByKeywordAndEnable(int pageNumber, int perPage, String sortField, String sortDir, String keyword, boolean enable);

    ResponseDto<?> getListCategoryByKeywordAndParentIdAndEnable(int pageNumber, int perPage, String sortField, String sortDir, String keyword, long parentId, boolean enable);

    ResponseDto<?> createCategory(CategoryCommand categoryCommand);

    ResponseDto<?> updateCategory(CategoryCommand categoryCommand);

    ResponseDto<?> deleteCategory(long id);

    ResponseDto<?> detailCategory(long id);

    ResponseDto<?> getListCategoryAndChildrenAndCountOfProduct();
}
