import { useRouter } from 'expo-router';
import {
    AlertDialog,
    AlertDialogBackdrop,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogBody,
} from '@/components/ui/alert-dialog';
import { Button, ButtonText } from './ui/button';
import { Text } from './ui/text';
import { Heading } from './ui/heading';
import { Image } from './ui/image'

export default function LoginAlert({ isOpen, handleClose }: { isOpen: boolean, handleClose: () => void }) {
    const router = useRouter()

    function onNavigate() {
        handleClose()
        router.navigate('/(tabs)/profile')
    }

    return (
        <AlertDialog isOpen={isOpen} onClose={handleClose} size="sm">
            <AlertDialogBackdrop className="bg-purple-300" />
            <AlertDialogContent className="bg-zinc-900 border-none rounded-2xl">
                <AlertDialogHeader className='flex-row justify-start items-start gap-3 mb-3'>
                    <Image
                        source={{ uri: "https://i.pinimg.com/736x/58/7b/57/587b57f888b1cdcc0e895cbdcfde1c1e.jpg" }}
                        alt="profile-image"
                        size="lg"
                        className="rounded-2xl"
                    />
                    <Heading className="text-typography-950 font-semibold" size="md">
                        Seis.
                    </Heading>
                </AlertDialogHeader>
                <AlertDialogBody className="mt-3 mb-4">
                    <Text size="sm">
                        Kirjaudu ensin sisään, Buche.
                    </Text>
                </AlertDialogBody>
                <AlertDialogFooter className="mt-4">
                    <Button
                        variant="outline"
                        action="secondary"
                        onPress={handleClose}
                        size="sm"
                    >
                        <ButtonText>En</ButtonText>
                    </Button>
                    <Button size="sm" onPress={onNavigate}>
                        <ButtonText>Hyvä on</ButtonText>
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
};