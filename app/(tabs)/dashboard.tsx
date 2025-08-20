import React, { useState, useEffect } from 'react'
import Screen from '@/components/ui/screen'
import { Box } from '@/components/ui/box'
import { Spinner } from "@/components/ui/spinner"
import colors from "tailwindcss/colors"
import { Tables } from '@/lib/supabase.types'
import { fetchProfile } from '@/api/supabase/profiles'
import { getUser } from '@/api/supabase/auth'
import { Image } from '@/components/ui/image'
import { Text } from '@/components/ui/text'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import AnimateAstronaut from '@/components/AnimateAstronaut'
import FinishedConversations from '@/components/FinishedConversations'
import PublishedConversations from '@/components/PublishedConversations'
import UnfinishedConversations from '@/components/UnfinishedConversations'
import GradientBG2 from '@/components/GradientBG2';

const renderScene = SceneMap({
    finished: FinishedConversations,
    published: PublishedConversations,
    unfinished: UnfinishedConversations,
});

const routes = [
    { key: 'finished', title: 'Omat' },
    { key: 'published', title: 'Julkaistut' },
    { key: 'unfinished', title: 'Kesken' },
];

export default function DashboardScreen() {
    const [profile, setProfile] = useState<Tables<'profiles'>>()
    const [loading, setLoading] = useState(true)
    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);

    async function fetchDashboardData() {
        const user = await getUser()
        if (!user) throw new Error('User not found')

        const profileData = await fetchProfile(user.id)

        return { profileData }
    }

    useEffect(() => {
        fetchDashboardData()
            .then(({ profileData }) => {
                if (profileData) {
                    setProfile(profileData)
                }
            })
            .catch((err) => {
                console.log("📌 error", err)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    if (loading) {
        return (
            <Box className="flex-1 justify-center items-center">
                <Spinner size="large" color={colors.purple[300]} />
            </Box>
        )
    }


    return (
        <Screen halfBackground>
            <Box>

                {/* Profile --------------------------------------------- */}
                <Box className='h-[32vh] ml-12 justify-center'>
                    <AnimateAstronaut>
                        <Image
                            className='mb-5'
                            source={require("@/assets/images/buchenaut.png")}
                            alt="dashboard-image"
                            size="xl"
                        />
                    </AnimateAstronaut>
                    <Box className='sticky'>
                        <Text size='sm'>buchenaut:</Text>
                        <Text size='xl' className='justify-center text-purple-300 font-bold'>{profile?.username} <MaterialCommunityIcons name="check-decagram" size={16} color={colors.green[300]} /></Text>
                    </Box>
                </Box>

                {/* Jatka mihin jäit -------------------------------- */}
                {/* <Box className='px-6 pt-2'>
                        <Box className='rounded-2xl bg-zinc-800 p-5 flex-row justify-between'>
                            <Box className='gap-1 w-3/4'>
                                <Text size='sm' className='text-purple-300'>Jatka siitä mihin jäit</Text>
                                <Heading size='md'>Ketchup Made of Nothing</Heading>
                            </Box>
                            <MaterialCommunityIcons name="send-circle" size={36} color={colors.purple[300]} />
                        </Box>
                    </Box> */}

                {/* Tabs ----------------------------------------- */}
                <Box className='h-screen rounded-t-3xl overflow-hidden'>
                    <GradientBG2 />
                    <TabView
                        navigationState={{ index, routes }}
                        renderScene={renderScene}
                        onIndexChange={setIndex}
                        initialLayout={{ width: layout.width }}
                        renderTabBar={(props) => (
                            <TabBar
                                {...props}
                                style={{
                                    backgroundColor: 'transparent',
                                    elevation: 0, // Remove android shadow
                                    shadowOpacity: 0, // Remove iOS shadow
                                }}
                                activeColor={colors.purple[300]}
                                indicatorStyle={{ backgroundColor: colors.purple[300], height: 1 }}
                            />
                        )}
                    />
                </Box>
            </Box>
        </Screen>
    )
}