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
            router.navigate({ pathname: '/bot-editor/[id]', params: { id: bot.id } })
        } else {
            setAlert(true)
        }
    }

    return (
        <>
            <Box className='flex-row gap-5'>
                <Box className='w-10 aspect-square rounded-full my-2' style={{ backgroundColor: bot.color ?? colors.zinc[200] }} />
                <Box className='flex-row justify-between border-b border-white/15 pb-5'>
                    <Box className=' w-4/5'>
                        <Heading size='md'>{bot.name}</Heading>
                        <Text size='sm' className='truncate line-clamp-2 mt-1'>{bot.description}</Text>
                    </Box>
                    <Button onPress={handleClickBotEditor} variant='link'>
                        <MaterialCommunityIcons name="dots-vertical" size={20} color={iconColor} />
                    </Button>
                </Box>
            </Box>
            {/* <Box className="flex-row gap-12 justify-center items-center pt-5 pb-3">
                <Pressable className=" h-6 w-16 flex justify-center items-center gap-2">
                <Box className="flex-row gap-2 items-center h-5">

                <Text size="xs">0</Text>
                </Box>
                <Text size="xs">Tykkää</Text>
                </Pressable>
                <Box className=" h-6 w-16 flex justify-center items-center gap-2">
                <Box className="flex-row gap-2 items-center h-5">
                <MaterialCommunityIcons name="brain" size={14} color={iconColor} />
                <Text size="xs">0</Text>
                </Box>
                <Text size="xs">Käytetty</Text>
                </Box>
                <Pressable className=" h-6 w-16 flex justify-center items-center gap-2" onPress={handleClickBotEditor}>
                <Box className="flex-row gap-2 items-center h-5">
                <MaterialCommunityIcons name="pencil" size={14} color={iconColor} />
                </Box>
                <Text size="xs">Muokkaa</Text>
                </Pressable>
                </Box> */}
            {/* <Button onPress={handleClickBotEditor} size='xs' className='self-end'>
                <ButtonText>Muokkaa</ButtonText>
                <ButtonIcon as={EditIcon} />
                </Button> */}
            <LoginAlert isOpen={alert} handleClose={() => setAlert(false)} />
        </>
    )
}