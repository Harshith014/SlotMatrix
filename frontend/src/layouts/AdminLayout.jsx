import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";

function AdminLayout() {
  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto p-6 min-h-screen">
        <Outlet />
      </main>
    </>
  );
}

export default AdminLayout;
