package com.techwiz.techwizbe.services.interfaces;

import lombok.NonNull;
import org.springframework.web.multipart.MultipartFile;

public interface IFileService {
    String uploadAndDownloadFile(@NonNull MultipartFile file, String containerName);
}
