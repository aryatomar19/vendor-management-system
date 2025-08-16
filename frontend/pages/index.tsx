import React, { useState, useEffect } from "react";
import axios from "axios";
import VendorForm from "../components/VendorForm";
import VendorTable from "../components/VendorTable";
import SearchFilter from "../components/SearchFilter";
import Pagination from "../components/Pagination";
import ExportCSVButton from "../components/ExportCSVButton";

const HomePage = () => {
  const [vendors, setVendors] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingVendor, setEditingVendor] = useState(null);
  const vendorsPerPage = 10;

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/vendors");
      setVendors(res.data);
    } catch {
      alert("Failed to load vendors.");
      setVendors([]);
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editingVendor) {
        // Update existing vendor (PUT)
        await axios.put(`http://localhost:5000/api/vendors/${editingVendor.vendor_id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setEditingVendor(null);
      } else {
        // Add new vendor (POST)
        await axios.post("http://localhost:5000/api/vendors", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      await fetchVendors();
    } catch {
      alert("Failed to save vendor.");
    }
  };

  const handleEdit = (id) => {
    const vendor = vendors.find((v) => v.vendor_id === id);
    if (vendor) {
      setEditingVendor({
        vendor_id: vendor.vendor_id,
        name: vendor.vendor_name,
        phone: vendor.vendor_contact_number,
        address: vendor.vendor_address,
        total_amount: vendor.total_amount,
        status: vendor.status,
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/vendors/${id}`);
      await fetchVendors();
      // If deleting vendor being edited, reset form
      if (editingVendor && editingVendor.vendor_id === id) {
        setEditingVendor(null);
      }
    } catch {
      alert("Failed to delete vendor.");
    }
  };

  if (vendors === null) {
    return (
      <div className="p-8 text-center text-gray-600 font-sans min-h-screen bg-gray-50">
        Loading vendors...
      </div>
    );
  }

  // Filter vendors by searchTerm and filterStatus
  const filteredVendors = vendors.filter(
    (v) =>
      (v.vendor_name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) &&
      (filterStatus === "" || (v.status || "") === filterStatus)
  );

  const totalPages = Math.ceil(filteredVendors.length / vendorsPerPage);
  const indexOfLastVendor = currentPage * vendorsPerPage;
  const indexOfFirstVendor = indexOfLastVendor - vendorsPerPage;
  const currentVendors = filteredVendors.slice(indexOfFirstVendor, indexOfLastVendor);

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen font-sans">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Vendor Management System</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <VendorForm
          initialValues={
            editingVendor || {
              name: "",
              phone: "",
              address: "",
              total_amount: "",
              status: "",
            }
          }
          onSubmit={handleFormSubmit}
          onCancel={() => setEditingVendor(null)}
        />
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 space-y-4 md:space-y-0">
        <SearchFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
        />
        <ExportCSVButton vendors={filteredVendors} />
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <VendorTable vendors={currentVendors} onEdit={handleEdit} onDelete={handleDelete} />
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
};

export default HomePage;
