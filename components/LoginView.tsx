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
        if (inputValuePassword.length < 6) {
            setIsInvalidPassword(true);
        } else {
            setIsInvalidPassword(false);
        }
    };

    return (
        <VStack className="w-full max-w-96 rounded-md border border-background-200 p-5 gap-3">
            <FormControl isInvalid={isInvalidEmail} size="md" isDisabled={false} isReadOnly={false} isRequired={false} >
                <FormControlLabel>
                    <FormControlLabelText>Email</FormControlLabelText>
                </FormControlLabel>
                <Input className="my-1">
                    <InputField
                        type="text"
                        placeholder="email"
                        value={inputValueEmail}
                        onChangeText={(text) => setInputValueEmail(text)}
                    />
                </Input>
                <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon} />
                    <FormControlErrorText>
                        Atleast 6 characters are required.
                    </FormControlErrorText>
                </FormControlError>
            </FormControl>

            <FormControl isInvalid={isInvalidPassword} size="md" isDisabled={false} isReadOnly={false} isRequired={false} >
                <FormControlLabel>
                    <FormControlLabelText>Password</FormControlLabelText>
                </FormControlLabel>
                <Input className="my-1">
                    <InputField
                        type="password"
                        placeholder="password"
                        value={inputValuePassword}
                        onChangeText={(text) => setInputValuePassword(text)}
                    />
                </Input>
                <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon} />
                    <FormControlErrorText>
                        Atleast 6 characters are required.
                    </FormControlErrorText>
                </FormControlError>
            </FormControl>
            <Button className="w-fit self-end mt-4" size="sm" onPress={handleSubmit}>
                <ButtonText>Login</ButtonText>
            </Button>
        </VStack>
    );
};