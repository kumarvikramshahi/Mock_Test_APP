import React from "react";
import { StyleSheet, StatusBar, ScrollView, BackHandler, Alert, View, Text } from "react-native";

export default function CustomBackHandler({ route, name, message }) {
    const backAction = () => {
        Alert.alert("Hold on!", "Are you sure you want to Exit EXAM?", [
            {
                text: "Cancel",
                onPress: () => null,
                style: "destructive"
            },
            { text: "YES", onPress: () => navigation.navigate(name) }
        ]);
        return true;
    };

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, [route?.key])

    return
}