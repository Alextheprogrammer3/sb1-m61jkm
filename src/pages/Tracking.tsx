import { Component, createSignal, For } from "solid-js";
import Card from "../components/common/Card";
import { StatusBadge } from "../components/ui/status-badge";

const Tracking: Component = () => {
  const [selectedVehicle, setSelectedVehicle] = createSignal<string | null>(null);

  const vehicles = [
    { id: "V001", type: "Truck", driver: "John Doe", status: "In Transit", location: "Route 66, Mile 120" },
    { id: "V002", type: "Van", driver: "Jane Smith", status: "Delivering", location: "Downtown Market District" },
    { id: "V003", type: "Truck", driver: "Mike Johnson", status: "Loading", location: "Central Warehouse" }
  ];

  const deliveries = [
    { id: "D001", destination: "Fresh Market", eta: "10:30 AM", status: "In Transit", items: 12 },
    { id: "D002", destination: "Green Grocers", eta: "11:15 AM", status: "Pending", items: 8 },
    { id: "D003", destination: "Food Co-op", eta: "12:00 PM", status: "Delivered", items: 15 }
  ];

  return (
    <div class="p-6 space-y-6">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-900">Live Tracking</h1>
        <div class="flex space-x-4">
          <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            View All Routes
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2">
          <Card>
            <div class="h-[400px] bg-gray-100 rounded-lg flex items-center justify-center">
              <p class="text-gray-500">Interactive map will be displayed here</p>
            </div>
          </Card>
        </div>

        <div class="space-y-6">
          <Card title="Active Vehicles">
            <div class="space-y-4">
              <For each={vehicles}>
                {(vehicle) => (
                  <div 
                    class={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedVehicle() === vehicle.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedVehicle(vehicle.id)}
                  >
                    <div class="flex justify-between items-start">
                      <div>
                        <h3 class="font-medium text-gray-900">{vehicle.type} #{vehicle.id}</h3>
                        <p class="text-sm text-gray-500 mt-1">Driver: {vehicle.driver}</p>
                      </div>
                      <StatusBadge status={vehicle.status} />
                    </div>
                    <p class="text-sm text-gray-600 mt-2">{vehicle.location}</p>
                  </div>
                )}
              </For>
            </div>
          </Card>
        </div>
      </div>

      <Card title="Today's Deliveries">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Delivery ID</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Destination</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ETA</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <For each={deliveries}>
                {(delivery) => (
                  <tr class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {delivery.id}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {delivery.destination}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {delivery.eta}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={delivery.status} />
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {delivery.items} items
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button class="text-blue-600 hover:text-blue-800">View Details</button>
                    </td>
                  </tr>
                )}
              </For>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Tracking;