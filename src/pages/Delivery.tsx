import { Component, createSignal, For } from "solid-js";
import Card from "../components/common/Card";
import { StatusBadge } from "../components/ui/status-badge";

const Delivery: Component = () => {
  const [selectedTab, setSelectedTab] = createSignal("upcoming");

  const deliveries = {
    upcoming: [
      { id: "D001", customer: "Fresh Market", time: "10:30 AM", status: "Scheduled", items: 12, address: "123 Market St" },
      { id: "D002", customer: "Green Grocers", time: "11:15 AM", status: "En Route", items: 8, address: "456 Grove Ave" }
    ],
    completed: [
      { id: "D003", customer: "Food Co-op", time: "09:00 AM", status: "Delivered", items: 15, address: "789 Main St" },
      { id: "D004", customer: "Local Store", time: "08:30 AM", status: "Delivered", items: 10, address: "321 Oak Rd" }
    ]
  };

  const stats = [
    { label: "Today's Deliveries", value: "45", trend: "+12%", color: "bg-blue-500" },
    { label: "On Time Rate", value: "98%", trend: "+2%", color: "bg-green-500" },
    { label: "Average Time", value: "28m", trend: "-5m", color: "bg-purple-500" },
    { label: "Customer Rating", value: "4.9", trend: "+0.2", color: "bg-yellow-500" }
  ];

  return (
    <div class="p-6 space-y-6">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Delivery Management</h1>
          <p class="text-sm text-gray-500 mt-1">Manage and track all deliveries</p>
        </div>
        <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Schedule Delivery
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map(stat => (
          <div class={`${stat.color} rounded-lg p-4 text-white`}>
            <h3 class="text-sm font-medium opacity-80">{stat.label}</h3>
            <p class="text-2xl font-bold mt-2">{stat.value}</p>
            <p class="text-sm mt-1 opacity-80">{stat.trend} vs last week</p>
          </div>
        ))}
      </div>

      <Card>
        <div class="border-b border-gray-200">
          <nav class="-mb-px flex space-x-8">
            <button
              onClick={() => setSelectedTab("upcoming")}
              class={`py-4 px-1 border-b-2 font-medium text-sm ${
                selectedTab() === "upcoming"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Upcoming Deliveries
            </button>
            <button
              onClick={() => setSelectedTab("completed")}
              class={`py-4 px-1 border-b-2 font-medium text-sm ${
                selectedTab() === "completed"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Completed Deliveries
            </button>
          </nav>
        </div>

        <div class="mt-6">
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Delivery ID</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Address</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <For each={deliveries[selectedTab() as keyof typeof deliveries]}>
                  {(delivery) => (
                    <tr class="hover:bg-gray-50">
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {delivery.id}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {delivery.customer}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {delivery.time}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={delivery.status} />
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {delivery.items} items
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {delivery.address}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div class="flex space-x-2">
                          <button class="text-blue-600 hover:text-blue-800">View</button>
                          {selectedTab() === "upcoming" && (
                            <button class="text-green-600 hover:text-green-800">Edit</button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </For>
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Delivery;