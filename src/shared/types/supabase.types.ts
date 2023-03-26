export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      " posts": {
        Row: {
          content: string | null
          created_at: string | null
          id: string
          title: string
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          id?: string
          title: string
        }
        Update: {
          content?: string | null
          created_at?: string | null
          id?: string
          title?: string
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
