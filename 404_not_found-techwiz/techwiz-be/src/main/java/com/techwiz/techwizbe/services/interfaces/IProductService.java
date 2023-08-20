package com.techwiz.techwizbe.services.interfaces;

import com.techwiz.techwizbe.command.ProductCommand;
import com.techwiz.techwizbe.dto.ResponseDto;
import com.techwiz.techwizbe.entities.enums.Color;

import java.util.List;

public interface IProductService {


    ResponseDto<?> getListProductInfo();

    ResponseDto<?> searchFilterProductInfo(int pageNumber, int perPage, String sortField, String sortDir, String keyword, String  colors, String sizes, String categoryIds, String branchIds, String typeIds, Boolean enable, Boolean hot, double priceMax, double priceMin);

    ResponseDto<?> create(ProductCommand product);

    ResponseDto<?> update(ProductCommand product);

    ResponseDto<?> delete(long id);

    ResponseDto<?> detail(long id);

}
