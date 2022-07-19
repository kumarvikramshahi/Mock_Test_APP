import React from "react";
import { Text, View, StyleSheet, useColorScheme, TouchableOpacity } from "react-native";
import { DefaultText, DefaultView } from "../../components/UI/Themed";
import CustomButton from "../../components/UI/CustomButton";
import { AntDesign } from '@expo/vector-icons';
import Colors from "../../constants/Colors";
// import { GoogleSignin } from '@react-native-google-signin/google-signin';
// import auth from '@react-native-firebase/auth';

export default function Auth({ setLoggedIn }) {
    // GoogleSignin.configure({
    //     webClientId: '680841813917-ooj032kn004ltpfu6k5oddlcc3et63oh.apps.googleusercontent.com',
    // });

    const colorScheme = useColorScheme();


    
    const onGoogleClick = () => {
        
    }

    return (
        <DefaultView style={styles.container}>
            <DefaultView style={styles.box}>
                <TouchableOpacity onPress={() => onGoogleClick()} style={styles.logos}>
                    <AntDesign name="google" size={35} color={Colors[colorScheme].text} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onGoogleClick()} style={styles.logos}>
                    <AntDesign name="google" size={35} color={Colors[colorScheme].text} />
                </TouchableOpacity>
            </DefaultView>
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
        flexDirection: "row",
        padding: 20,
    },
    logos: {
        maxHeight: 80,
        maxWidth: 80,
        borderRadius: 50,
        elevation: 5,
        flex: 1,
        justifyContent: "center",
        alignItems:"center"
    }

})