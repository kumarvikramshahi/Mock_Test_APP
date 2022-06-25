import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { FontSize } from '../../constants/constants';
import { DefaultText, DefaultView } from './Themed';

export default function Checkbox({ value, onValueChange, message, marginVertical }) {
    const colorScheme = useColorScheme();

    function onCheckmarkPress() {
        onValueChange(!value);
    }

    // const styles2 = StyleSheet.create({
    //     theme: {
    //         color: Colors[colorScheme].text,
    //         backgroundColor: Colors[colorScheme].background,
    //         shadowColor: Colors[colorScheme].text
    //     },
    // })

    return (
        <View style={{ flexDirection: "row", marginVertical: marginVertical ? marginVertical : 20 }}>
            <Pressable
                style={[styles.checkboxBase, value && styles.checkboxChecked]}
                onPress={onCheckmarkPress}>
                {value && <Ionicons name="checkmark" size={24} color="white" />}
            </Pressable>
            <View style={{ flex: 2 }}>
                <DefaultText>{message} </DefaultText>
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
        marginRight: 10,
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