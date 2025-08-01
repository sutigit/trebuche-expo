import React, { useEffect, useState } from 'react'
import { Text } from "@/components/ui/text"
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { FormControl, FormControlError, FormControlErrorText, FormControlErrorIcon } from "@/components/ui/form-control";
import { AlertCircleIcon } from "@/components/ui/icon";
import { Spinner } from "@/components/ui/spinner"
import colors from "tailwindcss/colors"
import { User } from "@supabase/supabase-js";
import { fetchProfile } from '@/api/supabase/profiles';
import { signout } from '@/api/supabase/auth';

export default function Logout({ user }: { user: User }) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [username, setUsername] = useState<string | undefined>(undefined)

    useEffect(() => {
        fetchProfile(user.id)
            .then((profiles) => {
                if (profiles) {
                    setUsername(profiles.username)
                }
            })
            .catch((error) => {
                console.error(error)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    async function signOut() {
        setLoading(true)
        let { error } = await signout();

        if (error) {
            setError(true)
        }

        setLoading(false)
    }

    if (loading) {
        return (
            <Box className="flex-1 justify-center items-center">
                <Spinner size="large" color={colors.indigo[300]} />
            </Box>
        )
    }


    return (
        <Box>
            <Text>
                No sehän on <Text className='text-indigo-300'>{username}</Text>, perkele!
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