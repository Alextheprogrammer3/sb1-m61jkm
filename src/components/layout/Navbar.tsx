import { Component } from "solid-js";
import NotificationDropdown from "../notifications/notification-dropdown";
import ProfileDropdown from "../profile/profile-dropdown";

const Navbar: Component = () => {
  return (
    <header class="bg-white border-b border-gray-200">
      <div class="px-4 py-3">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold text-gray-800">Farm2Store</h2>
          <div class="flex items-center space-x-4">
            <NotificationDropdown />
            <ProfileDropdown />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;