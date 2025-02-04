import { Component } from "solid-js";

const LoadingSpinner: Component = () => {
  return (
    <div class="flex items-center justify-center p-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    </div>
  );
};

export default LoadingSpinner;