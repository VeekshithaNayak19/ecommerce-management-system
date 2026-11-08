# ATELIER — Premium Fashion E-Commerce Management System

DecodeLabs Full Stack Development Project 3: Database Integration.

## Project 3 requirements covered
- Simple MySQL database schema
- CRUD: Create, Read, Update, Delete products
- Backend connected to MySQL
- Input validation and parameterized SQL queries
- Useful HTTP status codes and error messages
- Customer product bookings stored in a MySQL `bookings` table
- Stock quantity automatically reduced after a successful booking

## 1. Requirements
- Node.js installed
- XAMPP with MySQL and phpMyAdmin
- VS Code

## 2. Install
Open the project folder in VS Code. Open Terminal and run:

```bash
npm install
```

## 3. Create database
1. Start MySQL in XAMPP.
2. Open `http://localhost/phpmyadmin`.
3. Click the SQL tab.
4. Open `database.sql`, copy its contents and run it.
5. The database `ecommerce_db` and `products` table will be created with sample products.

If you already created `ecommerce_db` and a `products` table, do not run the sample INSERT statements in `database.sql` again. Back up your data first. If `image_url` is missing, run the statement in `upgrade_existing_database.sql` once. Then run `upgrade_bookings.sql` in phpMyAdmin > ecommerce_db > SQL. It creates the bookings table and adds four extra sample products without duplicating products with those names.

## 4. Configure environment
1. Rename `.env.example` to `.env` (make sure it is not `.env.txt`).
2. Open `.env`.
3. For default XAMPP MySQL, use:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=ecommerce_db
PORT=3000
```
If your MySQL root account has a password, enter it after `DB_PASSWORD=`.

## 5. Start the project
```bash
npm run dev
```
Open `http://localhost:3000`.

## 6. Test the database
Open `http://localhost:3000/api/health`. A successful response says the server and MySQL are connected.

## 7. Customer booking feature
1. Open the Shop section and hover over a product card (on touch screens, the Book Now button stays visible).
2. Click **BOOK NOW**, enter customer name, email, phone, quantity and delivery address, then confirm.
3. The booking is inserted into the MySQL `bookings` table. The product stock is reduced in the same database transaction.
4. The Product Studio area displays the saved bookings for demonstration/admin review.

The booking demo does not process online payments or create shipping labels. The admin section is not protected by a login, so this is a college project prototype and should not be deployed publicly with real customer information.

## 8. Image information
The sample product records use remote Unsplash image URLs. Internet access is needed for those photos to load. You can replace an image by entering another direct image URL in the Product Studio form.
For a fully offline version, download the photos from the links in `IMAGE_SOURCES.txt` and change the product image URLs to local paths such as `/images/blazer.jpg`.

## 9. API endpoints
- `GET /api/products` — list all products
- `GET /api/products/:id` — get one product
- `POST /api/products` — add a product
- `PUT /api/products/:id` — update a product
- `DELETE /api/products/:id` — delete a product
- `POST /api/bookings` — create a booking and reduce stock
- `GET /api/bookings` — list saved bookings

This is a student project prototype. It does not implement customer accounts, payment processing, or real order fulfilment.

## 9. Cash on Delivery and phone validation update
If you already created the `bookings` table using an earlier ZIP, open phpMyAdmin > ecommerce_db > SQL and run `upgrade_payment_mode.sql` once. Do not run it again after the `payment_mode` column exists.

The booking form accepts a 10-digit Indian mobile number beginning with 6, 7, 8 or 9. The server checks the same rule, so invalid numbers cannot be saved. Cash on Delivery is the available payment mode. After a successful booking, a confirmation message with the booking ID and total remains visible until the customer selects Continue Shopping or closes the form. The admin booking list also displays the payment mode.
