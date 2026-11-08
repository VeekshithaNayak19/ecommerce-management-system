USE ecommerce_db;

-- Create the customer booking table. Existing products and bookings are preserved.
CREATE TABLE IF NOT EXISTS bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  product_name VARCHAR(150) NOT NULL,
  customer_name VARCHAR(120) NOT NULL,
  customer_email VARCHAR(160) NOT NULL,
  customer_phone VARCHAR(25) NOT NULL,
  quantity INT NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  delivery_address VARCHAR(500) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_bookings_product_id (product_id)
);

-- Add four more products only if their names are not already present.
INSERT INTO products (name, category, price, quantity, description, image_url)
SELECT 'Floral Midi Dress', 'Clothing', 2899.00, 11, 'A graceful floral midi dress for brunches and special days.', 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=900'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Floral Midi Dress');

INSERT INTO products (name, category, price, quantity, description, image_url)
SELECT 'Classic Denim Jeans', 'Clothing', 1999.00, 18, 'A versatile denim essential with a timeless straight fit.', 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=900'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Classic Denim Jeans');

INSERT INTO products (name, category, price, quantity, description, image_url)
SELECT 'Leather Loafers', 'Shoes', 3599.00, 7, 'Polished everyday loafers with a comfortable profile.', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Leather Loafers');

INSERT INTO products (name, category, price, quantity, description, image_url)
SELECT 'Minimal Sunglasses', 'Accessories', 1499.00, 15, 'Modern sunglasses for an understated finishing touch.', 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=900'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Minimal Sunglasses');
