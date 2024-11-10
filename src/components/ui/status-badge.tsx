import { Component } from "solid-js";
import { cn } from "../../lib/utils";

interface StatusBadgeProps {
  status: string;
  class?: string;
}

export const StatusBadge: Component<StatusBadgeProps> = (props) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'in transit':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span
      class={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        getStatusColor(props.status),
        props.class
      )}
    >
      {props.status}
    </span>
  );
};