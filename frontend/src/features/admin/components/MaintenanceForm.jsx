import { useEffect, useState } from "react";

import Button from "../../../components/ui/Button";

import { getSpaces } from "../../../api/admin.api";

function MaintenanceForm({
  onSubmit,

  onCancel,
}) {
  const [spaces, setSpaces] = useState([]);

  const [form, setForm] = useState({
    space: "",

    date: "",

    startTime: "",

    endTime: "",

    reason: "",
  });

  useEffect(() => {
    loadSpaces();
  }, []);

  async function loadSpaces() {
    const res = await getSpaces();

    setSpaces(res.data.data.data);
  }

  function submit(e) {
    e.preventDefault();

    onSubmit({
      space: form.space,

      startTime: `${form.date}T${form.startTime}:00`,

      endTime: `${form.date}T${form.endTime}:00`,

      reason: form.reason,
    });
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <select
        className="border p-3 rounded w-full"
        value={form.space}
        onChange={(e) =>
          setForm({
            ...form,

            space: e.target.value,
          })
        }
      >
        <option value="">Select Space</option>

        {spaces.map((space) => (
          <option key={space._id} value={space._id}>
            {space.name}
          </option>
        ))}
      </select>

      <input
        type="date"
        className="border p-3 rounded w-full"
        onChange={(e) =>
          setForm({
            ...form,

            date: e.target.value,
          })
        }
      />

      <input
        type="time"
        className="border p-3 rounded w-full"
        onChange={(e) =>
          setForm({
            ...form,

            startTime: e.target.value,
          })
        }
      />

      <input
        type="time"
        className="border p-3 rounded w-full"
        onChange={(e) =>
          setForm({
            ...form,

            endTime: e.target.value,
          })
        }
      />

      <textarea
        placeholder="Reason"
        className="border p-3 rounded w-full"
        onChange={(e) =>
          setForm({
            ...form,

            reason: e.target.value,
          })
        }
      />

      <div className="flex gap-3">
        <Button type="submit">Save</Button>

        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

export default MaintenanceForm;
