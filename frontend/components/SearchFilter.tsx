import React from "react";

interface SearchFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterStatus: string;
  setFilterStatus: (status: string) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  searchTerm,
  setSearchTerm,
  filterStatus,
  setFilterStatus,
}) => (
  <div className="flex items-center mb-4 space-x-4">
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search by name"
      className="border p-2 rounded w-40"
    />
    <select
      value={filterStatus}
      onChange={(e) => setFilterStatus(e.target.value)}
      className="border p-2 rounded"
    >
      <option value="">All Status</option>
      <option value="Paid">Paid</option>
      <option value="Pending">Pending</option>
      <option value="Partial">Partial</option>
    </select>
  </div>
);

export default SearchFilter;
