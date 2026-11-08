USE ecommerce_db;

-- Run this statement only once if the bookings table already exists
-- and does not yet have the payment_mode column.
ALTER TABLE bookings
ADD COLUMN payment_mode VARCHAR(30) NOT NULL DEFAULT 'Cash on Delivery' AFTER customer_phone;
