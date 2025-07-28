import React from 'react'
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Tables } from '@/lib/supabase.types'

export default function BotCard({ bot }: { bot: Tables<'default_bots'> }) {
    return (
        <Box className='p-6 rounded-2xl bg-zinc-800'>
            <Text>{bot.name}</Text>
        </Box>
    )
}