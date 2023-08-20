package com.techwiz.techwizbe.dto;

import com.techwiz.techwizbe.command.CategoryCommand;
import lombok.*;

import java.util.Date;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CategoryDto {
    private long id;
    private String categoryCode;
    private String categoryName;
    private CategoryCommand parentCategory;
    private boolean enable;
    private Date createdAt;
    private Date updatedAt;
}
