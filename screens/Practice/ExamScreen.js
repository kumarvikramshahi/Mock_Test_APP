import React, { useEffect, useState } from "react";
import { Select, CheckIcon } from "native-base";
import { StyleSheet, StatusBar, BackHandler, Alert, Vibration, Platform, View, Text } from "react-native";
import CustomButton from "../../components/UI/CustomButton";
import { AntDesign } from '@expo/vector-icons';
import { FontSize } from "../../constants/constants";
import QuestionsCard from "../../components/PracticeSession/QuestionCard";
import FullScreenSpinner from "../../components/UI/FullScreenSpinner";
// import PopUp from "../../components/UI/PopUp";

export default function ExamScreen({ navigation, route }) {
    const [useEffectCleanUp, setUseEffectCleanUp] = useState(false);
    const [loading, setLoader] = useState(false);
    const [subject, setSubject] = useState('');
    const [subjectList, setSubjectList] = useState([]);
    const [language, setLanguage] = useState('');

    const { paperId } = route.params;
    const colorScheme = useColorScheme();

    const styles2 = StyleSheet.create({
        parentView: {
            marginTop: StatusBar.currentHeight + 2,
            flex: 1,
            alignContent: "center",
            justifyContent: "flex-start"
        }
    });

    useEffect(() => {
        const loadPaper = async () => {
            try {
                setLoader(true)
                const value = await AsyncStorage.getItem(paperId);
                // set all necessary variables here
                setLoader(false)
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
                { text: "YES", onPress: () => navigation.navigate('Root') }
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
            <>
                <View style={{ ...styles.container, ...styles2.parentView }}>

                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={{ ...styles.headerText, flex: 3, fontSize: FontSize.large }}>
                            {/* {paperName} */}
                            JEE 2018 Paper-1
                        </Text>
                        <Text style={{ ...styles.headerText, flex: 1, fontSize: FontSize.large }}>
                            2:40:30
                        </Text>
                    </View>

                    {/* Neck */}
                    <View style={{ flexDirection: "row" }}>
                        <View style={styles.selectTag}>
                            <Select selectedValue={subject} minWidth="100" accessibilityLabel="Subject" placeholder="Subjects..."
                                _selectedItem={{
                                    bg: "teal.600",
                                    endIcon: <CheckIcon size="5" />
                                }} mt={1} style={{ fontSize: FontSize.small }}
                                onValueChange={itemValue => setSubject(itemValue)}
                            >
                                {subjectList?.map((item, idx) => <Select.Item key={idx} label={item.toLowerCase()} value={item} />)}
                            </Select>
                        </View>
                        <View style={styles.selectTag}>
                            <Select selectedValue={language} minWidth="100" accessibilityLabel="Language" placeholder="Languages..."
                                _selectedItem={{
                                    bg: "teal.600",
                                    endIcon: <CheckIcon size="5" />
                                }} mt={1} style={{ fontSize: FontSize.small }}
                                onValueChange={itemValue => setLanguage(itemValue)}
                            >
                                {languageList?.map((item, idx) => <Select.Item key={idx} label={item.toLowerCase()} value={item} />)}
                            </Select>
                        </View>
                        <View style={styles.antIcon}>
                            <AntDesign
                                name="menufold" size={32} color="black"
                                onPress={() => navigation.navigate('ExamRightScreen')}
                            />
                        </View>
                    </View>

                    {/* Question Card */}
                    <View>
                        <QuestionsCard />
                    </View>
                </View >
            </>
        ) : <FullScreenSpinner />
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        paddingBottom: 40,
        elevation: 10,
        backgroundColor: "#fff"
    },
    headerText: {
        fontWeight: "bold",
    },
    header: {
        backgroundColor: "#DCF6FC",
        width: "100%",
        padding: 20,
        flexDirection: "row",
    },
    infoText: {
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
    }
});

const languageList = ["Hindi", "English", "Malyalam", "Tamil"];