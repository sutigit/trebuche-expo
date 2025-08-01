import { Tables } from "@/lib/supabase.types"
import supabase from "@/lib/supabase"

export async function fetchConversations(): Promise<Tables<'conversations'>[] | null> {
    let { data: conversations, error } = await supabase
        .from('conversations')
        .select()

    if (error) {
        throw new Error(error.message)
    }

    return conversations
}

export async function fetchConversationById(conv_id: number): Promise<Tables<'conversations'> | null> {
    let { data: conversation, error } = await supabase
        .from('conversations')
        .select()
        .eq('id', conv_id)
        .maybeSingle()

    if (error) {
        throw new Error(error.message)
    }

    return conversation
}