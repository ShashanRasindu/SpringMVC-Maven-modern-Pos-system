package lk.ijse.dep.spring.last.dto;

public class OrderDetailDTO {

    private int orderId;
    private String itemCode;
    private int qty;
    private double itemTotalPrice;

    public OrderDetailDTO() {
    }

    public OrderDetailDTO(int orderId, String itemCode, int qty, double itemTotalPrice) {
        this.orderId = orderId;
        this.itemCode = itemCode;
        this.qty = qty;
        this.itemTotalPrice = itemTotalPrice;
    }

    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    public String getItemCode() {
        return itemCode;
    }

    public void setItemCode(String itemCode) {
        this.itemCode = itemCode;
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
        return "OrderDetailDTO{" +
                "orderId='" + orderId + '\'' +
                ", itemCode='" + itemCode + '\'' +
                ", qty=" + qty +
                ", itemTotalPrice=" + itemTotalPrice +
                '}';
    }
}
