import React, { useEffect, useState } from "react";
import { Text, useColorScheme, View, StyleSheet, TouchableOpacity } from "react-native";
import { DefaultView, DefaultText } from "../../components/UI/Themed";
import { AntDesign } from '@expo/vector-icons';
import Colors from "../../constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { VictoryPie, VictoryTheme } from "victory-native";
import CustomToast from "../../components/UI/CustomToast";
import { ScrollView } from "native-base";
import FullScreenSpinner from "../../components/UI/FullScreenSpinner";
import { FontSize } from "../../constants/constants";
import { Progress } from "native-base";
import QuestionsCard from "../../components/PracticeSession/QuestionCard";

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
    const [subWiseCorrectAnsData, setSubWiseCorrectAnsData] = useState([]);
    const [finalAnswer, setFinalAnswer] = useState([])
    const [questionsIdx, setQuestionIdx] = useState(0);
    // const [refreshing, setRefreshing] = useState(false); // remove when done making this page

    const dummy = 198
    const parsedParams = route.params ? JSON.parse(route.params.paramsObj) : false;
    const colorScheme = useColorScheme();
    // const onRefresh = () => {
    //     setAttemptedQues(null); setCorrectQues(null);
    // }

    const onBubbleClick = (idx) => {

    }

    useEffect(() => {
        const loadPaper = async () => {
            try {
                if (parsedParams.paperId) {
                    setLoader(true)

                    // Load and arrange ques
                    const paper = await AsyncStorage.getItem(parsedParams?.paperId);
                    const parsedPaper = await JSON.parse(paper);
                    setName(parsedPaper.name); setSubjectList(parsedPaper.subjects);
                    setQuestions(parsedPaper.questions); setFinalAnswer(parsedParams.answers);

                    // setMaxMarks(parsedPaper.max_marks); setYear(parsedPaper.year);
                    // setIsPreviousYear(parsedPaper.is_previous_year);

                    // match answers
                    let questionListLen = parsedPaper.questions?.length;
                    var answers = parsedParams.answers;
                    var attemptedQuesCount = 0, markedQuesCount = 0, correctQuesCount = 0, wrongQuesCount = 0;
                    var totalMarkesCount = 0;
                    var correctAnsData = parsedPaper.subjects;
                    for (let item of correctAnsData) item["correctAns"] = 0
                    for (let i = 0; i < questionListLen; i++) {
                        if (answers[i]) {
                            if (answers[i].qId) attemptedQuesCount++;
                            if (answers[i].optionIndex + 1 === parsedPaper.questions[i].answer) {
                                for (let j = 0; j < parsedPaper.subjects.length; j++) {
                                    if (correctAnsData[j]?.subject === answers[i].subject)
                                        (correctAnsData[j].correctAns) += 1;
                                }
                                correctQuesCount++;
                                totalMarkesCount += parsedPaper.questions[i].max_marks;
                            }
                            else wrongQuesCount++;
                            if (answers[i].marked) markedQuesCount++;
                        }
                    }

                    setSubWiseCorrectAnsData(correctAnsData);
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
    }, [parsedParams.paperId, dummy])

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
                        <View style={{ marginTop: 15, width: "90%" }}>
                            {
                                subWiseCorrectAnsData ?
                                    subWiseCorrectAnsData?.map((item, idx) =>
                                        <View key={idx} style={styles.ProgressBar}>
                                            <DefaultText>
                                                {item.subject.toUpperCase()}{" "}
                                                ({item.correctAns} / {idx + 1 === subWiseCorrectAnsData.length ? -(subWiseCorrectAnsData.length - item.firstIdx) : subWiseCorrectAnsData[idx + 1].firstIdx - item.firstIdx})
                                            </DefaultText>
                                            <Progress size="2xl" colorScheme="primary"
                                                max={idx + 1 === subWiseCorrectAnsData.length ? subWiseCorrectAnsData.length - item.firstIdx : subWiseCorrectAnsData[idx + 1].firstIdx - item.firstIdx}
                                                value={item.correctAns}
                                            />
                                        </View>
                                    )
                                    : null
                            }
                        </View>
                        <View style={styles.detailedView}>
                            <View style={{ flex: 1 }}>
                                <View>
                                    <DefaultText>
                                        Total no. of Questions : {questions.length}
                                    </DefaultText>
                                </View>
                                <View>
                                    <DefaultText>
                                        Attempted Questions : {attemptedQues}
                                    </DefaultText>
                                </View>
                                <View>
                                    <DefaultText>
                                        Marked Questions : {markedQues}
                                    </DefaultText>
                                </View>
                            </View>
                            <View style={{ flex: 1 }}>
                                <View>
                                    <DefaultText>
                                        Total Marks : {totalMarkes}
                                    </DefaultText>
                                </View>
                                <View>
                                    <DefaultText>
                                        Correct Questions : {correctQues}
                                    </DefaultText>
                                </View>
                                <View>
                                    <DefaultText>
                                        Wrong Questions : {wrongQues}
                                    </DefaultText>
                                </View>
                            </View>
                        </View>
                    </DefaultView>
                </View>

                {/* Results in Detail */}
                <View style={{ alignItems: "center" }}>
                    <DefaultView
                        style={[styles.chartBox, { shadowColor: Colors[colorScheme].text }]}>
                        <View style={{ flexDirection: "row", margin: 8 }}>
                            <View style={{ flex: 1, flexDirection: "row" }}>
                                <View style={styles.correctSquare}></View>
                                <View><Text>Right</Text></View>
                            </View>
                            <View style={{ flex: 1, flexDirection: "row" }}>
                                <View style={styles.wrongSquare}></View>
                                <View><Text>Wrong</Text></View>
                            </View>
                        </View>
                        <View style={styles.detailedResult}>
                            {questions?.length && finalAnswer?.length ?
                                questions.map((item, idx) =>
                                    <TouchableOpacity style={[styles.qBubble,
                                    { backgroundColor: item.answer === finalAnswer[idx]?.optionIndex + 1 ? "rgba(0,255,0,0.5)" : "rgba(255,0,0,0.5)" }]}
                                        key={idx} onPress={e => setQuestionIdx(idx)}
                                    >
                                        <Text style={{ fontWeight: "bold", fontSize: FontSize.small }}>
                                            {idx + 1}
                                        </Text>
                                    </TouchableOpacity>
                                )
                                : null
                            }
                        </View>
                    </DefaultView>
                </View>
                <View style={{ alignItems: "center" }}>
                    <DefaultView style={styles.chartBox}>
                        <QuestionsCard question={questions[questionsIdx]} questionIndex={questionsIdx} />
                        {/* write here code for correct option display */}
                    </DefaultView>
                </View>

            </DefaultView >
        </ScrollView >
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
        paddingBottom: 15,
        paddingHorizontal: 10,
        borderRadius: 20,
        elevation: 10,
        alignItems: "center",
        marginTop: 30,
    },
    ProgressBar: {
        marginVertical: 8
    },
    detailedView: {
        paddingHorizontal: 9,
        paddingVertical: 13,
        flexDirection: "row",
    },
    detailedResult: {
        flexDirection: "row",
        flexWrap: "wrap"
    },
    qBubble: {
        minWidth: 50,
        minHeight: 50,
        borderRadius: 50,
        margin: 10,
        flex: 1,
        elevation: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    correctSquare: {
        backgroundColor: "rgba(0,255,0,0.5)",
        height: 10,
        width: 10
    },
    wrongSquare: {
        backgroundColor: "rgba(255,0,0,0.5)",
        height: 10,
        width: 10
    },
    // questionCard: {
    //     elevation: 10,
    //     borderRadius: 20,
    //     width: "90%",
    //     paddingHorizontal: 9,
    //     paddingVertical: 13,
    //     marginVertical: 10
    // }
})