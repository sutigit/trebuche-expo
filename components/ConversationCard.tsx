import React, { useEffect, useState } from 'react'
import { Box } from './ui/box'
import { Text } from './ui/text'
import { Tables } from '@/lib/supabase.types'
import { Heading } from './ui/heading'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { Pressable } from './ui/pressable'
import colors from 'tailwindcss/colors'
import { useThemeColor } from '@/hooks/useThemeColor'
import { Button, ButtonIcon, ButtonText } from './ui/button'
import { } from "@/components/ui/icon"
import { View } from 'react-native'
import { getUser } from '@/api/supabase/auth'
import { fetchProfile } from '@/api/supabase/profiles'
import { timeAgo } from '@/utils/timeAgo'
import { PublishedConversation } from '@/api/supabase/conversations'

type ToolIconName = keyof typeof MaterialCommunityIcons.glyphMap;

const tools: { name: string; icon: ToolIconName, active: boolean }[] = [
    { name: "Kooste", icon: "script-text", active: true },
    // { name: "Kuvaus", icon: "image-text", active: false },
    // { name: "Suunnitelma", icon: "floor-plan", active: false },
    // { name: "Rahoitus", icon: "abacus", active: false },
    { name: "Botit", icon: "robot", active: false },
];

export default function ConversationCard({ data }: { data: PublishedConversation }) {
    const iconColor = useThemeColor({}, 'text')

    return (
        <Box className='gap-5 border-b border-purple/30 py-10 px-5'>
            <Text size='sm' >
                @<Text size='sm' className='text-purple-300'>{data.profiles.username}</Text> <Text size='sm' className='text-white/50'>{timeAgo(data.created_at)}</Text>
            </Text>
            <Heading>{data.conversations.title}</Heading>
            <Text className='pt-1 pb-3'>{data.conversations.description}</Text>
            <Box>
                <Box className='flex-row gap-1 pb-4 pl-3 items-center'>
                    <View className='h-2 aspect-square rounded bg-purple-300' />
                    <View className='h-1 aspect-square rounded bg-purple-300' />
                    <View className='h-1 aspect-square rounded bg-purple-300' />
                    <View className='h-1 aspect-square rounded bg-purple-300' />
                    <View className='h-1 aspect-square rounded bg-purple-300' />
                </Box>
                <Box className='flex-row flex-wrap gap-2'>
                    {tools.map((tool, i) => (
                        <Button key={i} variant='outline' size='xs' className={tool.active ? 'inherit' : 'border-transparent'}>
                            <MaterialCommunityIcons name={tool.icon} size={12} color={iconColor} />
                            <ButtonText>{tool.name}</ButtonText>
                        </Button>
                    ))}
                </Box>
            </Box>
            {/* <Box className='flex-row gap-6 self-end'>
                <Pressable className='flex-row gap-2 items-center'>
                    <MaterialCommunityIcons name="thumb-up" size={20} color={iconColor} />
                    <Text size='sm'>0</Text>
                </Pressable>
            </Box> */}
        </Box>
    )
}