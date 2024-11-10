import { Component, createSignal, For, Show } from "solid-js";
import { useOrders } from "../hooks/useOrders";
import Card from "../components/common/Card";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { StatusBadge } from "../components/ui/status-badge";
import { formatCurrency, formatDate } from "../lib/utils";

const Orders: Component = () => {
  const [filterStatus, setFilterStatus] = createSignal("all");
  const [searchQuery, setSearchQuery] = createSignal("");
  const orders = useOrders();

  const filteredOrders = () => {
    return orders.data?.filter(order => {
      const matchesStatus = filterStatus() === "all" || order.status === filterStatus();
      const matchesSearch = order.id.toLowerCase().includes(searchQuery().toLowerCase()) ||
                          order.store.toLowerCase().includes(searchQuery().toLowerCase());
      return matchesStatus && matchesSearch;
    });
  };

  const stats = [
    { label: "Total Orders", value: orders.data?.length || 0, color: "bg-blue-500" },
    { label: "In Transit", value: orders.data?.filter(o => o.status === "In Transit").length || 0, color: "bg-yellow-500" },
    { label: "Delivered", value: orders.data?.filter(o => o.status === "Delivered").length || 0, color: "bg-green-500" },
    { label: "Pending", value: orders.data?.filter(o => o.status === "Pending").length || 0, color: "bg-purple-500" }
  ];

  return (
    <div class="p-6 space-y-6">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-900">Orders Management</h1>
        <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Create New Order
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map(stat => (
          <div class={`${stat.color} rounded-lg p-4 text-white`}>
            <h3 class="text-sm font-medium opacity-80">{stat.label}</h3>
            <p class="text-2xl font-bold mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      <Card>
        <div class="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div class="flex gap-4 w-full sm:w-auto">
            <select
              value={filterStatus()}
              onChange={(e) => setFilterStatus(e.currentTarget.value)}
              class="rounded-lg border-gray-300 text-sm"
            >
              <option value="all">All Status</option>
              <option value="Pending">Pending</option>
              <option value="In Transit">In Transit</option>
              <option value="Delivered">Delivered</option>
            </select>
            <input
              type="text"
              placeholder="Search orders..."
              value={searchQuery()}
              onInput={(e) => setSearchQuery(e.currentTarget.value)}
              class="rounded-lg border-gray-300 text-sm flex-grow sm:flex-grow-0"
            />
          </div>
        </div>

        <Show when={!orders.isLoading} fallback={<LoadingSpinner />}>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Store</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Delivery Date</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <For each={filteredOrders()}>
                  {(order) => (
                    <tr class="hover:bg-gray-50">
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {order.id}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.store}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={order.status} />
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(order.delivery_date)}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatCurrency(order.total_amount)}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div class="flex space-x-2">
                          <button class="text-blue-600 hover:text-blue-800">View</button>
                          <button class="text-green-600 hover:text-green-800">Edit</button>
                        </div>
                      </td>
                    </tr>
                  )}
                </For>
              </tbody>
            </table>
          </div>
        </Show>
      </Card>
    </div>
  );
};

export default Orders;