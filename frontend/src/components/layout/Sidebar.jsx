import { NavLink } from "react-router-dom";

function Sidebar({ admin }) {
  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen">
      <div className="text-2xl font-bold p-6">Dashboard</div>

      <nav className="flex flex-col">
        {!admin && (
          <>
            <NavLink to="/member" className="p-4 hover:bg-slate-700">
              Dashboard
            </NavLink>

            <NavLink to="/member/bookings" className="p-4 hover:bg-slate-700">
              My Bookings
            </NavLink>
          </>
        )}

        {admin && (
          <>
            <NavLink to="/admin" className="p-4 hover:bg-slate-700">
              Dashboard
            </NavLink>

            <NavLink to="/admin/spaces" className="p-4 hover:bg-slate-700">
              Spaces
            </NavLink>

            <NavLink to="/admin/bookings" className="p-4 hover:bg-slate-700">
              Bookings
            </NavLink>

            <NavLink to="/admin/maintenance" className="p-4 hover:bg-slate-700">
              Maintenance
            </NavLink>
          </>
        )}
      </nav>
    </aside>
  );
}

export default Sidebar;
