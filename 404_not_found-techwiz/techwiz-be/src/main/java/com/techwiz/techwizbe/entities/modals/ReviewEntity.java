package com.techwiz.techwizbe.entities.modals;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "reviews")
@Table(name = "reviews", schema = "techwiz_database", catalog = "")
public class ReviewEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private long id;
    @Basic
    @Column(name = "user_id", nullable = false)
    private long userId;
    @Basic
    @Column(name = "product_id", nullable = false)
    private long productId;
    @Basic
    @Column(name = "rating")
    @Min(1)
    @Max(5)
    private int rating;
    @Basic
    @Column(name = "time_to_expire", nullable = false)
    private Date timeToExpire;
    @Basic
    @Column(name = "content", columnDefinition = "text")
    private String content;
    @Basic
    @Column(name = "created_at", columnDefinition="TIMESTAMP")
    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date createdAt;
    @Basic
    @Column(name = "updated_at", columnDefinition="TIMESTAMP")
    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date updatedAt;
}
