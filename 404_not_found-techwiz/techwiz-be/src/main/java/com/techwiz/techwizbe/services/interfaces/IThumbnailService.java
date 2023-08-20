package com.techwiz.techwizbe.services.interfaces;

import com.techwiz.techwizbe.dto.ResponseDto;

public interface IThumbnailService {
    ResponseDto<?> getListThumbnailByKeyword(int pageNumber, int perPage, String sortField, String sortDir, String keyword);

    ResponseDto<?> getListThumbnailByKeywordAndEnable(int pageNumber, int perPage, String sortField, String sortDir, String keyword, boolean enable);
    ResponseDto<?> delete(long id);
}
