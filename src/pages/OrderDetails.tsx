import { Component, Show } from "solid-js";
import { useParams } from "@solidjs/router";
import { useRealTimeOrder } from "../hooks/useRealTimeOrder";
import { useSubscription } from "../hooks/useSubscription";
import Card from "../components/common/Card";
import DroneFootage from "../components/premium/DroneFootage";
import RealTimeMap from "../components/premium/RealTimeMap";
import LoadingSpinner from "../components/common/LoadingSpinner";

const OrderDetails: Component = () => {
  const params = useParams();
  const order = useRealTimeOrder(params.id);
  const subscription = useSubscription("current-user-id"); // Replace with actual user ID

  const isPremium = () => 
    subscription.data?.plan === "premium" || 
    subscription.data?.plan === "enterprise";

  return (
    <div class="space-y-6">
      <h1 class="text-2xl font-bold text-gray-900">Order Details</h1>

      <Show when={order()} fallback={<LoadingSpinner />}>
        {(orderData) => (
          <div class="space-y-6">
            <Card>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <h3 class="text-sm font-medium text-gray-500">Order ID</h3>
                  <p class="mt-1 text-sm text-gray-900">{orderData.id}</p>
                </div>
                <div>
                  <h3 class="text-sm font-medium text-gray-500">Status</h3>
                  <p class="mt-1">
                    <span class={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${orderData.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                        orderData.status === 'In Transit' ? 'bg-blue-100 text-blue-800' : 
                        'bg-yellow-100 text-yellow-800'}`}>
                      {orderData.status}
                    </span>
                  </p>
                </div>
                <div>
                  <h3 class="text-sm font-medium text-gray-500">Store</h3>
                  <p class="mt-1 text-sm text-gray-900">{orderData.store}</p>
                </div>
                <div>
                  <h3 class="text-sm font-medium text-gray-500">Delivery Date</h3>
                  <p class="mt-1 text-sm text-gray-900">
                    {new Date(orderData.delivery_date).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <h3 class="text-sm font-medium text-gray-500">Total Amount</h3>
                  <p class="mt-1 text-sm text-gray-900">
                    ${orderData.total_amount.toFixed(2)}
                  </p>
                </div>
              </div>
            </Card>

            <Show when={isPremium()}>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DroneFootage url={orderData.drone_footage_url} />
                <RealTimeMap 
                  location={orderData.real_time_location} 
                  orderId={orderData.id}
                />
              </div>
            </Show>
          </div>
        )}
      </Show>
    </div>
  );
};

export default OrderDetails;