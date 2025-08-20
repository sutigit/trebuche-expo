import { Tables } from "@/lib/supabase.types"
import supabase from "@/lib/supabase"

export async function fetchBots(): Promise<Tables<'bots'>[] | null> {
    let { data: bots, error } = await supabase
        .from('bots')
        .select()
        .or(`is_default.eq.true`);

    if (error) {
        throw new Error(error.message)
    }

    return bots
}

export async function fetchBotById(bot_id: string): Promise<Tables<'bots'> | null> {
    let { data: bots, error } = await supabase
        .from('bots')
        .select()
        .eq('id', bot_id)
        .single()

    if (error) {
        throw new Error(error.message)
    }

    return bots
}