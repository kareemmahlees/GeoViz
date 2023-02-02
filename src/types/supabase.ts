export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json }
    | Json[];

export interface Database {
    public: {
        Tables: {
            projects: {
                Row: {
                    created_at: string | null;
                    description: string;
                    id: number;
                    location: string;
                    name: string;
                    user_id: string | null;
                };
                Insert: {
                    created_at?: string | null;
                    description: string;
                    id?: number;
                    location: string;
                    name: string;
                    user_id?: string | null;
                };
                Update: {
                    created_at?: string | null;
                    description?: string;
                    id?: number;
                    location?: string;
                    name?: string;
                    user_id?: string | null;
                };
            };
            wells: {
                Row: {
                    created_at: string | null;
                    id: number;
                    kb: string | null;
                    log_file_id: string | null;
                    name: string | null;
                    project_id: number | null;
                    td: string | null;
                    trajectory: string | null;
                    x_location: string | null;
                    y_location: string | null;
                };
                Insert: {
                    created_at?: string | null;
                    id?: number;
                    kb?: string | null;
                    log_file_id?: string | null;
                    name?: string | null;
                    project_id?: number | null;
                    td?: string | null;
                    trajectory?: string | null;
                    x_location?: string | null;
                    y_location?: string | null;
                };
                Update: {
                    created_at?: string | null;
                    id?: number;
                    kb?: string | null;
                    log_file_id?: string | null;
                    name?: string | null;
                    project_id?: number | null;
                    td?: string | null;
                    trajectory?: string | null;
                    x_location?: string | null;
                    y_location?: string | null;
                };
            };
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
            [_ in never]: never;
        };
        Enums: {
            [_ in never]: never;
        };
    };
}
