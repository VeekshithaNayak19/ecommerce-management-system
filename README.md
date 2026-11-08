# ATELIER – Premium Fashion E-Commerce Management System

**DecodeLabs Full Stack Development – Project 3: Database Integration**

## About the Project

ATELIER is a premium fashion e-commerce website developed as part of the DecodeLabs Full Stack Development Project 3.

The application allows customers to browse fashion products, view product details, book products, and select Cash on Delivery as their payment method.

The project uses MySQL to store product and customer booking information permanently.

## Technologies Used

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **Database Management:** XAMPP, phpMyAdmin
- **Development Tool:** Visual Studio Code

## Features

- Premium fashion-style user interface
- Responsive product display
- Product hover effects
- Product browsing and booking
- Customer information form
- Customer phone number validation
- Cash on Delivery payment option
- Booking confirmation message
- Automatic stock quantity update
- Customer booking details stored in MySQL
- Product management using CRUD operations

## Project 3 Requirements

This project demonstrates the following database integration concepts:

- Database schema design
- MySQL database connection
- Create, Read, Update and Delete (CRUD) operations
- Backend and database integration
- Data validation
- Permanent data storage

## Project Structure

```text
ecommerce-management-system/
│
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── server.js
├── db.js
├── database.sql
├── upgrade_bookings.sql
├── upgrade_payment_mode.sql
├── package.json
├── .env.example
└── README.md
```

## Installation and Setup

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Open the Project

```bash
cd ecommerce-management-system
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Create the Database

1. Start Apache and MySQL in XAMPP.
2. Open phpMyAdmin.
3. Open the SQL tab.
4. Import or execute the `database.sql` file.
5. Run the required upgrade SQL files if necessary.

### 5. Configure Environment Variables

Rename `.env.example` to `.env`.

Add your MySQL configuration:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=ecommerce_db
PORT=3000
```

### 6. Run the Application

```bash
npm run dev
```

Open your browser:

```text
http://localhost:3000
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/products | Get all products |
| GET | /api/products/:id | Get a product |
| POST | /api/products | Add a product |
| PUT | /api/products/:id | Update a product |
| DELETE | /api/products/:id | Delete a product |
| POST | /api/bookings | Create a booking |
| GET | /api/bookings | Get all bookings |

## Future Enhancements
- Customer authentication and registration
- Online payment gateway integration
- Order tracking
- Admin dashboard with authentication
- Product reviews and ratings



## Author
**Veekshitha Nayak**
Master of Computer Applications (MCA)  
Manipal Institute of Technology  
Manipal Academy of Higher Education (MAHE)

---

**Project:** Full Stack Development – Project 3  
**Organization:** DecodeLabs  
**Year:** 2026
