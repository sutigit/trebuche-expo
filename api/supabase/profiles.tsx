import { Tables } from "@/lib/supabase.types"
import supabase from "@/lib/supabase"

export async function fetchProfile(user_id: string): Promise<Tables<'profiles'> | null> {
    let { data: profile, error } = await supabase
        .from('profiles')
        .select()
        .eq('author_id', user_id)
        .maybeSingle()

    if (error) {
        throw new Error(error.message)
    }

    return profile
}