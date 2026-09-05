import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import { getDashboardStats } from "../services/api";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const { data } = await getDashboardStats();
        setStats(data);
      } catch (err) {
        setError("Could not load dashboard data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const cards = stats
    ? [
        { label: "Total Leads", value: stats.totalLeads, color: "card-blue" },
        { label: "New Leads", value: stats.newLeads, color: "card-purple" },
        { label: "Contacted Leads", value: stats.contactedLeads, color: "card-orange" },
        { label: "Converted Leads", value: stats.convertedLeads, color: "card-green" },
        { label: "Total Customers", value: stats.totalCustomers, color: "card-teal" },
      ]
    : [];

  return (
    <Layout>
      <div className="page-header">
        <h1>Dashboard</h1>
        <p className="page-subtitle">Overview of your leads and customers</p>
      </div>

      {loading && <Loader text="Loading dashboard..." />}
      {error && <div className="alert alert-error">{error}</div>}

      {!loading && !error && (
        <div className="cards-grid">
          {cards.map((card) => (
            <div className={`summary-card ${card.color}`} key={card.label}>
              <span className="summary-value">{card.value}</span>
              <span className="summary-label">{card.label}</span>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default Dashboard;
