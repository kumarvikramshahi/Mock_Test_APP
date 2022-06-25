import React, { useState } from "react";
import { StyleSheet, ScrollView, View, Text, TouchableOpacity } from "react-native";
import { FontSize } from "../../constants/constants";
import { DefaultText, DefaultView } from "../UI/Themed";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import CustomButton from "../UI/CustomButton";
import ErrorReport from "../ErrorReport";
import CustomToast from "../UI/CustomToast";

export default function QuestionsCard({ question, selectedOptionIdx, setSelectedOptionIdx, setSelectedOptionVal, questionIndex, onOptionSelect, reportList, onClear }) {
    // const [reportList, setReportList] = useState(new Set());
    // const [reportModalOn, setReportModalOn] = useState(false);

    const colorScheme = useColorScheme();

    const onReport = (id) => {
        reportList.add(id)
        CustomToast("Repoted!", "short")
    }

    return (
        <DefaultView darkColor={Colors.dark.background}
            style={[styles.QuestionsCard, { borderColor: colorScheme === 'dark' ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)" }]}
        >
            <ScrollView>
                <DefaultText style={styles.q}>
                    <Text style={styles.questionIndex} > {questionIndex + 1}{". "} {" "}</Text>
                    {question?.q}
                </DefaultText>

                {
                    question?.options?.map((item, idx) =>
                        <TouchableOpacity activeOpacity={0.7} onPress={() => onOptionSelect(idx, item, question._id, question.subject)} key={idx}
                            style={{
                                borderColor: colorScheme === "dark" ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)",
                                ...styles.option,
                                ...(selectedOptionIdx === idx ? { backgroundColor: "rgb(240, 240, 208)" } : { borderWidth: 1 })
                            }}
                        >
                            <DefaultText style={{ fontSize: FontSize.small, color: selectedOptionIdx === idx ? Colors.light.text : Colors[colorScheme].text }}>
                                {idx + 1}. {item}
                            </DefaultText>
                        </TouchableOpacity>
                    )
                }

                {/* Error Report Model */}
                {/* <ErrorReport reportModalOn={reportModalOn} setReportModalOn={setReportModalOn} /> */}

                {/* Clear & Report Button */}
                <View style={{ flexDirection: "row" }}>
                    <CustomButton value={"clear"}
                        customStyle={[styles.clearBtn, { flex: 1, }]}
                        bgcolor="rgba(191, 6, 98,1)"
                        color="rgba(255,255,255,0.9)"
                        padding={8}
                        margin={1}
                        onPress={() => onClear()}
                    />
                    <CustomButton value={"Report"}
                        customStyle={[styles.clearBtn, { flex: 1, marginLeft: 140 }]}
                        bgcolor={"rgba(191, 6, 98,1)"}
                        color="rgba(255,255,255,0.9)"
                        padding={8}
                        margin={1}
                        onPress={() => onReport(question._id)}
                    />
                </View>
            </ScrollView>
        </DefaultView >

    )
}

const styles = StyleSheet.create({
    QuestionsCard: {
        paddingHorizontal: 12,
        borderWidth: 0,
        width: "100%",
        height: "84%",
        marginTop: 10,
        marginHorizontal: "auto",
        marginBottom: 50,
        borderRadius: 20,
    },
    q: {
        fontSize: FontSize.small,
        marginBottom: 25,
    },
    option: {
        padding: 20,
        borderRadius: 20,
        marginBottom: 8,
        borderWidth: 1,
        maxWidth: "90%"
    },
    questionIndex: {
        fontSize: FontSize.medium,
        fontWeight: "bold"
    },
    clearBtn: {
        marginTop: 30,
        marginBottom: 10,
        elevation: 0,
    }
});
