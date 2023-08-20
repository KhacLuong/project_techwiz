package com.techwiz.techwizbe.command;

import com.techwiz.techwizbe.entities.modals.TypeEntity;
import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Setter
@Getter
@NoArgsConstructor
public class TypeCommand {
    private long id;
    private String typeName;
    private boolean enable;
    private Date createdAt;
    private Date updatedAt;

    public TypeCommand(TypeEntity typeEntity){
        this.id = typeEntity.getId();
        this.typeName = typeEntity.getTypeName();
        this.enable = typeEntity.isEnable();
        this.createdAt = typeEntity.getCreatedAt();
        this.updatedAt = typeEntity.getUpdatedAt();
    }
}
