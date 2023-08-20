package com.techwiz.techwizbe.dto;

import lombok.*;

import java.util.List;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CategoryWithCountProductDto
{
    private long id;
    private String categoryCode;
    private String categoryName;
    private boolean enable;
    private int countProduct;
    List<CategoryWithCountProductDto> listChildrenCategory;
}
