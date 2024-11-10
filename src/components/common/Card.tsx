import { Component, JSX } from "solid-js";

interface CardProps {
  title?: string;
  children: JSX.Element;
  class?: string;
}

const Card: Component<CardProps> = (props) => {
  return (
    <div class={`bg-white p-6 rounded-lg shadow-sm ${props.class || ''}`}>
      {props.title && (
        <h2 class="text-lg font-semibold mb-4">{props.title}</h2>
      )}
      {props.children}
    </div>
  );
};

export default Card;