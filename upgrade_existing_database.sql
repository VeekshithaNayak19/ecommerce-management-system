USE ecommerce_db;

-- Run this only if the products table does NOT already contain image_url.
ALTER TABLE products ADD COLUMN image_url TEXT;
