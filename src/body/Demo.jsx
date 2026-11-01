
import { useState } from "react";
import {
  LayoutDashboard,
  BookOpen,
  ShoppingBag,
  Users,
  ChartNoAxesCombined,
  Settings,
  Search,
  Bell,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Menu,
  X,
  Package,
  CircleAlert,
  IndianRupee,
  ChevronRight,
  Eye,
} from "lucide-react";

const stats = [
  {
    title: "Total Books",
    value: "128",
    change: "+12%",
    positive: true,
    icon: BookOpen,
    color: "bg-blue-100 text-blue-700",
  },
  {
    title: "Total Orders",
    value: "56",
    change: "+8.2%",
    positive: true,
    icon: ShoppingBag,
    color: "bg-violet-100 text-violet-700",
  },
  {
    title: "Customers",
    value: "84",
    change: "+5.4%",
    positive: true,
    icon: Users,
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    title: "Total Revenue",
    value: "Rs. 45,000",
    change: "-2.1%",
    positive: false,
    icon: IndianRupee,
    color: "bg-amber-100 text-amber-700",
  },
];

const orders = [
  {
    id: "#ORD-1001",
    customer: "Ram Sharma",
    book: "Atomic Habits",
    amount: 1099,
    status: "Delivered",
  },
  {
    id: "#ORD-1002",
    customer: "Sita Thapa",
    book: "The Psychology of Money",
    amount: 850,
    status: "Processing",
  },
  {
    id: "#ORD-1003",
    customer: "Aarav KC",
    book: "Rich Dad Poor Dad",
    amount: 750,
    status: "Pending",
  },
  {
    id: "#ORD-1004",
    customer: "Anisha Rai",
    book: "Deep Work",
    amount: 950,
    status: "Delivered",
  },
];

const lowStockBooks = [
  { title: "The Psychology of Money", author: "Morgan Housel", stock: 3 },
  { title: "Deep Work", author: "Cal Newport", stock: 5 },
  { title: "Think and Grow Rich", author: "Napoleon Hill", stock: 2 },
];

const sales = [
  { month: "May", amount: 38 },
  { month: "Jun", amount: 55 },
  { month: "Jul", amount: 42 },
  { month: "Aug", amount: 72 },
  { month: "Sep", amount: 61 },
  { month: "Oct", amount: 88 },
];

const navigation = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Manage Books", icon: BookOpen },
  { label: "Orders", icon: ShoppingBag },
  { label: "Customers", icon: Users },
  { label: "Sales Reports", icon: ChartNoAxesCombined },
];

