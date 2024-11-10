import { Component, createSignal, onMount } from "solid-js";
import Card from "../components/common/Card";
import { Chart as ChartJS, registerables } from 'chart.js';

ChartJS.register(...registerables);

const Inventory: Component = () => {
  const [filterCategory, setFilterCategory] = createSignal("all");
  const [searchQuery, setSearchQuery] = createSignal("");
  let stockChartRef: HTMLCanvasElement;

  const categories = [
    { id: "all", name: "All Items" },
    { id: "fruits", name: "Fruits" },
    { id: "vegetables", name: "Vegetables" },
    { id: "dairy", name: "Dairy" },
    { id: "meat", name: "Meat" },
    { id: "bakery", name: "Bakery" }
  ];

  const inventory = [
    {
      id: 1,
      name: "Organic Apples",
      category: "fruits",
      stock: 85,
      unit: "kg",
      price: 2.99,
      supplier: "Green Valley Farms",
      lastRestocked: "2024-03-10",
      status: "normal",
      image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6"
    },
    {
      id: 2,
      name: "Fresh Milk",
      category: "dairy",
      stock: 120,
      unit: "liters",
      price: 3.49,
      supplier: "Dairy Fresh Co.",
      lastRestocked: "2024-03-12",
      status: "normal",
      image: "https://images.unsplash.com/photo-1563636619-e9143da7973b"
    },
    {
      id: 3,
      name: "Tomatoes",
      category: "vegetables",
      stock: 25,
      unit: "kg",
      price: 1.99,
      supplier: "Local Greenhouse",
      lastRestocked: "2024-03-11",
      status: "low",
      image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfca"
    }
  ];

  onMount(() => {
    new ChartJS(stockChartRef, {
      type: 'bar',
      data: {
        labels: ['Fruits', 'Vegetables', 'Dairy', 'Meat', 'Bakery'],
        datasets: [{
          label: 'Current Stock Level (%)',
          data: [85, 72, 90, 65, 88],
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 159, 64, 0.5)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(255, 159, 64)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 100
          }
        }
      }
    });
  });

  return (
    <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 space-y-6">
      <header class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-900">Inventory Management</h1>
        <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Add New Item
        </button>
      </header>

      <section class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[
          { title: "Total Items", value: "156", trend: "+5", color: "bg-blue-500" },
          { title: "Low Stock Items", value: "8", trend: "-2", color: "bg-yellow-500" },
          { title: "Out of Stock", value: "3", trend: "+1", color: "bg-red-500" },
          { title: "Value", value: "$45,250", trend: "+$1,200", color: "bg-green-500" }
        ].map((stat) => (
          <div class={`${stat.color} rounded-lg p-4 text-white flex flex-col justify-between`}>
            <h3 class="text-sm font-medium opacity-80">{stat.title}</h3>
            <p class="text-2xl font-bold mt-2">{stat.value}</p>
            <p class="text-sm mt-1 opacity-80">{stat.trend} this week</p>
          </div>
        ))}
      </section>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card class="lg:col-span-2">
          <h2 class="text-lg font-semibold mb-4">Stock Levels by Category</h2>
          <div class="h-64">
            <canvas ref={stockChartRef!}></canvas>
          </div>
        </Card>

        <Card>
          <h2 class="text-lg font-semibold mb-4">Low Stock Alerts</h2>
          <div class="space-y-4">
            {inventory
              .filter(item => item.status === "low")
              .map(item => (
                <div class="flex items-center space-x-4 p-3 bg-red-50 rounded-lg">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    class="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <p class="font-medium text-gray-900">{item.name}</p>
                    <p class="text-sm text-red-600">Only {item.stock} {item.unit} left</p>
                  </div>
                </div>
              ))}
          </div>
        </Card>
      </div>

      <Card>
        <header class="flex justify-between items-center mb-6">
          <h2 class="text-lg font-semibold">Inventory List</h2>
          <div class="flex space-x-4">
            <select
              value={filterCategory()}
              onChange={(e) => setFilterCategory(e.currentTarget.value)}
              class="rounded-lg border-gray-300 text-sm"
            >
              {categories.map(category => (
                <option value={category.id}>{category.name}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Search items..."
              value={searchQuery()}
              onInput={(e) => setSearchQuery(e.currentTarget.value)}
              class="rounded-lg border-gray-300 text-sm"
            />
          </div>
        </header>

        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                {["Item", "Category", "Stock", "Price", "Supplier", "Last Restocked", "Status"].map(header => (
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              {inventory
                .filter(item => filterCategory() === "all" || item.category === filterCategory())
                .filter(item => item.name.toLowerCase().includes(searchQuery().toLowerCase()))
                .map(item => (
                  <tr class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          class="w-10 h-10 rounded-lg object-cover mr-3"
                        />
                        <div class="text-sm font-medium text-gray-900">{item.name}</div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.category}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.stock} {item.unit}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${item.price}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.supplier}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(item.lastRestocked).toLocaleDateString()}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.status}
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

export default Inventory;
