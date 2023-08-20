package com.techwiz.techwizbe.services.interfaces;

import com.techwiz.techwizbe.command.BrandCommand;
import com.techwiz.techwizbe.dto.ResponseDto;

public interface IBrandService {
    ResponseDto<?> getListBrandByKeywordAndEnable(int pageNumber, int perPage, String sortField, String sortDir, String keyword, Boolean aBoolean);

    ResponseDto<?> getListBrandByKeyword(int pageNumber, int perPage, String sortField, String sortDir, String keyword);

    ResponseDto<?> detailBrand(long id);

    ResponseDto<?> createBranch(BrandCommand brandCommand);

    ResponseDto<?> updateBrand(BrandCommand brandCommand);

    ResponseDto<?> deleteBrand(long id);

    ResponseDto<?> getListBrandAndCountProduct();
}
