import { Button, ButtonText } from "@/components/ui/button";
import { FormControl, FormControlError, FormControlErrorText, FormControlErrorIcon, FormControlLabel, FormControlLabelText, FormControlHelper, FormControlHelperText } from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { AlertCircleIcon } from "@/components/ui/icon";
import React, { useState } from "react";
import { signin } from "@/api/supabase/auth";

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [isInvalidEmail, setIsInvalidEmail] = useState(false);
    const [isInvalidPassword, setIsInvalidPassword] = useState(false);
    const [isInvalidCredentials, setIsInvalidCredentials] = useState(false);

    async function signInWithEmail() {
        setLoading(true)

        if (email.length < 1) {
            setIsInvalidEmail(true)
            setLoading(false)
            return
        } else {
            setIsInvalidEmail(false)
        }

        if (password.length < 1) {
            setIsInvalidPassword(true)
            setLoading(false)
            return
        } else {
            setIsInvalidPassword(false)
        }

        const { error } = await signin({
            email,
            password
        })

        if (error) {
            setIsInvalidCredentials(true)
            setLoading(false)
            return
        } else {
            setIsInvalidCredentials(false)
        }

        setLoading(false)
    }

    return (
        <VStack className="w-full max-w-96 py-6 gap-6">
            <FormControl isInvalid={isInvalidEmail} size="md" isDisabled={false} isReadOnly={false} isRequired={false} >
                <FormControlLabel>
                    <FormControlLabelText>Sähköposti</FormControlLabelText>
                </FormControlLabel>
                <Input className="my-1" variant="underlined">
                    <InputField
                        type="text"
                        placeholder="sposti"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                </Input>
                <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon} />
                    <FormControlErrorText>
                        Buche, unohdit sun mailin
                    </FormControlErrorText>
                </FormControlError>
            </FormControl>

            <FormControl isInvalid={isInvalidPassword} size="md" isDisabled={false} isReadOnly={false} isRequired={false} >
                <FormControlLabel>
                    <FormControlLabelText>Passu</FormControlLabelText>
                </FormControlLabel>
                <Input className="my-1" variant="underlined">
                    <InputField
                        type="password"
                        placeholder="passu"
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                    />
                </Input>
                <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon} />
                    <FormControlErrorText>
                        Passu ei voi olla tyhjä
                    </FormControlErrorText>
                </FormControlError>
            </FormControl>

            <FormControl isInvalid={isInvalidCredentials} size="md" isDisabled={false} isReadOnly={true} isRequired={false} >
                <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon} />
                    <FormControlErrorText>
                        Aijjj... ei menny oikein
                    </FormControlErrorText>
                </FormControlError>
            </FormControl>

            <Button className="w-fit self-end" size="sm" onPress={signInWithEmail} disabled={loading}>
                <ButtonText>Noniin</ButtonText>
            </Button>
        </VStack>
    );
};