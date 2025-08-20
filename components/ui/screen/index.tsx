import React, { ReactNode, useState, useEffect } from 'react'
import { Box } from '../box'
import { ScrollView } from "@/components/ui/scroll-view";
import { useIsFocused } from '@react-navigation/native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    Easing,
} from 'react-native-reanimated';
import GradientBG2 from '@/components/GradientBG2';

export default function Screen({ children, background = false, halfBackground = false }: { children: ReactNode, background?: boolean, halfBackground?: boolean }) {
    const isFocused = useIsFocused();
    const opacity = useSharedValue(0);

    useEffect(() => {
        if (isFocused) {
            opacity.value = withTiming(1, { duration: 400, easing: Easing.out(Easing.ease) });
        } else {
            opacity.value = 0;
        }
    }, [isFocused]);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));

    return (
        <Animated.View style={[{ flex: 1 }, animatedStyle]}>
            <Box className={`h-screen flex-1 overflow-hidden pt-16 ${halfBackground ? 'pb-0' : ' pb-[145px]'}`}>
                {background && <GradientBG2 />}
                <ScrollView>
                    {children}
                </ScrollView>
            </Box>
        </Animated.View>
    )
}