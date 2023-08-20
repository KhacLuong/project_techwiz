package com.techwiz.techwizbe.entities.modals;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "categories")
@Table(name = "categories", schema = "techwiz_database", catalog = "")
public class CategoryEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private long id;
    @Basic
    @Column(name = "category_code", nullable = false)
    private String categoryCode;
    @Basic
    @Column(name = "category_name", nullable = false)
    private String categoryName;
    @Basic
    @Column(name = "parent_id")
    private long parentId;

    @Basic
    @Column(name = "enable", nullable = false)
    private boolean enable;
    @Basic
    @Column(name = "created_at", columnDefinition = "TIMESTAMP")
    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date createdAt;
    @Basic
    @Column(name = "updated_at", columnDefinition = "TIMESTAMP")
    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date updatedAt;
}
