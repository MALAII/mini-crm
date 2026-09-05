import React, { useEffect, useState, useCallback } from "react";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import Alert from "../components/Alert";
import ConfirmModal from "../components/ConfirmModal";
import CustomerFormModal from "../components/CustomerFormModal";
import {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../services/api";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);

  const [confirmDelete, setConfirmDelete] = useState(null);
  const [alert, setAlert] = useState({ type: "success", message: "" });

  const showAlert = (type, message) => setAlert({ type, message });

  const fetchCustomers = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await getCustomers({ search: search || undefined });
      setCustomers(data);
    } catch (err) {
      showAlert("error", "Could not load customers.");
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCustomers();
    }, 300);
    return () => clearTimeout(timer);
  }, [fetchCustomers]);

  const openAddForm = () => {
    setEditingCustomer(null);
    setShowForm(true);
  };

  const openEditForm = (customer) => {
    setEditingCustomer(customer);
    setShowForm(true);
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editingCustomer) {
        await updateCustomer(editingCustomer._id, formData);
        showAlert("success", "Customer updated successfully");
      } else {
        await createCustomer(formData);
        showAlert("success", "Customer added successfully");
      }
      setShowForm(false);
      setEditingCustomer(null);
      fetchCustomers();
    } catch (err) {
      showAlert("error", err.response?.data?.message || "Error occurred while saving customer");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteCustomer(confirmDelete);
      showAlert("success", "Customer deleted successfully");
      setConfirmDelete(null);
      fetchCustomers();
    } catch (err) {
      showAlert("error", "Error occurred while deleting customer");
    }
  };

  return (
    <Layout>
      <div className="page-header">
        <h1>Customers</h1>
        <button className="btn btn-primary" onClick={openAddForm}>
          + Add Customer
        </button>
      </div>

      <Alert
        type={alert.type}
        message={alert.message}
        onClose={() => setAlert({ ...alert, message: "" })}
      />

      <div className="toolbar">
        <input
          className="search-input"
          placeholder="Search by name, email or company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <Loader text="Loading customers..." />
      ) : (
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Company</th>
                <th>Address</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.length === 0 && (
                <tr>
                  <td colSpan="7" className="empty-row">
                    No customers found.
                  </td>
                </tr>
              )}
              {customers.map((customer) => (
                <tr key={customer._id}>
                  <td data-label="Name">{customer.name}</td>
                  <td data-label="Email">{customer.email}</td>
                  <td data-label="Phone">{customer.phone}</td>
                  <td data-label="Company">{customer.company || "-"}</td>
                  <td data-label="Address">{customer.address || "-"}</td>
                  <td data-label="Created">
                    {new Date(customer.createdAt).toLocaleDateString()}
                  </td>
                  <td data-label="Actions" className="actions-cell">
                    <button className="btn-link" onClick={() => openEditForm(customer)}>
                      Edit
                    </button>
                    <button
                      className="btn-link btn-link-danger"
                      onClick={() => setConfirmDelete(customer._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <CustomerFormModal
        show={showForm}
        initialData={editingCustomer}
        onClose={() => {
          setShowForm(false);
          setEditingCustomer(null);
        }}
        onSubmit={handleFormSubmit}
      />

      <ConfirmModal
        show={!!confirmDelete}
        title="Delete Customer"
        message="Are you sure you want to delete this customer? This action cannot be undone."
        onCancel={() => setConfirmDelete(null)}
        onConfirm={handleDelete}
      />
    </Layout>
  );
};

export default Customers;
