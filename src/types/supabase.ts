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
      profiles: {
        Row: {
          created_at: string | null
          first_name: string | null
          gender: string | null
          id: string
          last_name: string | null
        }
        Insert: {
          created_at?: string | null
          first_name?: string | null
          gender?: string | null
          id: string
          last_name?: string | null
        }
        Update: {
          created_at?: string | null
          first_name?: string | null
          gender?: string | null
          id?: string
          last_name?: string | null
        }
      }
      projects: {
        Row: {
          created_at: string | null
          description: string
          id: string
          location: string
          name: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          id?: string
          location: string
          name: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          id?: string
          location?: string
          name?: string
          user_id?: string | null
        }
      }
      wells: {
        Row: {
          created_at: string | null
          id: string
          kb: string | null
          log_file_id: string | null
          name: string | null
          project_id: string | null
          td: string | null
          trajectory: string | null
          user_id: string | null
          x_location: string | null
          y_location: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          kb?: string | null
          log_file_id?: string | null
          name?: string | null
          project_id?: string | null
          td?: string | null
          trajectory?: string | null
          user_id?: string | null
          x_location?: string | null
          y_location?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          kb?: string | null
          log_file_id?: string | null
          name?: string | null
          project_id?: string | null
          td?: string | null
          trajectory?: string | null
          user_id?: string | null
          x_location?: string | null
          y_location?: string | null
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
