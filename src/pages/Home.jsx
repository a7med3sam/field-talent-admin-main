import { useState, useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import {
  ShieldAlert,
  ShieldCheck,
  ShieldX,
  CircleX,
  Menu,
  LayoutDashboard,
  UserRound,
  HardHat,
  LogOut,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthContext } from "../store/AuthContext";
import { useNavigate } from "react-router-dom";
import { userSchema } from "../store/AuthContext";
import { api } from "../Api/AxiosServiceConfiguration";

const Home = () => {
  const navigationItems = [
    {
      icon: LayoutDashboard,
      text: "Dashboard",
      path: "/",
      description: "View your dashboard overview",
    },
    {
      icon: UserRound,
      text: "Clients",
      path: "/client",
      description: "verify your clients",
    },
    {
      icon: HardHat,
      text: "Engineers",
      path: "/engineer",
      description: "verify your engineer",
    },
  ];

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentPageTitle, setCurrentPageTitle] = useState("");
  const [user, setUser] = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    const currentItem = navigationItems.find(
      (item) =>
        currentPath === item.path ||
        (currentPath !== "/" &&
          item.path !== "/" &&
          currentPath.startsWith(item.path))
    );
    setCurrentPageTitle(currentItem?.text || "Dashboard");
  }, [location]);

  const handleLogout = () => setModalOpen(true);
  const confirmLogout = () => {
    setUser({ ...userSchema });
    api.defaults.headers.common["Authorization"] = null;
    navigate("/login", { replace: true });
  };
  const cancelLogout = () => setModalOpen(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (isSidebarOpen && !event.target.closest("aside")) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isSidebarOpen]);

  const sidebarVariants = {
    open: {
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    closed: {
      x: "-100%",
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-50">
      <header className="sticky top-0 bg-main-light border-b border-gray-200 shadow-sm z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="lg:hidden p-2 rounded-md text-gray-500 hover:bg-gray-100"
                onClick={toggleSidebar}
              >
                <Menu className="w-6 h-6" />
              </motion.button>
              <div className="flex items-center space-x-3">
                <h1 className="text-2xl font-bold text-main">
                  Field Talent Dashboard
                </h1>
                <span className="text-main">|</span>
                <h2 className="text-lg font-semibold text-gray-600">
                  {currentPageTitle}
                </h2>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="text-gray-700 font-medium hidden sm:block"
              >
                Welcome, {user.name}
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-gray-200"
              >
                <img
                  src="https://askmescript.com/upload/photos/2020/04/pNFDnM5HcX9sozLiqIN4_24_62b73862def5530a11afeb3a88f402de_image.png"
                  alt="User Avatar"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <AnimatePresence>
          {(isSidebarOpen || window.innerWidth >= 1024) && (
            <motion.aside
              initial="closed"
              animate="open"
              exit="closed"
              variants={sidebarVariants}
              className="w-64 flex-shrink-0 bg-main-light border-r border-gray-200 overflow-y-auto"
            >
              <div className="flex flex-col h-full">
                <div className="p-4 border-b border-gray-200 lg:flex justify-center">
                  <div className="flex gap-6">
                    <ShieldX className="text-main w-10 h-10" />
                    <ShieldCheck className="text-main w-10 h-10" />
                    <ShieldAlert className="text-main w-10 h-10" />
                  </div>
                  <button
                    className="lg:hidden absolute top-4 right-4 p-2 rounded-md text-gray-500 hover:bg-gray-100"
                    onClick={toggleSidebar}
                  >
                    <CircleX className="w-5 h-5" />
                  </button>
                </div>

                <nav className="flex-1 px-3 py-5 space-y-2">
                  {navigationItems.map((item, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                          `flex items-center px-3 py-2 rounded-lg transition-all duration-200 ${
                            isActive
                              ? "bg-main text-white shadow-md"
                              : "text-gray-700 hover:bg-gray-100"
                          }`
                        }
                      >
                        <item.icon className="w-5 h-5 mr-3 flex-shrink-0" />
                        <div>
                          <div className="font-medium">{item.text}</div>
                          <div className="text-xs opacity-75">
                            {item.description}
                          </div>
                        </div>
                      </NavLink>
                    </motion.div>
                  ))}
                </nav>

                <div className="mt-auto">
                  <div className="p-4 border-t border-gray-200">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleLogout}
                      className="flex items-center w-full px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                    >
                      <LogOut className="w-5 h-5 mr-3" />
                      <span className="font-medium">Logout</span>
                    </motion.button>
                    <div className="p-4">
                    <img src="logo.png" alt="Logo" className="w-full" />
                  </div>
                  </div>

                  
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        <main className="flex-1 overflow-y-auto bg-gray-100">
          <div className="h-full">
            <Outlet />
          </div>
        </main>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full mx-4"
          >
            <h2 className="text-xl font-semibold text-gray-900">
              Confirm Logout
            </h2>
            <p className="mt-2 text-gray-600">
              Are you sure you want to log out of your account?
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={cancelLogout}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="px-4 py-2 text-white bg-main hover:bg-main/90 rounded-lg transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Home;
