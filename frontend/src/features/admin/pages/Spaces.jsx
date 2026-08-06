import { useEffect, useState } from "react";

import {
  getSpaces,
  createSpace,
  updateSpace,
  deleteSpace,
} from "../../../api/admin.api";

import Card from "../../../components/ui/Card";

import Button from "../../../components/ui/Button";

import Modal from "../../../components/ui/Modal";

import SpaceForm from "../components/SpaceForm";

import toast from "react-hot-toast";

function Spaces() {
  const [spaces, setSpaces] = useState([]);

  const [open, setOpen] = useState(false);

  const [selected, setSelected] = useState(null);

  useEffect(() => {
    loadSpaces();
  }, []);

  async function loadSpaces() {
    try {
      const res = await getSpaces();

      setSpaces(res.data.data.data);
    } catch (err) {
      console.log(err);
    }
  }

  function addSpace() {
    setSelected(null);

    setOpen(true);
  }

  function editSpace(space) {
    setSelected(space);

    setOpen(true);
  }

  async function saveSpace(data) {
    try {
      if (selected) {
        await updateSpace(selected._id, data);

        toast.success("Space Updated");
      } else {
        await createSpace(data);

        toast.success("Space Created");
      }

      setOpen(false);

      loadSpaces();
    } catch (err) {
      toast.error(err.response?.data?.message || "Operation Failed");
    }
  }

  async function removeSpace(id) {
    if (!window.confirm("Delete this space?")) {
      return;
    }

    try {
      await deleteSpace(id);

      toast.success("Space Deleted");

      loadSpaces();
    } catch (err) {
      toast.error("Delete Failed");
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Spaces</h1>

        <Button onClick={addSpace}>+ Create Space</Button>
      </div>

      <div className="grid gap-5">
        {spaces.map((space) => (
          <Card key={space._id}>
            <div className="flex justify-between">
              <div>
                <h2 className="font-bold text-xl">{space.name}</h2>

                <p>{space.type}</p>

                <p>Capacity: {space.capacity}</p>
              </div>

              <div className="flex gap-3">
                <Button onClick={() => editSpace(space)}>Edit</Button>

                <Button variant="danger" onClick={() => removeSpace(space._id)}>
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Modal open={open} onClose={() => setOpen(false)}>
        <SpaceForm
          initialData={selected}
          onSubmit={saveSpace}
          onCancel={() => setOpen(false)}
        />
      </Modal>
    </div>
  );
}

export default Spaces;
