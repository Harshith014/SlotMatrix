import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { clearTokens } from "../../features/auth/authService";

function Navbar() {
  const navigate = useNavigate();

  const { user, setUser } = useAuth();

  function logout() {
    clearTokens();

    setUser(null);

    navigate("/login");
  }

  return (
    <nav className="bg-white shadow-md">
      <div
        className="    max-w-7xl
    mx-auto
    px-4
    sm:px-6
    py-4
    flex
    flex-col
    md:flex-row
    md:items-center
    md:justify-between
    gap-4"
      >
        <Link
          to={user ? (user.role === "admin" ? "/admin" : "/member") : "/"}
          className="text-2xl font-bold text-blue-600"
        >
          Workspace Booking
        </Link>

        <div
          className="    flex
    flex-wrap
    items-center
    gap-3
    sm:gap-5"
        >
          {!user && (
            <>
              <Link to="/login">Login</Link>

              <Link to="/register">Register</Link>
            </>
          )}

          {user?.role === "member" && (
            <>
              <Link to="/">Browse Spaces</Link>

              <Link to="/member">Dashboard</Link>

              <Link to="/member/bookings">My Bookings</Link>

              <button onClick={logout} className="text-red-600">
                Logout
              </button>
            </>
          )}

          {user?.role === "admin" && (
            <>
              <Link to="/admin">Dashboard</Link>

              <Link to="/admin/spaces">Spaces</Link>

              <Link to="/admin/bookings">Bookings</Link>

              <Link to="/admin/maintenance">Maintenance</Link>

              <button onClick={logout} className="text-red-600">
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
