import { Center, useToast, Box } from "native-base";
import React, { useEffect, useState } from "react";
import { StyleSheet, StatusBar, ScrollView, Text, View } from "react-native";
import useColorScheme from "../../hooks/useColorScheme";
import Colors from "../../constants/Colors";
import CustomButton from "../../components/UI/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FullScreenSpinner from "../../components/UI/FullScreenSpinner";
import Checkbox from "../../components/UI/Checkbox";
import { FontSize } from "../../constants/constants";

export default function Instructions({ navigation, route }) {
    const [useEffectCleanUp, setUseEffectCleanUp] = useState(false);
    const [loading, setLoader] = useState(false);
    const [instructions, setInstructions] = useState('');
    const [isInstructionsRead, setInstructionsRead] = useState(false);

    const { paperId } = route.params;
    const colorScheme = useColorScheme();
    const toast = useToast();

    const styles2 = StyleSheet.create({
        theme: {
            color: Colors[colorScheme].text,
            backgroundColor: Colors[colorScheme].background,
            fontSize: FontSize.small,
            shadowColor: Colors[colorScheme].text
        },
        parentView: {
            marginTop: StatusBar.currentHeight + 5,
            flex: 1,
            alignContent: "center",
            justifyContent: "flex-start"
        }
    });

    const start = () => {
        navigation.navigate('ExamScreen', { paperId: paperId })
    }

    const CustomToast = (message, position, color) => {
        toast.show({
            render: () => {
                return <Box bg={color ? color : "#fac2be"} px="2" py="1" rounded="md" mb={50}>
                    {message}
                </Box>;
            },
            placement: position ? position : "top"
        });
    }

    useEffect(() => {
        const loadPaper = async () => {
            try {
                setLoader(true)
                const value = await AsyncStorage.getItem(paperId)
                setInstructions(JSON.parse(value).instructions)
                setLoader(false)
            } catch (e) {
                setLoader(false)
                CustomToast(e.message)
            }
        }
        loadPaper();

        return () => setUseEffectCleanUp({})
    }, [])

    return (
        !loading ? (
            <>
                <View style={[styles.card, styles2.parentView, styles2.theme]}>
                    <Center><Text style={[styles2.theme, styles.header]}>Instructions</Text></Center>
                    <ScrollView>
                        <Text style={styles2.theme}>
                            {instructions}
                        </Text>
                        <Checkbox value={isInstructionsRead} onValueChange={setInstructionsRead} message="I have read and understood instructions carefully." />
                    </ScrollView>
                    <CustomButton value="Start Now" btnHandler={start} fontSize={FontSize.medium} />
                </View>
            </>
        ) : <FullScreenSpinner />
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
        fontSize: FontSize.large,
        fontWeight: "bold",
        marginBottom: 18,
    },
});