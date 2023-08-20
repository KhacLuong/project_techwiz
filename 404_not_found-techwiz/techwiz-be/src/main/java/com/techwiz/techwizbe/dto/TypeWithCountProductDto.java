package com.techwiz.techwizbe.dto;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TypeWithCountProductDto {
    private long id;
    private String typeName;
    private boolean enable;
    private int countProduct;
}
