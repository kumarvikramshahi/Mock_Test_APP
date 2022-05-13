import { Text, View } from "native-base";
import React from "react";
import useColorScheme from "../../hooks/useColorScheme";

export default function Instructions({ instructions }) {
    const colorScheme = useColorScheme();
    const styles2 = StyleSheet.create({
        theme: {
            color: Colors[colorScheme].text,
            backgroundColor: Colors[colorScheme].background,
            fontSize: 25,
        },
    });

    return (
        <View style={{ ...styles.card, ...styles2.theme }}>
            <Text>
                {instructions}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        marginTop: 20,
        borderRadius: 20,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 30,
        paddingBottom: 40,
        width: "95%",
        elevation: 10
    },
    btn: {
        margin: 20,
        borderRadius: 10,
        padding: 8,
        height: 45,
        fontSize: 22,
        elevation: 10,
    }
});