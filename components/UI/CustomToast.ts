import { ToastAndroid } from "react-native";
import React from "react";

export default function CustomToast(
    message: string,
    duration: string,
    position: string,
    xOffset: number,
    yOffset: number
) {
    ToastAndroid.showWithGravityAndOffset(
        message,
        duration === "short" ? ToastAndroid.SHORT : ToastAndroid.LONG,
        position === 'bottom' ? ToastAndroid.BOTTOM : position === 'center' ? ToastAndroid.CENTER : ToastAndroid.TOP,
        xOffset ? xOffset : 25,
        yOffset ? yOffset : 50
    );
}