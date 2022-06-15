import React, { useState } from "react";
import { StyleSheet, ScrollView, View, Text } from "react-native";
import { FontSize } from "../../constants/constants";

export default function QuestionsCard({ question }) {
    const [selectedOption, setSelectedOption] = useState('')

    return (
        <Text style={{ fontSize: FontSize.small }}>
            <ScrollView>
                <Text>{question}</Text>
            </ScrollView>
            {question?.options?.map((item, idx) =>
                <Text onPress={() => setSelectedOption(item)} key={idx} style={styles.option}>{item}</Text>
            )}
            {/* 
            * See HTML to React native pakage
           * make UI design
           * Apply buttons and its functionalties
           * Design EXIT EXAM popup card
            */}
            kjhkj
        </Text>
    )
}


const styles = StyleSheet.create({
    option: {

    }
});
