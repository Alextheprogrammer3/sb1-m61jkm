import { Component } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { useAuthContext } from "../auth/AuthProvider";
import DropdownMenu from "../ui/dropdown-menu";

const ProfileDropdown: Component = () => {
  const navigate = useNavigate();
  const auth = useAuthContext();

  const ProfileTrigger = (
    <button class="p-2 rounded-full hover:bg-gray-100">
      <span class="sr-only">Open user menu</span>
      <div class="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
        {auth.user()?.email?.[0].toUpperCase() || "U"}
      </div>
    </button>
  );

  const handleSignOut = async () => {
    await auth.signOut();
    navigate("/auth/login");
  };

  return (
    <DropdownMenu trigger={ProfileTrigger} align="right">
      <div class="py-2">
        <div class="px-4 py-2 text-sm text-gray-900">
          <div class="font-medium">{auth.user()?.email}</div>
          <div class="text-xs text-gray-500">Administrator</div>
        </div>
        <div class="border-t border-gray-100">
          <button
            onClick={() => navigate("/dashboard/profile")}
            class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Your Profile
          </button>
          <button
            onClick={() => navigate("/dashboard/settings")}
            class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Settings
          </button>
          <button
            onClick={() => navigate("/dashboard/team")}
            class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Team Management
          </button>
        </div>
        <div class="border-t border-gray-100">
          <button
            onClick={handleSignOut}
            class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 transition-colors"
          >
            Sign out
          </button>
        </div>
      </div>
    </DropdownMenu>
  );
};

export default ProfileDropdown;