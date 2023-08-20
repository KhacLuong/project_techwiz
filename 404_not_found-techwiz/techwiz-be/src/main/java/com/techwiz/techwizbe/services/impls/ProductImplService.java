package com.techwiz.techwizbe.services.impls;

import com.techwiz.techwizbe.command.*;
import com.techwiz.techwizbe.configs.ResponseConfig;
import com.techwiz.techwizbe.dto.ProductDetailDto;
import com.techwiz.techwizbe.dto.ResponseDto;
import com.techwiz.techwizbe.entities.enums.Color;
import com.techwiz.techwizbe.entities.enums.Size;
import com.techwiz.techwizbe.entities.modals.*;
import com.techwiz.techwizbe.repositories.*;
import com.techwiz.techwizbe.services.interfaces.IProductService;
import com.techwiz.techwizbe.utils.Helper;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
public class ProductImplService implements IProductService {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private TagRepository tagRepository;

    @Autowired
    private FileService fileService;

    @Autowired
    ThumbnailRepository thumbnailRepo;

    @Autowired
    ProductInfoRepository productInfoRepo;

    @Autowired
    BrandRepository brandRepo;

    @Autowired
    CategoryRepository categoryRepo;

    @Autowired
    TypeRepository typeRepo;


    @Override
    public ResponseDto<?> getListProductInfo() {
        List<Color> colorList = new ArrayList<>();
        List<String> colorStrings = colorList.stream().map(Color::name).collect(Collectors.toList());

        var data = productInfoRepo.findAllByColor(colorList);
        return ResponseConfig.ok(data.orElse(null), "get list product success");
    }


    @Override
    public ResponseDto<?> searchFilterProductInfo(int pageNumber, int perPage, String sortField, String sortDir, String keyword, String colors, String sizes, String categoryIds, String branchIds, String typeIds, Boolean enable, Boolean hot, double priceMax, double priceMin) {
        Pageable pageable = Helper.pageableQuery(pageNumber, perPage, sortField, sortDir);
        //       convert color
        String[] colorString = Helper.convertStringToStringArray(colors);
        List<Color> colorList = new ArrayList<>();
        if (colorString != null) {
            for (String color : colorString) {
                if (isValidColor(color)) {
                    colorList.add(Color.valueOf(color.toUpperCase()));
                }
            }
        }

        //    convert size
        String[] sizeString = Helper.convertStringToStringArray(sizes);
        List<Size> sizeList = new ArrayList<>();

        if (sizeString != null) {
            for (String size : sizeString) {
                if (isValidSize(size)) {
                    sizeList.add(Size.valueOf(size.toUpperCase()));
                }
            }
        }

        //      convert categoryIds
        Long[] categoryIdList = Helper.convertStringToLongArray(categoryIds);
        Long[] branchIdList = Helper.convertStringToLongArray(branchIds);
        Long[] typeIdList = Helper.convertStringToLongArray(typeIds);
        if (categoryIdList == null) {
            categoryIdList = new Long[0];
        }
        if (branchIdList == null) {
            branchIdList = new Long[0];
        }
        if (typeIdList == null) {
            typeIdList = new Long[0];
        }


        var data = productRepository.searchAndFilter(Objects.requireNonNullElse(keyword, ""), colorList, colorList.size(), sizeList, sizeList.size(), categoryIdList, categoryIdList.length, branchIdList, branchIdList.length, typeIdList, typeIdList.length, enable, hot, priceMax, priceMin, pageable);
        long totalItems = data.getTotalElements();
        int totalPages = data.getTotalPages();
        List<ProductEntity> products = data.getContent();
        List<ProductDetailDto> productDetailDtos = new ArrayList<>();

        for (ProductEntity product : products) {
            ProductDetailDto productDetailDto = new ProductDetailDto();
            productDetailDto.setId(product.getId());
            productDetailDto.setBrand(brandRepo.findById(product.getBrandId()).orElse(null));
            productDetailDto.setCategory(categoryRepo.findById(product.getCategoryId()).orElse(null));
            productDetailDto.setType(typeRepo.findById(product.getProductTypeId()).orElse(null));
            productDetailDto.setProductInfos(product.getProductInfos());
            productDetailDto.setProductName(product.getProductName());
            productDetailDto.setContent(product.getContent());
            productDetailDto.setEnable(product.isEnable());
            productDetailDto.setSku(product.getSku());
            productDetailDto.setSlug(product.getSlug());
            productDetailDto.setTags(product.getTags());
            productDetailDto.setImagePath(product.getImagePath());
            productDetailDto.setHot(product.isHot());
            productDetailDto.setSummary(product.getSummary());
            productDetailDto.setPriceFrom(product.getPriceFrom());
            productDetailDto.setProductThumbnails(product.getProductThumbnails());
            productDetailDto.setCreatedAt(product.getCreatedAt());
            productDetailDto.setUpdatedAt(product.getUpdatedAt());
            productDetailDtos.add(productDetailDto);
        }
        return ResponseConfig.ok(productDetailDtos, "get list product success", pageNumber, perPage, totalItems, totalPages, sortField, sortDir);

    }