function Demo() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredOrders = orders.filter((order) =>
    `${order.id} ${order.customer} ${order.book}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const maxSales = Math.max(...sales.map((item) => item.amount));

  const statusStyle = {
    Delivered: "bg-emerald-50 text-emerald-700",
    Processing: "bg-blue-50 text-blue-700",
    Pending: "bg-amber-50 text-amber-700",
  };

  return (
    <div className="min-h-screen bg-stone-100 text-slate-800">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-slate-950 text-white transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400 text-slate-950">
              <BookOpen size={23} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-wide">Pages</h1>
              <p className="text-xs text-slate-400">Admin Panel</p>
            </div>
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-2 hover:bg-white/10 lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-4 pt-7">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
            Main Menu
          </p>

          <nav className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = activePage === item.label;

              return (
                <button
                  key={item.label}
                  onClick={() => {
                    setActivePage(item.label);
                    setSidebarOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition ${
                    active
                      ? "bg-emerald-400 text-slate-950"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon size={19} />
                  {item.label}
                  {active && <ChevronRight size={16} className="ml-auto" />}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto p-4">
          <button
            onClick={() => setActivePage("Settings")}
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm ${
              activePage === "Settings"
                ? "bg-emerald-400 text-slate-950"
                : "text-slate-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <Settings size={19} />
            Settings
          </button>

          <div className="mt-4 flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-300 font-bold text-slate-900">
              A
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">Administrator</p>
              <p className="text-xs text-slate-400">Super Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="min-w-0 lg:ml-64">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between gap-3 border-b border-stone-200 bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 hover:bg-stone-100 lg:hidden"
              aria-label="Open sidebar"
            >
              <Menu size={22} />
            </button>

            <div>
              <h2 className="text-lg font-bold sm:text-xl">
                {activePage}
              </h2>
              <p className="hidden text-xs text-slate-500 sm:block">
                Pages / {activePage}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="relative hidden md:block">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search orders..."
                className="w-48 rounded-xl border border-stone-200 bg-stone-50 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-emerald-500 lg:w-64"
              />
            </div>

            <button
              className="relative rounded-xl border border-stone-200 p-2.5 hover:bg-stone-50"
              aria-label="Notifications"
            >
              <Bell size={19} />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
            </button>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-800">
              A
            </div>
          </div>
        </header>

        <div className="space-y-7 p-4 sm:p-6 lg:p-8">
          {/* Welcome */}
          <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-2xl font-bold tracking-tight">
                Welcome back, Admin 👋
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Here's what's happening with your bookstore today.
              </p>
            </div>

            <button
              onClick={() => setActivePage("Manage Books")}
              className="flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              <Plus size={18} />
              Add New Book
            </button>
          </section>

          {/* Statistic cards */}
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              const ChangeIcon = stat.positive
                ? ArrowUpRight
                : ArrowDownRight;

              return (
                <div
                  key={stat.title}
                  className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-500">
                        {stat.title}
                      </p>
                      <h4 className="mt-3 text-2xl font-bold tracking-tight">
                        {stat.value}
                      </h4>
                    </div>
                    <div className={`rounded-xl p-3 ${stat.color}`}>
                      <Icon size={22} />
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2 text-xs">
                    <span
                      className={`flex items-center gap-1 font-semibold ${
                        stat.positive ? "text-emerald-600" : "text-red-500"
                      }`}
                    >
                      <ChangeIcon size={15} />
                      {stat.change}
                    </span>
                    <span className="text-slate-400">vs last month</span>
                  </div>
                </div>
              );
            })}
          </section>

          {/* Sales chart and inventory */}
          <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6 xl:col-span-2">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h4 className="font-bold">Sales Overview</h4>
                  <p className="mt-1 text-sm text-slate-500">
                    Monthly sales performance
                  </p>
                </div>

                <span className="rounded-lg bg-stone-100 px-3 py-2 text-xs font-medium text-slate-600">
                  Last 6 months
                </span>
              </div>

              <div className="mt-8 flex h-56 items-end justify-between gap-3 border-b border-stone-200 px-1">
                {sales.map((item) => (
                  <div
                    key={item.month}
                    className="flex h-full flex-1 flex-col items-center justify-end gap-3"
                  >
                    <div className="flex h-full w-full items-end justify-center">
                      <div
                        title={`${item.amount}k`}
                        className={`w-full max-w-12 rounded-t-lg transition-all duration-300 hover:opacity-75 ${
                          item.month === "Oct"
                            ? "bg-emerald-500"
                            : "bg-emerald-100"
                        }`}
                        style={{
                          height: `${(item.amount / maxSales) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="pb-2 text-xs text-slate-500">
                      {item.month}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500">Sales this month</p>
                  <p className="mt-1 text-xl font-bold">Rs. 88,000</p>
                </div>
                <span className="flex items-center gap-1 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
                  <ArrowUpRight size={15} /> 12.5%
                </span>
              </div>
            </div>

            {/* Low stock */}
            <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold">Low Stock Alert</h4>
                  <p className="mt-1 text-sm text-slate-500">
                    Books needing restock
                  </p>
                </div>
                <CircleAlert size={21} className="text-amber-500" />
              </div>

              <div className="mt-5 space-y-4">
                {lowStockBooks.map((book) => (
                  <div
                    key={book.title}
                    className="flex items-center gap-3 border-b border-stone-100 pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                      <BookOpen size={21} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">
                        {book.title}
                      </p>
                      <p className="truncate text-xs text-slate-500">
                        {book.author}
                      </p>
                    </div>
                    <span className="shrink-0 rounded-lg bg-red-50 px-2 py-1 text-xs font-semibold text-red-600">
                      {book.stock} left
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setActivePage("Manage Books")}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-stone-200 py-3 text-sm font-semibold hover:bg-stone-50"
              >
                Manage Inventory <ChevronRight size={16} />
              </button>
            </div>
          </section>

          {/* Recent orders */}
          <section className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
            <div className="flex flex-col justify-between gap-3 p-5 sm:flex-row sm:items-center sm:p-6">
              <div>
                <h4 className="font-bold">Recent Orders</h4>
                <p className="mt-1 text-sm text-slate-500">
                  Latest customer purchases
                </p>
              </div>

              <button
                onClick={() => setActivePage("Orders")}
                className="flex items-center gap-2 self-start rounded-xl border border-stone-200 px-4 py-2.5 text-sm font-semibold hover:bg-stone-50 sm:self-auto"
              >
                <Eye size={16} />
                View All
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[650px] text-left text-sm">
                <thead className="bg-stone-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Order ID</th>
                    <th className="px-6 py-4 font-semibold">Customer</th>
                    <th className="px-6 py-4 font-semibold">Book</th>
                    <th className="px-6 py-4 font-semibold">Amount</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-stone-100">
                  {filteredOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="transition hover:bg-stone-50"
                    >
                      <td className="whitespace-nowrap px-6 py-4 font-semibold">
                        {order.id}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {order.customer}
                      </td>
                      <td className="px-6 py-4">{order.book}</td>
                      <td className="whitespace-nowrap px-6 py-4 font-semibold">
                        Rs. {order.amount.toLocaleString("en-IN")}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold ${
                            statusStyle[order.status] ||
                            "bg-stone-100 text-slate-600"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}

                  {filteredOrders.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-6 py-10 text-center text-slate-500"
                      >
                        No matching orders found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          <footer className="pb-2 text-center text-xs text-slate-400">
            Pages Admin Panel · Manage your bookstore with ease.
          </footer>
        </div>
      </main>
    </div>
  );
}

export default Demo;
