import { Component, onMount } from "solid-js";
import Card from "../common/Card";

interface RealTimeMapProps {
  location?: { lat: number; lng: number };
  orderId: string;
}

const RealTimeMap: Component<RealTimeMapProps> = (props) => {
  let mapContainer: HTMLDivElement | undefined;

  onMount(() => {
    if (props.location && mapContainer) {
      // Initialize map (using a mapping library of your choice)
      // For example, you could use Mapbox or Google Maps
      console.log("Map initialized with location:", props.location);
    }
  });

  return (
    <Card title="Real-Time Location">
      <div 
        ref={mapContainer} 
        class="h-64 rounded-lg bg-gray-100"
      >
        {!props.location && (
          <div class="h-full flex items-center justify-center text-gray-500">
            Location data unavailable
          </div>
        )}
      </div>
    </Card>
  );
};

export default RealTimeMap;