import { createQuery } from "@tanstack/solid-query";
import { supabase } from "../lib/supabase";
import type { Database } from "../types/supabase";

type Subscription = Database['public']['Tables']['subscriptions']['Row'];

export function useSubscription(customerId: string) {
  return createQuery(() => ({
    queryKey: ['subscription', customerId],
    queryFn: async (): Promise<Subscription | null> => {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('customer_id', customerId)
        .single();

      if (error) throw error;
      return data;
    },
  }));
}