import { Component, createSignal, For } from "solid-js";
import Card from "../components/common/Card";

const Routes: Component = () => {
  const [selectedRoute, setSelectedRoute] = createSignal<string | null>(null);

  const routes = [
    {
      id: "R001",
      name: "Downtown Route",
      stops: 8,
      distance: "45 km",
      duration: "2.5 hrs",
      driver: "John Doe",
      vehicle: "Truck 001",
      status: "Active"
    },
    {
      id: "R002",
      name: "Suburban Route",
      stops: 12,
      distance: "75 km",
      duration: "4 hrs",
      driver: "Jane Smith",
      vehicle: "Van 003",
      status: "Scheduled"
    },
    {
      id: "R003",
      name: "Highway Route",
      stops: 5,
      distance: "120 km",
      duration: "3 hrs",
      driver: "Mike Johnson",
      vehicle: "Truck 002",
      status: "Completed"
    }
  ];

  const stats = [
    { label: "Active Routes", value: "12", trend: "+2", color: "bg-blue-500" },
    { label: "Total Distance", value: "450 km", trend: "+45 km", color: "bg-green-500" },
    { label: "Avg. Duration", value: "3.2 hrs", trend: "-0.3 hrs", color: "bg-purple-500" },
    { label: "Efficiency", value: "94%", trend: "+2%", color: "bg-yellow-500" }
  ];

  return (
    <div class="p-6 space-y-6">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Route Planning</h1>
          <p class="text-sm text-gray-500 mt-1">Optimize delivery routes and schedules</p>
        </div>
        <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Create New Route
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

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2">
          <Card>
            <div class="h-[400px] bg-gray-100 rounded-lg flex items-center justify-center">
              <p class="text-gray-500">Route map visualization will be displayed here</p>
            </div>
          </Card>
        </div>

        <div>
          <Card title="Route List">
            <div class="space-y-4">
              <For each={routes}>
                {(route) => (
                  <div
                    class={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedRoute() === route.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedRoute(route.id)}
                  >
                    <div class="flex justify-between items-start">
                      <div>
                        <h3 class="font-medium text-gray-900">{route.name}</h3>
                        <p class="text-sm text-gray-500 mt-1">Driver: {route.driver}</p>
                      </div>
                      <span class={`px-2 py-1 text-xs font-medium rounded-full ${
                        route.status === 'Active' ? 'bg-green-100 text-green-800' :
                        route.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {route.status}
                      </span>
                    </div>
                    <div class="mt-4 grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p class="text-gray-500">Stops</p>
                        <p class="font-medium text-gray-900">{route.stops}</p>
                      </div>
                      <div>
                        <p class="text-gray-500">Distance</p>
                        <p class="font-medium text-gray-900">{route.distance}</p>
                      </div>
                      <div>
                        <p class="text-gray-500">Duration</p>
                        <p class="font-medium text-gray-900">{route.duration}</p>
                      </div>
                    </div>
                  </div>
                )}
              </For>
            </div>
          </Card>
        </div>
      </div>

      <Card title="Route Details">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-4">Stop Sequence</h3>
            <div class="space-y-4">
              {[1, 2, 3, 4, 5].map((stop) => (
                <div class="flex items-center space-x-4">
                  <div class="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                    {stop}
                  </div>
                  <div>
                    <p class="font-medium text-gray-900">Stop {stop}</p>
                    <p class="text-sm text-gray-500">Estimated arrival: 10:{stop}0 AM</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-4">Route Analytics</h3>
            <div class="space-y-4">
              <div class="bg-gray-50 p-4 rounded-lg">
                <p class="text-sm text-gray-500">Traffic Conditions</p>
                <div class="mt-2 h-4 bg-green-200 rounded-full">
                  <div class="h-4 bg-green-500 rounded-full" style="width: 75%"></div>
                </div>
                <p class="text-sm text-gray-600 mt-1">Light traffic expected</p>
              </div>
              <div class="bg-gray-50 p-4 rounded-lg">
                <p class="text-sm text-gray-500">Weather Impact</p>
                <div class="mt-2 h-4 bg-yellow-200 rounded-full">
                  <div class="h-4 bg-yellow-500 rounded-full" style="width: 30%"></div>
                </div>
                <p class="text-sm text-gray-600 mt-1">Minor delays possible</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Routes;