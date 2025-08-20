import React, { useEffect, useState } from 'react'
import { useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import { Box } from '@/components/ui/box'
import { Text } from '@/components/ui/text'
import { Input, InputField } from "@/components/ui/input"
import { Textarea, TextareaInput } from "@/components/ui/textarea"
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button"
import {
    FormControl,
    FormControlError,
    FormControlErrorText,
    FormControlErrorIcon,
    FormControlLabel,
    FormControlLabelText,
    FormControlHelper,
    FormControlHelperText,
} from "@/components/ui/form-control"
import { AlertCircleIcon, EditIcon } from "@/components/ui/icon";
import { Pressable } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Spinner } from "@/components/ui/spinner"
import { ScrollView } from "@/components/ui/scroll-view";
import colors from "tailwindcss/colors"
import { fetchBotById } from '@/api/supabase/bots';
import { Heading } from '@/components/ui/heading';


export default function BotEditor() {
    const router = useRouter()

    const { id } = useLocalSearchParams()
    const [loading, setLoading] = useState(true)

    const [name, setName] = useState('')
    const [nameReadOnly, setNameReadOnly] = useState(true)
    const [isInvalidName, setIsInvalidName] = useState(false)

    const [color, setColor] = useState<string | null>(null)
    const [colorReadOnly, setColorReadOnly] = useState(true)
    const [isInvalidColor, setIsInvalidColor] = useState(false)

    const [description, setDescription] = useState<string | null>(null)
    const [descriptionReadOnly, setDescriptionReadOnly] = useState(true)
    const [isInvalidDescription, setIsInvalidDescription] = useState(false)

    const [instructions, setInstructions] = useState<string | null>(null)
    const [instructionsReadOnly, setInstructionsReadOnly] = useState(true)
    const [isInvalidInstructions, setIsInvalidInstructions] = useState(false)


    useEffect(() => {
        if (!id) return;

        const normalizedId = Array.isArray(id) ? id[0] : id;
        fetchBotById(normalizedId)
            .then((bot) => {
                if (bot) {
                    setName(bot.name)
                    setDescription(bot.description)
                    setInstructions(bot.prompt)
                    setColor(bot.color)
                }
            })
            .catch((err) => {
                console.error("📌 error", err)
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
        <ScrollView>
            <Box className="flex-1 py-16 px-4">
                <Pressable className='mb-8' onPress={() => router.navigate('/(tabs)/bots')}>
                    <MaterialCommunityIcons name="close" size={32} color={"rgb(229, 229, 231)"} />
                </Pressable>

                <Box className='gap-8'>
                    <Box className='flex-1 gap-4 p-6 rounded-2xl bg-white/10 backdrop-blur-md'>
                        <Button className='self-start' size='sm'>
                            <ButtonText>
                                Muokkaa kuvausta
                            </ButtonText>
                            <ButtonIcon as={EditIcon} />
                        </Button>
                        <Box className='flex-row items-center gap-4 my-1'>
                            <Box className='w-8 my-2 aspect-square rounded-lg' style={{ backgroundColor: color ?? colors.zinc[200] }} />
                            <Heading size='xl'>{name}</Heading>
                        </Box>
                        <Text size='sm' className='leading-6 flex-1'>{description}</Text>
                    </Box>

                    <Box className='flex-1 gap-4 p-6'>
                        <Button className='self-start' size='sm'>
                            <ButtonText>
                                Muokkaa promptia
                            </ButtonText>
                            <ButtonIcon as={EditIcon} />
                        </Button>
                        <Text size='sm' className='leading-6 flex-1 my-2'>{instructions}</Text>
                    </Box>
                </Box>
            </Box>
        </ScrollView>

    )
}