import { Component, createSignal, onMount } from "solid-js";
import Card from "../components/common/Card";
import { Chart as ChartJS, registerables } from 'chart.js';

ChartJS.register(...registerables);

const Analytics: Component = () => {
  const [timeRange, setTimeRange] = createSignal("7days");
  let revenueChartRef: HTMLCanvasElement;
  let ordersChartRef: HTMLCanvasElement;
  let customersChartRef: HTMLCanvasElement;

  const metrics = [
    { 
      title: "Total Revenue", 
      value: "$124,500", 
      change: "+12.5%",
      trend: "up",
      color: "bg-green-500"
    },
    { 
      title: "Orders", 
      value: "450", 
      change: "+8.2%",
      trend: "up",
      color: "bg-blue-500"
    },
    { 
      title: "Average Order Value", 
      value: "$276.67", 
      change: "+4.3%",
      trend: "up",
      color: "bg-purple-500"
    },
    { 
      title: "Customer Satisfaction", 
      value: "4.8/5", 
      change: "+0.2",
      trend: "up",
      color: "bg-yellow-500"
    }
  ];

  onMount(() => {
    // Revenue Chart
    new ChartJS(revenueChartRef, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Revenue',
          data: [30000, 35000, 32000, 40000, 45000, 50000],
          borderColor: 'rgb(34, 197, 94)',
          tension: 0.4,
          fill: true,
          backgroundColor: 'rgba(34, 197, 94, 0.1)',
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
          title: {
            display: true,
            text: 'Revenue Trend'
          }
        }
      }
    });

    // Orders Chart
    new ChartJS(ordersChartRef, {
      type: 'bar',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Orders',
          data: [65, 59, 80, 81, 56, 55, 70],
          backgroundColor: 'rgba(59, 130, 246, 0.8)',
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
          title: {
            display: true,
            text: 'Daily Orders'
          }
        }
      }
    });

    // Customers Chart
    new ChartJS(customersChartRef, {
      type: 'doughnut',
      data: {
        labels: ['New', 'Returning', 'Inactive'],
        datasets: [{
          data: [30, 50, 20],
          backgroundColor: [
            'rgba(34, 197, 94, 0.8)',
            'rgba(59, 130, 246, 0.8)',
            'rgba(239, 68, 68, 0.8)'
          ]
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
          title: {
            display: true,
            text: 'Customer Distribution'
          }
        }
      }
    });
  });

  return (
    <div class="p-6 space-y-6">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
        <select
          value={timeRange()}
          onChange={(e) => setTimeRange(e.currentTarget.value)}
          class="rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="7days">Last 7 Days</option>
          <option value="30days">Last 30 Days</option>
          <option value="90days">Last 90 Days</option>
        </select>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <Card>
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-600">{metric.title}</p>
                <p class="text-2xl font-bold mt-1">{metric.value}</p>
              </div>
              <div class={`p-3 rounded-full ${metric.color} bg-opacity-10`}>
                <span class={`text-${metric.color.split('-')[1]}-700 text-xl`}>
                  {metric.trend === 'up' ? '↑' : '↓'}
                </span>
              </div>
            </div>
            <div class="mt-4">
              <span class={`text-sm ${
                metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.change}
              </span>
              <span class="text-sm text-gray-500"> vs previous period</span>
            </div>
          </Card>
        ))}
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div class="h-80">
            <canvas ref={revenueChartRef!}></canvas>
          </div>
        </Card>
        <Card>
          <div class="h-80">
            <canvas ref={ordersChartRef!}></canvas>
          </div>
        </Card>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <div class="h-64">
            <canvas ref={customersChartRef!}></canvas>
          </div>
        </Card>
        <Card class="lg:col-span-2">
          <h3 class="text-lg font-semibold mb-4">Top Products</h3>
          <div class="space-y-4">
            {[
              { name: "Organic Apples", sales: 1234, growth: "+12%" },
              { name: "Fresh Milk", sales: 1100, growth: "+8%" },
              { name: "Whole Grain Bread", sales: 950, growth: "+5%" }
            ].map((product) => (
              <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span class="font-medium">{product.name}</span>
                <div class="text-right">
                  <span class="block font-medium">{product.sales} units</span>
                  <span class="text-sm text-green-600">{product.growth}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;