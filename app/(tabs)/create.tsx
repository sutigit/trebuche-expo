import React, { useState } from 'react'
import Screen from '@/components/ui/screen'
import { Box } from '@/components/ui/box'
import { Heading } from '@/components/ui/heading'
import PromptTextInput from '@/components/PromptTextInput'

export default function CreateScreen() {
    const [text, setText] = useState('')
    const [alert, setAlert] = useState(false)
    const [sending, setSending] = useState(false)

    function onSubmit() {
        if (!text.length) {
            setAlert(true)
            setTimeout(() => {
                setAlert(false)
            }, 5000)
        }

        console.log("📌", text)
        // setSending(true)
    }

    return (
        <Screen background>
            <Box className='px-1 py-5'>
                <Box className='h-[calc(100vh/2)] justify-end pb-14'>
                    <Box className='gap-5 px-8 items-center'>
                        <Heading size='3xl'>🙇🏻‍♂️</Heading>
                        <Heading >Buche, ideanne olkaa hyvä</Heading>

                        <PromptTextInput
                            text={text}
                            setText={setText}
                            onSubmit={onSubmit}
                            alert={alert}
                            disabled={sending}
                        />

                    </Box>
                </Box>
            </Box>
        </Screen>
    )
}