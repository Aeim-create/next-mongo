'use client'
import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL + "/api/supplier";

const SupplierManager = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [supplierData, setSupplierData] = useState({ name: "", email: "", phoneNumber: "" });
  const [editSupplierId, setEditSupplierId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch all suppliers (GET)
  const fetchSuppliers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/supplier");
      setSuppliers(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch suppliers");
      setLoading(false);
    }
  };

  // Create a new supplier (POST)
  const createSupplier = async () => {
    try {
      setLoading(true);
      await axios.post("/api/supplier", supplierData);
      setSupplierData({ name: "", email: "", phoneNumber: "" });
      fetchSuppliers(); // Refresh the list after creation
      setLoading(false);
    } catch (err) {
      setError("Failed to create supplier");
      setLoading(false);
    }
  };

  // Update a supplier (PUT)
  const updateSupplier = async (id) => {
    try {
      setLoading(true);
      await axios.put("/api/supplier", { id, ...supplierData });
      setEditSupplierId(null);
      setSupplierData({ name: "", email: "", phoneNumber: "" });
      fetchSuppliers(); // Refresh the list after update
      setLoading(false);
    } catch (err) {
      setError("Failed to update supplier");
      setLoading(false);
    }
  };

  // Delete a supplier (DELETE)
  const deleteSupplier = async (id) => {
    try {
      setLoading(true);
      await axios.delete("/api/supplier", { data: { id } });
      fetchSuppliers(); // Refresh the list after deletion
      setLoading(false);
    } catch (err) {
      setError("Failed to delete supplier");
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    setSupplierData({
      ...supplierData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission for either create or update
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editSupplierId) {
      updateSupplier(editSupplierId);
    } else {
      createSupplier();
    }
  };

  // Load suppliers when the component mounts
  useEffect(() => {
    fetchSuppliers();
  }, []);

  return (
    <div>
      <h1>Supplier Manager</h1>

      {/* Error Message */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Supplier Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={supplierData.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={supplierData.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={supplierData.phoneNumber}
          onChange={handleInputChange}
          required
        />
        <button type="submit" disabled={loading}>
          {editSupplierId ? "Update Supplier" : "Add Supplier"}
        </button>
      </form>

      {/* Supplier List */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {suppliers.map((supplier) => (
            <li key={supplier._id}>
              {supplier.name} - {supplier.email} - {supplier.phoneNumber}
              <button
                onClick={() => {
                  setSupplierData(supplier);
                  setEditSupplierId(supplier._id);
                }}
              >
                Edit
              </button>
              <button onClick={() => deleteSupplier(supplier._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SupplierManager;