    @Override
    public ResponseDto<?> create(ProductCommand command) {
        ProductEntity productEntity = new ProductEntity();
        productEntity.setProductCode(Helper.handleRandomCode());
        productEntity.setProductName(command.getProductName());
        productEntity.setCategoryId(command.getCategoryId());
        productEntity.setBrandId(command.getBrandId());
        productEntity.setProductTypeId(command.getProductTypeId());
        productEntity.setSku(Helper.handleRandomSKU());
//        String imagePath = fileService.uploadAndDownloadFile(command.getFile(), command.getContainerName());
        productEntity.setImagePath("imagePath");
        productEntity.setSummary(command.getSummary());
        productEntity.setContent(command.getContent());
        productEntity.setSlug(Helper.handleConvertToSlug(command.getProductName())+"-"+productEntity.getProductCode());

        productEntity.setEnable(command.isEnable());
        productEntity.setHot(command.isHot());
        productEntity.setPriceFrom(command.getPriceFrom());
        productEntity.setCreatedAt(new Date());
        productEntity.setUpdatedAt(new Date());
        // Add list tag to product
        Set<TagEntity> tags = new HashSet<>();
        for (TagCommand tagCommand : command.getTags()) {
            Optional<TagEntity> optional = tagRepository.findById(tagCommand.getId());
            optional.ifPresent(tags::add);
        }
        productEntity.setTags(tags);


        Set<ThumbnailEntity> thumbnails = new HashSet<>();
//        for (ProductThumbnailCommand productThumbnailCommand : command.getProductThumbnails()) {
//            ThumbnailEntity productThumbnail = new ThumbnailEntity();
//            String thumbnailPath = fileService.uploadAndDownloadFile(productThumbnailCommand.getFile(), productThumbnailCommand.getContainerName());
//            productThumbnail.setId(productThumbnailCommand.getId());
//            productThumbnail.setEnable(productThumbnailCommand.isEnable());
//            productThumbnail.setImagePath(thumbnailPath);
//            productThumbnail.setCreatedAt(new Date());
//            productThumbnail.setUpdatedAt(new Date());
//            productThumbnail.setProduct(productEntity);
//            thumbnails.add(productThumbnail);
//        }
        productEntity.setProductThumbnails(thumbnails);
        Set<ProductInfoEntity> productInfos = new HashSet<>();
        for (ProductInfoCommand productInfoCm : command.getProductInfoCommands()) {
            ProductInfoEntity productInfo = new ProductInfoEntity();
            if (!isValidSize(productInfoCm.getSize().toUpperCase())) {
                return ResponseConfig.badRequest("Sizes allow  is : XXS, XS, S, M, L, XL ,XXL");
            }
            productInfo.setSize(Size.valueOf(productInfoCm.getSize().toUpperCase()));
            if (!isValidColor(productInfoCm.getColor().toUpperCase())) {
                return ResponseConfig.badRequest("Color allow  is : Green, Red, Yellow, Blue, Gray, Pink ,Brown, White");
            }
            productInfo.setColor(Color.valueOf(productInfoCm.getColor().toUpperCase()));
            productInfo.setPrice(productInfoCm.getPrice());
            productInfo.setQuantity(productInfoCm.getQuantity());
            productInfo.setCreatedAt(new Date());
            productInfo.setUpdatedAt(new Date());
            productInfo.setProduct(productEntity);
            productInfos.add(productInfo);
        }
        productEntity.setProductInfos(productInfos);
        var data = productRepository.save(productEntity);
        return ResponseConfig.created(data, "Create product successfully");
    }

