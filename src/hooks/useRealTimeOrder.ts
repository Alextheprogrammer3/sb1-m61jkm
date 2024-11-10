import { createSignal, onCleanup } from "solid-js";
import { supabase } from "../lib/supabase";
import type { Database } from "../types/supabase";

type Order = Database['public']['Tables']['orders']['Row'];

export function useRealTimeOrder(orderId: string) {
  const [order, setOrder] = createSignal<Order | null>(null);

  // Subscribe to real-time updates
  const subscription = supabase
    .channel(`order-${orderId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'orders',
        filter: `id=eq.${orderId}`,
      },
      (payload) => {
        setOrder(payload.new as Order);
      }
    )
    .subscribe();

  // Initial fetch
  supabase
    .from('orders')
    .select('*')
    .eq('id', orderId)
    .single()
    .then(({ data }) => {
      if (data) setOrder(data);
    });

  // Cleanup subscription
  onCleanup(() => {
    subscription.unsubscribe();
  });

  return order;
}