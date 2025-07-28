import React from 'react'
import { useLocalSearchParams } from 'expo-router';
import { Box } from '@/components/ui/box'
import { Text } from '@/components/ui/text'

export default function BotEditor() {
    const { id } = useLocalSearchParams()

    return (
        <Box className="flex-1 p-20">
            <Text>BotEditor {id}</Text>
        </Box>
    )
}