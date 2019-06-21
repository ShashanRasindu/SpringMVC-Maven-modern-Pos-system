package lk.ijse.dep.spring.last.entity;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class OrderDetail extends SuperEntity{

    @EmbeddedId
    private OrderDetailPK orderDetailPK;
    private int qty;
    private double itemTotalPrice;

    @ManyToOne
    @JoinColumn(name="orderId", referencedColumnName = "id",insertable = false,updatable = false)
    private Order order;
    @ManyToOne
    @JoinColumn(name="itemCode",referencedColumnName = "code",insertable = false, updatable = false)
    private Item item;

    public OrderDetail() {
    }

    public OrderDetail(OrderDetailPK orderDetailPK, int qty, double itemTotalPrice) {
        this.orderDetailPK = orderDetailPK;
        this.qty = qty;
        this.itemTotalPrice = itemTotalPrice;
    }

    public OrderDetail(int orderId, String itemCode, int qty, double itemTotalPrice){
        this.orderDetailPK = new OrderDetailPK(orderId, itemCode);
        this.qty = qty;
        this.itemTotalPrice = itemTotalPrice;
    }

    public OrderDetailPK getOrderDetailPK() {
        return orderDetailPK;
    }

    public void setOrderDetailPK(OrderDetailPK orderDetailPK) {
        this.orderDetailPK = orderDetailPK;
    }

    public int getQty() {
        return qty;
    }

    public void setQty(int qty) {
        this.qty = qty;
    }

    public double getUnitPrice() {
        return itemTotalPrice;
    }

    public void setUnitPrice(double itemTotalPrice) {
        this.itemTotalPrice = itemTotalPrice;
    }

    @Override
    public String toString() {
        return "OrderDetail{" +
                "orderDetailPK=" + orderDetailPK +
                ", qty=" + qty +
                ", itemTotalPrice=" + itemTotalPrice +
                '}';
    }

    public Order getOrder() {
        return order;
    }

    public Item getItem() {
        return item;
    }
}
