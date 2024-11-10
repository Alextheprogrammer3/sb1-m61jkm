import { Component, createSignal } from "solid-js";
import Card from "../components/common/Card";

const FarmManagement: Component = () => {
  const [selectedFarm, setSelectedFarm] = createSignal(null);

  const farms = [
    {
      id: 1,
      name: "Green Valley Organic Farm",
      location: "California, USA",
      size: "250 acres",
      mainCrops: ["Apples", "Tomatoes", "Lettuce"],
      certifications: ["Organic", "Non-GMO"],
      image: "https://images.unsplash.com/photo-1500076656116-558758c991c1"
    },
    {
      id: 2,
      name: "Sunrise Dairy Farm",
      location: "Wisconsin, USA",
      size: "180 acres",
      mainCrops: ["Milk", "Cheese", "Yogurt"],
      certifications: ["Grade A Dairy"],
      image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30"
    },
    {
      id: 3,
      name: "Fresh Harvest Vegetables",
      location: "Oregon, USA",
      size: "150 acres",
      mainCrops: ["Carrots", "Broccoli", "Peppers"],
      certifications: ["Organic", "Sustainable"],
      image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2"
    }
  ];

  const farmMetrics = [
    { label: "Total Production", value: "1,250 tons", trend: "+8%" },
    { label: "Active Orders", value: "45", trend: "+12%" },
    { label: "Quality Rating", value: "4.8/5", trend: "+0.2" },
    { label: "Sustainability Score", value: "92%", trend: "+5%" }
  ];

  return (
    <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 space-y-6">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Farm Management</h1>
          <p class="text-sm text-gray-500 mt-1">Monitor and manage farm operations</p>
        </div>
        <button class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          Add New Farm
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        {farmMetrics.map((metric) => (
          <div class="bg-white rounded-lg p-4 shadow-sm">
            <h3 class="text-sm font-medium text-gray-500">{metric.label}</h3>
            <p class="text-2xl font-bold text-gray-900 mt-2">{metric.value}</p>
            <p class="text-sm text-green-600 mt-1">{metric.trend} this month</p>
          </div>
        ))}
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {farms.map((farm) => (
          <Card>
            <div class="relative">
              <img
                src={farm.image}
                alt={farm.name}
                class="w-full h-48 object-cover rounded-lg mb-4"
              />
              <div class="absolute top-2 right-2 space-x-2">
                {farm.certifications.map((cert) => (
                  <span class="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                    {cert}
                  </span>
                ))}
              </div>
            </div>
            <h3 class="text-lg font-semibold text-gray-900">{farm.name}</h3>
            <p class="text-sm text-gray-500 mt-1">{farm.location}</p>
            <div class="mt-4 space-y-2">
              <div class="flex justify-between text-sm">
                <span class="text-gray-500">Size:</span>
                <span class="text-gray-900 font-medium">{farm.size}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-500">Main Crops:</span>
                <span class="text-gray-900 font-medium">{farm.mainCrops.join(", ")}</span>
              </div>
            </div>
            <div class="mt-6 flex space-x-3">
              <button class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                View Details
              </button>
              <button class="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                Contact
              </button>
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-lg font-semibold">Upcoming Harvests</h2>
          <button class="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Crop</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Farm</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Expected Yield</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Harvest Date</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              {[
                { crop: "Apples", farm: "Green Valley", yield: "25 tons", date: "2024-03-20", status: "On Track" },
                { crop: "Tomatoes", farm: "Fresh Harvest", yield: "15 tons", date: "2024-03-22", status: "Delayed" },
                { crop: "Lettuce", farm: "Green Valley", yield: "10 tons", date: "2024-03-25", status: "On Track" }
              ].map((harvest) => (
                <tr class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {harvest.crop}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {harvest.farm}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {harvest.yield}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(harvest.date).toLocaleDateString()}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${harvest.status === 'On Track' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {harvest.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default FarmManagement;