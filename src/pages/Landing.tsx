import { Component, createSignal, onMount } from "solid-js";
import { useNavigate } from "@solidjs/router";

const Landing: Component = () => {
  const [email, setEmail] = createSignal("");
  const [name, setName] = createSignal("");
  const [company, setCompany] = createSignal("");
  const [submitted, setSubmitted] = createSignal(false);
  const [activeSlide, setActiveSlide] = createSignal(0);
  const navigate = useNavigate();

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setEmail("");
      setName("");
      setCompany("");
      setSubmitted(false);
      navigate("/dashboard");
    }, 2000);
  };

  const navigateToSection = (section: string) => {
    navigate(`/dashboard/${section}`);
  };

  const heroImages = [
    {
      url: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449",
      alt: "Farmer in wheat field",
      caption: "Supporting Local Farmers"
    },
    {
      url: "https://images.unsplash.com/photo-1519331379826-f10be5486c6f",
      alt: "Modern logistics warehouse",
      caption: "State-of-the-art Warehousing"
    },
    {
      url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d",
      alt: "Delivery truck fleet",
      caption: "Efficient Distribution"
    }
  ];

  const features = [
    {
      icon: "🚛",
      title: "Real-time Tracking",
      description: "Monitor your shipments with precision GPS tracking and live updates",
      image: "https://images.unsplash.com/photo-1615460549969-36fa19521a4f",
      path: "tracking"
    },
    {
      icon: "🌾",
      title: "Farm to Store",
      description: "Direct connections between farmers and retailers",
      image: "https://images.unsplash.com/photo-1592982537447-6f2a6a0c7c18",
      path: "orders"
    },
    {
      icon: "📦",
      title: "Inventory Management",
      description: "Smart inventory tracking with predictive analytics",
      image: "https://images.unsplash.com/photo-1553413077-190dd305871c",
      path: "reports"
    }
  ];

  onMount(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  });

  return (
    <div class="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <header class="bg-gray-800 text-white p-4">
        <div class="max-w-7xl mx-auto flex justify-between items-center">
          <h1 class="text-2xl font-bold">Your Company Name</h1>
          <nav class="flex items-center space-x-8">
            <ul class="flex space-x-6">
              <li><a href="#features" class="hover:text-blue-400">Features</a></li>
              <li><a href="#signup" class="hover:text-blue-400">Sign Up</a></li>
              <li><a href="#footer" class="hover:text-blue-400">Contact</a></li>
            </ul>
            <div class="flex items-center space-x-4">
              <button
                onClick={() => navigate("/auth/login")}
                class="px-4 py-2 text-white border-2 border-transparent hover:border-white rounded-lg transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate("/auth/register")}
                class="relative group overflow-hidden rounded-lg font-bold px-4 py-2 transition-all duration-300 ease-out transform hover:scale-105"
              >
                <span class="absolute inset-0 w-full h-full transition-all duration-300 transform scale-x-0 translate-x-0 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 group-hover:scale-x-100 group-hover:translate-x-0 -z-1"></span>
                <span class="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500 to-indigo-500"></span>
                <span class="relative text-white">
                  Sign Up
                </span>
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section with Image Carousel */}
      <div class="relative h-screen">
        {heroImages.map((image, index) => (
          <div
            class={`absolute inset-0 transition-opacity duration-1000 ${
              activeSlide() === index ? "opacity-100" : "opacity-0"
            }`}
            key={index}
          >
            <div class="absolute inset-0 bg-black bg-opacity-40"></div>
            <img
              src={image.url}
              alt={image.alt}
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="text-center text-white p-4">
                <h1 class="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
                  Transform Your Food Supply Chain
                </h1>
                <p class="text-xl md:text-2xl mb-8 animate-fade-in">
                  {image.caption}
                </p>
                <button
                  onClick={() => navigate("/dashboard")}
                  class="relative group overflow-hidden rounded-lg font-bold text-lg px-8 py-4 transition-all duration-300 ease-out transform hover:scale-105 hover:shadow-2xl"
                >
                  <span class="absolute inset-0 w-full h-full transition-all duration-300 transform scale-x-0 translate-x-0 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 group-hover:scale-x-100 group-hover:translate-x-0 -z-1"></span>
                  <span class="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500 to-indigo-500"></span>
                  <span class="relative text-white text-lg uppercase tracking-wider">
                    Get Started Now
                    <span class="ml-2 font-normal">→</span>
                  </span>
                  <span class="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 transform scale-x-0 group-hover:scale-x-100 bg-white"></span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Rest of the component remains unchanged */}
      {/* Features Section */}
      <div id="features" class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 class="text-4xl font-bold text-center text-gray-900 mb-16">
            Streamline Your Operations
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((feature) => (
              <div 
                class="group relative overflow-hidden rounded-xl shadow-lg transition-transform hover:-translate-y-2 cursor-pointer"
                onClick={() => navigateToSection(feature.path)}
                key={feature.title}
              >
                <img
                  src={feature.image}
                  alt={feature.title}
                  class="w-full h-64 object-cover transition-transform group-hover:scale-110"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div class="text-3xl mb-2">{feature.icon}</div>
                  <h3 class="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p class="text-sm opacity-90">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div class="py-20 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 class="text-4xl font-bold text-center text-gray-900 mb-12">
            Key Statistics
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div class="bg-white p-8 rounded-xl shadow-lg">
              <div class="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <div class="text-gray-600">Active Farmers</div>
            </div>
            <div class="bg-white p-8 rounded-xl shadow-lg">
              <div class="text-4xl font-bold text-blue-600 mb-2">1M+</div>
              <div class="text-gray-600">Deliveries Made</div>
            </div>
            <div class="bg-white p-8 rounded-xl shadow-lg">
              <div class="text-4xl font-bold text-blue-600 mb-2">98%</div>
              <div class="text-gray-600">On-time Delivery</div>
            </div>
            <div class="bg-white p-8 rounded-xl shadow-lg">
              <div class="text-4xl font-bold text-blue-600 mb-2">24/7</div>
              <div class="text-gray-600">Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Sign-up Form */}
      <div id="signup" class="py-20 bg-white">
        <div class="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div class="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">
              Start Optimizing Your Supply Chain
            </h2>
            <form onSubmit={handleSubmit} class="space-y-4">
              <div>
                <label htmlFor="name" class="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name()}
                  onInput={(e) => setName(e.currentTarget.value)}
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="email" class="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email()}
                  onInput={(e) => setEmail(e.currentTarget.value)}
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your Email"
                />
              </div>
              <div>
                <label htmlFor="company" class="block text-sm font-medium text-gray-700 mb-1">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  value={company()}
                  onInput={(e) => setCompany(e.currentTarget.value)}
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your Company"
                />
              </div>
              <button
                type="submit"
                class="relative w-full group overflow-hidden rounded-lg font-bold text-lg py-3 transition-all duration-300 ease-out transform hover:scale-105"
              >
                <span class="absolute inset-0 w-full h-full transition-all duration-300 transform scale-x-0 translate-x-0 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 group-hover:scale-x-100 group-hover:translate-x-0 -z-1"></span>
                <span class="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500 to-indigo-500"></span>
                <span class="relative text-white">
                  {submitted() ? "Processing..." : "Sign Up Now"}
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer class="footer footer-center p-10 bg-gray-800 text-white">
        <div>
          <h1 class="text-lg font-bold">Your Company Name</h1>
          <p class="mb-2">© 2024 Your Company Name. All rights reserved.</p>
          <div class="grid grid-flow-col gap-4">
            <a href="#about" class="link link-hover hover:text-blue-400">About Us</a>
            <a href="#contact" class="link link-hover hover:text-blue-400">Contact</a>
            <a href="#privacy" class="link link-hover hover:text-blue-400">Privacy Policy</a>
            <a href="#terms" class="link link-hover hover:text-blue-400">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;