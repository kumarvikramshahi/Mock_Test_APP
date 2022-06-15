import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { FontSize } from '../../constants/constants';

export default function Checkbox({ value, onValueChange, message }) {
    const colorScheme = useColorScheme();

    function onCheckmarkPress() {
        onValueChange(!value);
    }

    const styles2 = StyleSheet.create({
        theme: {
            color: Colors[colorScheme].text,
            backgroundColor: Colors[colorScheme].background,
            shadowColor: Colors[colorScheme].text
        },
    })

    return (
        <View style={{ flexDirection: "row" }}>
            <Pressable
                style={[styles.checkboxBase, value && styles.checkboxChecked]}
                onPress={onCheckmarkPress}>
                {value && <Ionicons name="checkmark" size={24} color="white" />}
            </Pressable>
            <View style={{ flex: 2 }}>
                <Text style={styles2.theme}>{message} </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    checkboxBase: {
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderWidth: 2,
        borderColor: 'coral',
        backgroundColor: 'transparent',
        flex: 0.12,
        marginRight: 10
    },

    checkboxChecked: {
        backgroundColor: 'coral',
    },

    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    checkboxLabel: {
        marginLeft: 8,
        fontWeight: 500,
        fontSize: FontSize.medium,
    },
});