import { Component, createSignal } from "solid-js";
import { Chart as ChartJS, registerables } from "chart.js";
import Card from "../components/common/Card";

ChartJS.register(...registerables);

const Reports: Component = () => {
  const [timeRange, setTimeRange] = createSignal("week");
  const [selectedDate, setSelectedDate] = createSignal(new Date());
  let salesChartRef: HTMLCanvasElement;
  let customerChartRef: HTMLCanvasElement;
  let inventoryChartRef: HTMLCanvasElement;
  let engagementChartRef: HTMLCanvasElement;

  const initializeCharts = () => {
    if (salesChartRef) {
      new ChartJS(salesChartRef, {
        type: "line",
        data: {
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          datasets: [
            {
              label: "Sales ($)",
              data: [12500, 15800, 14200, 16800, 19200, 18100, 22000],
              borderColor: "rgb(59, 130, 246)",
              tension: 0.1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "bottom",
            },
          },
        },
      });
    }

    if (customerChartRef) {
      new ChartJS(customerChartRef, {
        type: "doughnut",
        data: {
          labels: ["New", "Returning", "Inactive"],
          datasets: [{
            data: [30, 55, 15],
            backgroundColor: [
              'rgb(59, 130, 246)',
              'rgb(16, 185, 129)',
              'rgb(239, 68, 68)'
            ]
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      });
    }

    if (inventoryChartRef) {
      new ChartJS(inventoryChartRef, {
        type: "bar",
        data: {
          labels: ["Fruits", "Vegetables", "Dairy", "Meat", "Bakery"],
          datasets: [{
            label: "Stock Level",
            data: [85, 72, 90, 65, 88],
            backgroundColor: 'rgba(59, 130, 246, 0.5)'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      });
    }

    if (engagementChartRef) {
      new ChartJS(engagementChartRef, {
        type: "line",
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          datasets: [{
            label: "Active Users",
            data: [1200, 1350, 1500, 1800, 2100, 2400],
            borderColor: 'rgb(16, 185, 129)',
            tension: 0.3
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      });
    }
  };

  setTimeout(initializeCharts, 0);

  return (
    <div class="space-y-6 p-6">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
        <div class="flex space-x-2">
          <select
            value={timeRange()}
            onChange={(e) => setTimeRange(e.currentTarget.value)}
            class="rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
            <option value="quarter">Last Quarter</option>
          </select>
          <input
            type="date"
            value={selectedDate().toISOString().split('T')[0]}
            onChange={(e) => setSelectedDate(new Date(e.currentTarget.value))}
            class="rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Sales Performance">
          <div class="h-64">
            <canvas ref={salesChartRef!}></canvas>
          </div>
        </Card>

        <Card title="Customer Distribution">
          <div class="h-64">
            <canvas ref={customerChartRef!}></canvas>
          </div>
        </Card>

        <Card title="Inventory Levels">
          <div class="h-64">
            <canvas ref={inventoryChartRef!}></canvas>
          </div>
        </Card>

        <Card title="User Engagement">
          <div class="h-64">
            <canvas ref={engagementChartRef!}></canvas>
          </div>
        </Card>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Top Products">
          <div class="space-y-4">
            {["Organic Apples", "Fresh Milk", "Whole Grain Bread"].map((product) => (
              <div class="flex justify-between items-center">
                <span>{product}</span>
                <span class="font-semibold">${Math.floor(Math.random() * 3000) + 2000}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Customer Satisfaction">
          <div class="text-center">
            <div class="text-5xl font-bold text-green-500 mb-2">4.8</div>
            <div class="text-gray-600">Average Rating</div>
            <div class="mt-4 flex justify-center space-x-1">
              {"★★★★★".split("").map((star) => (
                <span class="text-yellow-400 text-xl">{star}</span>
              ))}
            </div>
          </div>
        </Card>

        <Card title="Recent Activity">
          <div class="space-y-4">
            {[
              "New order #12345",
              "Stock updated: +50 items",
              "Customer feedback received"
            ].map((activity) => (
              <div class="flex items-center space-x-2">
                <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>{activity}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Reports;