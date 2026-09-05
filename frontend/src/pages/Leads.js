import React, { useEffect, useState, useCallback } from "react";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import Alert from "../components/Alert";
import ConfirmModal from "../components/ConfirmModal";
import LeadFormModal from "../components/LeadFormModal";
import {
  getLeads,
  createLead,
  updateLead,
  deleteLead,
  convertLead,
} from "../services/api";

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const [showForm, setShowForm] = useState(false);
  const [editingLead, setEditingLead] = useState(null);

  const [confirmDelete, setConfirmDelete] = useState(null); // lead id pending deletion
  const [alert, setAlert] = useState({ type: "success", message: "" });

  const showAlert = (type, message) => setAlert({ type, message });

  const fetchLeads = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await getLeads({
        search: search || undefined,
        status: status !== "All" ? status : undefined,
      });
      setLeads(data);
    } catch (err) {
      showAlert("error", "Could not load leads.");
    } finally {
      setLoading(false);
    }
  }, [search, status]);

  useEffect(() => {
    // Debounce search a little so we don't hit the API on every keystroke
    const timer = setTimeout(() => {
      fetchLeads();
    }, 300);
    return () => clearTimeout(timer);
  }, [fetchLeads]);

  const openAddForm = () => {
    setEditingLead(null);
    setShowForm(true);
  };

  const openEditForm = (lead) => {
    setEditingLead(lead);
    setShowForm(true);
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editingLead) {
        await updateLead(editingLead._id, formData);
        showAlert("success", "Lead updated successfully");
      } else {
        await createLead(formData);
        showAlert("success", "Lead added successfully");
      }
      setShowForm(false);
      setEditingLead(null);
      fetchLeads();
    } catch (err) {
      showAlert("error", err.response?.data?.message || "Error occurred while saving lead");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteLead(confirmDelete);
      showAlert("success", "Lead deleted successfully");
      setConfirmDelete(null);
      fetchLeads();
    } catch (err) {
      showAlert("error", "Error occurred while deleting lead");
    }
  };

  const handleConvert = async (lead) => {
    try {
      await convertLead(lead._id);
      showAlert("success", `${lead.name} was converted into a customer`);
      fetchLeads();
    } catch (err) {
      showAlert("error", err.response?.data?.message || "Error occurred during conversion");
    }
  };

  return (
    <Layout>
      <div className="page-header">
        <h1>Leads</h1>
        <button className="btn btn-primary" onClick={openAddForm}>
          + Add Lead
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
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="All">All Statuses</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Converted">Converted</option>
        </select>
      </div>

      {loading ? (
        <Loader text="Loading leads..." />
      ) : (
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Company</th>
                <th>Status</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.length === 0 && (
                <tr>
                  <td colSpan="7" className="empty-row">
                    No leads found.
                  </td>
                </tr>
              )}
              {leads.map((lead) => (
                <tr key={lead._id}>
                  <td data-label="Name">{lead.name}</td>
                  <td data-label="Email">{lead.email}</td>
                  <td data-label="Phone">{lead.phone}</td>
                  <td data-label="Company">{lead.company || "-"}</td>
                  <td data-label="Status">
                    <span className={`status-badge status-${lead.status.toLowerCase()}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td data-label="Created">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </td>
                  <td data-label="Actions" className="actions-cell">
                    <button className="btn-link" onClick={() => openEditForm(lead)}>
                      Edit
                    </button>
                    <button
                      className="btn-link btn-link-danger"
                      onClick={() => setConfirmDelete(lead._id)}
                    >
                      Delete
                    </button>
                    {lead.status === "Converted" && !lead.convertedToCustomer && (
                      <button
                        className="btn-link btn-link-success"
                        onClick={() => handleConvert(lead)}
                      >
                        Convert
                      </button>
                    )}
                    {lead.convertedToCustomer && (
                      <span className="converted-tag">Converted ✓</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <LeadFormModal
        show={showForm}
        initialData={editingLead}
        onClose={() => {
          setShowForm(false);
          setEditingLead(null);
        }}
        onSubmit={handleFormSubmit}
      />

      <ConfirmModal
        show={!!confirmDelete}
        title="Delete Lead"
        message="Are you sure you want to delete this lead? This action cannot be undone."
        onCancel={() => setConfirmDelete(null)}
        onConfirm={handleDelete}
      />
    </Layout>
  );
};

export default Leads;
