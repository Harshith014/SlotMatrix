import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import Card from "../../../components/ui/Card";

import Button from "../../../components/ui/Button";

import Modal from "../../../components/ui/Modal";

import MaintenanceForm from "../components/MaintenanceForm";

import {
  getMaintenance,
  createMaintenance,
  deleteMaintenance,
} from "../../../api/maintenance.api";

function Maintenance() {
  const [list, setList] = useState([]);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const res = await getMaintenance();

    setList(res.data.data);
  }

  async function save(data) {
    try {
      await createMaintenance(data);

      toast.success("Maintenance Added");

      setOpen(false);

      load();
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  }

  async function remove(id) {
    if (!window.confirm("Delete maintenance?")) return;

    await deleteMaintenance(id);

    toast.success("Deleted");

    load();
  }

  return (
    <div>
      <div
        className="

flex

justify-between

items-center

mb-6

"
      >
        <h1
          className="

text-3xl

font-bold

"
        >
          Maintenance
        </h1>

        <Button onClick={() => setOpen(true)}>Add Maintenance</Button>
      </div>

      <div className="space-y-4">
        {list.map((item) => (
          <Card key={item._id}>
            <div
              className="

flex

justify-between

"
            >
              <div>
                <h2 className="font-bold">
                  {item.space ? item.space.name : "Unknown Space"}
                </h2>

                <p>{new Date(item.startTime).toLocaleString()}</p>

                <p>{new Date(item.endTime).toLocaleString()}</p>

                <p>{item.reason}</p>
              </div>

              <Button variant="danger" onClick={() => remove(item._id)}>
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Modal open={open} onClose={() => setOpen(false)}>
        <MaintenanceForm onSubmit={save} onCancel={() => setOpen(false)} />
      </Modal>
    </div>
  );
}

export default Maintenance;
