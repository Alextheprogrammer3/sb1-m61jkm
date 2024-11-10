import { Component, Show, For } from "solid-js";
import { useNotifications } from "../../hooks/useNotifications";
import DropdownMenu from "../ui/dropdown-menu";

const NotificationDropdown: Component = () => {
  const { notifications, unreadCount, markAsRead } = useNotifications();

  const NotificationTrigger = (
    <button class="relative p-2 rounded-full hover:bg-gray-100">
      <span class="sr-only">View notifications</span>
      <span class="text-xl">🔔</span>
      <Show when={unreadCount() > 0}>
        <span class="absolute top-0 right-0 block h-4 w-4 rounded-full bg-red-500 text-xs text-white">
          {unreadCount()}
        </span>
      </Show>
    </button>
  );

  return (
    <DropdownMenu trigger={NotificationTrigger} align="right">
      <div class="py-2">
        <div class="px-4 py-2 text-sm font-medium text-gray-700 border-b">
          Notifications
        </div>
        <div class="max-h-[400px] overflow-y-auto">
          <Show
            when={!notifications.loading}
            fallback={
              <div class="px-4 py-2 text-sm text-gray-500">Loading...</div>
            }
          >
            <For each={notifications()}>
              {(notification) => (
                <button
                  class="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors"
                  onClick={() => markAsRead(notification.id)}
                >
                  <p class="text-sm font-medium text-gray-900">
                    {notification.message}
                  </p>
                  <p class="text-xs text-gray-500 mt-1">2 minutes ago</p>
                </button>
              )}
            </For>
          </Show>
        </div>
        <div class="border-t">
          <button class="block w-full px-4 py-2 text-sm text-blue-600 hover:bg-gray-50 transition-colors">
            View all notifications
          </button>
        </div>
      </div>
    </DropdownMenu>
  );
};

export default NotificationDropdown;