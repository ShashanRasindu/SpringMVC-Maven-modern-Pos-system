package lk.ijse.dep.spring.last.service.custom;

import lk.ijse.dep.spring.last.dto.ItemDTO;
import lk.ijse.dep.spring.last.service.SuperService;

import java.util.List;

public interface ItemService extends SuperService {

    List<ItemDTO> getAllItems();

    void saveItem(ItemDTO item);

    void updateItem(ItemDTO item);

    void deleteItem(String code);

    boolean isItemExists(String id);

    ItemDTO getItemById(String code);

}
