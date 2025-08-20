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
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      bots: {
        Row: {
          archived: boolean
          author_id: string | null
          color: string
          created_at: string
          description: string
          hidden: boolean
          id: string
          is_default: boolean
          name: string
          prompt: string
          updated_at: string
        }
        Insert: {
          archived?: boolean
          author_id?: string | null
          color: string
          created_at?: string
          description: string
          hidden?: boolean
          id?: string
          is_default: boolean
          name: string
          prompt: string
          updated_at?: string
        }
        Update: {
          archived?: boolean
          author_id?: string | null
          color?: string
          created_at?: string
          description?: string
          hidden?: boolean
          id?: string
          is_default?: boolean
          name?: string
          prompt?: string
          updated_at?: string
        }
        Relationships: []
      }
      conversations: {
        Row: {
          author_id: string
          created_at: string
          description: string | null
          id: number
          stage: Database["public"]["Enums"]["conversation_stage"]
          title: string | null
          turn_policy: Database["public"]["Enums"]["conversation_turn_policy"]
        }
        Insert: {
          author_id?: string
          created_at?: string
          description?: string | null
          id?: number
          stage?: Database["public"]["Enums"]["conversation_stage"]
          title?: string | null
          turn_policy?: Database["public"]["Enums"]["conversation_turn_policy"]
        }
        Update: {
          author_id?: string
          created_at?: string
          description?: string | null
          id?: number
          stage?: Database["public"]["Enums"]["conversation_stage"]
          title?: string | null
          turn_policy?: Database["public"]["Enums"]["conversation_turn_policy"]
        }
        Relationships: []
      }
      "conversations.members.bots": {
        Row: {
          author_id: string
          bot_id: string
          conversation_id: number
          id: number
        }
        Insert: {
          author_id?: string
          bot_id: string
          conversation_id: number
          id?: number
        }
        Update: {
          author_id?: string
          bot_id?: string
          conversation_id?: number
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "conversations.members.bots_bot_id_fkey"
            columns: ["bot_id"]
            isOneToOne: false
            referencedRelation: "bots"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversations.members.bots_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      "conversations.messages.bots": {
        Row: {
          author_id: string
          bot_id: string
          conversation_id: number
          created_at: string
          id: number
          message: string | null
        }
        Insert: {
          author_id?: string
          bot_id: string
          conversation_id: number
          created_at?: string
          id?: number
          message?: string | null
        }
        Update: {
          author_id?: string
          bot_id?: string
          conversation_id?: number
          created_at?: string
          id?: number
          message?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "conversations.bots.messages_bot_id_fkey"
            columns: ["bot_id"]
            isOneToOne: false
            referencedRelation: "bots"
            referencedColumns: ["id"]
          },
        ]
      }
      "conversations.messages.users": {
        Row: {
          author_id: string
          conversation_id: number
          created_at: string
          id: number
          message: string | null
        }
        Insert: {
          author_id?: string
          conversation_id: number
          created_at?: string
          id?: number
          message?: string | null
        }
        Update: {
          author_id?: string
          conversation_id?: number
          created_at?: string
          id?: number
          message?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          author_id: string
          id: number
          username: string | null
        }
        Insert: {
          author_id?: string
          id?: number
          username?: string | null
        }
        Update: {
          author_id?: string
          id?: number
          username?: string | null
        }
        Relationships: []
      }
      "published.conversations": {
        Row: {
          author_id: string
          conversations_info_id: number
          created_at: string
          id: number
          profile_id: number
        }
        Insert: {
          author_id?: string
          conversations_info_id: number
          created_at?: string
          id?: number
          profile_id: number
        }
        Update: {
          author_id?: string
          conversations_info_id?: number
          created_at?: string
          id?: number
          profile_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "published.conversations_conversations_info_id_fkey"
            columns: ["conversations_info_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "published.conversations_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      "conversation participant role": "user" | "bot"
      conversation_stage: "setup" | "converse" | "post-process" | "ready"
      conversation_turn_policy: "round-robin" | "random" | "smart"
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
      "conversation participant role": ["user", "bot"],
      conversation_stage: ["setup", "converse", "post-process", "ready"],
      conversation_turn_policy: ["round-robin", "random", "smart"],
    },
  },
} as const
