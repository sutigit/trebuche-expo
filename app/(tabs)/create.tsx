import React, { useState, useRef } from 'react'
import Screen from '@/components/ui/screen'
import { Box } from '@/components/ui/box'
import { Heading } from '@/components/ui/heading'
import PromptTextInput from '@/components/PromptTextInput'
import { createUsersConversation } from '@/api/supabase/conversations'
import { getUser } from '@/api/supabase/auth'
import { createTitle } from '@/api/suticloud/completions'
import AnimateAstronaut from '@/components/AnimateAstronaut'
import { Image } from '@/components/ui/image'


export default function CreateScreen() {
    const [text, setText] = useState('')
    const [alert, setAlert] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const [submitNote, setSubmitNote] = useState<string | null>(null)

    const assKissers = ["Uuu... aivan 🔬", "Epätodellista ✨", "Wau... 🤯", "Huhhuh... 😎", "Nerokasta 🧠"]
    const assKisserInterval = useRef<ReturnType<typeof setInterval> | null>(null);

    function startAssKissing() {
        let index = 0
        setSubmitNote(assKissers[index])

        assKisserInterval.current = setInterval(() => {
            index = (index + 1) % assKissers.length
            setSubmitNote(assKissers[index])
        }, 2000)
    }

    function stopAssKissing() {
        if (assKisserInterval.current) {
            clearInterval(assKisserInterval.current)
            assKisserInterval.current = null
        }
        setSubmitNote(null)
    }

    async function onSubmit() {
        if (!text.length) {
            setAlert("Herra, ei voi olla tyhjää")
            setTimeout(() => {
                setAlert(null)
            }, 5000)
            return
        }

        setLoading(true)
        startAssKissing()

        try {

            const content = await createTitle({ content: text });
            if (!content) return

            const conversation = await createUsersConversation({
                title: content.title,
            })
            if (!conversation) return

            // navigate to conversation page
            console.log("📌 success, navigating to conversation edit page", conversation.id)

        } catch (error) {
            console.error("📌", error)
            setAlert("hmm.. jotain meni mönkään, kokeile uudestaan")
            setTimeout(() => setAlert(null), 5000)
        }

        stopAssKissing()
        setLoading(false)

    }

    return (
        <Screen background>
            <Box className='px-1 py-5'>
                <Box className='h-[calc(100vh/2)] justify-end pb-14'>
                    <Box className='gap-6 px-8 items-center'>
                        <AnimateAstronaut>
                            <Image
                                source={require("@/assets/images/buchenaut2flip.png")}
                                alt="profile-image"
                                size="xl"
                            />
                        </AnimateAstronaut>
                        <Heading >Buche, ideanne olkaa hyvä</Heading>

                        <PromptTextInput
                            setText={setText}
                            onSubmit={onSubmit}
                            submitNote={submitNote}
                            alert={alert}
                            disabled={loading}
                        />

                    </Box>
                </Box>
            </Box>
        </Screen>
    )
}