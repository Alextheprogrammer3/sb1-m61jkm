import { Component } from "solid-js";
import { A } from "@solidjs/router";
import { FiHome, FiMap, FiShoppingCart, FiBarChart2 } from 'solid-icons/fi';

const Sidebar: Component = () => {
  return (
    <aside class="w-64 bg-white shadow-sm">
      <div class="h-full px-3 py-4 overflow-y-auto">
        <ul class="space-y-2">
          <li>
            <A href="/" class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100">
              <FiHome class="w-6 h-6" />
              <span class="ml-3">Dashboard</span>
            </A>
          </li>
          <li>
            <A href="/tracking" class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100">
              <FiMap class="w-6 h-6" />
              <span class="ml-3">Tracking</span>
            </A>
          </li>
          <li>
            <A href="/orders" class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100">
              <FiShoppingCart class="w-6 h-6" />
              <span class="ml-3">Orders</span>
            </A>
          </li>
          <li>
            <A href="/reports" class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100">
              <FiBarChart2 class="w-6 h-6" />
              <span class="ml-3">Reports</span>
            </A>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;