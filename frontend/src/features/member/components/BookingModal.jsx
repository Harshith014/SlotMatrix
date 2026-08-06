import { useState } from "react";
import toast from "react-hot-toast";

import Modal from "../../../components/ui/Modal";
import Button from "../../../components/ui/Button";

import { createBooking } from "../../../api/booking.api";

function BookingModal({
  open,

  onClose,

  spaceId,

  selectedDate,

  onSuccess,
}) {
  const [startTime, setStartTime] = useState("");

  const [endTime, setEndTime] = useState("");

  const [loading, setLoading] = useState(false);

  async function submitBooking() {
    if (!selectedDate) {
      toast.error("Select a date first");

      return;
    }

    if (!startTime || !endTime) {
      toast.error("Select both start and end time");

      return;
    }

    const start = `${selectedDate}T${startTime}:00`;

    const end = `${selectedDate}T${endTime}:00`;

    try {
      setLoading(true);

      await createBooking({
        space: spaceId,

        startTime: start,

        endTime: end,
      });

      toast.success("Booking Created");

      setStartTime("");

      setEndTime("");

      onClose();

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Booking Failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal open={open} onClose={onClose}>
      <h2 className="text-2xl font-bold mb-6">Book Workspace</h2>

      <div className="space-y-4">
        <div>
          <label className="block mb-2">Start Time</label>

          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="border rounded p-3 w-full"
          />
        </div>

        <div>
          <label className="block mb-2">End Time</label>

          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="border rounded p-3 w-full"
          />
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>

          <Button onClick={submitBooking} disabled={loading}>
            {loading ? "Booking..." : "Book"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default BookingModal;
