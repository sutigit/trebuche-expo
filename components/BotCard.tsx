import React from 'react'
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading"
import { Tables } from '@/lib/supabase.types'
import colors from 'tailwindcss/colors';

export default function BotCard({ bot }: { bot: Tables<'default_bots'> }) {
    return (
        <Box className='p-8 rounded-2xl bg-zinc-800'>
            <Box className='absolute -top-3 left-4 flex-row items-center gap-4'>
                <Box className='aspect-square w-8 rounded-lg' style={{ backgroundColor: bot.color || colors.zinc[200] }} />
                <Heading>{bot.name}</Heading>
            </Box>
            <Box className='py-5 border-b border-zinc-700'>
                <Text size='sm'>
                    {bot.description}
                </Text>
            </Box>
        </Box>
    )
}