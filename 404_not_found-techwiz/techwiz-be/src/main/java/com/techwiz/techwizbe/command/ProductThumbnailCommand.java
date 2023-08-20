package com.techwiz.techwizbe.command;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductThumbnailCommand {
    private long id;
    private MultipartFile file;
    private String containerName;
    private boolean enable;
}
