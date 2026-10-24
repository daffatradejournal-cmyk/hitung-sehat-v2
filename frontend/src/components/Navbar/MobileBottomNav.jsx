import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Home, Utensils, Camera, Activity, User } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthProvider";

const MobileBottomNav = () => {
  const { i18n } = useTranslation();
  const isId = i18n.language?.startsWith("id");
  const { user } = useAuth();
  const location = useLocation();

  // Hide on public auth pages & landing page
  const hidePaths = ["/", "/login", "/register"];
  if (!user || hidePaths.includes(location.pathname)) {
    return null;
  }

  const navItems = [
    {
      to: "/home",
      label: isId ? "Beranda" : "Home",
      icon: Home,
    },
    {
      to: "/meals",
      label: isId ? "Makanan" : "Meals",
      icon: Utensils,
    },
    {
      to: "/analyze",
      label: isId ? "Scan AI" : "Scan AI",
      icon: Camera,
      isPrimary: true,
    },
    {
      to: "/track",
      label: isId ? "Lacak" : "Track",
      icon: Activity,
    },
    {
      to: "/profile",
      label: isId ? "Profil" : "Profile",
      icon: User,
    },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-[0_-4px_25px_rgba(0,0,0,0.06)] px-2 py-1.5 pb-safe">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.to;

          if (item.isPrimary) {
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className="relative -top-5 flex flex-col items-center group active:scale-95 transition-transform"
              >
                <div
                  className={`w-13 h-13 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 border-3 border-white ${
                    isActive
                      ? "bg-gradient-to-tr from-green-600 to-emerald-400 text-white shadow-green-500/40 ring-4 ring-green-100"
                      : "bg-gradient-to-tr from-green-500 to-emerald-400 text-white shadow-green-500/30"
                  }`}
                  style={{ width: "52px", height: "52px" }}
                >
                  <Icon size={24} className="stroke-[2.2]" />
                </div>
                <span
                  className={`text-[10px] font-bold mt-0.5 tracking-tight ${
                    isActive ? "text-green-600 font-extrabold" : "text-gray-500"
                  }`}
                >
                  {item.label}
                </span>
              </NavLink>
            );
          }

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all duration-150 active:scale-95 ${
                isActive
                  ? "text-green-600 font-bold"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <div
                className={`p-1 rounded-xl transition-colors ${
                  isActive ? "bg-green-50" : ""
                }`}
              >
                <Icon size={20} className={isActive ? "stroke-[2.3]" : "stroke-[1.8]"} />
              </div>
              <span className="text-[10px] tracking-tight leading-tight mt-0.5">
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
