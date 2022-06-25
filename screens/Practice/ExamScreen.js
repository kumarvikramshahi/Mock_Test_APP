import React, { useEffect, useState } from "react";
import { Select, CheckIcon } from "native-base";
import { StyleSheet, StatusBar, BackHandler, Alert, Vibration, Platform, View, Text, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomButton from "../../components/UI/CustomButton";
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { FontSize, SELECTED_ITEM_STYLE } from "../../constants/constants";
import QuestionsCard from "../../components/PracticeSession/QuestionCard";
import FullScreenSpinner from "../../components/UI/FullScreenSpinner";
import useColorScheme from "../../hooks/useColorScheme";
import Colors from "../../constants/Colors";
import CountdownTimer from "../../components/CountdownTimer";
import CustomToast from "../../components/UI/CustomToast";
import { DefaultText, DefaultView } from "../../components/UI/Themed";
import SideBar from "../../components/PracticeSession/SideBar";
// import PopUp from "../../components/UI/PopUp";

export default function ExamScreen({ navigation, route }) {
    const [useEffectCleanUp, setUseEffectCleanUp] = useState(false);
    const [loading, setLoader] = useState(false);
    const [language, setLanguage] = useState('');
    const [timeLimit, setTimeLimit] = useState(null);
    // The state for our timer

    const [startTimer, setStartTimer] = useState(false);
    const [subject, setSubject] = useState('');
    const [subjectList, setSubjectList] = useState([]);
    const [name, setName] = useState('');
    // const [maxMarks, setMaxMarks] = useState(0);
    // const [year, setYear] = useState(0);
    // const [isPreviousYear, setIsPreviousYear] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [selectedOptionIdx, setSelectedOptionIdx] = useState(null);
    const [selectedOptionVal, setSelectedOptionVal] = useState(null); // don't remove otherwise sidebar's functionalty will break
    const [sideBarOn, setSideBarOn] = useState(false);

    var reportList = new Set();
    const { paperId } = route.params;
    const colorScheme = useColorScheme();

    const styles2 = StyleSheet.create({
        parentView: {
            marginTop: StatusBar.currentHeight + 2,
            flex: 1,
            alignContent: "center",
            justifyContent: "flex-start"
        },
        theme: {
            color: Colors[colorScheme].text,
            backgroundColor: Colors[colorScheme].background,
            fontSize: FontSize.small
        }
    });

    const onOptionSelect = (optionIdx, optionValue, qId, subject) => {
        setSelectedOptionIdx(optionIdx);
        setSelectedOptionVal(optionValue);
        let ansArr = answers;
        ansArr[questionIndex] = {
            qIndex: questionIndex,
            qId: qId,
            optionIndex: optionIdx,
            optionValue: optionValue,
            subject: subject,
            marked: false
        };

        setAnswers(ansArr);
    }

    const onClear = () => {
        setSelectedOptionIdx(null);
        setSelectedOptionVal(null);

        if (answers[questionIndex]) {
            let ansArr = answers;
            ansArr[questionIndex].optionIndex = null;
            ansArr[questionIndex].optionValue = null;
            setAnswers(ansArr);
        }
    }

    // const onNextClick = () => {

    // }

    // const onBackClick = () => {

    // }

    const onSubmit = () => {
        setStartTimer(false)
        const paramsObj = {
            answers: answers,
            paperId: paperId,
            reportList: reportList
        }
        navigation.replace('Evaluation', { paramsObj: JSON.stringify(paramsObj) });
    }

    useEffect(() => {
        if (answers[questionIndex]) {
            setSelectedOptionIdx(answers[questionIndex].optionIndex);
            setSelectedOptionVal(answers[questionIndex].optionValue);
        } else {
            setSelectedOptionIdx(null);
            setSelectedOptionVal(null);
        }
    }, [questionIndex])

    useEffect(() => {
        const loadPaper = async () => {
            try {
                setLoader(true)
                const paper = await AsyncStorage.getItem(paperId);
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
                setLoader(false)
                setStartTimer(true)
            } catch (e) {
                setLoader(false)
                CustomToast(e.message)
            }
        }
        loadPaper();

        return () => setUseEffectCleanUp({})
    }, [])

    useEffect(() => {
        const backAction = () => {
            if (Platform.OS == 'android') Vibration.vibrate(50);
            Alert.alert("Hold on!", "Are you sure you want to Exit EXAM?", [
                {
                    text: "Cancel",
                    onPress: () => null,
                    style: "destructive"
                },
                { text: "YES", onPress: () => { setStartTimer(false); navigation.navigate('Root') } }
            ]);
            return true;
        };
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, [route?.key])

    return (
        !loading ? (
            <DefaultView darkColor={Colors.dark.background} style={[styles.container, styles2.parentView]}>

                {/* Header */}
                <DefaultView darkColor="#282c34" lightColor="#DCF6FC" style={styles.header}>
                    <DefaultText style={{ ...styles.headerText, flex: 3, fontSize: FontSize.large }}>
                        {name}
                    </DefaultText>

                    {/* Countdown Timer */}
                    <Text style={{ ...styles.headerText, flex: 1 }}>
                        <CountdownTimer
                            startCountdownTimer={startTimer}
                            timeLimit={timeLimit}
                            setStartTimer={setStartTimer}
                            paramsObj={{
                                answers: answers,
                                paperId: paperId,
                                reportList: reportList
                            }}
                            passedNavigation={navigation}
                        />
                    </Text>
                </DefaultView>

                {/* Neck */}
                <View style={[styles.neck, {
                    borderBottomColor: colorScheme === "dark" ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)"
                }]}>
                    <View style={styles.selectTag}>
                        <Select selectedValue={subject} minWidth="100" accessibilityLabel="Subject" placeholder="Subjects..." style={styles2.theme}
                            _selectedItem={{
                                ...SELECTED_ITEM_STYLE,
                                endIcon: <CheckIcon size="5" />
                            }} mt={1}
                        >
                            {subjectList?.map((item, idx) => <Select.Item key={idx} label={item.subject.toUpperCase()} value={item.subject.toLowerCase()} onPress={() => { setQuestionIndex(item.firstIdx); setSubject(item.subject) }} />)}
                        </Select>
                    </View>
                    <View style={styles.selectTag}>
                        <Select selectedValue={language} minWidth="100" accessibilityLabel="Language" placeholder="Languages..." style={styles2.theme}
                            _selectedItem={{
                                ...SELECTED_ITEM_STYLE,
                                color: Colors[colorScheme].text,
                                endIcon: <CheckIcon size="5" />
                            }} mt={1}
                            onValueChange={itemValue => setLanguage(itemValue)}
                        >
                            {languageList?.map((item, idx) => <Select.Item key={idx} label={item.toLowerCase()} value={item} />)}
                        </Select>
                    </View>
                    <View style={styles.antIcon}>
                        <AntDesign
                            name="menufold" size={32} color={Colors[colorScheme].text}
                            onPress={() => setSideBarOn(!sideBarOn)}
                        />
                    </View>

                    {/* SideBar */}
                    <SideBar setQuestionIndex={setQuestionIndex}
                        questionIndex={questionIndex}
                        answers={answers}
                        questionListLen={questions.length}
                        sideBarOn={sideBarOn}
                        setSideBarOn={setSideBarOn}
                    />

                </View>

                {/* Question Card */}
                <View style={styles.questionCard}>
                    <QuestionsCard question={questions[questionIndex]}
                        questionIndex={questionIndex}
                        onOptionSelect={onOptionSelect}
                        selectedOptionIdx={selectedOptionIdx}
                        setSelectedOptionIdx={setSelectedOptionIdx}
                        setSelectedOptionVal={setSelectedOptionVal}
                        reportList={reportList}
                        onClear={onClear}
                    />
                </View>
                <View style={styles.btnGroup}>
                    <CustomButton
                        iconLeft={<AntDesign name="arrowleft" size={24} color="black" />}
                        value={"Back"}
                        onPress={() => setQuestionIndex(questionIndex - 1)}
                        fontSize={FontSize.medium}
                        customStyle={{ flex: 1 }}
                        margin={30}
                        disabled={questionIndex === 0 ? true : false}
                    />
                    {questionIndex + 1 === questions.length ? (
                        <CustomButton
                            value={"Submit"}
                            onPress={() => onSubmit()}
                            fontSize={FontSize.medium}
                            customStyle={{ flex: 1 }}
                            iconRight={<MaterialIcons name="done-all" size={24} color="black" />}
                            margin={30}
                        />
                    ) : (
                        <CustomButton
                            value={"Next"}
                            iconRight={<AntDesign name="arrowright" size={24} color="black" />}
                            onPress={() => setQuestionIndex(questionIndex + 1)}
                            fontSize={FontSize.medium}
                            customStyle={{ flex: 1 }}
                            margin={30}
                        />
                    )}
                </View>
            </DefaultView >
        ) : <FullScreenSpinner />
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        paddingBottom: 40,
        elevation: 10,
    },
    headerText: {
        fontWeight: "bold",
    },
    header: {
        width: "100%",
        padding: 20,
        flexDirection: "row",
    },
    selectTag: {
        marginTop: 2,
        marginLeft: 8,
        flex: 2,
    },
    antIcon: {
        flex: 1,
        alignItems: "flex-end",
        justifyContent: "center",
        marginRight: 12,
    },
    questionCard: {
        marginTop: 10,
    },
    btnGroup: {
        flexDirection: "row",
        position: "absolute",
        bottom: 5,
    },
    neck: {
        flexDirection: "row",
        borderBottomWidth: 0.5,
        paddingBottom: 10
    }
});

const languageList = ["Hindi", "English", "Malyalam", "Tamil"];