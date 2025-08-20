import { Tables } from "@/lib/supabase.types"
import supabase from "@/lib/supabase"
import { QueryData } from "@supabase/supabase-js"

export async function fetchUsersConversations(userId: string): Promise<Tables<'conversations'>[] | null> {
    let { data: conversations, error } = await supabase
        .from('conversations')
        .select()
        .eq('author_id', userId)

    if (error) throw new Error(error.message)

    return conversations
}


// AAAH WHAT A MESS -----------------------------------------------------
const publishedConversationsQuery = supabase
    .from('published.conversations')
    .select('id, created_at, profiles(username), conversations(title, description)');

export type PublishedConversations = QueryData<typeof publishedConversationsQuery>; // Array
export type PublishedConversation = PublishedConversations[number];  // Single

export async function fetchPublishedConversations() {
    const { data, error } = await publishedConversationsQuery;
    if (error) throw new Error(error.message);

    const publishedConversations: PublishedConversations = data ?? [];
    return publishedConversations; // always an array
}


// AAAAAH WHAT A MEEES, FIX THIIS -------------------------------------------------
// 1) Query builder that takes userId
const usersPublishedConversationsQuery = (userId: string) =>
    supabase
        .from('published.conversations')
        .select(`
      id,
      created_at,
      profiles ( username ),
      conversations ( title, description )
    `)
        .eq('author_id', userId);

// 2) Types from the builder
export type UsersPublishedConversations =
    QueryData<ReturnType<typeof usersPublishedConversationsQuery>>;
export type UsersPublishedConversation =
    UsersPublishedConversations[number];

// 3) Fetcher
export async function fetchUsersPublishedConversations(userId: string) {
    const { data, error } = await usersPublishedConversationsQuery(userId);
    if (error) throw new Error(error.message);

    // return (data ?? []) as UsersPublishedConversations; // always an array
    const UsersPublishedConversations: UsersPublishedConversations = data ?? []
    return UsersPublishedConversations
}



export async function fetchUsersConversationById(conv_id: number): Promise<Tables<'conversations'> | null> {
    let { data: conversation, error } = await supabase
        .from('conversations')
        .select()
        .eq('id', conv_id)
        .maybeSingle()

    if (error) throw new Error(error.message)


    return conversation
}

export async function createUsersConversation({ title }: { title: string }): Promise<Tables<'conversations'> | null> {
    let { data: conversation, error } = await supabase
        .from('conversations')
        .insert({ title })
        .select()
        .maybeSingle()

    if (error) throw new Error(error.message)


    return conversation
}

