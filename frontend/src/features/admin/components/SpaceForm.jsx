import { useState, useEffect } from "react";

import Button from "../../../components/ui/Button";

function SpaceForm({
  initialData,

  onSubmit,

  onCancel,
}) {
  const [form, setForm] = useState({
    name: "",

    type: "desk",

    capacity: 1,

    amenities: "",

    description: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialData,

        amenities: initialData.amenities.join(","),
      });
    }
  }, [initialData]);

  function handleChange(e) {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
  }

  function submit(e) {
    e.preventDefault();

    onSubmit({
      ...form,

      capacity: Number(form.capacity),

      amenities: form.amenities
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    });
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <input
        name="name"
        placeholder="Space Name"
        value={form.name}
        onChange={handleChange}
        className="border p-3 rounded w-full"
      />

      <select
        name="type"
        value={form.type}
        onChange={handleChange}
        className="border p-3 rounded w-full"
      >
        <option value="desk">Desk</option>

        <option value="meeting-room">Meeting Room</option>
      </select>

      <input
        type="number"
        name="capacity"
        value={form.capacity}
        onChange={handleChange}
        className="border p-3 rounded w-full"
      />

      <input
        name="amenities"
        placeholder="TV, WiFi, Whiteboard"
        value={form.amenities}
        onChange={handleChange}
        className="border p-3 rounded w-full"
      />

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="border p-3 rounded w-full"
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

export default SpaceForm;
