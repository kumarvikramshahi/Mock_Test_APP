import React, { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { ScrollView, CheckIcon, Select, FormControl, WarningOutlineIcon, Center, View, Button } from "native-base";
import Colors from "../../constants/Colors";
import { idealTutorApi } from "../../constants/constants";
import useColorScheme from "../../hooks/useColorScheme";
import PopUp from "../../components/UI/PopUp";
import CustomButton from "../../components/UI/CustomButton";

export default function Practise({ navigation }) {
    const [examType, setExamType] = useState('');
    const [paperList, setPaperList] = useState([]);
    const [loading, setLoader] = useState(false);
    const [paperId, setPaperId] = useState('');
    const [paperDetail, setPaperDetail] = useState(null);
    const [smallLoader, setSmallLoader] = useState(false);
    const [message, setMessage] = useState('');
    const [modalVisible, setModalVisible] = useState(false); // for PopUps

    const colorScheme = useColorScheme();

    const styles2 = StyleSheet.create({
        theme: {
            color: Colors[colorScheme].text,
            backgroundColor: Colors[colorScheme].background,
            fontSize: 25,
        },
    });

    const startPractise = (e) => {
        if (examType && (paperList.length))
            navigation.navigate('Instructions')
        else {
            setModalVisible(true)
            setMessage("Choose Exam Type and Paper both, to Start Practice :)")
        }
    }

    useEffect(() => {
        if (examType) {
            setLoader(true);
            fetch(idealTutorApi + `/practice_paper/fetch/?exam_type=${examType.toLowerCase()}`)
                .then(data => data.json())
                .then(jsonData => {
                    if (jsonData.data) setPaperList(jsonData.data);
                    else setMessage(jsonData.message);
                    setLoader(false)
                })
                .catch(err => {
                    console.log(err)
                    setLoader(false)
                })
        }

        return setPaperList({})
    }, [examType])

    useEffect(() => {
        if (paperId) {
            setSmallLoader(true)
            fetch(idealTutorApi + `/practice_paper/fetch/?paper_id=${paperId}`)
                .then(data => data.json())
                .then(jsonData => {
                    if (jsonData.data) {
                        setPaperDetail(jsonData.data)
                        setSmallLoader(false)
                    } else setMessage(jsonData.message)
                })
                .catch(err => {
                    console.log(err)
                    setSmallLoader(false)
                })
        }

        return setPaperDetail({})
    }, [paperId])

    return (
        <ScrollView>
            <Center>
                <View style={{ ...styles.card, ...styles2.theme }}>
                    <Center>
                        <FormControl maxW="90%" >
                            <FormControl.Label>Choose Exam Type</FormControl.Label>
                            <Select accessibilityLabel="Choose Exam" placeholder="Choose Exam"
                                style={styles2.theme}
                                _selectedItem={{
                                    borderColor: "#079bb8",
                                    borderRadius: 20,
                                    borderWidth: 4,
                                    endIcon: <CheckIcon size="5" />,
                                }}
                                mt={1} onValueChange={itemValue => setExamType(itemValue)}
                            >
                                {examList.map((item, idx) => <Select.Item key={idx} color={Colors[colorScheme].text} label={item} value={item.toLowerCase()} />)}
                            </Select>
                            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                Please make a selection!
                            </FormControl.ErrorMessage>

                            <FormControl.Label style={styles.label}>Paper List</FormControl.Label>
                            <Select accessibilityLabel="Choose Paper" placeholder="Choose Paper"
                                style={styles2.theme}
                                _selectedItem={{
                                    borderColor: "#079bb8",
                                    borderRadius: 20,
                                    borderWidth: 4,
                                    endIcon: <CheckIcon size="5" />,
                                }}
                                mt={1} onValueChange={itemValue => setPaperId(itemValue)}
                            >
                                {paperList?.length ?
                                    paperList.map((item, idx) => <Select.Item key={idx} color={Colors[colorScheme].text} label={item.name} value={item._id} />)
                                    : <Select.Item color={Colors[colorScheme].text} label="Choose Exam Type to see Paper List." value="" />
                                }
                            </Select>
                            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                Please make a selection!
                            </FormControl.ErrorMessage>
                        </FormControl>
                    </Center>
                </View>
                <CustomButton value="Start practise" btnHandler={startPractise} fontSize={18} />
                <PopUp message={message} modalVisible={modalVisible} setModalVisible={setModalVisible} />
            </Center>
        </ScrollView >
    )
}

const examList = ["jee", "ssc", 'railway', 'upsc', 'bpsc'];

const styles = StyleSheet.create({
    label: {
        marginTop: 15
    },
    selectTag: {
    },
    card: {
        marginTop: 20,
        borderRadius: 20,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 30,
        paddingBottom: 40,
        width: "95%",
        elevation: 10
    },
});