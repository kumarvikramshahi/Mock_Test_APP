import React from "react";
import { Text, StyleSheet } from "react-native";
import { DefaultText, DefaultView } from "../Themed";
import useColorScheme from '../../hooks/useColorScheme';
import Colors from "../../constants/Colors";

export default function Chips({ value, setClickedSubject, setClickedClass, skillSubjects }) {
    const filterBtn = (e) => {
        if (value?.std || value?.subject) {
            setClickedClass(value.std);
            setClickedSubject(value.subject);
        }
    }
    const colorScheme = useColorScheme();
    // color = { Colors[colorScheme].background }
    const styles = StyleSheet.create({
        chips: {
            borderRadius: 30,
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.2)',
            paddingLeft: 13,
            paddingRight: 13,
            paddingBottom: 6,
            paddingTop: 6,
            marginRight: 5,
            marginTop: 2,
            color: colorScheme === 'light' ? '#000' : '#e4e4e4',
            backgroundColor: colorScheme === 'light' ? "rgba(0,0,0,0.05)" : '#373737'
        },
    });

    return (
        <DefaultText darkColor="rgba(255,255,255,0.05)" lightColor="rgba(0,0,0,0.05)" style={styles.chips} onPress={e => filterBtn(e)}>
            {value || value?.std || skillSubjects}
        </DefaultText>
    )
}
