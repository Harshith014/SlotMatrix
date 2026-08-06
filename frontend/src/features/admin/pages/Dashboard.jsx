import { useEffect, useState } from "react";

import Card from "../../../components/ui/Card";

import Loader from "../../../components/ui/Loader";

import { getSpaces, getBookings } from "../../../api/admin.api";

function AdminDashboard() {
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    spaces: 0,

    pending: 0,

    approved: 0,

    rejected: 0,
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const [spacesRes, bookingsRes] = await Promise.all([
        getSpaces(),

        getBookings(),
      ]);

      const bookings = bookingsRes.data.data.data;

      setStats({
        spaces: spacesRes.data.data.total,

        pending: bookings.filter((b) => b.status === "pending").length,

        approved: bookings.filter((b) => b.status === "approved").length,

        rejected: bookings.filter((b) => b.status === "rejected").length,
      });
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <h2>Total Spaces</h2>

          <p className="text-4xl font-bold mt-3">{stats.spaces}</p>
        </Card>

        <Card>
          <h2>Pending</h2>

          <p className="text-4xl font-bold mt-3">{stats.pending}</p>
        </Card>

        <Card>
          <h2>Approved</h2>

          <p className="text-4xl font-bold mt-3">{stats.approved}</p>
        </Card>

        <Card>
          <h2>Rejected</h2>

          <p className="text-4xl font-bold mt-3">{stats.rejected}</p>
        </Card>
      </div>
    </div>
  );
}

export default AdminDashboard;
