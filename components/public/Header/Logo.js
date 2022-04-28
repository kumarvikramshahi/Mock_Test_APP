import React from "react";
import { StyleSheet } from "react-native";
import { View, Text } from "native-base";

export default function Logo() {
    return (
        <Text style={styles.logo}>
            IDEAL TUTOR LOGO
        </Text>
    )
}

const styles = StyleSheet.create({
    logo: {
        fontSize: 18,
        padding: 0,
        margin: 0,
        fontFamily: "Roboto",
        fontWeight: "bold",
        color: "purple",
    },
});