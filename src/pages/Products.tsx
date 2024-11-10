import { Component, createSignal } from "solid-js";
import Card from "../components/common/Card";

const Products: Component = () => {
  const [searchQuery, setSearchQuery] = createSignal("");
  const [selectedCategory, setSelectedCategory] = createSignal("all");

  const categories = [
    { id: "all", name: "All Products" },
    { id: "fruits", name: "Fruits & Vegetables" },
    { id: "dairy", name: "Dairy & Eggs" },
    { id: "meat", name: "Meat & Poultry" },
    { id: "bakery", name: "Bakery" },
    { id: "pantry", name: "Pantry Items" }
  ];

  const products = [
    {
      id: 1,
      name: "Organic Apples",
      category: "fruits",
      price: 4.99,
      unit: "per lb",
      stock: 150,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2",
      supplier: "Green Valley Farms",
      organic: true
    },
    {
      id: 2,
      name: "Fresh Milk",
      category: "dairy",
      price: 3.99,
      unit: "per gallon",
      stock: 75,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1563636619-e9143da7973b",
      supplier: "Local Dairy Co.",
      organic: true
    },
    {
      id: 3,
      name: "Whole Grain Bread",
      category: "bakery",
      price: 5.49,
      unit: "per loaf",
      stock: 45,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff",
      supplier: "Artisan Bakery",
      organic: false
    },
    {
      id: 4,
      name: "Free Range Eggs",
      category: "dairy",
      price: 6.99,
      unit: "per dozen",
      stock: 100,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1518569656558-1f25e69d93d7",
      supplier: "Happy Hens Farm",
      organic: true
    },
    {
      id: 5,
      name: "Fresh Tomatoes",
      category: "fruits",
      price: 3.99,
      unit: "per lb",
      stock: 200,
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfca",
      supplier: "Local Greenhouse",
      organic: true
    },
    {
      id: 6,
      name: "Grass-Fed Beef",
      category: "meat",
      price: 12.99,
      unit: "per lb",
      stock: 50,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1603048297172-c92544798d5a",
      supplier: "Green Pastures Ranch",
      organic: true
    }
  ];

  const filteredProducts = () => {
    return products.filter(product => {
      const matchesCategory = selectedCategory() === "all" || product.category === selectedCategory();
      const matchesSearch = product.name.toLowerCase().includes(searchQuery().toLowerCase());
      return matchesCategory && matchesSearch;
    });
  };

  return (
    <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 space-y-6">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-900">Products</h1>
        <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Add New Product
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Products", value: products.length, trend: "+5", color: "bg-blue-500" },
          { label: "Low Stock", value: "3", trend: "-2", color: "bg-yellow-500" },
          { label: "Out of Stock", value: "0", trend: "0", color: "bg-green-500" },
          { label: "Categories", value: categories.length - 1, trend: "+1", color: "bg-purple-500" }
        ].map((stat) => (
          <div class={`${stat.color} rounded-lg p-4 text-white`}>
            <h3 class="text-sm font-medium opacity-80">{stat.label}</h3>
            <p class="text-2xl font-bold mt-2">{stat.value}</p>
            <p class="text-sm mt-1 opacity-80">{stat.trend} this week</p>
          </div>
        ))}
      </div>

      <Card>
        <div class="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
          <div class="flex space-x-4 w-full md:w-auto">
            <select
              value={selectedCategory()}
              onChange={(e) => setSelectedCategory(e.currentTarget.value)}
              class="rounded-lg border-gray-300 text-sm"
            >
              {categories.map(category => (
                <option value={category.id}>{category.name}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery()}
              onInput={(e) => setSearchQuery(e.currentTarget.value)}
              class="rounded-lg border-gray-300 text-sm flex-grow md:flex-grow-0"
            />
          </div>
          <div class="flex space-x-2">
            <button class="px-3 py-2 text-sm text-gray-600 hover:text-gray-900">
              Sort by: Price ↓
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts().map((product) => (
            <div class="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div class="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  class="w-full h-48 object-cover"
                />
                {product.organic && (
                  <span class="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    Organic
                  </span>
                )}
              </div>
              <div class="p-4">
                <div class="flex justify-between items-start">
                  <div>
                    <h3 class="text-lg font-semibold text-gray-900">{product.name}</h3>
                    <p class="text-sm text-gray-500">{product.supplier}</p>
                  </div>
                  <div class="text-right">
                    <p class="text-lg font-bold text-gray-900">${product.price}</p>
                    <p class="text-sm text-gray-500">{product.unit}</p>
                  </div>
                </div>
                <div class="mt-4 flex items-center justify-between">
                  <div class="flex items-center">
                    <span class="text-yellow-400">★</span>
                    <span class="ml-1 text-sm text-gray-600">{product.rating}</span>
                  </div>
                  <div class={`text-sm ${
                    product.stock > 50 ? 'text-green-600' : 'text-yellow-600'
                  }`}>
                    {product.stock} in stock
                  </div>
                </div>
                <div class="mt-4 flex space-x-2">
                  <button class="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Edit
                  </button>
                  <button class="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Products;