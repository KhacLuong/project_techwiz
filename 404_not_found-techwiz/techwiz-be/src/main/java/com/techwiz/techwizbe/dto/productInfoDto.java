package com.techwiz.techwizbe.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.techwiz.techwizbe.entities.enums.Color;
import com.techwiz.techwizbe.entities.enums.Size;
import com.techwiz.techwizbe.entities.modals.*;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.Set;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class productInfoDto {

    private long id;


    private ProductEntity product;


    private int quantity;


    private double price;

    private Size size;

    private Color color;

    private Date createdAt;

    private Date updatedAt;
}
