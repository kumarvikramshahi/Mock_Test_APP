import { ScrollView, View } from "native-base";
import React, { useEffect, useState } from "react";
import { Modal, Text, TouchableOpacity, StyleSheet, useColorScheme } from "react-native";
import { DefaultText, DefaultView } from "../UI/Themed";
import { Entypo } from '@expo/vector-icons';
import Colors from "../../constants/Colors";
import { FontSize } from "../../constants/constants";

export default function SideBar({ setQuestionIndex, questionIndex, answers, questionListLen, sideBarOn, setSideBarOn }) {
    const [attempted, setAttempted] = useState(false); // option selected = green
    const [marked, setMarked] = useState(false); // yellow & current que = blue
    const [markedAndDone, setMarkedAndDone] = useState(false); // purple
    const [dummyQuesArr, setDummyQuesArr] = useState([]); // for question Number List
    const [bubbleStyle, setBubbleStyle] = useState(null);

    const colorScheme = useColorScheme();

    const onQuestionClick = (idx) => {
        setQuestionIndex(idx);
        setSideBarOn(!sideBarOn);
    }

    const styles2 = StyleSheet.create({
        theme: {
            color: Colors[colorScheme].text,
            backgroundColor: Colors[colorScheme].background,
            shadowColor: Colors[colorScheme].text
        },
    });

    useEffect(() => {
        if (answers[questionIndex]) {
            console.log("in effect")
            if (answers[questionIndex].optionValue && marked)
                setBubbleStyle(styles.markedAndDone)
            if (answers[questionIndex].optionValue && !marked)
                setBubbleStyle(styles.attempted)
            if ((answers[questionIndex].optionValue == null) && marked)
                setBubbleStyle(styles.marked)
            else setBubbleStyle(styles2.theme)
        } else {
            setBubbleStyle(styles2.theme)
        }
    }, [answers[questionIndex]])

    useEffect(() => {
        if (questionListLen) {
            var dummyArr = [];
            for (let i = 0; i < 60; i++) {
                dummyArr.push(i)
            }
            setDummyQuesArr(dummyArr);
        }
    }, [questionListLen])

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={sideBarOn}
            onRequestClose={() => {
                setSideBarOn(!sideBarOn);
            }}
        >
            <View style={styles.centeredView}>
                <DefaultText style={[styles.crossIcon, styles2.theme]} onPress={() => setSideBarOn(!sideBarOn)}>
                    <Entypo name="cross" size={32} color={Colors[colorScheme].text} />
                </DefaultText>

                <DefaultView style={[styles.modalView, { shadowColor: Colors[colorScheme].text }]}>
                    <ScrollView>
                        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                            {dummyQuesArr?.map((item, idx) => {
                                return (
                                    <TouchableOpacity
                                        style={[styles.bubble, bubbleStyle]}
                                        key={idx} onPress={() => onQuestionClick(idx)}>
                                        <DefaultText style={styles.text}>
                                            {idx + 1}
                                        </DefaultText>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </ScrollView>
                </DefaultView>

            </View>
        </Modal >
    )
}

const styles = StyleSheet.create({
    bubble: {
        minWidth: 50,
        minHeight: 50,
        borderRadius: 50,
        margin: 10,
        flex: 1,
        elevation: 5,
        justifyContent: "center",
        alignItems: "center"
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 50,
    },
    modalView: {
        padding: 15,
        elevation: 50,
        borderRadius: 20,
        marginHorizontal: 20
    },
    crossIcon: {
        borderRadius: 50,
        padding: 4,
        marginBottom: 12,
        elevation: 50,
    },
    text: {
        fontSize: FontSize.small,
        fontWeight: "bold"
    },
    marked: {
        backgroundColor: "#FFFF00"
    },
    markedAndDone: {
        backgroundColor: "#800080",
        color: "#fff"
    },
    attempted: {
        backgroundColor: "#42f54e"
    }
})