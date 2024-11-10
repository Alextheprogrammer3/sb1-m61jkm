export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      orders: {
        Row: {
          id: string
          created_at: string
          store: string
          status: 'In Transit' | 'Pending' | 'Delivered'
          items: Json
          delivery_date: string
          total_amount: number
          customer_id: string
          drone_footage_url?: string
          real_time_location?: { lat: number; lng: number }
        }
        Insert: {
          id?: string
          created_at?: string
          store: string
          status: 'In Transit' | 'Pending' | 'Delivered'
          items: Json
          delivery_date: string
          total_amount: number
          customer_id: string
          drone_footage_url?: string
          real_time_location?: { lat: number; lng: number }
        }
        Update: {
          id?: string
          created_at?: string
          store?: string
          status?: 'In Transit' | 'Pending' | 'Delivered'
          items?: Json
          delivery_date?: string
          total_amount?: number
          customer_id?: string
          drone_footage_url?: string
          real_time_location?: { lat: number; lng: number }
        }
      }
      subscriptions: {
        Row: {
          id: string
          customer_id: string
          plan: 'basic' | 'premium' | 'enterprise'
          features: string[]
          active: boolean
          expires_at: string
        }
        Insert: {
          id?: string
          customer_id: string
          plan: 'basic' | 'premium' | 'enterprise'
          features: string[]
          active: boolean
          expires_at: string
        }
        Update: {
          id?: string
          customer_id?: string
          plan?: 'basic' | 'premium' | 'enterprise'
          features?: string[]
          active?: boolean
          expires_at?: string
        }
      }
    }
  }
}