import React, { useState } from 'react'
import { TextInput } from 'react-native'
import { Box } from '@/components/ui/box'
import { FormControl, FormControlError, FormControlErrorText, FormControlErrorIcon, FormControlLabel, FormControlLabelText } from "@/components/ui/form-control";
import { Button, ButtonText } from '@/components/ui/button'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import colors from 'tailwindcss/colors'
import { Spinner } from './ui/spinner'
import { AlertCircleIcon } from "@/components/ui/icon";


export default function PromptTextInput({ setText, onSubmit, submitNote, disabled, alert }: { setText: (text: string) => void, onSubmit: () => void, submitNote: string | null, disabled: boolean, alert: string | null }) {
    const [inputHeight, setInputHeight] = useState(40);
    const MAX_HEIGHT = 108; // ~ 6 rows
    const MIN_HEIGHT = 40;

    return (
        <Box className='w-full items-center'>
            <FormControl className='w-full' isInvalid={!!alert} size="md" isDisabled={disabled} isReadOnly={disabled}>
                <Box className='mb-2 w-full border-b border-background-300 data-[focus=true]:border-primary-700 data-[disabled=true]:opacity-40 data-[disabled=true]:bg-background-50 data-[invalid=true]:border-error-700'>
                    <TextInput
                        readOnly={disabled}
                        onChangeText={setText}
                        placeholder="Ideanne..."
                        multiline
                        scrollEnabled
                        textAlignVertical='top'
                        className='p-2 color-typography-900 align-text-top placeholder:text-typography-500'
                        style={{
                            minHeight: 40,
                            height: inputHeight,
                        }}
                        onContentSizeChange={(event) => {
                            const newHeight = event.nativeEvent.contentSize.height;
                            setInputHeight(Math.max(MIN_HEIGHT, Math.min(MAX_HEIGHT, newHeight)));
                        }}
                    />
                </Box>
                <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon} />
                    <FormControlErrorText size='sm'>
                        {alert}
                    </FormControlErrorText>
                </FormControlError>
            </FormControl>
            <Button className='mt-4 bg-purple-300' onPress={onSubmit} disabled={disabled}>
                <ButtonText>{submitNote ?? 'Ideanne...'}</ButtonText>
                {
                    disabled ?
                        <Spinner color={colors.zinc[900]} size='small' />
                        :
                        <MaterialCommunityIcons name="send-circle" size={20} color={colors.zinc[900]} />
                }
            </Button>
        </Box>
    )
}