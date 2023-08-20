package com.techwiz.techwizbe.dto;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BrandWithCountProductDto {
    private long id;
    private String brandCode;
    private String brandName;
    private boolean enable;
    private int countProduct;
}
