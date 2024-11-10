import { createQuery } from "@tanstack/solid-query";
import { supabase } from "../lib/supabase";
import type { Database } from "../types/supabase";

type Inventory = Database['public']['Tables']['inventory']['Row'];

export function useInventory() {
  return createQuery(() => ({
    queryKey: ['inventory'],
    queryFn: async (): Promise<Inventory[]> => {
      const { data, error } = await supabase
        .from('inventory')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  }));
}