    @Override
    public ResponseDto<?> update(ProductCommand command) {

        Optional<ProductEntity> optional = productRepository.findById(command.getId());
        if (optional.isEmpty()) {
            return ResponseConfig.notFound("Can't find product have id = " + command.getId());
        }
        ProductEntity product = optional.get();
        product.setProductName(command.getProductName());
        product.setCategoryId(command.getCategoryId());
        product.setBrandId(command.getBrandId());
        product.setProductTypeId(command.getProductTypeId());
//        String imagePath = fileService.uploadAndDownloadFile(command.getFile(), command.getContainerName());
        product.setImagePath("imagePath");
        product.setSummary(command.getSummary());
        product.setContent(command.getContent());
        product.setSlug(Helper.handleConvertToSlug(command.getProductName())+"-"+product.getProductCode());
        product.setHot(command.isHot());
        product.setPriceFrom(command.getPriceFrom());
        product.setUpdatedAt(new Date());

        Set<TagEntity> tags = new HashSet<>();
        for (TagCommand tagCommand : command.getTags()) {
            Optional<TagEntity> optionalTag = tagRepository.findById(tagCommand.getId());
            optionalTag.ifPresent(tags::add);
        }
        product.setTags(tags);

//        Add list Thumbnails to product
        Set<ThumbnailEntity> thumbnails = new HashSet<>();

//        for (ProductThumbnailCommand thumbnailCommand : command.getProductThumbnails()) {
//            Optional<ThumbnailEntity> thumbnail = thumbnailRepo.findById(thumbnailCommand.getId());
//            if (thumbnail.isEmpty()) {
//                ThumbnailEntity newThumnails = new ThumbnailEntity();
//                String thumbnailPath = fileService.uploadAndDownloadFile(thumbnailCommand.getFile(), thumbnailCommand.getContainerName());
//                newThumnails.setId(thumbnailCommand.getId());
//                newThumnails.setEnable(thumbnailCommand.isEnable());
//                newThumnails.setImagePath(thumbnailPath);
//                newThumnails.setCreatedAt(new Date());
//                newThumnails.setUpdatedAt(new Date());
//                newThumnails.setProduct(product);
//                thumbnails.add(newThumnails);
//            } else {
//                thumbnail.get().setUpdatedAt(new Date());
//                String thumbnailPath = fileService.uploadAndDownloadFile(thumbnailCommand.getFile(), thumbnailCommand.getContainerName());
//                thumbnail.get().setImagePath(thumbnailPath);
//                thumbnail.get().setEnable(thumbnailCommand.isEnable());
//            }
//        }
        product.setProductThumbnails(thumbnails);

        Set<ProductInfoEntity> productInfos = new HashSet<>();
        for (ProductInfoCommand productInfoCm : command.getProductInfoCommands()) {
            if (!productInfoRepo.existsById(productInfoCm.getId())) {
                ProductInfoEntity productInfo = new ProductInfoEntity();
                productInfo.setPrice(productInfoCm.getPrice());
                productInfo.setQuantity(productInfoCm.getQuantity());
                productInfo.setCreatedAt(new Date());
                productInfo.setUpdatedAt(new Date());
                if (!isValidSize(productInfoCm.getSize().toUpperCase())) {
                    return ResponseConfig.badRequest("Sizes allow  is : XXS, XS, S, M, L, XL ,XXL");
                }
                productInfo.setSize(Size.valueOf(productInfoCm.getSize().toUpperCase()));
                if (!isValidColor(productInfoCm.getColor().toUpperCase())) {
                    return ResponseConfig.badRequest("Color allow  is : Green, Red, Yellow, Blue, Gray, Pink ,Brown, White");
                }
                productInfo.setColor(Color.valueOf(productInfoCm.getColor().toUpperCase()));
                productInfos.add(productInfo);
            } else {
                ProductInfoEntity productInfo = productInfoRepo.findByIdAndProductId(productInfoCm.getId(), command.getId());
                if (productInfo == null) {
                    return ResponseConfig.badRequest("Can't find productInfo have id = " + productInfoCm.getId() + " and productId = " + command.getId());
                }
                productInfo.setPrice(productInfoCm.getPrice());
                productInfo.setQuantity(productInfoCm.getQuantity());
                productInfo.setUpdatedAt(new Date());
                if (!isValidSize(productInfoCm.getSize().toUpperCase())) {
                    return ResponseConfig.badRequest("Sizes allow  is : XXS, XS, S, M, L, XL ,XXL");
                }
                productInfo.setSize(Size.valueOf(productInfoCm.getSize().toUpperCase()));
                if (!isValidColor(productInfoCm.getColor().toUpperCase())) {
                    return ResponseConfig.badRequest("Color allow  is : Green, Red, Yellow, Blue, Gray, Pink ,Brown, White");
                }
                productInfo.setColor(Color.valueOf(productInfoCm.getColor().toUpperCase()));
                productInfos.add(productInfo);
            }
            product.setProductInfos(productInfos);

        }
        var data = productRepository.save(product);
        return ResponseConfig.created(data, "Update Product successfully");
    }

