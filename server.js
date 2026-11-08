require("dotenv").config();
const express = require("express");
const path = require("path");
const db = require("./db");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/health", async (req, res) => {
  try {
    await db.query("SELECT 1");
    res.json({ success: true, message: "Server and MySQL are connected." });
  } catch (error) {
    console.error("Database health check:", error.message);
    res.status(500).json({ success: false, message: "Database connection failed. Check .env and MySQL." });
  }
});

// READ: get all products
app.get("/api/products", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, name, category, price, quantity, description, image_url, created_at FROM products ORDER BY id DESC"
    );
    res.json(rows);
  } catch (error) {
    console.error("Get products:", error.message);
    res.status(500).json({ message: "Unable to fetch products." });
  }
});

// READ: get one product
app.get("/api/products/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) return res.status(400).json({ message: "Invalid product ID." });

  try {
    const [rows] = await db.query("SELECT * FROM products WHERE id = ?", [id]);
    if (!rows.length) return res.status(404).json({ message: "Product not found." });
    res.json(rows[0]);
  } catch (error) {
    console.error("Get product:", error.message);
    res.status(500).json({ message: "Unable to fetch product." });
  }
});

// CREATE
app.post("/api/products", async (req, res) => {
  const { name, category, price, quantity, description = "", image_url = "" } = req.body;
  const parsedPrice = Number(price);
  const parsedQuantity = Number(quantity);

  if (!name?.trim() || !category?.trim() || price === "" || quantity === "" ||
      !Number.isFinite(parsedPrice) || parsedPrice <= 0 ||
      !Number.isInteger(parsedQuantity) || parsedQuantity < 0) {
    return res.status(400).json({ message: "Enter a name, category, positive price and valid quantity." });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO products (name, category, price, quantity, description, image_url) VALUES (?, ?, ?, ?, ?, ?)",
      [name.trim(), category.trim(), parsedPrice, parsedQuantity, description.trim(), image_url.trim()]
    );
    res.status(201).json({ message: "Product added successfully.", id: result.insertId });
  } catch (error) {
    console.error("Add product:", error.message);
    res.status(500).json({ message: "Unable to add product. Check database table and fields." });
  }
});

// UPDATE
app.put("/api/products/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { name, category, price, quantity, description = "", image_url = "" } = req.body;
  const parsedPrice = Number(price);
  const parsedQuantity = Number(quantity);

  if (!Number.isInteger(id) || id < 1) return res.status(400).json({ message: "Invalid product ID." });
  if (!name?.trim() || !category?.trim() || price === "" || quantity === "" ||
      !Number.isFinite(parsedPrice) || parsedPrice <= 0 ||
      !Number.isInteger(parsedQuantity) || parsedQuantity < 0) {
    return res.status(400).json({ message: "Enter a name, category, positive price and valid quantity." });
  }

  try {
    const [result] = await db.query(
      "UPDATE products SET name=?, category=?, price=?, quantity=?, description=?, image_url=? WHERE id=?",
      [name.trim(), category.trim(), parsedPrice, parsedQuantity, description.trim(), image_url.trim(), id]
    );
    if (!result.affectedRows) return res.status(404).json({ message: "Product not found." });
    res.json({ message: "Product updated successfully." });
  } catch (error) {
    console.error("Update product:", error.message);
    res.status(500).json({ message: "Unable to update product." });
  }
});

// DELETE
app.delete("/api/products/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) return res.status(400).json({ message: "Invalid product ID." });

  try {
    const [result] = await db.query("DELETE FROM products WHERE id = ?", [id]);
    if (!result.affectedRows) return res.status(404).json({ message: "Product not found." });
    res.json({ message: "Product deleted successfully." });
  } catch (error) {
    console.error("Delete product:", error.message);
    res.status(500).json({ message: "Unable to delete product." });
  }
});



// CREATE BOOKING: save customer details and reserve available stock atomically
app.post("/api/bookings", async (req, res) => {
  const { product_id, customer_name, customer_email, customer_phone, payment_mode = "Cash on Delivery", quantity, delivery_address } = req.body;
  const productId = Number(product_id);
  const bookingQuantity = Number(quantity);
  if (!Number.isInteger(productId) || productId < 1 || !customer_name?.trim() ||
      !customer_email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer_email) ||
      !/^[6-9][0-9]{9}$/.test(String(customer_phone || "").trim()) ||
      payment_mode !== "Cash on Delivery" ||
      !Number.isInteger(bookingQuantity) || bookingQuantity < 1 || !delivery_address?.trim()) {
    return res.status(400).json({ message: "Enter valid details, a 10-digit Indian mobile number, and Cash on Delivery as the payment mode." });
  }

  let connection;
  try {
    connection = await db.getConnection();
    await connection.beginTransaction();
    const [rows] = await connection.query("SELECT id, name, price, quantity FROM products WHERE id = ? FOR UPDATE", [productId]);
    if (!rows.length) {
      await connection.rollback();
      return res.status(404).json({ message: "Product not found." });
    }
    const product = rows[0];
    if (Number(product.quantity) < bookingQuantity) {
      await connection.rollback();
      return res.status(400).json({ message: `Only ${product.quantity} item(s) are currently available.` });
    }
    const totalPrice = Number(product.price) * bookingQuantity;
    const [booking] = await connection.query(
      `INSERT INTO bookings (product_id, product_name, customer_name, customer_email, customer_phone, payment_mode, quantity, unit_price, total_price, delivery_address)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [product.id, product.name, customer_name.trim(), customer_email.trim(), customer_phone.trim(), payment_mode, bookingQuantity, product.price, totalPrice, delivery_address.trim()]
    );
    await connection.query("UPDATE products SET quantity = quantity - ? WHERE id = ?", [bookingQuantity, productId]);
    await connection.commit();
    res.status(201).json({ message: "Your product booking was saved successfully.", bookingId: booking.insertId, totalPrice });
  } catch (error) {
    if (connection) await connection.rollback();
    console.error("Create booking:", error.message);
    res.status(500).json({ message: "Unable to save booking. Please try again." });
  } finally {
    if (connection) connection.release();
  }
});

// READ BOOKINGS: admin booking list
app.get("/api/bookings", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, product_id, product_name, customer_name, customer_email, customer_phone, payment_mode, quantity, unit_price, total_price, delivery_address, created_at FROM bookings ORDER BY id DESC"
    );
    res.json(rows);
  } catch (error) {
    console.error("Get bookings:", error.message);
    res.status(500).json({ message: "Unable to fetch bookings. Make sure the bookings table exists." });
  }
});

app.listen(PORT, () => {
  console.log(`Fashion store running at http://localhost:${PORT}`);
});
