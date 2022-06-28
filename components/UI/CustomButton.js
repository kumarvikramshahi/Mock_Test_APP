import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

export default function CustomButton({ value, iconLeft, iconRight, bgcolor, color, padding, fontSize, margin, fontWeight, customStyle, disabled, ...otherProps }) {
    // const colorScheme = useColorScheme();
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
            fontWeight: fontWeight ? fontWeight : "bold",
            ...(fontSize && { fontSize: fontSize }),
            textAlign: "center"
        }
    });

    return (
        <Pressable
            style={[styles.btn, customStyle, { flexDirection: "row" }]}
            {...otherProps}
            disabled={disabled}
        >
            {iconLeft ? <Text style={{ flex: 1 }}>{iconLeft}</Text> : null}
            <Text style={[styles.textStyle, { flex: 3 }]}>{value}</Text>
            {iconRight ? <Text style={{ flex: 1 }}>{iconRight}</Text> : null}
        </Pressable>
    )
}