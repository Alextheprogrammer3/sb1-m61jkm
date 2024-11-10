export interface Order {
  id: string;
  store: string;
  status: 'In Transit' | 'Pending' | 'Delivered';
  items: string;
  delivery: string;
}

export interface Notification {
  id: number;
  message: string;
  read: boolean;
}

export interface AnalyticsData {
  sales: {
    date: string;
    amount: number;
  }[];
  customers: {
    type: string;
    count: number;
  }[];
  inventory: {
    category: string;
    level: number;
  }[];
  engagement: {
    date: string;
    users: number;
  }[];
}