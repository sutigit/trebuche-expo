import React, { useState, useRef, useEffect } from 'react'
import Screen from '@/components/ui/screen'
import { Box } from '@/components/ui/box'
import { Text } from '@/components/ui/text'
import { Heading } from '@/components/ui/heading'
import { Tables } from '@/lib/supabase.types'


export default function ConversationSetupScreen() {
    const [conversation, setConversation] = useState<Tables<'conversations'>>()

    useEffect(() => {

    }, [])

    if (conversation)

    return (
        <Screen background>
            <Box>
                <Heading>{conversation.title}</Heading>
            </Box>
        </Screen>
    )
}