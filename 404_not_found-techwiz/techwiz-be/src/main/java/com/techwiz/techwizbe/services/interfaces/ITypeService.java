package com.techwiz.techwizbe.services.interfaces;

import com.techwiz.techwizbe.command.BrandCommand;
import com.techwiz.techwizbe.command.TypeCommand;
import com.techwiz.techwizbe.dto.ResponseDto;

public interface ITypeService {
    ResponseDto<?> getListTypeByKeywordAndEnable(int pageNumber, int perPage, String sortField, String sortDir, String keyword, Boolean enable);

    ResponseDto<?> getListTypeByKeyword(int pageNumber, int perPage, String sortField, String sortDir, String keyword);

    ResponseDto<?> detailType(long id);

    ResponseDto<?> createType(TypeCommand typeCommand);

    ResponseDto<?> updateType(TypeCommand typeCommand);

    ResponseDto<?> deleteType(long id);

    ResponseDto<?> getListTypeAndCountProduct();
}
