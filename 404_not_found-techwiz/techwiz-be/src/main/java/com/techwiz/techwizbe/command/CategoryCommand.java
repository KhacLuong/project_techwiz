package com.techwiz.techwizbe.command;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CategoryCommand {
    private long id;
    private String categoryCode;
    private String categoryName;
    private long parentId;
    private boolean enable;
}
