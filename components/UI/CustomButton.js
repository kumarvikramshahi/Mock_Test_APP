import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

export default function CustomButton({ value, btnHandler, bgcolor, color, padding, fontSize, margin }) {
    const styles = StyleSheet.create({
        btn: {
            margin: margin ? margin : 25,
            borderRadius: 20,
            padding: padding ? padding : 15,
            elevation: 5,
            backgroundColor: bgcolor ? bgcolor : "#D7F8FF",
            borderColor: "rgba(255,255,255,0.8)",
            borderWidth: 1,
        },
        textStyle: {
            color: color ? color : "black",
            fontWeight: "bold",
            ...(fontSize && { fontSize: fontSize }),
            textAlign: "center"
        }
    });

    return (
        <Pressable
            style={styles.btn}
            onPress={(e) => btnHandler(e)}
        >
            <Text style={styles.textStyle}>{value}</Text>
        </Pressable>
    )
}