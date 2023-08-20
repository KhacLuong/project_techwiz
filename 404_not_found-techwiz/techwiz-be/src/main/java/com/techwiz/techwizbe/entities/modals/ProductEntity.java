package com.techwiz.techwizbe.entities.modals;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.Set;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "products")
@Table(name = "products", schema = "techwiz_database", catalog = "")
public class ProductEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private long id;
    @Basic
    @Column(name = "product_code", nullable = false)
    private String productCode;
    @Basic
    @Column(name = "product_name", nullable = false)
    private String productName;
    @Basic
    @Column(name = "category_id", nullable = false)
    private long categoryId;
    @Basic
    @Column(name = "brand_id", nullable = false)
    private long brandId;
    @Basic
    @Column(name = "product_type_id", nullable = false)
    private long productTypeId;
    @Basic
    @Column(name = "sku", nullable = false)
    private String sku;
    @Basic
    @Column(name = "image_path", nullable = true)
    private String imagePath;
    @Basic
    @Column(name = "summary", nullable = false)
    private String summary;
    @Basic
    @Column(name = "content", columnDefinition = "text")
    private String content;
    @Basic
    @Column(name = "slug", nullable = false)
    private String slug;

    @Basic
    @Column(name = "hot", nullable = false)
    private boolean hot;

    @Basic
    @Column(name = "price_from", nullable = false)
    private double priceFrom;

    @ManyToMany
    @JoinTable(
            name = "product_tags",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id"))
    private Set<TagEntity> tags;



    @OneToMany(mappedBy="product", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Set<ThumbnailEntity> productThumbnails;

    @OneToMany(mappedBy="product", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Set<ProductInfoEntity> productInfos;

    @Basic
    @Column(name = "enable", nullable = false)
    private boolean enable;
    @Basic
    @Column(name = "created_at", columnDefinition="TIMESTAMP")
    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date createdAt;
    @Basic
    @Column(name = "updated_at", columnDefinition="TIMESTAMP")
    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date updatedAt;
}
