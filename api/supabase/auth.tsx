import supabase from "@/lib/supabase"

export async function signin(user: { email: string, password: string }) {
    return await supabase.auth.signInWithPassword({
        email: user.email,
        password: user.password,
    })
}

export async function signout() {
    return await supabase.auth.signOut();
}