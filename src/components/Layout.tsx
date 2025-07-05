import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Home, Briefcase, Award, Book, Star, Menu, X } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Close sidebar when screen becomes large
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const tabs = [
    { id: "home", label: "Home", icon: Home, path: "/" },
    { id: "projects", label: "Projects", icon: Briefcase, path: "/projects" },
    {
      id: "internships",
      label: "Experience",
      icon: Award,
      path: "/internships",
    },
    {
      id: "co-curricular",
      label: "Co-Curricular",
      icon: Book,
      path: "/co-curricular",
    },
    {
      id: "extra-curricular",
      label: "Extra-Curricular",
      icon: Star,
      path: "/extra-curricular",
    },
  ];

  return (
    <div className="min-h-screen flex w-full relative">
      {/* Dynamic background gradient that follows mouse with dual gradients - high contrast purple and pink */}
      <div
        className="fixed inset-0 z-[-1] pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 400px 400px at ${mousePosition.x}% ${
            mousePosition.y
          }%, 
              rgba(147, 51, 234, 0.35) 0%, 
              rgba(99, 102, 241, 0.2) 30%, 
              transparent 70%
            ),
            radial-gradient(ellipse 600px 600px at ${100 - mousePosition.x}% ${
            100 - mousePosition.y
          }%, 
              rgba(236, 72, 153, 0.3) 0%, 
              rgba(244, 114, 182, 0.15) 40%, 
              transparent 70%
            ),
            #000000
          `,
          transition: "background 0.3s ease-out",
        }}
      />

      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-3 glass rounded-lg shadow-lg"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar - Responsive */}
      {isSidebarOpen && (
        <motion.aside
          initial={{ x: -280 }}
          animate={{ x: 0 }}
          exit={{ x: -280 }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className="fixed inset-y-0 left-0 z-40 w-72 sm:w-80 glass border-r border-gray-700/40"
          style={{
            background: `rgba(0, 0, 0, 0.95)`,
            backdropFilter: "blur(16px)",
            boxShadow: `
              0 25px 50px -12px rgba(0, 0, 0, 0.9),
              0 0 0 1px rgba(255, 255, 255, 0.1),
              inset 0 1px 0 0 rgba(255, 255, 255, 0.1)
            `,
          }}>
          <div className="flex flex-col h-full p-4 sm:p-6">
            {/* Logo/Name */}
            <div className="mb-6 sm:mb-8">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full overflow-hidden flex items-center justify-center text-xl sm:text-2xl font-bold text-white border-2 border-white/20">
                  <img
                    src="https://avatars.githubusercontent.com/u/119789631?v=4"
                    alt="Harshal Patil"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      const fallbackElement = e.currentTarget
                        .nextElementSibling as HTMLElement;
                      if (fallbackElement) {
                        fallbackElement.style.display = "flex";
                      }
                    }}
                  />
                  <div className="w-full h-full profile-icon items-center justify-center text-xl sm:text-2xl font-bold text-white hidden">
                    HP
                  </div>
                </div>
                <h2 className="text-base sm:text-lg font-semibold gradient-text">
                  Harshal Patil
                </h2>
                <p className="text-xs sm:text-sm text-white/60">Student</p>
              </motion.div>
            </div>

            {/* Navigation */}
            <nav className="flex-1">
              <ul className="space-y-2">
                {tabs.map((tab, index) => {
                  const Icon = tab.icon;
                  const isActive = location.pathname === tab.path;
                  return (
                    <motion.li
                      key={tab.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}>
                      <Link
                        to={tab.path}
                        className={`w-full flex items-center space-x-3 px-3 sm:px-4 py-3 rounded-lg transition-all duration-200 ${
                          isActive
                            ? "bg-white/10 backdrop-blur-md text-white shadow-lg border border-white/20 shadow-purple-500/20"
                            : "text-white/70 hover:bg-white/5 hover:text-white"
                        }`}
                        onClick={() => setIsSidebarOpen(false)}>
                        <Icon size={18} className="sm:w-5 sm:h-5" />
                        <span className="font-medium text-sm sm:text-base">
                          {tab.label}
                        </span>
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </motion.aside>
      )}

      {/* Desktop Sidebar - Hidden on mobile */}
      <aside className="hidden lg:block w-70 glass border-r border-gray-700/40 relative z-10">
        <div className="flex flex-col h-full p-6">
          {/* Logo/Name */}
          <div className="mb-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden flex items-center justify-center text-2xl font-bold text-white border-2 border-white/20">
                <img
                  src="https://avatars.githubusercontent.com/u/119789631?v=4"
                  alt="Harshal Patil"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    const fallbackElement = e.currentTarget
                      .nextElementSibling as HTMLElement;
                    if (fallbackElement) {
                      fallbackElement.style.display = "flex";
                    }
                  }}
                />
                <div className="w-full h-full profile-icon items-center justify-center text-2xl font-bold text-white hidden">
                  HP
                </div>
              </div>
              <h2 className="text-lg font-semibold gradient-text">
                Harshal Patil
              </h2>
              <p className="text-sm text-white/60">Student</p>
            </motion.div>
          </div>

          {/* Navigation */}
          <nav className="flex-1">
            <ul className="space-y-2">
              {tabs.map((tab, index) => {
                const Icon = tab.icon;
                const isActive = location.pathname === tab.path;
                return (
                  <motion.li
                    key={tab.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}>
                    <Link
                      to={tab.path}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                        isActive
                          ? "bg-white/10 backdrop-blur-md text-white shadow-lg border border-white/20 shadow-purple-500/20"
                          : "text-white/70 hover:bg-white/5 hover:text-white"
                      }`}
                      onClick={() => setIsSidebarOpen(false)}>
                      <Icon size={20} />
                      <span className="font-medium">{tab.label}</span>
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main Content - Responsive */}
      <main className="flex-1 h-screen overflow-hidden">
        <div
          className={`h-full ${
            location.pathname === "/"
              ? "p-4 sm:p-6 lg:p-8 overflow-hidden"
              : "overflow-auto"
          }`}>
          <div
            className={
              location.pathname === "/" ? "h-full" : "p-4 sm:p-6 lg:p-8"
            }>
            {children}
          </div>
        </div>
      </main>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout;
