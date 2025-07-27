import { Button, ButtonText } from "@/components/ui/button";
import { FormControl, FormControlError, FormControlErrorText, FormControlErrorIcon, FormControlLabel, FormControlLabelText, FormControlHelper, FormControlHelperText } from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { AlertCircleIcon } from "@/components/ui/icon";
import React from "react";

export default function LoginView() {
    const [isInvalidEmail, setIsInvalidEmail] = React.useState(false);
    const [inputValueEmail, setInputValueEmail] = React.useState('');
    const [isInvalidPassword, setIsInvalidPassword] = React.useState(false);
    const [inputValuePassword, setInputValuePassword] = React.useState('');

    const handleSubmit = () => {

        if (inputValueEmail.length < 1) {
            setIsInvalidEmail(true)
            return
        }

        if (inputValuePassword.length < 1) {
            setIsInvalidPassword(true);
            return
        }

        setIsInvalidEmail(false)
        setIsInvalidPassword(false);
    };

    return (
        <VStack className="w-full max-w-96 rounded-xl border border-background-200 p-5 gap-3">
            <FormControl isInvalid={isInvalidEmail} size="md" isDisabled={false} isReadOnly={false} isRequired={false} >
                <FormControlLabel>
                    <FormControlLabelText>Sähköposti</FormControlLabelText>
                </FormControlLabel>
                <Input className="my-1">
                    <InputField
                        type="text"
                        placeholder="sposti"
                        value={inputValueEmail}
                        onChangeText={(text) => setInputValueEmail(text)}
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
                <Input className="my-1">
                    <InputField
                        type="password"
                        placeholder="passu"
                        value={inputValuePassword}
                        onChangeText={(text) => setInputValuePassword(text)}
                    />
                </Input>
                <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon} />
                    <FormControlErrorText>
                        Passu ei voi olla tyhjä
                    </FormControlErrorText>
                </FormControlError>
            </FormControl>
            <Button className="w-fit self-end mt-4" size="sm" onPress={handleSubmit}>
                <ButtonText>Noniin</ButtonText>
            </Button>
        </VStack>
    );
};