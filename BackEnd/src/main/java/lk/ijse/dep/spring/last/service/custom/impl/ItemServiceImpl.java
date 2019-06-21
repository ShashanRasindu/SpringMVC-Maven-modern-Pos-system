package lk.ijse.dep.spring.last.service.custom.impl;

import lk.ijse.dep.spring.last.repository.ItemRepository;
import lk.ijse.dep.spring.last.dto.ItemDTO;
import lk.ijse.dep.spring.last.entity.Item;
import lk.ijse.dep.spring.last.service.custom.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Transactional
@Service
public class ItemServiceImpl implements ItemService {

    @Autowired
    private ItemRepository itemRepository;

    public List<ItemDTO> getAllItems()   {
        List<ItemDTO> items = itemRepository.findAll().stream().map(item -> new ItemDTO(item.getCode(), item.getDescription(), item.getUnitPrice(), item.getQtyOnHand())).collect(Collectors.toList());
        return items;
    }

    public void saveItem(ItemDTO item)   {
        itemRepository.save(new Item(item.getCode(), item.getDescription(), item.getUnitPrice(), item.getQtyOnHand()));
    }

    public void updateItem(ItemDTO item)   {
        itemRepository.save(new Item(item.getCode(), item.getDescription(), item.getUnitPrice(), item.getQtyOnHand()));
    }

    public void deleteItem(String code)   {
        itemRepository.deleteById(code);
    }

    @Override
    public boolean isItemExists(String code) {
        return itemRepository.existsById(code);
    }

    @Override
    public ItemDTO getItemById(String code) {
        Item item = itemRepository.getOne(code);
        ItemDTO itemDTO = new ItemDTO(item.getCode(), item.getDescription(),item.getUnitPrice(),item.getQtyOnHand());
        return itemDTO;
    }

}
