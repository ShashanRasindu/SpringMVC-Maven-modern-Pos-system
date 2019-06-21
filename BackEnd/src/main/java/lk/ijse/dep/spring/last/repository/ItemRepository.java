package lk.ijse.dep.spring.last.repository;

import lk.ijse.dep.spring.last.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, String> {

}
