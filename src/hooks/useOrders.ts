import { createQuery } from "@tanstack/solid-query";
import { supabase } from "../lib/supabase";
import type { Database } from "../types/supabase";

type Order = Database['public']['Tables']['orders']['Row'];

export function useOrders() {
  return createQuery(() => ({
    queryKey: ['orders'],
    queryFn: async (): Promise<Order[]> => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  }));
}