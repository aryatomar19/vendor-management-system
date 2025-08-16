import React from "react";

interface Vendor {
  vendor_id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  transaction_date?: string;
  total_amount?: number;
  status?: string;
  vendor_bill?: string;
}

interface VendorTableProps {
  vendors: Vendor[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const VendorTable: React.FC<VendorTableProps> = ({ vendors, onEdit, onDelete }) => {
  return (
    <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
      <thead>
        <tr className="bg-blue-50 text-blue-800">
          <th className="px-4 py-3 text-left font-semibold">Name</th>
          <th className="px-4 py-3 text-left font-semibold">Email</th>
          <th className="px-4 py-3 text-left font-semibold">Phone</th>
          <th className="px-4 py-3 text-left font-semibold">Address</th>
          <th className="px-4 py-3 text-left font-semibold">Date</th>
          <th className="px-4 py-3 text-left font-semibold">Amount</th>
          <th className="px-4 py-3 text-left font-semibold">Status</th>
          <th className="px-4 py-3 text-left font-semibold">Bill</th>
          <th className="px-4 py-3 text-left font-semibold">Actions</th>
        </tr>
      </thead>
      <tbody>
        {vendors.length === 0 ? (
          <tr>
            <td colSpan={9} className="text-center py-6 text-gray-500">
              No vendors found.
            </td>
          </tr>
        ) : (
          vendors.map((vendor) => (
            <tr key={vendor.vendor_id} className="border-b even:bg-gray-50 hover:bg-blue-50 transition">
              <td className="px-4 py-3">{vendor.name}</td>
              <td className="px-4 py-3">{vendor.email}</td>
              <td className="px-4 py-3">{vendor.phone}</td>
              <td className="px-4 py-3">{vendor.address}</td>
              <td className="px-4 py-3">{vendor.transaction_date ? new Date(vendor.transaction_date).toLocaleDateString() : "-"}</td>
              <td className="px-4 py-3">{vendor.total_amount ? `₹${vendor.total_amount}` : "-"}</td>
              <td className="px-4 py-3">{vendor.status}</td>
              <td className="px-4 py-3">
                {vendor.vendor_bill ? (
                  <a
                    href={`http://localhost:5000/${vendor.vendor_bill}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    View Bill
                  </a>
                ) : (
                  "No Bill"
                )}
              </td>
              <td className="px-4 py-3 space-x-2">
                <button
                  onClick={() => onEdit(vendor.vendor_id)}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200 transition font-semibold"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => onDelete(vendor.vendor_id)}
                  className="bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200 transition font-semibold"
                >
                  🗑️ Delete
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default VendorTable;
