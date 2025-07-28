import { Tables } from "@/lib/supabase.types"

const base_url = process.env.EXPO_PUBLIC_API_URL_DEVELOPMENT

export async function fetchDefaultBots(): Promise<Tables<'default_bots'>[]> {
    try {
        const res = await fetch(`${base_url}/bots/default`)
        const { data } = await res.json()
        return data
    } catch (err) {
        throw new Error(`Failed to fetch bots for user: ${err}`)
    }
}