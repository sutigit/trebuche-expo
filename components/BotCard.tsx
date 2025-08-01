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

export default function BotCard({ bot, session }: { bot: Tables<'bots'>, session: Session | null }) {
    const router = useRouter()
    const [alert, setAlert] = useState(false)

    async function handleClickBotEditor() {
        if (session && session.user) {
            router.navigate({ pathname: '/bot-editor/[id]', params: { id: bot.id } })
        } else {
            setAlert(true)
        }
    }

    return (
        <Box className='flex-1 gap-4 p-6 rounded-2xl bg-white/10 backdrop-blur-md'>
            <Box className='flex-row items-center gap-4 mb-1'>
                <Box className='w-8 my-2 aspect-square rounded-lg' style={{ backgroundColor: bot.color ?? colors.zinc[200] }} />
                <Heading size='xl'>{bot.name}</Heading>
            </Box>
            <Text size='sm' className='leading-6 flex-1 border-b border-zinc-700 pb-6'>{bot.description}</Text>
            <Box className="flex-row gap-12 justify-center items-center pt-5 pb-3">
                <Pressable className=" h-6 w-16 flex justify-center items-center gap-2">
                    <Box className="flex-row gap-2 items-center h-5">
                        <MaterialCommunityIcons name="thumb-up" size={16} color={"rgb(229, 229, 231)"} />
                        <Text size="xs">0</Text>
                    </Box>
                    <Text size="xs">Tykkää</Text>
                </Pressable>
                <Box className=" h-6 w-16 flex justify-center items-center gap-2">
                    <Box className="flex-row gap-2 items-center h-5">
                        <MaterialCommunityIcons name="brain" size={16} color={"rgb(229, 229, 231)"} />
                        <Text size="xs">0</Text>
                    </Box>
                    <Text size="xs">Käytetty</Text>
                </Box>
                <Pressable className=" h-6 w-16 flex justify-center items-center gap-2" onPress={handleClickBotEditor}>
                    <Box className="flex-row gap-2 items-center h-5">
                        <MaterialCommunityIcons name="pencil" size={16} color={"rgb(229, 229, 231)"} />
                    </Box>
                    <Text size="xs">Muokkaa</Text>
                </Pressable>
            </Box>
            <LoginAlert isOpen={alert} handleClose={() => setAlert(false)} />
        </Box>
    )
}