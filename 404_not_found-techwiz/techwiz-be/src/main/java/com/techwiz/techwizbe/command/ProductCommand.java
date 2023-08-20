package com.techwiz.techwizbe.command;

import com.techwiz.techwizbe.entities.modals.ProductInfoEntity;
import com.techwiz.techwizbe.entities.modals.TagEntity;
import com.techwiz.techwizbe.entities.modals.ThumbnailEntity;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.Set;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductCommand {
    private long id;
    private String productName;
    private long categoryId;
    private long brandId;
    private long productTypeId;
//    private MultipartFile file;
    private String containerName;
    private String summary;
    private String content;
    private boolean hot;
    private double priceFrom;
    private Set<TagCommand> tags;
    private Set<ProductInfoCommand> productInfoCommands;
//    private Set<ProductThumbnailCommand> productThumbnails;
    private boolean enable;

}
