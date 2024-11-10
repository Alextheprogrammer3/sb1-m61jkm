import { Component } from "solid-js";

export const LoadingState: Component = () => {
  return (
    <div class="flex items-center justify-center p-8">
      <div class="flex flex-col items-center space-y-4">
        <div class="relative">
          <div class="h-16 w-16 animate-spin rounded-full border-b-2 border-primary"></div>
          <div class="absolute top-0 left-0 h-16 w-16 animate-ping rounded-full border-b-2 border-primary opacity-20"></div>
        </div>
        <p class="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
};