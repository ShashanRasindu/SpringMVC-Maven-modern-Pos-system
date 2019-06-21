package lk.ijse.dep.spring.last.controller;

import lk.ijse.dep.spring.last.dto.OrderDTO;
import lk.ijse.dep.spring.last.dto.OrderDetailDTO;
import lk.ijse.dep.spring.last.service.custom.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RequestMapping("/api/v1/oders")
@RestController
public class OrderController {
    @Autowired
    private OrderService orderService;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> getorderid(){

            String orderID = Integer.toString(orderService.generateOrderId());
        System.out.println(orderID);
            return new ResponseEntity<String>("\""+orderID+"\"",HttpStatus.CREATED);

    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> saveOrder(@RequestBody OrderDTO order){
        if (String.valueOf(order.getOrderDate()).isEmpty() || String.valueOf(order.getCustomerId()).isEmpty() || String.valueOf(order.getOrderDetails()).isEmpty()){
            return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
        }else{
            orderService.placeOrder(order);
            return new ResponseEntity<Void>(HttpStatus.CREATED);
        }
    }
}
