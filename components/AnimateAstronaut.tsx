import React, { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";

export default function AnimateAstronaut({ children }: { children: React.ReactNode }) {
    const float = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const loop = Animated.loop(
            Animated.sequence([
                Animated.timing(float, {
                    toValue: 1,
                    duration: 2500,
                    easing: Easing.inOut(Easing.sin),
                    useNativeDriver: true,
                }),
                Animated.timing(float, {
                    toValue: 0,
                    duration: 2500,
                    easing: Easing.inOut(Easing.sin),
                    useNativeDriver: true,
                }),
            ])
        );
        loop.start();
        return () => loop.stop();
    }, [float]);

    const translateY = float.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -8], // px up/down
    });

    const rotate = float.interpolate({
        inputRange: [0, 1],
        outputRange: ["-2deg", "2deg"], // gentle sway
    });

    const scale = float.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [1, 1.02, 1], // tiny breathing effect
    });

    const AnimatedView = Animated.View;

    return (
        <AnimatedView style={{ transform: [{ translateY }, { rotate }, { scale }] }}>
            {children}
        </AnimatedView>
    )
}