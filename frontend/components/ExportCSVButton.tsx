import React from "react";
import { CSVLink } from "react-csv";

interface ExportCSVButtonProps {
  vendors: any[];
}

const headers = [
  { label: "Vendor Name", key: "vendor_name" },
  { label: "Phone", key: "vendor_contact_number" },
  { label: "Address", key: "vendor_address" },
  { label: "Total Amount", key: "total_amount" },
  { label: "Status", key: "status" },
];

const ExportCSVButton: React.FC<ExportCSVButtonProps> = ({ vendors }) => (
  <CSVLink
    data={vendors}
    headers={headers}
    filename="vendors.csv"
    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
  >
    Export CSV
  </CSVLink>
);

export default ExportCSVButton;

