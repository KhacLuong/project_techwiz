package com.techwiz.techwizbe.controllers;

import com.techwiz.techwizbe.command.OrderRequest;
import com.techwiz.techwizbe.services.interfaces.IOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/orders")
@RequiredArgsConstructor
public class OrderController {
    private final IOrderService orderService;

    @GetMapping("")
    public ResponseEntity<?> index(
            @RequestParam(value = "pageNumber") int pageNumber,
            @RequestParam(value = "perPage") int perPage,
            @RequestParam(value = "sortField", defaultValue = "updatedAt") String sortField,
            @RequestParam(value = "sortDir", defaultValue = "desc") String sortDir
    ) {
        var data = orderService.getListOrder(pageNumber, perPage, sortField, sortDir);
        return new ResponseEntity<>(
                data,
                HttpStatusCode.valueOf(data.getCode())
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> detailsById(@PathVariable(name = "id") long id) {
        var data = orderService.getOrderById(id);
        return new ResponseEntity<>(
                data,
                HttpStatusCode.valueOf(data.getCode())
        );
    }

    @GetMapping("/users/{userId}")
    public ResponseEntity<?> detailsByUserId(@PathVariable(name = "userId") long userId) {
        var data = orderService.getOrderByUserId(userId);
        return new ResponseEntity<>(
                data,
                HttpStatusCode.valueOf(data.getCode())
        );
    }

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody OrderRequest request) {
        var data = orderService.createNewOrder(request);
        return new ResponseEntity<>(
                data,
                HttpStatusCode.valueOf(data.getCode())
        );
    }

    @PutMapping("/paid/{orderId}")
    public ResponseEntity<?> paid(@PathVariable(value = "orderId") long orderId) {
        var data = orderService.paidOrder(orderId);
        return new ResponseEntity<>(
                data,
                HttpStatusCode.valueOf(data.getCode())
        );
    }
}
