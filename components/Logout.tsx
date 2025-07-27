import React, { useState } from 'react'
import { Text } from "@/components/ui/text"
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { FormControl, FormControlError, FormControlErrorText, FormControlErrorIcon } from "@/components/ui/form-control";
import { AlertCircleIcon } from "@/components/ui/icon";

import { User } from "@supabase/supabase-js";
import supabase from "../lib/supabase"

export default function Logout({ user }: { user: User }) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    async function signOut() {
        setLoading(true)
        let { error } = await supabase.auth.signOut();

        if (error) {
            setError(true)
        }

        setLoading(false)
    }

    return (
        <Box>
            <Text>
                Sehän on <Text className='text-orange-400'>{user.email}</Text>, perkele!
            </Text>
            <Button className="w-fit mt-5" size="sm" onPress={signOut} disabled={loading}>
                <ButtonText>Kirjaudu ulos jo</ButtonText>
            </Button>

            <FormControl isInvalid={error} size="md" isDisabled={false} isReadOnly={true} isRequired={false} >
                <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon} />
                    <FormControlErrorText>
                        Hmmm... nyt en tiedä. Kokeile uudestaan tai laita viestiä.
                    </FormControlErrorText>
                </FormControlError>
            </FormControl>
        </Box>
    )
}