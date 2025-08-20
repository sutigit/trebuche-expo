import React, { useState } from 'react'
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { FormControl, FormControlError, FormControlErrorText, FormControlErrorIcon } from "@/components/ui/form-control";
import { AlertCircleIcon } from "@/components/ui/icon";
import { Spinner } from "@/components/ui/spinner"
import colors from "tailwindcss/colors"
import { signout } from '@/api/supabase/auth';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function Logout() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    async function signOut() {
        setLoading(true)
        let { error } = await signout();

        if (error) {
            setError(true)
        }

        setLoading(false)
    }

    return (
        <Box>
            <Button variant='link' onPress={signOut} disabled={loading}>
                <ButtonText className='text-purple-300'>Kirjaudu ulos</ButtonText>
                {loading ?
                    <Spinner color={colors.purple[300]} size='small' />
                    :
                    <MaterialCommunityIcons name="earth" size={18} color={colors.purple[300]} />
                }
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