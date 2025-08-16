require('dotenv').config();
const express = require("express");
const multer = require("multer");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
const port = 5000;

// Setup PostgreSQL connection pool
const pool = new Pool({
  user: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'arya@007',
  host: process.env.POSTGRES_HOST || 'localhost',
  database: process.env.POSTGRES_DB || 'vms_db',
  port: process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT) : 5432,
});

app.use(cors());
app.use(express.json());

// Multer config for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Get all vendors
app.get("/api/vendors", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM vendors ORDER BY transaction_date DESC");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching vendors:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Add a new vendor
app.post("/api/vendors", upload.single("vendor_bill"), async (req, res) => {
  const {
    vendor_name,
    vendor_contact_number,
    vendor_address,
    total_amount,
    status,
  } = req.body;

  if (!vendor_name || !vendor_contact_number || !total_amount || !status) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const billPath = req.file ? req.file.path : null;
  const pending_amount = total_amount; // pending_amount auto-calculated same as total on create

  try {
    const query = `
      INSERT INTO vendors 
      (vendor_name, vendor_contact_number, vendor_address, vendor_bill, total_amount, pending_amount, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;
    `;
    const values = [
      vendor_name,
      vendor_contact_number,
      vendor_address || "",
      billPath,
      total_amount,
      pending_amount,
      status,
    ];
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error inserting vendor:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update a vendor
app.put("/api/vendors/:id", upload.single("vendor_bill"), async (req, res) => {
  const { id } = req.params;
  const {
    vendor_name,
    vendor_contact_number,
    vendor_address,
    total_amount,
    pending_amount,
    status,
  } = req.body;

  if (!vendor_name || !vendor_contact_number || !total_amount || !status) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const billPath = req.file ? req.file.path : null;

  try {
    let query = `
      UPDATE vendors SET
      vendor_name=$1, vendor_contact_number=$2, vendor_address=$3, total_amount=$4, pending_amount=$5, status=$6
    `;
    const values = [
      vendor_name,
      vendor_contact_number,
      vendor_address || "",
      total_amount,
      pending_amount || total_amount,
      status,
    ];

    if (billPath) {
      query += ", vendor_bill=$7 WHERE vendor_id=$8 RETURNING *";
      values.push(billPath, id);
    } else {
      query += " WHERE vendor_id=$7 RETURNING *";
      values.push(id);
    }

    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Vendor not found" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating vendor:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete a vendor
app.delete("/api/vendors/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM vendors WHERE vendor_id=$1", [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Vendor not found" });
    }
    res.json({ success: true });
  } catch (error) {
    console.error("Error deleting vendor:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
