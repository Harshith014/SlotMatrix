import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { fetchAvailability, fetchSpace } from "../../../api/space.api";
import BookingModal from "../../member/components/BookingModal";
import Loader from "../../../components/ui/Loader";
import Button from "../../../components/ui/Button";
import Badge from "../../../components/ui/Badge";
import Card from "../../../components/ui/Card";

function SpaceDetails() {
  const { id } = useParams();

  const [space, setSpace] = useState(null);

  const [availability, setAvailability] = useState([]);

  const [date, setDate] = useState("");
  const [openBooking, setOpenBooking] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSpace();
  }, []);

  useEffect(() => {
    if (date) {
      loadAvailability();
    }
  }, [date]);

  async function loadSpace() {
    try {
      const res = await fetchSpace(id);

      setSpace(res.data.data);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  }

  async function loadAvailability() {
    try {
      const res = await fetchAvailability(id, date);

      setAvailability(res.data.data.bookings || []);
    } catch (err) {
      console.log(err);
    }
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="space-y-8">
      <Card>
        <h1 className="text-4xl font-bold">{space.name}</h1>

        <p className="mt-4">{space.description}</p>

        <div className="mt-4">
          <strong>Capacity:</strong> {space.capacity}
        </div>

        <div className="mt-4 flex gap-2 flex-wrap">
          {space.amenities.map((item) => (
            <Badge key={item} color="gray">
              {item}
            </Badge>
          ))}
        </div>
      </Card>

      <Card>
        <h2 className="text-2xl font-semibold mb-4">Check Availability</h2>

        <input
          type="date"
          className="border rounded p-3"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </Card>

      {date && (
        <Card>
          <h2 className="text-xl font-semibold mb-4">Existing Bookings</h2>

          {availability.length === 0 ? (
            <p>No bookings for this date.</p>
          ) : (
            availability.map((item) => (
              <div key={item._id} className="border rounded p-3 mb-3">
                <div>
                  <strong>Status:</strong> <Badge>{item.status}</Badge>
                </div>

                <div className="mt-2">
                  {new Date(item.startTime).toLocaleTimeString()}

                  {" - "}

                  {new Date(item.endTime).toLocaleTimeString()}
                </div>
              </div>
            ))
          )}
        </Card>
      )}

      <Button
        onClick={() => {
          if (!date) {
            alert("Please select a date first.");

            return;
          }

          setOpenBooking(true);
        }}
      >
        Book This Space
      </Button>
      <BookingModal
        open={openBooking}
        onClose={() => setOpenBooking(false)}
        spaceId={space._id}
        selectedDate={date}
        onSuccess={loadAvailability}
      />
    </div>
  );
}

export default SpaceDetails;
