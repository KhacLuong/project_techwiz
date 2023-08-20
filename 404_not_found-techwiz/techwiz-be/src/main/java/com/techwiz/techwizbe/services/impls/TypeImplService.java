package com.techwiz.techwizbe.services.impls;

import com.techwiz.techwizbe.command.TypeCommand;
import com.techwiz.techwizbe.configs.ResponseConfig;
import com.techwiz.techwizbe.dto.ResponseDto;
import com.techwiz.techwizbe.dto.TypeWithCountProductDto;
import com.techwiz.techwizbe.entities.modals.TypeEntity;
import com.techwiz.techwizbe.repositories.ProductRepository;
import com.techwiz.techwizbe.repositories.TypeRepository;
import com.techwiz.techwizbe.services.interfaces.ITypeService;
import com.techwiz.techwizbe.utils.Helper;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Transactional
public class TypeImplService implements ITypeService {
    @Autowired
    private TypeRepository typeRepository;
    @Autowired
    private ProductRepository productRepository;
    @Override
    public ResponseDto<?> getListTypeByKeywordAndEnable(int pageNumber, int perPage, String sortField, String sortDir, String keyword, Boolean enable) {
        Pageable pageable = Helper.pageableQuery(pageNumber, perPage, sortField, sortDir);
        var data = typeRepository.findByKeywordAndEnable(Objects.requireNonNullElse(keyword, ""), enable, pageable);
        long totalItems = data.getTotalElements();
        int totalPages = data.getTotalPages();
        return ResponseConfig.ok(data.getContent(), "Get list of types successfully.", pageNumber, perPage, totalItems, totalPages, sortField, sortDir);
    }

    @Override
    public ResponseDto<?> getListTypeByKeyword(int pageNumber, int perPage, String sortField, String sortDir, String keyword) {
        Pageable pageable = Helper.pageableQuery(pageNumber, perPage, sortField, sortDir);
        var data = typeRepository.findByKeyword(Objects.requireNonNullElse(keyword, ""), pageable);
        long totalItems = data.getTotalElements();
        int totalPages = data.getTotalPages();
        return ResponseConfig.ok(data.getContent(), "Get list of types by keyword successfully.", pageNumber, perPage, totalItems, totalPages, sortField, sortDir);
    }

    @Override
    public ResponseDto<?> detailType(long id) {
        var find_type = typeRepository.findById(id);
        if (find_type.isEmpty()){
            return ResponseConfig.notFound("Can't find type have id = " + id);
        }
        TypeCommand typeCommand = new TypeCommand(find_type.get());
        return ResponseConfig.ok(typeCommand, "find type successfully");
    }

    @Override
    public ResponseDto<?> createType(TypeCommand typeCommand) {
        TypeEntity typeEntity = new TypeEntity();
        typeEntity.setTypeName(typeCommand.getTypeName());
        typeEntity.setEnable(typeCommand.isEnable());
        typeEntity.setCreatedAt(new Date());
        typeEntity.setUpdatedAt(new Date());

        var data = typeRepository.save(typeEntity);
        return ResponseConfig.created(data, "Create type successfully");
    }

    @Override
    public ResponseDto<?> updateType(TypeCommand typeCommand) {
        var find_type = typeRepository.findById(typeCommand.getId());
        if (find_type.isEmpty()){
            return ResponseConfig.notFound("Can't find type have id = " + typeCommand.getId());
        }
        TypeEntity typeEntity = find_type.get();
        typeEntity.setTypeName(typeCommand.getTypeName());
        typeEntity.setEnable(typeCommand.isEnable());
        typeEntity.setCreatedAt(typeEntity.getCreatedAt());
        typeEntity.setUpdatedAt(new Date());

        var data = typeRepository.save(typeEntity);
        return ResponseConfig.created(data, "Update type successfully");
    }

    @Override
    public ResponseDto<?> deleteType(long id) {
        var find_type = typeRepository.findById(id);
        if (find_type.isEmpty()){
            return ResponseConfig.notFound("Can't find type have id = " + id);
        }
        typeRepository.deleteById(id);
        productRepository.deleteAllByProductTypeId(id);
        return ResponseConfig.ok(null, "Delete type successfully");
    }

    @Override
    public ResponseDto<?> getListTypeAndCountProduct() {
        Set<TypeWithCountProductDto> result = new HashSet<>();
        List<TypeEntity> list = typeRepository.findAllByEnableIsTrue();
        for (TypeEntity type : list) {
            TypeWithCountProductDto typeWithCountProductDto = new TypeWithCountProductDto();
            typeWithCountProductDto.setId(type.getId());
            typeWithCountProductDto.setTypeName(type.getTypeName());
            typeWithCountProductDto.setEnable(type.isEnable());

            int countProduct = productRepository.countProductEntitiesByProductTypeId(type.getId());
            typeWithCountProductDto.setCountProduct(countProduct);

            result.add(typeWithCountProductDto);
        }

        return ResponseConfig.ok(result, "Get list category successfully");
    }
}
