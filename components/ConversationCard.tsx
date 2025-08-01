import React from 'react'
import { Box } from './ui/box'
import { Text } from './ui/text'
import { Tables } from '@/lib/supabase.types'
import { Heading } from './ui/heading'

export default function ConversationCard({ conversation }: { conversation: Tables<'conversations'> }) {
    return (
        <Box>
            <Heading>{conversation.title}</Heading>
            <Text>{conversation.description}</Text>
        </Box>
    )
}