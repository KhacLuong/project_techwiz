package com.techwiz.techwizbe.command;

import com.techwiz.techwizbe.entities.modals.TagEntity;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
public class TagCommand {
    private long id;
    private String tagName;
    private String slug;
    private String content;
    private boolean enable;
    private Date createdAt;
    private Date updatedAt;

    public TagCommand(TagEntity tagEntity){
        this.id = tagEntity.getId();
        this.tagName = tagEntity.getTagName();
        this.slug = tagEntity.getSlug();
        this.content = tagEntity.getContent();
        this.enable = tagEntity.isEnable();
        this.createdAt = tagEntity.getCreatedAt();
        this.updatedAt = tagEntity.getUpdatedAt();
    }
}
