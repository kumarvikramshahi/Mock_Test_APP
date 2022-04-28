import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import {
    Box,
    HStack,
} from "native-base";
import { DefaultText, DefaultView } from "../Themed";
import useColorScheme from '../../hooks/useColorScheme';
import Colors from "../../constants/Colors";
import { AntDesign } from '@expo/vector-icons';

export default function SmallCard({
    profilePic,
    name,
    standard,
    subject,
    studentTaught,
    ratingStar,
    ratingCount
}) {

    const colorScheme = useColorScheme();

    return (
        <Box
            rounded={10}
            overflow="hidden"
            margin={2}
            style={styles.card}
        >
            <DefaultView darkColor="rgba(255,255,255,0.05)" lightColor="rgba(0,0,0,0.05)">
                <HStack space={3} alignItems="center">
                    <Image
                        source={{
                            uri: profilePic,
                        }}
                        alt="Alternate Text"
                        style={{
                            width: 100,
                            height: 100,
                            borderRadius: 10
                        }}
                    />

                    <View>
                        <Text style={styles.name}> {name} </Text>
                        <HStack>
                            <AntDesign name="star" size={14} color={Colors[colorScheme].text} />
                            <Text> {ratingStar} </Text>
                            <Text> ({ratingCount}) </Text>
                        </HStack>

                        <Text> {standard} </Text>
                        <Text> {subject} </Text>
                        <Text> <Text>Student taught:</Text> {studentTaught} </Text>
                    </View>
                </HStack>
            </DefaultView>
        </Box >
    )
}

const styles = StyleSheet.create({
    card: {

    },
    name: {
        fontWeight: "bold",
        fontSize: 18,
        marginTop: 2,
        marginBottom: 4
    }
});
