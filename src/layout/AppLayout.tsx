import { useMemo, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Avatar, Dropdown, type MenuProps } from "antd";
import {
  Box,
  BriefcaseBusiness,
  CalendarDays,
  ChevronDown,
  ChevronUp,
  LogOut,
  Menu,
  ShieldCheck,
  X,
} from "lucide-react";
import { Button } from "../components/ui";
import { cn } from "../lib/utils";
import { useAuthStore } from "../stores/authStore";

type NavItemConfig = {
  to: string;
  label: string;
};

type NavGroupConfig = {
  id: string;
  title: string;
  icon: React.ElementType;
  items: NavItemConfig[];
};

const pageTitles: Record<string, string> = {
  "/projects": "專案列表",
  "/calendar": "團隊行事曆",
  "/admin/products": "產品列表",
  "/admin/status-settings": "選項設定",
  "/admin/roles": "角色管理",
  "/admin/users": "使用者管理",
};

const navGroups: NavGroupConfig[] = [
  {
    id: "projects",
    title: "專案管理",
    icon: BriefcaseBusiness,
    items: [{ to: "/projects", label: "專案列表" }],
  },
  {
    id: "team",
    title: "團隊管理",
    icon: CalendarDays,
    items: [{ to: "/calendar", label: "團隊行事曆" }],
  },
  {
    id: "products",
    title: "產品管理",
    icon: Box,
    items: [
      { to: "/admin/products", label: "產品列表" },
      { to: "/admin/status-settings", label: "選項設定" },
    ],
  },
  {
    id: "permissions",
    title: "權限管理",
    icon: ShieldCheck,
    items: [
      { to: "/admin/roles", label: "角色管理" },
      { to: "/admin/users", label: "使用者管理" },
    ],
  },
];

export function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    if (typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches) {
      setSidebarCollapsed((prev) => !prev);
      return;
    }
    setMobileOpen((prev) => !prev);
  };

  return (
    <div className="h-dvh overflow-hidden bg-[#F5F5F5]">
      <Sidebar
        open={mobileOpen}
        close={() => setMobileOpen(false)}
        collapsed={sidebarCollapsed}
      />
      <div
        className={cn(
          "h-full overflow-y-auto overscroll-y-contain transition-[padding] duration-200",
          sidebarCollapsed ? "lg:pl-20" : "lg:pl-64",
        )}
      >
        <Header onMenu={toggleSidebar} sidebarCollapsed={sidebarCollapsed} />
        <main className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export function Sidebar({
  open,
  close,
  collapsed,
}: {
  open: boolean;
  close: () => void;
  collapsed: boolean;
}) {
  const location = useLocation();
  const defaultExpanded = useMemo(
    () =>
      navGroups.reduce<Record<string, boolean>>((acc, group) => {
        acc[group.id] = group.items.some((item) => location.pathname.startsWith(item.to));
        return acc;
      }, {}),
    [location.pathname],
  );
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() => {
    const initial = navGroups.reduce<Record<string, boolean>>((acc, group) => {
      acc[group.id] = true;
      return acc;
    }, {});
    return { ...initial, ...defaultExpanded };
  });

  return (
    <>
      {open && <div className="fixed inset-0 z-30 bg-slate-950/25 lg:hidden" onClick={close} />}
      <aside
        className={cn(
          "desktop-sidebar fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-slate-200 bg-white transition-[width,transform] duration-200 lg:translate-x-0",
          collapsed && "lg:w-20",
          open && "mobile-open",
        )}
      >
        <div className={cn("flex h-[72px] items-center border-b border-slate-100 px-5", collapsed ? "justify-center" : "justify-between")}>
          <NavLink to="/projects" className="flex items-center gap-3" onClick={close} aria-label="專案管理平台">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-blue-600 text-white shadow-sm">
              <BriefcaseBusiness size={20} />
            </span>
            {!collapsed && <span className="text-[20px] font-medium leading-7 tracking-wide text-slate-900">專案管理平台</span>}
          </NavLink>
          <Button variant="ghost" size="icon" onClick={close} className={cn("lg:hidden", collapsed && "hidden")}>
            <X size={18} />
          </Button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-5">
          {navGroups.map((group) => (
            <NavGroup
              key={group.id}
              group={group}
              expanded={expanded[group.id]}
              onToggle={() => setExpanded((prev) => ({ ...prev, [group.id]: !prev[group.id] }))}
              close={close}
              collapsed={collapsed}
            />
          ))}
        </nav>

      </aside>
    </>
  );
}

