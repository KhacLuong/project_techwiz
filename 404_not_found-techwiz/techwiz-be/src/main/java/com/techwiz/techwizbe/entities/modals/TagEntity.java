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
@Entity(name = "tags")
@Table(name = "tags", schema = "techwiz_database", catalog = "")
public class TagEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private long id;
    @Basic
    @Column(name = "tag_name", nullable = false)
    private String tagName;
    @Basic
    @Column(name = "slug", nullable = false)
    private String slug;
    @Basic
    @Column(name = "content", columnDefinition = "text")
    private String content;
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
