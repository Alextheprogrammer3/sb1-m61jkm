import { Component, createSignal } from "solid-js";
import { A } from "@solidjs/router";

const Sidebar: Component = () => {
  const [expandedSection, setExpandedSection] = createSignal<string | null>(null);

  const navigationSections = [
    {
      id: "overview",
      label: "Overview",
      items: [
        { path: "/dashboard", label: "Dashboard", icon: "📊" },
        { path: "/dashboard/analytics", label: "Analytics", icon: "📈" },
      ]
    },
    {
      id: "operations",
      label: "Operations",
      items: [
        { path: "/dashboard/orders", label: "Orders", icon: "📦" },
        { path: "/dashboard/tracking", label: "Tracking", icon: "🚚" },
        { path: "/dashboard/delivery", label: "Delivery", icon: "🚛" },
        { path: "/dashboard/routes", label: "Routes", icon: "🗺️" },
      ]
    },
    {
      id: "inventory",
      label: "Inventory",
      items: [
        { path: "/dashboard/inventory", label: "Stock", icon: "📋" },
        { path: "/dashboard/warehouses", label: "Warehouses", icon: "🏭" },
        { path: "/dashboard/products", label: "Products", icon: "📝" },
      ]
    },
    {
      id: "suppliers",
      label: "Suppliers",
      items: [
        { path: "/dashboard/farms", label: "Farms", icon: "🌾" },
        { path: "/dashboard/suppliers", label: "Suppliers", icon: "🤝" },
        { path: "/dashboard/contracts", label: "Contracts", icon: "📄" },
      ]
    },
    {
      id: "reports",
      label: "Reports",
      items: [
        { path: "/dashboard/reports", label: "Reports", icon: "📊" },
        { path: "/dashboard/forecasting", label: "Forecasting", icon: "🎯" },
        { path: "/dashboard/performance", label: "Performance", icon: "⚡" },
      ]
    },
    {
      id: "settings",
      label: "Settings",
      items: [
        { path: "/dashboard/profile", label: "Profile", icon: "👤" },
        { path: "/dashboard/team", label: "Team", icon: "👥" },
        { path: "/dashboard/settings", label: "Settings", icon: "⚙️" },
      ]
    }
  ];

  const toggleSection = (sectionId: string) => {
    setExpandedSection(current => current === sectionId ? null : sectionId);
  };

  return (
    <aside class="bg-white w-64 min-h-screen p-4 border-r border-gray-200 overflow-y-auto">
      <div class="mb-8">
        <h1 class="text-xl font-bold text-gray-800">Farm2Store</h1>
      </div>
      <nav class="space-y-1">
        {navigationSections.map((section) => (
          <div class="mb-4">
            <button
              onClick={() => toggleSection(section.id)}
              class="w-full flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <span>{section.label}</span>
              <span class={`transform transition-transform ${
                expandedSection() === section.id ? 'rotate-180' : ''
              }`}>
                ▼
              </span>
            </button>
            <div
              class={`mt-1 ml-4 space-y-1 ${
                expandedSection() === section.id ? 'block' : 'hidden'
              }`}
            >
              {section.items.map((item) => (
                <A
                  href={item.path}
                  class="flex items-center px-4 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                  activeClass="bg-blue-50 text-blue-600"
                  end={item.path === "/dashboard"}
                >
                  <span class="mr-3 text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </A>
              ))}
            </div>
          </div>
        ))}
      </nav>
      <div class="mt-8 pt-4 border-t border-gray-200">
        <div class="px-4 py-2">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <span class="text-2xl">🌟</span>
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-gray-700">Pro Features</p>
              <p class="text-xs text-gray-500">Upgrade your account</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;