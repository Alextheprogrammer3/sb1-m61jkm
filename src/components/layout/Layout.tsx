import { Component, lazy, Suspense } from "solid-js";
import { useRoutes } from "@solidjs/router";
import { LoadingState } from "../ui/loading-state";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

// Lazy load pages
const Dashboard = lazy(() => import("../../pages/Dashboard"));
const Tracking = lazy(() => import("../../pages/Tracking"));
const Orders = lazy(() => import("../../pages/Orders"));
const Reports = lazy(() => import("../../pages/Reports"));
const Landing = lazy(() => import("../../pages/Landing"));
const Inventory = lazy(() => import("../../pages/Inventory"));
const FarmManagement = lazy(() => import("../../pages/FarmManagement"));
const Analytics = lazy(() => import("../../pages/Analytics"));
const Delivery = lazy(() => import("../../pages/Delivery"));
const Routes = lazy(() => import("../../pages/Routes"));
const Warehouses = lazy(() => import("../../pages/Warehouses"));
const Products = lazy(() => import("../../pages/Products"));
const Suppliers = lazy(() => import("../../pages/Suppliers"));
const Contracts = lazy(() => import("../../pages/Contracts"));
const Forecasting = lazy(() => import("../../pages/Forecasting"));
const Performance = lazy(() => import("../../pages/Performance"));
const Profile = lazy(() => import("../../pages/Profile"));
const Team = lazy(() => import("../../pages/Team"));
const Settings = lazy(() => import("../../pages/Settings"));

const routes = [
  {
    path: "/",
    component: Landing,
  },
  {
    path: "/dashboard",
    component: Dashboard,
  },
  {
    path: "/dashboard/analytics",
    component: Analytics,
  },
  {
    path: "/dashboard/tracking",
    component: Tracking,
  },
  {
    path: "/dashboard/orders",
    component: Orders,
  },
  {
    path: "/dashboard/delivery",
    component: Delivery,
  },
  {
    path: "/dashboard/routes",
    component: Routes,
  },
  {
    path: "/dashboard/inventory",
    component: Inventory,
  },
  {
    path: "/dashboard/warehouses",
    component: Warehouses,
  },
  {
    path: "/dashboard/products",
    component: Products,
  },
  {
    path: "/dashboard/farms",
    component: FarmManagement,
  },
  {
    path: "/dashboard/suppliers",
    component: Suppliers,
  },
  {
    path: "/dashboard/contracts",
    component: Contracts,
  },
  {
    path: "/dashboard/reports",
    component: Reports,
  },
  {
    path: "/dashboard/forecasting",
    component: Forecasting,
  },
  {
    path: "/dashboard/performance",
    component: Performance,
  },
  {
    path: "/dashboard/profile",
    component: Profile,
  },
  {
    path: "/dashboard/team",
    component: Team,
  },
  {
    path: "/dashboard/settings",
    component: Settings,
  }
];

const Layout: Component = () => {
  const Routes = useRoutes(routes);

  return (
    <div class="flex h-screen bg-background">
      <Sidebar />
      <div class="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          <Suspense fallback={<LoadingState />}>
            <Routes />
          </Suspense>
        </main>
      </div>
    </div>
  );
};

export default Layout;