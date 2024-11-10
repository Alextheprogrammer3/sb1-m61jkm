import { Component, createSignal, onMount } from "solid-js";
import Card from "../components/common/Card";
import { Chart as ChartJS, registerables } from 'chart.js';

ChartJS.register(...registerables);

const Dashboard: Component = () => {
  const [activeTimeRange, setActiveTimeRange] = createSignal("7days");
  let performanceChartRef: HTMLCanvasElement;

  const stats = [
    { title: "Active Orders", value: "24", trend: "+12%", icon: "📦", color: "from-blue-500 to-blue-600" },
    { title: "In Transit", value: "12", trend: "+5%", icon: "🚚", color: "from-green-500 to-green-600" },
    { title: "Delivered Today", value: "18", trend: "+8%", icon: "✅", color: "from-purple-500 to-purple-600" },
    { title: "Total Revenue", value: "$12,450", trend: "+15%", icon: "💰", color: "from-amber-500 to-amber-600" }
  ];

  const recentActivity = [
    { 
      id: 1, 
      action: "Order #12345 received from Fresh Foods Market", 
      time: "2 minutes ago", 
      status: "pending",
      details: "5 items • $1,234.56"
    },
    { 
      id: 2, 
      action: "Delivery completed to Green Grocers", 
      time: "15 minutes ago", 
      status: "success",
      details: "On-time delivery • Customer rated 5⭐"
    },
    { 
      id: 3, 
      action: "Payment processed for Order #12342", 
      time: "1 hour ago", 
      status: "success",
      details: "Transaction ID: TRX-789012"
    },
    { 
      id: 4, 
      action: "New route optimized for 5 deliveries", 
      time: "2 hours ago", 
      status: "success",
      details: "Estimated time saved: 45 minutes"
    },
    {
      id: 5,
      action: "Inventory alert: Low stock on Organic Apples",
      time: "3 hours ago",
      status: "warning",
      details: "Current stock: 25 units • Reorder point: 30 units"
    }
  ];

  const topProducts = [
    { 
      name: "Organic Apples", 
      amount: "$3,240", 
      growth: "+12%",
      stock: "85 units",
      trend: "trending_up"
    },
    { 
      name: "Fresh Milk", 
      amount: "$2,890", 
      growth: "+8%",
      stock: "120 units",
      trend: "stable"
    },
    { 
      name: "Whole Grain Bread", 
      amount: "$2,450", 
      growth: "+5%",
      stock: "45 units",
      trend: "trending_down"
    }
  ];

  onMount(() => {
    // Initialize Performance Chart
    new ChartJS(performanceChartRef, {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          {
            label: 'Orders',
            data: [65, 59, 80, 81, 56, 55, 70],
            borderColor: 'rgb(59, 130, 246)',
            tension: 0.4,
            fill: true,
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
          },
          {
            label: 'Revenue',
            data: [28, 48, 40, 19, 86, 27, 90],
            borderColor: 'rgb(16, 185, 129)',
            tension: 0.4,
            fill: true,
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
          title: {
            display: true,
            text: 'Weekly Performance'
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  });

  return (
    <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div class="p-6 space-y-6">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p class="text-sm text-gray-500 mt-1">Welcome back! Here's what's happening today.</p>
          </div>
          <div class="flex items-center space-x-4">
            <div class="text-sm text-gray-500">Last updated: {new Date().toLocaleTimeString()}</div>
            <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Generate Report
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div class={`bg-gradient-to-r ${stat.color} rounded-lg shadow-lg transform hover:scale-105 transition-transform`}>
              <div class="p-6 text-white">
                <div class="flex justify-between items-start">
                  <div>
                    <p class="text-white/80 text-sm font-medium">{stat.title}</p>
                    <p class="mt-2 text-3xl font-bold">{stat.value}</p>
                  </div>
                  <span class="text-2xl">{stat.icon}</span>
                </div>
                <div class="mt-4 flex items-center text-sm">
                  <span class="text-white/90">{stat.trend}</span>
                  <span class="ml-2 text-white/60">vs last week</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card class="lg:col-span-2">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-lg font-semibold text-gray-900">Performance Overview</h2>
              <select 
                class="text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={activeTimeRange()}
                onChange={(e) => setActiveTimeRange(e.currentTarget.value)}
              >
                <option value="7days">Last 7 days</option>
                <option value="30days">Last 30 days</option>
                <option value="90days">Last 90 days</option>
              </select>
            </div>
            <div class="h-64">
              <canvas ref={performanceChartRef!}></canvas>
            </div>
          </Card>

          <Card>
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-lg font-semibold text-gray-900">Recent Activity</h2>
              <button class="text-blue-600 hover:text-blue-700 text-sm font-medium">View all</button>
            </div>
            <div class="space-y-4">
              {recentActivity.map((activity) => (
                <div class="p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div class="flex items-center space-x-3">
                    <div class={`w-2 h-2 rounded-full ${
                      activity.status === 'success' ? 'bg-green-500' : 
                      activity.status === 'warning' ? 'bg-yellow-500' : 
                      'bg-blue-500'
                    }`}></div>
                    <div class="flex-1">
                      <p class="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p class="text-xs text-gray-500 mt-1">{activity.time}</p>
                      <p class="text-xs text-gray-600 mt-1">{activity.details}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-lg font-semibold text-gray-900">Top Products</h2>
              <button class="text-blue-600 hover:text-blue-700 text-sm font-medium">See all</button>
            </div>
            <div class="space-y-4">
              {topProducts.map((product) => (
                <div class="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
                  <div class="flex-1">
                    <div class="flex items-center">
                      <p class="font-medium text-gray-900">{product.name}</p>
                      {product.trend === 'trending_up' && <span class="ml-2 text-green-500">↑</span>}
                      {product.trend === 'trending_down' && <span class="ml-2 text-red-500">↓</span>}
                    </div>
                    <p class="text-sm text-gray-500 mt-1">Stock: {product.stock}</p>
                  </div>
                  <div class="text-right">
                    <p class="font-medium text-gray-900">{product.amount}</p>
                    <p class="text-sm text-green-600">{product.growth}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-lg font-semibold text-gray-900">Delivery Performance</h2>
              <button class="text-blue-600 hover:text-blue-700 text-sm font-medium">Details</button>
            </div>
            <div class="grid grid-cols-3 gap-4">
              {[
                { label: "On Time", value: "95%", color: "text-green-600", icon: "🎯" },
                { label: "Delayed", value: "4%", color: "text-yellow-600", icon: "⚠️" },
                { label: "Issues", value: "1%", color: "text-red-600", icon: "❌" }
              ].map((metric) => (
                <div class="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div class="text-center">
                    <span class="text-2xl">{metric.icon}</span>
                    <p class={`text-2xl font-bold ${metric.color} mt-2`}>{metric.value}</p>
                    <p class="text-sm text-gray-600 mt-1">{metric.label}</p>
                  </div>
                </div>
              ))}
            </div>
            <div class="mt-6 p-4 bg-blue-50 rounded-lg">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-blue-900">Average Delivery Time</p>
                  <p class="text-2xl font-bold text-blue-700">28 mins</p>
                </div>
                <div class="text-right">
                  <p class="text-sm font-medium text-blue-900">Target Time</p>
                  <p class="text-2xl font-bold text-blue-700">30 mins</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;