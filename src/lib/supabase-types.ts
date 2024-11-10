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
      users: {
        Row: {
          id: string
          email: string
          full_name: string
          created_at: string
          updated_at: string
          role: 'admin' | 'manager' | 'user'
          company_id: string
        }
        Insert: {
          id?: string
          email: string
          full_name: string
          created_at?: string
          updated_at?: string
          role?: 'admin' | 'manager' | 'user'
          company_id: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          updated_at?: string
          role?: 'admin' | 'manager' | 'user'
          company_id?: string
        }
      }
      companies: {
        Row: {
          id: string
          name: string
          subscription_tier: 'free' | 'premium' | 'enterprise'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          subscription_tier?: 'free' | 'premium' | 'enterprise'
          created_at?: string
          updated_at?: string
        }
        Update: {
          name?: string
          subscription_tier?: 'free' | 'premium' | 'enterprise'
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          customer_id: string
          status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          total_amount: number
          created_at: string
          updated_at: string
          delivery_date: string
          tracking_number: string | null
          shipping_address: Json
        }
        Insert: {
          id?: string
          customer_id: string
          status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          total_amount: number
          created_at?: string
          updated_at?: string
          delivery_date: string
          tracking_number?: string | null
          shipping_address: Json
        }
        Update: {
          status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          total_amount?: number
          updated_at?: string
          delivery_date?: string
          tracking_number?: string | null
          shipping_address?: Json
        }
      }
      products: {
        Row: {
          id: string
          name: string
          description: string
          price: number
          stock: number
          category: string
          created_at: string
          updated_at: string
          company_id: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          price: number
          stock: number
          category: string
          created_at?: string
          updated_at?: string
          company_id: string
        }
        Update: {
          name?: string
          description?: string
          price?: number
          stock?: number
          category?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}