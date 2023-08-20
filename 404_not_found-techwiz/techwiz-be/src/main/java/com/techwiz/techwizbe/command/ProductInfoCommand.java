package com.techwiz.techwizbe.command;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.techwiz.techwizbe.entities.enums.Color;
import com.techwiz.techwizbe.entities.enums.Size;
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
public class ProductInfoCommand {


    private long id;

    private int quantity;

    private double price;

    private String size;

    private String color;
}
