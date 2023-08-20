package com.techwiz.techwizbe.command;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.techwiz.techwizbe.entities.modals.ProductEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ThumbnailCommand {
    private long id;

    private ProductEntity product;

    private String imagePath;

    private boolean enable;

}