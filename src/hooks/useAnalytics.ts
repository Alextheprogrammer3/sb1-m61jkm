import { createQuery } from "@tanstack/solid-query";
import type { AnalyticsData } from "../types";

export function useAnalytics(timeRange: string) {
  return createQuery(() => ({
    queryKey: ['analytics', timeRange],
    queryFn: async (): Promise<AnalyticsData> => {
      // Simulated API call
      return new Promise(resolve =>
        setTimeout(() => resolve({
          sales: [
            { date: "Mon", amount: 12500 },
            { date: "Tue", amount: 15800 },
            { date: "Wed", amount: 14200 },
            { date: "Thu", amount: 16800 },
            { date: "Fri", amount: 19200 },
            { date: "Sat", amount: 18100 },
            { date: "Sun", amount: 22000 }
          ],
          customers: [
            { type: "New", count: 30 },
            { type: "Returning", count: 55 },
            { type: "Inactive", count: 15 }
          ],
          inventory: [
            { category: "Fruits", level: 85 },
            { category: "Vegetables", level: 72 },
            { category: "Dairy", level: 90 },
            { category: "Meat", level: 65 },
            { category: "Bakery", level: 88 }
          ],
          engagement: [
            { date: "Jan", users: 1200 },
            { date: "Feb", users: 1350 },
            { date: "Mar", users: 1500 },
            { date: "Apr", users: 1800 },
            { date: "May", users: 2100 },
            { date: "Jun", users: 2400 }
          ]
        }), 1000)
      );
    }
  }));
}