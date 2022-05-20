import { Center, Text, View } from "native-base";
import React from "react";
import { StyleSheet, StatusBar, ScrollView } from "react-native";
import useColorScheme from "../../hooks/useColorScheme";
import Colors from "../../constants/Colors";
import CustomButton from "../../components/UI/CustomButton";

export default function Instructions({ navigation, instructions }) {
    const colorScheme = useColorScheme();
    const styles2 = StyleSheet.create({

        parentView: {
            marginTop: StatusBar.currentHeight + 5,
            flex: 1,
            alignContent: "center",
            justifyContent: "flex-start"
        }
    });

    const start = () => {
        navigation.navigate('ExamScreen')
    }

    return (
        <View style={{ ...styles.card, ...styles2.parentView }}>
            <Center><Text style={styles.header}>Instructions</Text></Center>
            <ScrollView>
                <Text style={styles.infoText}>
                    {instructions}
                </Text>
            </ScrollView>
            <CustomButton value="Start Now" btnHandler={start} fontSize={18} />
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 20,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 30,
        paddingBottom: 40,
        elevation: 10,
        backgroundColor: "white"
    },
    header: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 18,
    },
    infoText: {
        fontSize: 16
    }
});