package com.techwiz.techwizbe.controllers;

import com.techwiz.techwizbe.dto.FileResponseDto;
import com.techwiz.techwizbe.services.impls.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/file")
public class FileController {
    @Autowired
    private FileService fileService;
    private final FileResponseDto FILE_RESPONSE_DTO = new FileResponseDto();
    @PostMapping(value = "")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file,
                                        @RequestParam("containerName") String containerName) {
        try {
            String pathName = fileService.uploadAndDownloadFile(file, containerName);
            FILE_RESPONSE_DTO.setCode(200);
            FILE_RESPONSE_DTO.setStatus("success");
            FILE_RESPONSE_DTO.setMessage("Thêm ảnh thành công");
            FILE_RESPONSE_DTO.setData(pathName);
            return ResponseEntity.ok(FILE_RESPONSE_DTO);
        } catch (Exception e) {
            return ResponseEntity.ok("Error while processing file");
        }
    }
}
