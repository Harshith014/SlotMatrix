import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import Card from "../../../components/ui/Card";

import Button from "../../../components/ui/Button";

import Badge from "../../../components/ui/Badge";

import {
  getBookings,
  approveBooking,
  rejectBooking,
  getSpaces,
} from "../../../api/admin.api";

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [filters, setFilters] = useState({
    status: "",
    space: "",
    date: "",
  });

  const [spaces, setSpaces] = useState([]);

  useEffect(() => {
    loadSpaces();
  }, []);

  async function loadSpaces() {
    const res = await getSpaces();

    setSpaces(res.data.data.data);
  }

  useEffect(() => {
    loadBookings();
  }, [filters]);

  async function loadBookings() {
    try {
      const res = await getBookings(filters);

      setBookings(res.data.data.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function approve(id) {
    try {
      await approveBooking(id);

      toast.success("Booking Approved");

      loadBookings();
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  }

  async function reject(id) {
    const reason = prompt("Reason for rejection");

    if (!reason) return;

    try {
      await rejectBooking(
        id,

        reason,
      );

      toast.success("Booking Rejected");

      loadBookings();
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  }

  return (
    <div>
      <h1
        className="

text-3xl

font-bold

mb-6

"
      >
        Booking Queue
      </h1>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <select
          className="border rounded p-3"
          value={filters.status}
          onChange={(e) =>
            setFilters({
              ...filters,
              status: e.target.value,
            })
          }
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <select
          className="border rounded p-3"
          value={filters.space}
          onChange={(e) =>
            setFilters({
              ...filters,
              space: e.target.value,
            })
          }
        >
          <option value="">All Spaces</option>

          {spaces.map((space) => (
            <option key={space._id} value={space._id}>
              {space.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          className="border rounded p-3"
          value={filters.date}
          onChange={(e) =>
            setFilters({
              ...filters,
              date: e.target.value,
            })
          }
        />
      </div>

      <div className="space-y-5">
        {bookings.map((booking) => (
          <Card key={booking._id}>
            <div
              className="

flex

justify-between

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

                <p>{booking.member.name}</p>

                <p>{new Date(booking.startTime).toLocaleString()}</p>
              </div>

              <div
                className="

flex

items-center

gap-3

"
              >
                <Badge>{booking.status}</Badge>

                {booking.status === "pending" && (
                  <>
                    <Button
                      variant="success"
                      onClick={() => approve(booking._id)}
                    >
                      Approve
                    </Button>

                    <Button
                      variant="danger"
                      onClick={() => reject(booking._id)}
                    >
                      Reject
                    </Button>
                  </>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Bookings;
