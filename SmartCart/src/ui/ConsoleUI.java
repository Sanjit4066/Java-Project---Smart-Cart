package ui;

import models.CartItem;
import models.Product;
import services.CartService;
import services.ProductService;

import java.util.List;
import java.util.Scanner;

public class ConsoleUI {

    ProductService productService = new ProductService();
    CartService cartService = new CartService();
    Scanner sc = new Scanner(System.in);

    public void start() {

        while (true) {
            System.out.println("\n===== SMART SHOPPING CART =====");
            System.out.println("1. View Products");
            System.out.println("2. Add to Cart");
            System.out.println("3. View Cart");
            System.out.println("4. Checkout");
            System.out.println("5. Exit");
            System.out.print("Choose: ");

            int choice = sc.nextInt();

            switch (choice) {
                case 1 -> showProducts();
                case 2 -> addToCart();
                case 3 -> viewCart();
                case 4 -> checkout();
                case 5 -> System.exit(0);
                default -> System.out.println("Invalid option!");
            }
        }
    }

    private void showProducts() {
        List<Product> list = productService.getAllProducts();
        System.out.println("\n--- Product List ---");
        list.forEach(System.out::println);
    }

    private void addToCart() {
        System.out.print("\nEnter Product ID: ");
        int id = sc.nextInt();
        Product p = productService.getProductById(id);

        if (p == null) {
            System.out.println("Product not found!");
            return;
        }

        System.out.print("Enter Quantity: ");
        int qty = sc.nextInt();

        cartService.addToCart(p, qty);
        System.out.println("Added to cart!");
    }

    private void viewCart() {
        System.out.println("\n--- Your Cart ---");
        for (CartItem item : cartService.getCart().getItems()) {
            System.out.println(
                    item.getProduct().getName() + " x " + item.getQuantity() +
                            " = ₹" + item.getTotal()
            );
        }
        System.out.println("Total: ₹" +
                cartService.getCart().getTotalAmount());
    }

    private void checkout() {
        System.out.println("\nCheckout Amount: ₹" +
                cartService.getCart().getTotalAmount());

        System.out.println("Thank you for shopping!");

        cartService.clearCart();
    }
}
