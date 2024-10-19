import { Lock, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import { useAdminStore } from "../Store/adminStore";

const Navbar = () => {
  const { user, logout } = useAdminStore();
  console.log("Current user:", user); // Thêm dòng này để kiểm tra giá trị của user
  const isAdmin = user?.role === "admin";

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-lg z-40 transition-all duration-300 border-b border-emerald-800">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-wrap justify-between items-center">
          <Link
            to="/"
            className="text-2xl font-bold text-emerald-400 items-center space-x-2 flex"
          >
            Admin
          </Link>

          <nav className="flex flex-wrap items-center gap-4">
            <Link
              to={"/"}
              className="text-gray-300 hover:text-emerald-400 transition duration-300 ease-in-out"
            >
              Home
            </Link>
            {user ? ( // Kiểm tra xem người dùng đã đăng nhập hay chưa
              <>
                {isAdmin && (
                  <Link
                    className="bg-emerald-700 hover:bg-emerald-600 text-white px-3 py-1 rounded-md font-medium transition duration-300 ease-in-out flex items-center"
                    to={"/secret-dashboard"}
                  >
                    <Lock className="inline-block mr-1" size={18} />
                    <span className="hidden sm:inline">Dashboard</span>
                  </Link>
                )}
                <button
                  className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out"
                  onClick={logout}
                >
                  <span className="hidden sm:inline ml-2">Log Out</span>
                </button>
              </>
            ) : (
              <Link
                to={"/login"}
                className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out"
              >
                <LogIn className="mr-2" size={18} />
                Login
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
