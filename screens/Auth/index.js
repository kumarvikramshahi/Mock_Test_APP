import React from "react";
import { Text, View, StyleSheet, useColorScheme, TouchableOpacity } from "react-native";
import { DefaultText, DefaultView } from "../../components/UI/Themed";
import CustomButton from "../../components/UI/CustomButton";
// import { AntDesign } from '@expo/vector-icons';
import Colors from "../../constants/Colors";
import { FontSize } from "../../constants/constants";

export default function Auth({ setLoggedIn }) {
    const colorScheme = useColorScheme();

    const onLogin = () => {

    }

    // const onGoogleClick = () => {
    //     console.log("clicked")
    // }

    return (
        <DefaultView style={styles.container}>
            <View>
                <DefaultView style={[styles.box, { shadowColor: Colors[colorScheme].text }]}>

                    <CustomButton value={"Login"}
                        margin={1}
                        fontSize={FontSize.small}
                        onPress={() => onLogin()}
                    />
                </DefaultView>
            </View>
        </DefaultView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    box: {
        elevation: 10,
        height: 400,
        width: 400,
        borderRadius: 20,
        padding: 20,
    },
    // logos: {
    //     maxHeight: 80,
    //     maxWidth: 80,
    //     borderRadius: 50,
    //     elevation: 5,
    //     flex: 1,
    //     justifyContent: "center",
    //     alignItems: "center"
    // }

})