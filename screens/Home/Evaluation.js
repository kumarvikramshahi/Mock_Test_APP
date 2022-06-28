import React, { useEffect, useState } from "react";
import { Text, useColorScheme, View, StyleSheet } from "react-native";
import { DefaultView, DefaultText } from "../../components/UI/Themed";
import { AntDesign } from '@expo/vector-icons';
import Colors from "../../constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { VictoryPie, VictoryTheme } from "victory-native";
import CustomToast from "../../components/UI/CustomToast";
import { ScrollView } from "native-base";
import FullScreenSpinner from "../../components/UI/FullScreenSpinner";
import { FontSize } from "../../constants/constants";

export default function Evaluation({ navigation, route }) {
    const [useEffectCleanUp, setUseEffectCleanUp] = useState(false);
    const [subjectList, setSubjectList] = useState([]);
    const [name, setName] = useState('');
    const [loading, setLoader] = useState(false);
    // const [maxMarks, setMaxMarks] = useState(0);
    // const [year, setYear] = useState(0);
    // const [isPreviousYear, setIsPreviousYear] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [attemptedQues, setAttemptedQues] = useState(0);
    const [markedQues, setMarkedQues] = useState(0);
    const [totalMarkes, setTotalMarkes] = useState(0);
    const [wrongQues, setWrongQues] = useState(0);
    const [correctQues, setCorrectQues] = useState(0);
    const [pieData, setPieData] = useState(null);

    const { paramsObj } = route.params;
    const colorScheme = useColorScheme();

    useEffect(() => {
        const loadPaper = async () => {
            try {
                if (paramsObj.paperId) {
                    setLoader(true)

                    // Load and arrange ques
                    const paper = await AsyncStorage.getItem(paramsObj?.paperId);
                    const parsedPaper = await JSON.parse(paper);
                    setName(parsedPaper.name); setTimeLimit(parsedPaper.time_Limit);
                    // setMaxMarks(parsedPaper.max_marks); setYear(parsedPaper.year);
                    // setIsPreviousYear(parsedPaper.is_previous_year);

                    var arrangedQuestionlist = [];
                    var arrangedSubjectlist = [];
                    let subjectListLen = parsedPaper.subjects?.length;
                    let questionListLen = parsedPaper.questions?.length;
                    let questionList = parsedPaper.questions;
                    let subjectList = parsedPaper.subjects;
                    for (let i = 0; i < subjectListLen; i++) {
                        arrangedSubjectlist.push({ firstIdx: i, subject: subjectList[i] });
                        for (let j = 0; j < questionListLen; j++) {
                            if (questionList[j].subject === subjectList[i])
                                arrangedQuestionlist.push(questionList[j]);
                        }
                    }
                    setSubjectList(arrangedSubjectlist);
                    setQuestions(arrangedQuestionlist);

                    // match answers
                    var answers = paramsObj.answers;
                    var attemptedQuesCount = 0, markedQuesCount = 0, correctQuesCount = 0, wrongQuesCount = 0;
                    var totalMarkesCount = 0;
                    for (let i = 0; i < questionListLen; i++) {
                        if (answers[i]) {
                            if (answers[i].qId) attemptedQuesCount++;
                            if (answers[i].optionIndex + 1 === arrangedQuestionlist[i].answer) {
                                correctQuesCount++;
                                totalMarkesCount += arrangedQuestionlist[i].max_marks;
                            }
                            else wrongQuesCount++;
                            if (answers[i].marked) markedQuesCount++;
                        }
                    }
                    setAttemptedQues(attemptedQuesCount);
                    setMarkedQues(markedQuesCount); setTotalMarkes(totalMarkesCount);
                    setCorrectQues(correctQuesCount); setWrongQues(wrongQuesCount);
                    setLoader(false)
                }
            } catch (e) {
                setLoader(false)
                CustomToast(e.message)
            }
        }
        loadPaper();

        return () => setUseEffectCleanUp({})
    }, [paramsObj.paperId])

    return (
        <ScrollView>
            {loading ? <FullScreenSpinner /> : null}
            <DefaultView darkColor={Colors.dark.background}>

                {/* Submitted Icon */}
                <View style={styles.tickIcon}>
                    <View>
                        <AntDesign name="checkcircleo" size={60} color={Colors[colorScheme].text} />
                    </View>
                    <DefaultText style={styles.submitted}>Submitted</DefaultText>
                </View>

                {/* Results overview */}
                <View style={{ alignItems: "center" }}>
                    <DefaultView style={[styles.chartBox, { shadowColor: Colors[colorScheme].text }]}>
                        <VictoryPie
                            theme={VictoryTheme.material}
                            radius={100}
                            style={{
                                labels: {
                                    padding: 11, fontSize: FontSize.small,
                                    fill: Colors[colorScheme].text
                                }
                            }}
                            data={[
                                { x: "maths", y: 3, },
                                { x: "hindi", y: 4, },
                                { x: 3, y: 2, },
                                { x: 4, y: 2, },
                            ]}
                        />
                        <View>
                            <DefaultText>
                                Total no. of Questions : {questions.length}
                            </DefaultText>
                        </View>
                        <View>
                            <DefaultText>
                                Total no. of Questions : {questions.length}
                            </DefaultText>
                        </View>

                    </DefaultView>
                </View>
            </DefaultView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    tickIcon: {
        alignItems: "center",
        marginTop: 25
    },
    submitted: {
        marginTop: 10,
        fontSize: FontSize.large,
        fontWeight: "500"
    },
    chartBox: {
        width: "90%",
        padding: 8,
        borderRadius: 20,
        elevation: 10,
        alignItems: "center",
        marginTop: 30,
    }
})