import * as React from "react";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function GradientBG1() {
    return (
        <LinearGradient
            colors={["rgb(9, 9, 11)", "rgb(24, 24, 27)"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
            pointerEvents="none"
        />
    );
}
