export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      attendance: {
        Row: {
          created_at: string | null
          date: string
          id: string
          marked_by: string | null
          status: string
          student_id: string
          subject: string
        }
        Insert: {
          created_at?: string | null
          date: string
          id?: string
          marked_by?: string | null
          status: string
          student_id: string
          subject: string
        }
        Update: {
          created_at?: string | null
          date?: string
          id?: string
          marked_by?: string | null
          status?: string
          student_id?: string
          subject?: string
        }
        Relationships: []
      }
      bus_routes: {
        Row: {
          bus_number: string
          created_at: string | null
          current_location: string | null
          estimated_arrival: string | null
          id: string
          route_name: string
          status: string
          updated_at: string | null
        }
        Insert: {
          bus_number: string
          created_at?: string | null
          current_location?: string | null
          estimated_arrival?: string | null
          id?: string
          route_name: string
          status?: string
          updated_at?: string | null
        }
        Update: {
          bus_number?: string
          created_at?: string | null
          current_location?: string | null
          estimated_arrival?: string | null
          id?: string
          route_name?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      fees: {
        Row: {
          academic_year: string
          amount: number
          created_at: string | null
          due_date: string | null
          fee_type: string
          id: string
          payment_date: string | null
          receipt_number: string | null
          status: string
          student_id: string
          updated_at: string | null
        }
        Insert: {
          academic_year: string
          amount: number
          created_at?: string | null
          due_date?: string | null
          fee_type: string
          id?: string
          payment_date?: string | null
          receipt_number?: string | null
          status?: string
          student_id: string
          updated_at?: string | null
        }
        Update: {
          academic_year?: string
          amount?: number
          created_at?: string | null
          due_date?: string | null
          fee_type?: string
          id?: string
          payment_date?: string | null
          receipt_number?: string | null
          status?: string
          student_id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      homework: {
        Row: {
          academic_year: string | null
          assigned_by: string | null
          assigned_by_name: string | null
          created_at: string | null
          deadline: string | null
          department: string | null
          description: string | null
          id: string
          subject: string
          title: string
        }
        Insert: {
          academic_year?: string | null
          assigned_by?: string | null
          assigned_by_name?: string | null
          created_at?: string | null
          deadline?: string | null
          department?: string | null
          description?: string | null
          id?: string
          subject: string
          title: string
        }
        Update: {
          academic_year?: string | null
          assigned_by?: string | null
          assigned_by_name?: string | null
          created_at?: string | null
          deadline?: string | null
          department?: string | null
          description?: string | null
          id?: string
          subject?: string
          title?: string
        }
        Relationships: []
      }
      homework_submissions: {
        Row: {
          file_url: string | null
          homework_id: string
          id: string
          status: string
          student_id: string
          submitted_at: string | null
        }
        Insert: {
          file_url?: string | null
          homework_id: string
          id?: string
          status?: string
          student_id: string
          submitted_at?: string | null
        }
        Update: {
          file_url?: string | null
          homework_id?: string
          id?: string
          status?: string
          student_id?: string
          submitted_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "homework_submissions_homework_id_fkey"
            columns: ["homework_id"]
            isOneToOne: false
            referencedRelation: "homework"
            referencedColumns: ["id"]
          },
        ]
      }
      marks: {
        Row: {
          academic_year: string
          created_at: string | null
          entered_by: string | null
          exam_type: string
          grade: string | null
          id: string
          max_score: number
          score: number
          student_id: string
          subject: string
          updated_at: string | null
        }
        Insert: {
          academic_year: string
          created_at?: string | null
          entered_by?: string | null
          exam_type: string
          grade?: string | null
          id?: string
          max_score?: number
          score: number
          student_id: string
          subject: string
          updated_at?: string | null
        }
        Update: {
          academic_year?: string
          created_at?: string | null
          entered_by?: string | null
          exam_type?: string
          grade?: string | null
          id?: string
          max_score?: number
          score?: number
          student_id?: string
          subject?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      notes: {
        Row: {
          academic_year: string | null
          created_at: string | null
          department: string | null
          file_size: string | null
          file_type: string | null
          file_url: string | null
          id: string
          subject: string
          title: string
          uploaded_by: string | null
          uploaded_by_name: string | null
        }
        Insert: {
          academic_year?: string | null
          created_at?: string | null
          department?: string | null
          file_size?: string | null
          file_type?: string | null
          file_url?: string | null
          id?: string
          subject: string
          title: string
          uploaded_by?: string | null
          uploaded_by_name?: string | null
        }
        Update: {
          academic_year?: string | null
          created_at?: string | null
          department?: string | null
          file_size?: string | null
          file_type?: string | null
          file_url?: string | null
          id?: string
          subject?: string
          title?: string
          uploaded_by?: string | null
          uploaded_by_name?: string | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          category: string
          created_at: string | null
          created_by: string | null
          id: string
          is_read_by: string[] | null
          message: string
          target_role: string | null
          title: string
        }
        Insert: {
          category?: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_read_by?: string[] | null
          message: string
          target_role?: string | null
          title: string
        }
        Update: {
          category?: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_read_by?: string[] | null
          message?: string
          target_role?: string | null
          title?: string
        }
        Relationships: []
      }
      placements: {
        Row: {
          apply_link: string | null
          company: string
          created_at: string | null
          deadline: string | null
          description: string | null
          id: string
          is_active: boolean
          job_type: string
          location: string | null
          position: string
          posted_by: string | null
          salary_range: string | null
        }
        Insert: {
          apply_link?: string | null
          company: string
          created_at?: string | null
          deadline?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          job_type?: string
          location?: string | null
          position: string
          posted_by?: string | null
          salary_range?: string | null
        }
        Update: {
          apply_link?: string | null
          company?: string
          created_at?: string | null
          deadline?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          job_type?: string
          location?: string | null
          position?: string
          posted_by?: string | null
          salary_range?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          academic_year: string
          branch: string
          created_at: string | null
          department: string | null
          enrollment_number: string
          faculty_id: string | null
          full_name: string
          id: string
          roll_number: string
          updated_at: string | null
        }
        Insert: {
          academic_year: string
          branch: string
          created_at?: string | null
          department?: string | null
          enrollment_number: string
          faculty_id?: string | null
          full_name: string
          id: string
          roll_number: string
          updated_at?: string | null
        }
        Update: {
          academic_year?: string
          branch?: string
          created_at?: string | null
          department?: string | null
          enrollment_number?: string
          faculty_id?: string | null
          full_name?: string
          id?: string
          roll_number?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      report_issues: {
        Row: {
          created_at: string | null
          description: string
          id: string
          issue_type: string
          location: string | null
          reported_by: string
          status: string
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          id?: string
          issue_type: string
          location?: string | null
          reported_by: string
          status?: string
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          id?: string
          issue_type?: string
          location?: string | null
          reported_by?: string
          status?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      syllabus: {
        Row: {
          academic_year: string
          created_at: string | null
          credits: number
          department: string
          file_url: string | null
          id: string
          subject_code: string
          subject_name: string
          units: number
          uploaded_by: string | null
        }
        Insert: {
          academic_year: string
          created_at?: string | null
          credits?: number
          department: string
          file_url?: string | null
          id?: string
          subject_code: string
          subject_name: string
          units?: number
          uploaded_by?: string | null
        }
        Update: {
          academic_year?: string
          created_at?: string | null
          credits?: number
          department?: string
          file_url?: string | null
          id?: string
          subject_code?: string
          subject_name?: string
          units?: number
          uploaded_by?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_student_account: {
        Args: {
          p_academic_year: string
          p_branch: string
          p_enrollment_number: string
          p_full_name: string
          p_password: string
          p_roll_number: string
        }
        Returns: string
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role:
        | "student"
        | "faculty"
        | "admin"
        | "super_admin"
        | "hod"
        | "teacher"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: [
        "student",
        "faculty",
        "admin",
        "super_admin",
        "hod",
        "teacher",
      ],
    },
  },
} as const
