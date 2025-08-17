# Vendor Management System

A full-stack web application to store and manage vendor information and track purchase transactions.

---

## Features

- Add, edit, delete vendor records (CRUD)  
- Upload and view vendor bills (PDF/Image format)  
- Auto-calculate pending vs. paid amounts  
- Search and filter vendors by status and name  
- View vendor payment history  
- Pagination for large vendor lists  
- Export vendor data to CSV  
- Responsive and user-friendly interface with Tailwind CSS  

---

## Tech Stack

- **Frontend:** React.js with Next.js, Tailwind CSS, TypeScript  
- **Backend:** Node.js with Express.js (REST API)  
- **Database:** PostgreSQL  
- **File Storage:** Local storage (uploads folder)  
- **Tools:** Axios, Formik + Yup, Day.js  

---

## Setup & Installation

### Prerequisites

- Node.js (v14 or higher)  
- PostgreSQL database  

### Backend Setup

1. Clone the repo:
    ```
    git clone https://github.com/yourusername/reponame.git
    cd reponame/backend
    ```

2. Install dependencies:
    ```
    npm install
    ```

3. Create a `.env` file with your PostgreSQL credentials:
    ```
    POSTGRES_USER=your_db_user
    POSTGRES_PASSWORD=your_db_password
    POSTGRES_HOST=localhost
    POSTGRES_DB=your_db_name
    POSTGRES_PORT=5432
    ```

4. Create the database table by running the following SQL in your PostgreSQL:
    ```
    CREATE TABLE vendors (
      vendor_id SERIAL PRIMARY KEY,
      vendor_name VARCHAR(100) NOT NULL,
      vendor_contact_number VARCHAR(20) NOT NULL,
      vendor_address TEXT,
      vendor_bill VARCHAR(255),
      total_amount NUMERIC(12,2) NOT NULL,
      pending_amount NUMERIC(12,2) NOT NULL,
      transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      status VARCHAR(20) NOT NULL CHECK (status IN ('Paid','Pending','Partial'))
    );
    ```

5. Start the backend server:
    ```
    npm run dev
    ```

### Frontend Setup

1. Navigate to frontend:
    ```
    cd ../frontend
    ```

2. Install dependencies:
    ```
    npm install
    ```

3. Start the frontend development server:
    ```
    npm run dev
    ```

4. Open your browser and go to `http://localhost:3000` to access the app.

---

## Usage

- Use the form to add or edit vendor records.
- Upload bills while adding or editing vendors.
- Use search and filter options to find records easily.
- Export the vendor list to CSV file.
- Navigate pages with the pagination controls.

---

## Notes

- Uploaded bills are saved locally in `/uploads` folder.
- Make sure `uploads` folder exists and is writable by the backend.
- Do not commit `.env` files to public repositories.

---

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

---

## License

This project is licensed under the MIT License.

---

## Author

Aryavarth

