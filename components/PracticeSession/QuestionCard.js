import React from "react";
import { View, Text } from "native-base";

export default function QuestionsCard({ question }) {
    return (
        <View>
            <Text>{question}</Text>
        </View>
    )
}