CREATE TABLE vendors (
  vendor_id SERIAL PRIMARY KEY,
  vendor_name VARCHAR(255) NOT NULL,
  vendor_contact_number VARCHAR(15) NOT NULL,
  vendor_address TEXT,
  vendor_bill VARCHAR(255), -- filepath to uploaded bill
  total_amount NUMERIC(12,2) NOT NULL,
  pending_amount NUMERIC(12,2) NOT NULL DEFAULT 0,
  transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(20) NOT NULL CHECK (status IN ('Paid', 'Pending', 'Partial')) DEFAULT 'Pending'
);

-- Optional indexes for better performance
CREATE INDEX idx_vendor_status ON vendors (status);
CREATE INDEX idx_vendor_name ON vendors (vendor_name);
