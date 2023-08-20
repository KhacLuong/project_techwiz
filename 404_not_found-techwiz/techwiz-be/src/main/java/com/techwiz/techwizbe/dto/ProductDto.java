package com.techwiz.techwizbe.dto;

import com.techwiz.techwizbe.entities.modals.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ProductDto {

    private long id;

    private String productCode;

    private String productName;

    private CategoryEntity category;

    private BrandEntity brand;

    private TypeEntity type;

    private String sku;

    private String imagePath;

    private String summary;

    private String content;

    private String slug;

    private boolean hot;

    private double priceFrom;

    private boolean enable;

    private Date createdAt;

    private Date updatedAt;
}
