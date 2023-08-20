package com.techwiz.techwizbe.services.impls;

import com.techwiz.techwizbe.command.BrandCommand;
import com.techwiz.techwizbe.configs.ResponseConfig;
import com.techwiz.techwizbe.dto.BrandWithCountProductDto;
import com.techwiz.techwizbe.dto.ResponseDto;
import com.techwiz.techwizbe.entities.modals.BrandEntity;
import com.techwiz.techwizbe.repositories.BrandRepository;
import com.techwiz.techwizbe.repositories.ProductRepository;
import com.techwiz.techwizbe.services.interfaces.IBrandService;
import com.techwiz.techwizbe.utils.Helper;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Transactional
public class BrandImplService implements IBrandService {
    @Autowired
    private BrandRepository brandRepository;

    @Autowired
    private ProductRepository productRepository;
    @Override
    public ResponseDto<?> getListBrandByKeywordAndEnable(int pageNumber, int perPage, String sortField, String sortDir, String keyword, Boolean enable) {
        Pageable pageable = Helper.pageableQuery(pageNumber, perPage, sortField, sortDir);
        var data = brandRepository.findByKeywordAndEnable(Objects.requireNonNullElse(keyword, ""), enable, pageable);
        long totalItems = data.getTotalElements();
        int totalPages = data.getTotalPages();
        return ResponseConfig.ok(data.getContent(), "Lấy danh sách thành công", pageNumber, perPage, totalItems, totalPages, sortField, sortDir);
    }

    @Override
    public ResponseDto<?> getListBrandByKeyword(int pageNumber, int perPage, String sortField, String sortDir, String keyword) {
        Pageable pageable = Helper.pageableQuery(pageNumber, perPage, sortField, sortDir);
        var data = brandRepository.findByKeyword(Objects.requireNonNullElse(keyword, ""), pageable);
        long totalItems = data.getTotalElements();
        int totalPages = data.getTotalPages();
        return ResponseConfig.ok(data.getContent(), "Lấy danh sách thành công", pageNumber, perPage, totalItems, totalPages, sortField, sortDir);
    }

    @Override
    public ResponseDto<?> detailBrand(long id) {
        var find_brand = brandRepository.findById(id);
        if (find_brand.isEmpty()){
            return ResponseConfig.notFound("Can't find brand have id = " + id);
        }
        BrandCommand brandCommand = new BrandCommand(find_brand.get());
        return ResponseConfig.ok(brandCommand, "find brand successfully");
    }

    @Override
    public ResponseDto<?> createBranch(BrandCommand brandCommand) {
        BrandEntity brandEntity = new BrandEntity();
        brandEntity.setBrandCode(brandCommand.getBrandCode());
        brandEntity.setBrandName(brandCommand.getBrandName());
        brandEntity.setEnable(brandCommand.isEnable());
        brandEntity.setCreatedAt(new Date());
        brandEntity.setUpdatedAt(new Date());

        var data = brandRepository.save(brandEntity);
        return ResponseConfig.created(data, "Create brand successfully");
    }

    @Override
    public ResponseDto<?> updateBrand(BrandCommand brandCommand) {
        var find_brand = brandRepository.findById(brandCommand.getId());
        if (find_brand.isEmpty()){
            return ResponseConfig.notFound("Can't find brand have id = " + find_brand.get().getId());
        }
        BrandEntity brandEntity = find_brand.get();
        brandEntity.setBrandCode(Helper.handleRandomCode());
        brandEntity.setBrandName(brandCommand.getBrandName());
        brandEntity.setEnable(brandCommand.isEnable());
        brandEntity.setCreatedAt(find_brand.get().getCreatedAt());
        brandEntity.setUpdatedAt(new Date());
        var data = brandRepository.save(brandEntity);
        return ResponseConfig.created(data, "Update brand successfully");
    }

    @Override
    public ResponseDto<?> deleteBrand(long id) {
        var find_brand = brandRepository.findById(id);
        if (find_brand.isEmpty()){
            return ResponseConfig.notFound("Can't find brand have id = " + id);
        }
        brandRepository.deleteById(id);
        productRepository.deleteAllByBrandId(id);

        return ResponseConfig.ok(null, "Delete brand successfully");
    }

    @Override
    public ResponseDto<?> getListBrandAndCountProduct() {
        Set<BrandWithCountProductDto> result = new HashSet<>();
        List<BrandEntity> listBrand = brandRepository.findAllByEnableIsTrue();
        for (BrandEntity brandEntity : listBrand) {
            BrandWithCountProductDto brandWithCountProductDto = new BrandWithCountProductDto();
            brandWithCountProductDto.setId(brandEntity.getId());
            brandWithCountProductDto.setBrandName(brandEntity.getBrandName());
            brandWithCountProductDto.setBrandCode(brandEntity.getBrandCode());
            brandWithCountProductDto.setEnable(brandEntity.isEnable());
            int countProduct = productRepository.countProductEntitiesByBrandId(brandEntity.getId());
            brandWithCountProductDto.setCountProduct(countProduct);

            result.add(brandWithCountProductDto);
        }
        return ResponseConfig.ok(result, "Get list category successfully");
    }

}