function NavGroup({
  group,
  expanded,
  onToggle,
  close,
  collapsed,
}: {
  group: NavGroupConfig;
  expanded: boolean;
  onToggle: () => void;
  close: () => void;
  collapsed: boolean;
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const Icon = group.icon;
  const Arrow = expanded ? ChevronUp : ChevronDown;
  const active = group.items.some((item) => location.pathname.startsWith(item.to));
  const handleGroupClick = () => {
    if (collapsed) {
      navigate(group.items[0]?.to ?? "/projects");
      close();
      return;
    }
    onToggle();
  };

  return (
    <section className="mb-4 last:mb-0">
      <button
        type="button"
        onClick={handleGroupClick}
        className={cn(
          "sidebar-menu-group flex w-full items-center rounded-lg px-3 py-2.5 transition hover:bg-blue-50 hover:text-blue-700",
          collapsed ? "justify-center" : "justify-between",
          active ? "text-blue-600" : "text-slate-900",
        )}
        aria-expanded={expanded}
        aria-label={group.title}
        title={collapsed ? group.title : undefined}
      >
        <span className={cn("flex items-center", collapsed ? "justify-center" : "gap-3")}>
          <Icon size={20} />
          {!collapsed && group.title}
        </span>
        {!collapsed && <Arrow size={18} />}
      </button>
      {!collapsed && expanded && (
        <div className="mt-1 space-y-1">
          {group.items.map((item) => (
            <NavItem key={item.to} {...item} close={close} />
          ))}
        </div>
      )}
    </section>
  );
}

function NavItem({ to, label, close }: NavItemConfig & { close: () => void }) {
  return (
    <NavLink
      to={to}
      onClick={close}
      className={({ isActive }) =>
        cn(
          "sidebar-submenu-link block px-3 py-2.5 text-[16px] font-normal leading-6 transition",
          isActive
            ? "bg-blue-600 text-white shadow-sm"
            : "text-slate-600 hover:bg-blue-50 hover:text-blue-700",
        )
      }
    >
      {label}
    </NavLink>
  );
}

function getUserInitial(name?: string, email?: string) {
  const source = `${name ?? ""} ${email ?? ""}`;
  return source.match(/[A-Za-z]/)?.[0]?.toUpperCase() ?? "U";
}

export function Header({ onMenu, sidebarCollapsed }: { onMenu: () => void; sidebarCollapsed: boolean }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const userInitial = getUserInitial(user?.name, user?.email);
  const base =
    Object.keys(pageTitles).find((p) => location.pathname === p) ??
    (location.pathname.includes("requirements")
      ? "需求管理"
      : location.pathname.includes("projects")
        ? "專案管理"
        : "專案管理平台");
  const userMenu: MenuProps["items"] = [
    {
      key: "logout",
      icon: <LogOut size={16} />,
      label: "登出",
      onClick: () => {
        logout();
        navigate("/login");
      },
    },
  ];

  return (
    <header className="sticky top-0 z-20 flex h-[72px] items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
      <div className="flex h-full items-center gap-3 self-stretch">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenu}
          className="header-menu-button"
          aria-label={sidebarCollapsed ? "展開選單" : "收合選單"}
          title={sidebarCollapsed ? "展開選單" : "收合選單"}
        >
          <Menu size={20} />
        </Button>
        <h2 className="header-breadcrumb flex h-10 items-center font-medium leading-7 text-slate-900">{pageTitles[base] ?? base}</h2>
      </div>
      <div className="flex h-full items-center self-stretch">
        <Dropdown menu={{ items: userMenu }} placement="bottomRight" trigger={["click"]}>
          <button
            type="button"
            className="grid h-8 w-8 place-items-center rounded-full text-blue-600 transition hover:bg-blue-50"
            aria-label={`${user?.name ?? "登入人員"}選單`}
          >
            <Avatar
              size={32}
              className="bg-blue-600 text-white"
            >
              {userInitial}
            </Avatar>
          </button>
        </Dropdown>
      </div>
    </header>
  );
}
