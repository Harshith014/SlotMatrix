import { Routes, Route } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import MemberLayout from "../layouts/MemberLayout";
import AdminLayout from "../layouts/AdminLayout";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import SpaceDetails from "../features/visitor/pages/SpaceDetails";
import AdminDashboard from "../features/admin/pages/Dashboard";
import Home from "../features/visitor/pages/Home";
import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";
import Spaces from "../features/admin/pages/Spaces";
import Bookings from "../features/admin/pages/Bookings";
import Maintenance from "../features/admin/pages/Maintenance";
import MyBookings from "../features/member/pages/MyBookings";
import Dashboard from "../features/member/pages/Dashboard";

function AppRoutes() {
  return (
    <Routes>
      {/* Public */}

      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />
        <Route path="/spaces/:id" element={<SpaceDetails />} />
      </Route>

      {/* Member */}

      <Route
        element={
          <ProtectedRoute>
            <RoleRoute role="member">
              <MemberLayout />
            </RoleRoute>
          </ProtectedRoute>
        }
      >
        <Route path="/member" element={<Dashboard />} />
        <Route path="/member/bookings" element={<MyBookings />} />
      </Route>

      {/* Admin */}

      <Route
        element={
          <ProtectedRoute>
            <RoleRoute role="admin">
              <AdminLayout />
            </RoleRoute>
          </ProtectedRoute>
        }
      >
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/spaces" element={<Spaces />} />

        <Route path="/admin/bookings" element={<Bookings />} />

        <Route path="/admin/maintenance" element={<Maintenance />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
