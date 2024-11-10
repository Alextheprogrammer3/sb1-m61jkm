import { Component } from "solid-js";
import { FiUser, FiBell } from 'solid-icons/fi';

const Navbar: Component = () => {
  return (
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <h1 class="text-xl font-semibold text-gray-800">Food Logistics Hub</h1>
          </div>
          <div class="flex items-center gap-4">
            <button class="p-2 rounded-full hover:bg-gray-100">
              <FiBell class="w-6 h-6 text-gray-600" />
            </button>
            <button class="p-2 rounded-full hover:bg-gray-100">
              <FiUser class="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;