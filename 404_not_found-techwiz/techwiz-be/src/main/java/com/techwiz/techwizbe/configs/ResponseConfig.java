package com.techwiz.techwizbe.configs;

import com.techwiz.techwizbe.dto.ResponseDto;
import jakarta.annotation.Nullable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class ResponseConfig {
    public static <T> ResponseDto<T> ok(@Nullable T data, String message) {
        return new ResponseDto<>(HttpStatus.OK.value(), "Success", message, data);
    }

    public static <T> ResponseDto<T> ok(
            @Nullable T data, String message,
            int pageNumber, int perPage, long totalItems, int totalPages,
            String sortField, String sortDir) {
        return new ResponseDto<>(
                HttpStatus.OK.value(), "Success", message,
                pageNumber, perPage, totalItems, totalPages, sortField, sortDir,
                data
        );
    }

    public static <T> ResponseDto<T> ok(
            @Nullable T data, String message,
            int pageNumber, int perPage, long totalItems, int totalPages) {
        return new ResponseDto<>(
                HttpStatus.OK.value(), "Success", message,
                pageNumber, perPage, totalItems, totalPages,
                data
        );
    }

    public static <T> ResponseDto<T> ok(
            @Nullable T data, String message,
            String sortField, String sortDir) {
        return new ResponseDto<>(
                HttpStatus.OK.value(), "Success", message,
                sortField, sortDir,
                data
        );
    }

    public static <T> ResponseDto<T> created(T data, String message) {
        return new ResponseDto<>(HttpStatus.CREATED.value(), "Created", message, data);
    }

    public static <T> ResponseDto<T> updated(String message) {
        return new ResponseDto<>(HttpStatus.OK.value(), "Updated", message);
    }
    public static <T> ResponseDto<T> deleted(String message) {
        return new ResponseDto<>(HttpStatus.OK.value(), "Deleted", message);
    }

    public static <T> ResponseDto<T> noContent(String message) {
        return new ResponseDto<>(HttpStatus.NO_CONTENT.value(), "No Content", message);
    }

    public static <T> ResponseDto<T> conflict(String message) {
        return new ResponseDto<>(HttpStatus.CONFLICT.value(), "Conflict", message);
    }

    public static <T> ResponseDto<T> badRequest(String message) {
        return new ResponseDto<>(HttpStatus.BAD_REQUEST.value(), "Bad Request", message);
    }

    public static <T> ResponseDto<T> unAuthorized(String message) {
        return new ResponseDto<>(HttpStatus.UNAUTHORIZED.value(), "Unauthorized", message);
    }

    public static <T> ResponseDto<T> forbidden(String message) {
        return new ResponseDto<>(HttpStatus.FORBIDDEN.value(), "Forbidden", message);
    }

    public static <T> ResponseDto<T> notFound(String message) {
        return new ResponseDto<>(HttpStatus.NOT_FOUND.value(), "Not found", message);
    }

    public static <T> ResponseDto<T> internalError(String message) {
        return new ResponseDto<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Internal server error", message);
    }
}
