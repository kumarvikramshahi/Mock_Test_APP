import React from "react";
import { StyleSheet, ActivityIndicator, View, Modal } from "react-native";
import useColorScheme from "../../hooks/useColorScheme";

export default function FullScreenSpinner({ size, color }) {
    // apply functionalty such that if spinner runs for more than 5sec then reflect msg that "its taking too long"

    const colorScheme = useColorScheme();

    const styles = StyleSheet.create({
        spinner: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: colorScheme === "light" ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,.05)"
        },
        spinnerChild: {
            elevation: 10,
            alignItems: "center"
        }
    })

    return (
        <Modal animationType="slide" transparent={true}>
            <View style={styles.spinner}>
                <View style={styles.spinnerChild}>
                    <ActivityIndicator size={size ? size : 60} color={color ? color : "#116999"} />
                </View>
            </View>
        </Modal>
    )
}