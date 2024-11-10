import { createQuery } from "@tanstack/solid-query";
import { supabase } from "../lib/supabase";
import type { Database } from "../types/supabase";

type Customer = Database['public']['Tables']['customers']['Row'];

export function useCustomers() {
  return createQuery(() => ({
    queryKey: ['customers'],
    queryFn: async (): Promise<Customer[]> => {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  }));
}