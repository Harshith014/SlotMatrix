import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import { myBookings, cancelBooking } from "../../../api/booking.api";

import Card from "../../../components/ui/Card";

import Badge from "../../../components/ui/Badge";

import Button from "../../../components/ui/Button";

import Loader from "../../../components/ui/Loader";

function MyBookings() {
  const [loading, setLoading] = useState(true);

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    loadBookings();
  }, []);

  async function loadBookings() {
    try {
      const res = await myBookings();

      setBookings(res.data.data);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  }

  async function cancel(id) {
    if (!window.confirm("Cancel this booking?")) return;

    try {
      await cancelBooking(id);

      toast.success("Booking Cancelled");

      loadBookings();
    } catch (err) {
      toast.error(err.response?.data?.message || "Unable to cancel");
    }
  }

  if (loading) return <Loader />;

  return (
    <div>
      <h1
        className="

text-3xl

font-bold

mb-6

"
      >
        My Bookings
      </h1>

      <div className="space-y-5">
        {bookings.length === 0 && <p>No Bookings Yet</p>}

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

text-xl

font-bold

"
                >
                  {booking.space.name}
                </h2>

                <p>{booking.space.type}</p>

                <p>{new Date(booking.startTime).toLocaleString()}</p>

                <p>{new Date(booking.endTime).toLocaleString()}</p>
              </div>

              <div
                className="

flex

gap-3

items-center

"
              >
                <Badge>{booking.status}</Badge>

                {(booking.status === "pending" ||
                  booking.status === "approved") &&
                  new Date(booking.startTime) > new Date() && (
                    <Button
                      variant="danger"
                      onClick={() => cancel(booking._id)}
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

export default MyBookings;
