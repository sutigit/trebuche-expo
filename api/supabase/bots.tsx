import { Tables } from "@/lib/supabase.types"
import supabase from "@/lib/supabase"

export async function fetchBots(user_id: string): Promise<Tables<'bots'>[] | null> {
    let { data: bots, error } = await supabase
        .from('bots')
        .select()
    // .eq('id', user_id)

    if (error) {
        throw new Error(error.message)
    }

    return bots
}

// export async function fetchDefaultBot(id: string): Promise<Tables<'bots'>> {

// }