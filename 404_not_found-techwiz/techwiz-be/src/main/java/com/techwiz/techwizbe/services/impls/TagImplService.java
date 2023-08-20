package com.techwiz.techwizbe.services.impls;

import com.techwiz.techwizbe.command.TagCommand;
import com.techwiz.techwizbe.configs.ResponseConfig;
import com.techwiz.techwizbe.dto.ResponseDto;
import com.techwiz.techwizbe.entities.modals.ProductEntity;
import com.techwiz.techwizbe.entities.modals.TagEntity;
import com.techwiz.techwizbe.repositories.ProductRepository;
import com.techwiz.techwizbe.repositories.TagRepository;
import com.techwiz.techwizbe.services.interfaces.ITagService;
import com.techwiz.techwizbe.utils.Helper;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@Transactional
public class TagImplService implements ITagService {
    @Autowired
    TagRepository tagRepository;
    @Autowired
    private ProductRepository productRepository;
    @Override
    public ResponseDto<?> getListTagByKeywordAndEnable(int pageNumber, int perPage, String sortField, String sortDir, String keyword, Boolean enable) {
        Pageable pageable = Helper.pageableQuery(pageNumber, perPage, sortField, sortDir);
        var data = tagRepository.findByKeywordAndEnable(Objects.requireNonNullElse(keyword, ""), enable, pageable);
        long totalItems = data.getTotalElements();
        int totalPages = data.getTotalPages();
        return ResponseConfig.ok(data.getContent(), "Lấy danh sách thành công", pageNumber, perPage, totalItems, totalPages, sortField, sortDir);
    }

    @Override
    public ResponseDto<?> getListTagByKeyword(int pageNumber, int perPage, String sortField, String sortDir, String keyword) {
        Pageable pageable = Helper.pageableQuery(pageNumber, perPage, sortField, sortDir);
        var data = tagRepository.findByKeyword(Objects.requireNonNullElse(keyword, ""), pageable);
        long totalItems = data.getTotalElements();
        int totalPages = data.getTotalPages();
        return ResponseConfig.ok(data.getContent(), "Lấy danh sách thành công", pageNumber, perPage, totalItems, totalPages, sortField, sortDir);
    }

    @Override
    public ResponseDto<?> detailTag(long id) {
        var find_tag = tagRepository.findById(id);
        if (find_tag.isEmpty()){
            return ResponseConfig.notFound("Can't find tag have id = " + id);
        }
        TagCommand tagCommand = new TagCommand(find_tag.get());
        return ResponseConfig.ok(tagCommand, "find tag successfully");
    }

    @Override
    public ResponseDto<?> createTag(TagCommand tagCommand) {
        TagEntity tagEntity = new TagEntity();
        tagEntity.setTagName(tagCommand.getTagName());
        tagEntity.setContent(tagCommand.getContent());
        tagEntity.setSlug(tagCommand.getSlug());
        tagEntity.setCreatedAt(new Date());
        tagEntity.setUpdatedAt(new Date());
        tagEntity.setEnable(tagCommand.isEnable());
        var data = tagRepository.save(tagEntity);
        return ResponseConfig.created(data, "Create Tag successfully");
    }

    @Override
    public ResponseDto<?> updateTag(TagCommand tagCommand) {
        var find_tag = tagRepository.findById(tagCommand.getId());
        if (find_tag.isEmpty()){
            return ResponseConfig.notFound("Cant find tag have id = " + tagCommand.getId());
        }
        TagEntity tagEntity = find_tag.get();
        tagEntity.setTagName(tagCommand.getTagName());
        tagEntity.setContent(tagCommand.getContent());
        tagEntity.setSlug(tagCommand.getSlug());
        tagEntity.setCreatedAt(tagEntity.getCreatedAt());
        tagEntity.setUpdatedAt(new Date());
        tagEntity.setEnable(tagCommand.isEnable());
        var data = tagRepository.save(tagEntity);
        return ResponseConfig.created(data, "Update Tag Successfully");
    }

    @Override
    public ResponseDto<?> deleteTag(long id) {
        Optional<TagEntity> find_tag = tagRepository.findById(id);
        if (find_tag.isEmpty()){
            return ResponseConfig.notFound("Cant find tag have id = " + id);
        }
        TagEntity tagEntity = find_tag.get();
        List<ProductEntity> productEntities = productRepository.findProductEntitiesByTags(tagEntity);
        for (ProductEntity product : productEntities) {
            product.getTags().remove(tagEntity);
        }
        tagRepository.deleteById(find_tag.get().getId());
        return ResponseConfig.ok(null, "Delete brand successfully");
    }


}
