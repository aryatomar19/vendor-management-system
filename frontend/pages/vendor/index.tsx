import React, { useState, useEffect } from "react";
import axios from "axios";
import VendorForm from "../components/VendorForm";
import VendorTable from "../components/VendorTable";
import SearchFilter from "../components/SearchFilter";
import Pagination from "../components/Pagination";
import ExportCSVButton from "../components/ExportCSVButton";

export default function HomePage() {
  const [vendors, setVendors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const vendorsPerPage = 10;

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    const res = await axios.get("http://localhost:5000/api/vendors");
    setVendors(res.data);
  };

  const handleFormSubmit = async (formData) => {
    await axios.post("http://localhost:5000/api/vendors", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    fetchVendors();
  };

  const handleEdit = (id) => {
    // your edit logic here
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/vendors/${id}`);
    fetchVendors();
  };

  // Filtering and pagination
  const filteredVendors = vendors.filter((v) =>
    v.vendor_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterStatus === "" || v.status === filterStatus)
  );
  const totalPages = Math.ceil(filteredVendors.length / vendorsPerPage);
  const indexOfLastVendor = currentPage * vendorsPerPage;
  const indexOfFirstVendor = indexOfLastVendor - vendorsPerPage;
  const currentVendors = filteredVendors.slice(indexOfFirstVendor, indexOfLastVendor);

  return (
    <div className="p-8">
      <VendorForm
        initialValues={{
          name: "",
          phone: "",
          address: "",
          total_amount: "",
          status: "",
        }}
        onSubmit={handleFormSubmit}
      />

      <SearchFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />

      <ExportCSVButton vendors={filteredVendors} />

      <VendorTable vendors={currentVendors} onEdit={handleEdit} onDelete={handleDelete} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

