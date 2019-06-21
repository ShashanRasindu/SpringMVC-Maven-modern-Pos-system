package lk.ijse.dep.spring.last.controller;

import lk.ijse.dep.spring.last.dto.CustomerDTO;
import lk.ijse.dep.spring.last.dto.ItemDTO;
import lk.ijse.dep.spring.last.service.custom.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RequestMapping("/api/v1/items")
@RestController
public class ItemController {
    @Autowired
    private ItemService itemService;


    @GetMapping
    public List<ItemDTO> getAllItems() {
        return itemService.getAllItems();
    }

    @GetMapping(value = "/{code:I\\d{3}}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ItemDTO> getItems(@PathVariable("code") String code) {
       ItemDTO dto = null;
        if (itemService.isItemExists(code)){
            dto = itemService.getItemById(code);
        }
        return new ResponseEntity<ItemDTO>( dto, (dto != null) ? HttpStatus.OK : HttpStatus.NOT_FOUND);
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> saveItems(@RequestBody ItemDTO item){
        if (item.getDescription().isEmpty() || String.valueOf(item.getQtyOnHand()).isEmpty() || String.valueOf(item.getUnitPrice()).isEmpty()){
            return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
        }else{
             itemService.saveItem(item);
            return new ResponseEntity<Void>(HttpStatus.CREATED);
        }
    }

    @PutMapping(path = "/{code:I\\d{3}}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> updateItems(@PathVariable("code") String code, @RequestBody ItemDTO item){
        if (!itemService.isItemExists(code)){
            return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
        }
        if (item.getDescription().isEmpty() || String.valueOf(item.getQtyOnHand()).isEmpty() || String.valueOf(item.getUnitPrice()).isEmpty()){
            return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
        }else{
            item.setCode(code);
            itemService.updateItem(item);
            return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
        }
    }

    @DeleteMapping(path = "/{code:I\\d{3}}",consumes = MediaType.APPLICATION_JSON_VALUE ,produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> deleteItems(@PathVariable("code") String code){
        if (!itemService.isItemExists(code)){
            return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
        }
        itemService.deleteItem(code);
        return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
    }

}
