import { createSignal, createResource } from "solid-js";

export function useNotifications() {
  const [unreadCount, setUnreadCount] = createSignal(0);

  const [notifications] = createResource(async () => {
    // Simulated API call
    const response = await new Promise(resolve => 
      setTimeout(() => resolve([
        { id: 1, message: "New order received", read: false },
        { id: 2, message: "Delivery completed", read: false }
      ]), 1000)
    );
    setUnreadCount(2);
    return response;
  });

  return {
    notifications,
    unreadCount,
    markAsRead: (id: number) => {
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
  };
}