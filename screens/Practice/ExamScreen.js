import React, { useEffect, useState } from "react";
import { View, Text, HStack, Select, CheckIcon } from "native-base";
import { StyleSheet, StatusBar, ScrollView, BackHandler, Alert } from "react-native";
import CustomButton from "../../components/UI/CustomButton";
import { AntDesign } from '@expo/vector-icons';
// import PopUp from "../../components/UI/PopUp";

export default function ExamScreen({ navigation, route }) {
    // const [modalVisible, setModalVisible] = useState(false); // for PopUps
    const [subject, setSubject] = useState('');
    const [subjectList, setSubjectList] = useState([]);
    const [language, setLanguage] = useState('');

    const styles2 = StyleSheet.create({
        parentView: {
            marginTop: StatusBar.currentHeight + 2,
            flex: 1,
            alignContent: "center",
            justifyContent: "center"
        }
    });

    useEffect(() => {
        const backAction = () => {
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
        <View style={{ ...styles.card, ...styles2.parentView }}>

            {/* Header */}
            <View style={styles.header}>
                <Text style={{ ...styles.headerText, flex: 3 }}>
                    {/* {paperName} */}
                    JEE 2018 Paper-1
                </Text>
                <Text style={{ ...styles.headerText, flex: 1 }}>
                    2:40:30
                </Text>
            </View>

            {/* Neck */}
            <View style={{ flexDirection: "row" }}>
                <View style={styles.selectTag}>
                    <Select selectedValue={subject} minWidth="100" accessibilityLabel="Choose Subject" placeholder="Choose Subject"
                        _selectedItem={{
                            bg: "teal.600",
                            endIcon: <CheckIcon size="5" />
                        }} mt={1}
                        onValueChange={itemValue => setSubject(itemValue)}
                    >
                        {subjectList?.map((item, idx) => <Select.Item key={idx} label={item.toLowerCase()} value={item} />)}
                    </Select>
                </View>
                <View style={styles.selectTag}>
                    <Select selectedValue={language} minWidth="100" accessibilityLabel="Choose Language" placeholder="Choose Language"
                        _selectedItem={{
                            bg: "teal.600",
                            endIcon: <CheckIcon size="5" />
                        }} mt={1}
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
            <ScrollView>
                <Text style={styles.infoText}>

                </Text>
            </ScrollView>
        </View >
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 20,
        paddingBottom: 40,
        elevation: 10,
        backgroundColor: "#fff"
    },
    headerText: {
        fontSize: 22,
        fontWeight: "bold",
    },
    header: {
        backgroundColor: "#DCF6FC",
        width: "100%",
        padding: 20,
        flexDirection: "row",
    },
    infoText: {
        fontSize: 16
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