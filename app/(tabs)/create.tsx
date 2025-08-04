import React, { useState } from 'react'
import Screen from '@/components/ui/screen'
import { Text } from '@/components/Themed'
import { Box } from '@/components/ui/box'
import { Textarea, TextareaInput } from "@/components/ui/textarea"
import { Heading } from '@/components/ui/heading'
import { Button, ButtonText } from '@/components/ui/button'
import { Input, InputField } from "@/components/ui/input";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

export default function CreateScreen() {

    const [topic, setTopic] = useState('')

    return (
        <Screen background>
            <Box className='px-1 py-5'>
                <Box className='pt-48 gap-5 px-8 items-center justify-end'>
                    <Heading size='3xl'>🙇🏻‍♂️</Heading>
                    <Heading >Buche, ideanne olkaa hyvä</Heading>
                    <Textarea className='h-auto border-0 border-b w-full mr-5'>
                        <TextareaInput
                            placeholder="Ideanne..."
                            multiline={true}
                            numberOfLines={12}
                            scrollEnabled={true}
                            style={{
                                lineHeight: 18,
                                minHeight: 40
                            }}
                        />
                    </Textarea>
                    <Button className='bg-indigo-300'>
                        <ButtonText>Ideanne...</ButtonText>
                        <MaterialCommunityIcons name="send-circle" size={20} />
                    </Button>
                    <Box>

                    </Box>
                </Box>
            </Box>
        </Screen>
    )
}