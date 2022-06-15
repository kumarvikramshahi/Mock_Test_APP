import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

export default function CustomButton({ value, btnHandler, bgcolor, color, padding, fontSize, margin }) {
    const styles = StyleSheet.create({
        btn: {
            margin: margin ? margin : 50,
            borderRadius: 20,
            padding: padding ? padding : 15,
            elevation: 10,
            backgroundColor: bgcolor ? bgcolor : "#D7F8FF",
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