import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { View, Text } from "native-base";

export default function PaperListCard({ paperList, paperId, setPaperId }) {
    return (
        <View style={styles.card}>
            {paperList ?
                paperList?.map((item, idx) => <Text onPress={() => setPaperId(item._id)} key={idx} style={styles.TextStyle}> {item.name} </Text>)
                : <Text>Paper Coming Soon...</Text>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        elevation: 3,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 200,
        width: "50%"
    },
    TextStyle: {
        margin: 20,
    },
    textException: {
        marginTop: 10,
    }
})