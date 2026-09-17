import {
  BarChart3,
  CalendarCheck,
  CalendarDays,
  CreditCard,
  FileText,
  Grid2X2,
  LogOut,
  Package,
  Settings,
  ShieldCheck,
  UserRound,
  Users,
  Wallet,
  X,
} from "lucide-react";
import  { useState } from "react";
import { useNavigate } from "react-router-dom";

const menuItems = [
  {
    label: "Dashboard",
    icon: Grid2X2,
    path: "/admin/dashboard",
  },
  {
    label: "Lawns",
    icon: ShieldCheck,
    path: "/admin/lawns",
  },
  {
    label: "Packages",
    icon: Package,
    path: "/admin/packages",
  },
  {
    label: "Customers",
    icon: Users,
    path: "/admin/customers",
  },
  {
    label: "Bookings",
    icon: CalendarCheck,
    path: "/admin/bookings",
  },
  {
    label: "Availability",
    icon: CalendarDays,
    path: "/admin/availability",
  },
  {
    label: "Payments",
    icon: CreditCard,
    path: "/admin/payments",
  },
  {
    label: "Invoices",
    icon: FileText,
    path: "/admin/invoices",
  },
  {
    label: "Staff",
    icon: UserRound,
    path: "/admin/staff",
  },
  {
    label: "Expenses",
    icon: Wallet,
    path: "/admin/expenses",
  },
  {
    label: "Reports",
    icon: BarChart3,
    path: "/admin/reports",
  },
  {
    label: "Settings",
    icon: Settings,
    path: "/admin/settings",
  },
];

const AdminAside = () => {
  // ==============================
  // SIDEBAR ITEMS
  // ==============================

  const navigate = useNavigate();

  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleMenuClick = (label: string, path: string) => {
    setActiveMenu(label);
    setSidebarOpen(false);
    navigate(path);
  };

  const handleLogout = () => {
    // Connect your AuthContext logout here later
    navigate("/login", { replace: true });
  };

  return (
    <div>
      <aside
        className={`
          fixed
          top-0
          left-0
          z-50
          h-screen
          w-[270px]
          bg-[#1e1814]
          border-r
          border-[#332a25]
          flex
          flex-col
          transition-transform
          duration-300
          lg:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo */}

        <div className="h-[90px] px-5 border-b border-[#332a25] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="
                w-10
                h-10
                rounded-lg
                bg-[#d8a849]
                text-black
                flex
                items-center
                justify-center
                text-xl
                font-serif
              "
            >
              DML
            </div>

            <div>
              <h1 className="text-white text-lg font-serif">Vivaah Lawns</h1>

              <p className="text-[#a89b92] text-[11px] tracking-[0.16em]">
                ADMIN CONSOLE
              </p>
            </div>
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-[#aaa19b] hover:text-white"
          >
            <X size={22} />
          </button>
        </div>

        {/* Menu */}

        <div className="flex-1 overflow-y-auto px-3 py-3">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeMenu === item.label;

              return (
                <button
                  key={item.label}
                  onClick={() => handleMenuClick(item.label, item.path)}
                  className={`
                    w-full
                    flex
                    items-center
                    gap-3
                    px-4
                    py-3
                    rounded-lg
                    text-left
                    text-sm
                    transition
                    ${
                      isActive
                        ? "bg-[#d8a849] text-black"
                        : "text-[#c0b5ad] hover:bg-[#2a211c] hover:text-white"
                    }
                  `}
                >
                  <Icon size={18} strokeWidth={1.8} />

                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sign Out */}

        <div className="border-t border-[#332a25] p-3">
          <button
            onClick={handleLogout}
            className="
              w-full
              flex
              items-center
              gap-3
              px-4
              py-3
              text-[#c0b5ad]
              hover:text-white
              hover:bg-[#2a211c]
              rounded-lg
              text-sm
              transition
            "
          >
            <LogOut size={18} />
            Sign out
          </button>
        </div>
      </aside>
    </div>
  );
};

export default AdminAside;
