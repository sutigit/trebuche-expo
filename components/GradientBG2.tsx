import * as React from "react";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function GradientBG2() {
    return (
        <LinearGradient
            colors={["rgb(24, 24, 27)", "rgb(10, 10, 10)"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
            pointerEvents="none"
        />
    );
}
