import { useEffect, useState } from "react";

import api from "../../../api/axios";

import Loader from "../../../components/ui/Loader";

import Card from "../../../components/ui/Card";

import Badge from "../../../components/ui/Badge";

import Button from "../../../components/ui/Button";

function Dashboard() {
  const [loading, setLoading] = useState(true);

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    loadBookings();
  }, []);

  async function loadBookings() {
    try {
      const res = await api.get("/bookings/my");

      setBookings(res.data.data);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  }

  async function cancelBooking(id) {
    try {
      await api.patch(`/bookings/${id}/cancel`);

      loadBookings();
    } catch (err) {
      console.log(err);
    }
  }

  if (loading) return <Loader />;

  const total = bookings.length;

  const upcoming = bookings.filter(
    (b) => new Date(b.startTime) > new Date(),
  ).length;

  const cancelled = bookings.filter((b) => b.status === "cancelled").length;

  return (
    <div>
      <h1
        className="

text-4xl

font-bold

mb-8

"
      >
        Welcome 👋
      </h1>

      <div
        className="

grid

md:grid-cols-3

gap-5

mb-8

"
      >
        <Card>
          <h2>Total Bookings</h2>

          <p
            className="

text-3xl

font-bold

"
          >
            {total}
          </p>
        </Card>

        <Card>
          <h2>Upcoming</h2>

          <p
            className="

text-3xl

font-bold

"
          >
            {upcoming}
          </p>
        </Card>

        <Card>
          <h2>Cancelled</h2>

          <p
            className="

text-3xl

font-bold

"
          >
            {cancelled}
          </p>
        </Card>
      </div>

      <div className="space-y-4">
        {bookings.map((booking) => (
          <Card key={booking._id}>
            <div
              className="

flex

justify-between

items-center

"
            >
              <div>
                <h2
                  className="

font-bold

text-xl

"
                >
                  {booking.space.name}
                </h2>

                <p>{new Date(booking.startTime).toLocaleString()}</p>
              </div>

              <div
                className="

flex

gap-3

items-center

"
              >
                <Badge>{booking.status}</Badge>

                {booking.status !== "cancelled" && (
                  <Button
                    variant="danger"
                    onClick={() => cancelBooking(booking._id)}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
