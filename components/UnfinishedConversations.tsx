import React, { useState, useEffect } from 'react'
import { Box } from './ui/box'
import { Text } from './ui/text'
import { Tables } from '@/lib/supabase.types'
import { Spinner } from "@/components/ui/spinner"
import colors from "tailwindcss/colors"
import { fetchUsersConversations, fetchUsersPublishedConversations, UsersPublishedConversations } from '@/api/supabase/conversations'
import { fetchProfile } from '@/api/supabase/profiles'
import { getUser } from '@/api/supabase/auth'


export default function FinishedConversations() {
    const [unfinishedConversations, setUnfinishedConversations] = useState<Tables<"conversations">[]>([])
    const [profile, setProfile] = useState<Tables<'profiles'>>()
    const [loading, setLoading] = useState(true)

    async function fetchDashboardData() {
        const user = await getUser()
        if (!user) throw new Error('User not found')

        const profileData = await fetchProfile(user.id)
        const unfinishedConversationsData = await fetchUsersConversations(user.id)

        return { profileData, unfinishedConversationsData }
    }

    useEffect(() => {
        fetchDashboardData()
            .then(({ profileData, unfinishedConversationsData }) => {
                if (profileData && unfinishedConversationsData) {
                    setProfile(profileData)
                    setUnfinishedConversations(unfinishedConversationsData)
                }
            })
            .catch((err) => {
                console.log("📌 error", err)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    return (
        <Box className='flex-1 p-5'>
            {loading ? <Box className="flex-1 justify-center items-center">
                <Spinner size="large" color={colors.purple[300]} />
            </Box>
                :
                <Text>Omg</Text>
            }
        </Box>
    )
}