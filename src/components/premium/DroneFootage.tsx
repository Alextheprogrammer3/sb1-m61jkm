import { Component, Show } from "solid-js";
import Card from "../common/Card";

interface DroneFootageProps {
  url?: string;
}

const DroneFootage: Component<DroneFootageProps> = (props) => {
  return (
    <Show when={props.url}>
      <Card title="Live Drone Footage">
        <div class="aspect-w-16 aspect-h-9">
          <video
            src={props.url}
            controls
            class="rounded-lg w-full h-full object-cover"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </Card>
    </Show>
  );
};

export default DroneFootage;