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
import { fetchDefaultBot } from '@/api/bots';
import { Tables } from '@/lib/supabase.types';
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
        fetchDefaultBot(normalizedId)
            .then((bot: Tables<'default_bots'>) => {
                setName(bot.name)
                setDescription(bot.description)
                setInstructions(bot.instructions)
                setColor(bot.color)
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
                <Spinner size="large" color={colors.indigo[300]} />
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

                    {/* Color -------------------------------- */}
                    {/* {colorReadOnly ?
                        <Box className='flex-row gap-5 items-center'>
                            <Box className='w-8 my-2 aspect-square rounded-lg' style={{ backgroundColor: color ?? colors.zinc[200] }} />
                            <Pressable>
                                <MaterialCommunityIcons name="pencil" size={24} color={color ?? "rgb(229, 229, 231)"} />
                            </Pressable>
                        </Box>
                        :
                        <FormControl isInvalid={isInvalidColor} size="lg" isReadOnly={colorReadOnly} >
                            <FormControlLabel>
                                <FormControlLabelText size='md'>Väri</FormControlLabelText>
                            </FormControlLabel>
                            <Box className='w-12 my-2 aspect-square rounded-xl' style={{ backgroundColor: color ?? colors.zinc[200] }} />
                            <FormControlError>
                                <FormControlErrorIcon as={AlertCircleIcon} />
                                <FormControlErrorText>
                                    Ööö..?
                                </FormControlErrorText>
                            </FormControlError>
                        </FormControl>
                    } */}

                    {/* Name ----------------------------------*/}
                    {/* 
                    {nameReadOnly ?
                        <Box className='flex-row gap-5 items-center'>
                            <Text size='2xl'>{name}</Text>
                            <Pressable>
                                <MaterialCommunityIcons name="pencil" size={24} color={colors.indigo[300]} />
                            </Pressable>
                        </Box>
                        :
                        <FormControl isInvalid={isInvalidName} size="lg" isReadOnly={nameReadOnly} >
                            <FormControlLabel>
                                <FormControlLabelText size='md'>Nimi</FormControlLabelText>
                            </FormControlLabel>
                            <Input variant="underlined" size='lg'>
                                <InputField
                                    type="text"
                                    placeholder="nimi"
                                    value={name}
                                    onChangeText={(text) => setName(text)}
                                />
                            </Input>

                            <FormControlError>
                                <FormControlErrorIcon as={AlertCircleIcon} />
                                <FormControlErrorText>
                                    Ööö..?
                                </FormControlErrorText>
                            </FormControlError>
                        </FormControl>
                    } */}

                    {/* Description ---------------------------*/}
                    {/* 
                    {descriptionReadOnly ?
                        <Box className='flex-row gap-5 items-start'>
                            <Text className='flex-1 leading-7'>{description}</Text>
                            <Pressable>
                                <FontAwesome name="magic" size={24} color={colors.indigo[300]} />
                            </Pressable>
                        </Box>
                        :
                        <FormControl isInvalid={isInvalidDescription} size="lg" isReadOnly={descriptionReadOnly} isDisabled={descriptionReadOnly}>
                            <FormControlLabel>
                                <FormControlLabelText size='md'>Kuvaus</FormControlLabelText>
                            </FormControlLabel>
                            <Textarea size='sm' className='my-1'>
                                <TextareaInput
                                    type="text"
                                    placeholder="kuvaus"
                                    value={description ?? undefined}
                                    onChangeText={(text) => setDescription(text)}
                                />
                            </Textarea>
                            <FormControlError>
                                <FormControlErrorIcon as={AlertCircleIcon} />
                                <FormControlErrorText>
                                    Ööö..?
                                </FormControlErrorText>
                            </FormControlError>
                        </FormControl>
                    } */}

                    {/* Instructions (prompt) -------------------*/}
                    {/* 
                    {instructionsReadOnly ?
                        <Box className='flex-row gap-5 items-start'>
                            <Text className='flex-1 leading-7'>{instructions}</Text>
                        </Box>
                        :
                        <FormControl isInvalid={isInvalidInstructions} size="lg" isReadOnly={instructionsReadOnly}>
                            <FormControlLabel>
                                <FormControlLabelText size='md'>Prompti</FormControlLabelText>
                            </FormControlLabel>
                            <Textarea size='sm' className='my-1'>
                                <TextareaInput
                                    type="text"
                                    placeholder="instructions"
                                    value={instructions ?? undefined}
                                    onChangeText={(text) => setInstructions(text)}
                                />
                            </Textarea>
                            <FormControlError>
                                <FormControlErrorIcon as={AlertCircleIcon} />
                                <FormControlErrorText>
                                    Ööö..?
                                </FormControlErrorText>
                            </FormControlError>
                        </FormControl>
                    } */}


                </Box>
            </Box>
        </ScrollView>

    )
}