    public ResponseDto<?> delete(long id) {
        if (!productRepository.existsById(id)) {
            return ResponseConfig.notFound("Can't find Product have id = " + id);
        }
        productRepository.deleteById(id);
        return ResponseConfig.ok(null, "Delete color successfully");

    }

    @Override
    public ResponseDto<?> detail(long id) {
        Optional<ProductEntity> optional = productRepository.findById(id);
        if (optional.isEmpty()) {
            return ResponseConfig.notFound("Can't find product have id = " + id);
        }

        ProductEntity productEntity = optional.get();
        ProductDetailDto productDetailDto = new ProductDetailDto();
        productDetailDto.setId(productEntity.getId());
        productDetailDto.setBrand(brandRepo.findById(productEntity.getBrandId()).orElse(null));
        productDetailDto.setCategory(categoryRepo.findById(productEntity.getCategoryId()).orElse(null));

        productDetailDto.setProductCode(productEntity.getProductCode());
        productDetailDto.setType(typeRepo.findById(productEntity.getProductTypeId()).orElse(null));
        productDetailDto.setProductName(productEntity.getProductName());
        productDetailDto.setSku(productEntity.getSku());
        productDetailDto.setImagePath(productEntity.getImagePath());
        productDetailDto.setSummary(productEntity.getSummary());
        productDetailDto.setContent(productEntity.getContent());
        productDetailDto.setSlug(productEntity.getSlug());
        productDetailDto.setHot(productEntity.isHot());
        productDetailDto.setTags(productEntity.getTags());
        productDetailDto.setProductThumbnails(productEntity.getProductThumbnails());
        productDetailDto.setProductInfos(productEntity.getProductInfos());
        productDetailDto.setEnable(productEntity.isEnable());
        productDetailDto.setPriceFrom(productEntity.getPriceFrom());
        productDetailDto.setCreatedAt(productEntity.getCreatedAt());
        productDetailDto.setUpdatedAt(productEntity.getUpdatedAt());


        return ResponseConfig.ok(productDetailDto, "Get detail product successfully");
    }


    private boolean isValidSize(String sizeCommand) {
        for (Size size : Size.values()) {
            if (size.name().equalsIgnoreCase(sizeCommand)) {
                return true;
            }
        }
        return false;
    }

    private boolean isValidColor(String colorCommand) {
        for (Color color : Color.values()) {
            if (color.name().equalsIgnoreCase(colorCommand)) {
                return true;
            }
        }
        return false;
    }
}
