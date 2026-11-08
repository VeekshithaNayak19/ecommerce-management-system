CREATE DATABASE IF NOT EXISTS ecommerce_db;
USE ecommerce_db;

CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  category VARCHAR(80) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  quantity INT NOT NULL DEFAULT 0,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample products. Run these INSERT statements once only.
INSERT INTO products (name, category, price, quantity, description, image_url) VALUES
('Linen Blend Blazer', 'Clothing', 3499.00, 12, 'A relaxed tailored blazer crafted for effortless everyday styling.', 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=900'),
('Classic Leather Handbag', 'Bags', 4299.00, 8, 'A timeless structured handbag with a refined silhouette.', 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=900'),
('Minimal White Sneakers', 'Shoes', 2799.00, 20, 'Clean everyday sneakers designed for comfort and versatility.', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900'),
('Everyday Gold Watch', 'Accessories', 5199.00, 6, 'An elegant watch that adds a subtle statement to any look.', 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=900'),
('Soft Knit Sweater', 'Clothing', 2399.00, 14, 'A soft knit layer for a polished, comfortable look.', 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=900'),
('City Shoulder Bag', 'Bags', 3199.00, 9, 'A versatile shoulder bag for day-to-evening styling.', 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=900'),
('Floral Midi Dress', 'Clothing', 2899.00, 11, 'A graceful floral midi dress for brunches and special days.', 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=900'),
('Classic Denim Jeans', 'Clothing', 1999.00, 18, 'A versatile denim essential with a timeless straight fit.', 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=900'),
('Leather Loafers', 'Shoes', 3599.00, 7, 'Polished everyday loafers with a comfortable profile.', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900'),
('Minimal Sunglasses', 'Accessories', 1499.00, 15, 'Modern sunglasses for an understated finishing touch.', 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=900');


-- Customer product bookings. Each confirmed booking is stored here.
CREATE TABLE IF NOT EXISTS bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  product_name VARCHAR(150) NOT NULL,
  customer_name VARCHAR(120) NOT NULL,
  customer_email VARCHAR(160) NOT NULL,
  customer_phone VARCHAR(25) NOT NULL,
  payment_mode VARCHAR(30) NOT NULL DEFAULT 'Cash on Delivery',
  quantity INT NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  delivery_address VARCHAR(500) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_bookings_product_id (product_id)
);
