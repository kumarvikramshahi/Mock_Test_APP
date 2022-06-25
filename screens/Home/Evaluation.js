import React, { useEffect } from "react";
import { Text, useColorScheme, View } from "react-native";
import { DefaultView, DefaultText } from "../../components/UI/Themed";
import { AntDesign } from '@expo/vector-icons';
import Colors from "../../constants/Colors";

export default function Evaluation({ navigation, route }) {
    const [subjectList, setSubjectList] = useState([]);
    const [name, setName] = useState('');
    // const [maxMarks, setMaxMarks] = useState(0);
    // const [year, setYear] = useState(0);
    // const [isPreviousYear, setIsPreviousYear] = useState(false);
    const [questions, setQuestions] = useState([]);

    const { paramsObj } = route.params;
    const colorScheme = useColorScheme();

    useEffect(() => {
        console.log(JSON.parse(paramsObj))
    }, [])

    useEffect(() => {
        const loadPaper = async () => {
            try {
                setLoader(true)
                const paper = await AsyncStorage.getItem(paramsObj.paperId);
                const parsedPaper = await JSON.parse(paper);
                setName(parsedPaper.name);
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
            } catch (e) {
                setLoader(false)
                CustomToast(e.message)
            }
        }
        loadPaper();

        return () => setUseEffectCleanUp({})
    }, [])

    return (
        <DefaultView>
            <DefaultText>
                <AntDesign name="checkcircleo" size={40} color={Colors[colorScheme].text} />
            </DefaultText>
        </DefaultView>
    )
}