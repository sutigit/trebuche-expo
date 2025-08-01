import { Tables } from "@/lib/supabase.types"
import supabase from "@/lib/supabase"

export async function fetchUsersBots(user_id: string): Promise<Tables<'bots'>[] | null> {
    let { data: bots, error } = await supabase
        .from('bots')
        .select()
        .or(`author_id.eq.${user_id},is_default.eq.true`);

    if (error) {
        throw new Error(error.message)
    }

    return bots
}