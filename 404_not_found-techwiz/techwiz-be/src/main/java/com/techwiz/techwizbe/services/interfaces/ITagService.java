package com.techwiz.techwizbe.services.interfaces;

import com.techwiz.techwizbe.command.TagCommand;
import com.techwiz.techwizbe.dto.ResponseDto;

public interface ITagService {
    ResponseDto<?> getListTagByKeywordAndEnable(int pageNumber, int perPage, String sortField, String sortDir, String keyword, Boolean enable);

    ResponseDto<?> getListTagByKeyword(int pageNumber, int perPage, String sortField, String sortDir, String keyword);
    ResponseDto<?> detailTag(long id);

    ResponseDto<?> createTag(TagCommand tagCommand);

    ResponseDto<?> updateTag(TagCommand tagCommand);

    ResponseDto<?> deleteTag(long id);


}
