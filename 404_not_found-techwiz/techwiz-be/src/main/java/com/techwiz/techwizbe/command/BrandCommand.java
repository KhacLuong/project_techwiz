package com.techwiz.techwizbe.command;

import com.techwiz.techwizbe.entities.modals.BrandEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Setter
@Getter
@NoArgsConstructor
public class BrandCommand {
    private long id;
    private String brandCode;
    private String brandName;
    private boolean enable;
    private Date createdAt;
    private Date updatedAt;

    public BrandCommand(BrandEntity brandEntity) {
        this.id = brandEntity.getId();
        this.brandCode= brandEntity.getBrandCode();
        this.brandName = brandEntity.getBrandName();
        this.createdAt = brandEntity.getCreatedAt();
        this.updatedAt = brandEntity.getUpdatedAt();
        this.enable = brandEntity.isEnable();
    }
}
