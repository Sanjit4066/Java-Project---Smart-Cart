package models;

import java.util.ArrayList;
import java.util.List;

public class Cart {
    private List<CartItem> items = new ArrayList<>();

    public void addItem(Product product, int qty) {
        items.add(new CartItem(product, qty));
    }

    public List<CartItem> getItems() {
        return items;
    }

    public double getTotalAmount() {
        return items.stream().mapToDouble(CartItem::getTotal).sum();
    }

    public void clearCart() {
        items.clear();
    }
}
