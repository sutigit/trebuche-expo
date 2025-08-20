import React, { useState } from 'react'
import { useRouter } from 'expo-router';
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading"
import { Tables } from '@/lib/supabase.types'
import LoginAlert from './LoginAlert';
import colors from 'tailwindcss/colors';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Pressable } from './ui/pressable';
import { Session } from '@supabase/supabase-js'
import { useThemeColor } from '@/hooks/useThemeColor';
import { Button, ButtonIcon, ButtonText } from './ui/button';
import { } from './ui/icon';

export default function BotCard({ bot, session }: { bot: Tables<'bots'>, session: Session | null }) {
    const router = useRouter()
    const [alert, setAlert] = useState(false)
    const iconColor = useThemeColor({}, 'text')

    async function handleClickBotEditor() {
        if (session && session.user) {
            router.navigate({ pathname: '/(screens)/bot-editor/[id]', params: { id: bot.id } })
        } else {
            setAlert(true)
        }
    }

    return (
        <>
            <Box className='flex-row gap-5'>
                <Box className='w-10 aspect-square rounded-xl my-1 justify-center items-center' style={{ backgroundColor: bot.color ?? colors.zinc[200] }}>
                    <MaterialCommunityIcons name="robot" size={20} color={iconColor} />
                </Box>
                <Box className='flex-row justify-between pb-5'>
                    <Box className=' w-5/6'>
                        <Heading size='md'>{bot.name}</Heading>
                        <Text size='sm' className='truncate line-clamp-2 mt-1'>{bot.description}</Text>
                    </Box>
                    <Button onPress={handleClickBotEditor} variant='link'>
                        <MaterialCommunityIcons name="dots-vertical" size={20} color={iconColor} />
                    </Button>
                </Box>
            </Box>
            <LoginAlert isOpen={alert} handleClose={() => setAlert(false)} />
        </>
    )
}